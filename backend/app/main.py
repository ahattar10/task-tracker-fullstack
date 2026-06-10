from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.api.tasks import router as tasks_router
from app.core.config import settings

app = FastAPI(title=settings.app_name)

app.include_router(auth_router)
app.include_router(tasks_router)


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
