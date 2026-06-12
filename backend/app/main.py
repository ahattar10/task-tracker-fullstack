from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from urllib.parse import urlparse

from app.api.auth import router as auth_router
from app.api.tasks import router as tasks_router
from app.core.config import settings

app = FastAPI(title=settings.app_name)


def is_origin_allowed(origin: str) -> bool:
    """Validate origin with proper URL parsing instead of substring matching."""
    if not origin:
        return False

    origin_host = urlparse(origin).hostname or origin

    # Exact matches for localhost and 127.0.0.1
    if origin_host in ("localhost", "127.0.0.1"):
        return True

    # Allow any subdomain of use.devtunnels.ms
    if origin_host.endswith(".use.devtunnels.ms"):
        return True

    # Allow Vercel deployments for production frontend.
    if origin_host.endswith(".vercel.app"):
        return True

    return False


class CORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        origin = request.headers.get("origin", "")
        is_allowed = is_origin_allowed(origin)

        if request.method == "OPTIONS":
            if is_allowed:
                return JSONResponse(
                    content={"ok": True},
                    status_code=200,
                    headers={
                        "Access-Control-Allow-Origin": origin,
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    },
                )
            return JSONResponse(content={"ok": True}, status_code=200)

        response = await call_next(request)

        if is_allowed:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"

        return response


app.add_middleware(CORSMiddleware)

app.include_router(auth_router)
app.include_router(tasks_router)


@app.on_event("startup")
async def startup_validation() -> None:
    """Validate critical configuration on startup."""
    if not settings.jwt_secret_key:
        raise RuntimeError(
            "JWT_SECRET_KEY environment variable is not set. "
            "This is required for authentication. Please set it before running the app."
        )


@app.exception_handler(HTTPException)
async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "detail": exc.detail,
            "status_code": exc.status_code,
        },
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    _: Request,
    exc: RequestValidationError,
) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={
            "detail": exc.errors(),
            "status_code": 422,
        },
    )


@app.get("/health")
def health_check() -> dict[str, str]:
    return {
        "status": "ok",
        "environment": settings.app_env,
    }


@app.get("/")
def root() -> dict[str, str]:
    return {
        "message": f"{settings.app_name} is running",
    }
