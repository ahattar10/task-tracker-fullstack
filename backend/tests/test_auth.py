import asyncio

from fastapi import status
from fastapi.testclient import TestClient

from app.api.auth import clear_auth_rate_limits
from app.db import Base, engine
from app.main import app


def setup_function() -> None:
    async def reset_database() -> None:
        async with engine.begin() as connection:
            await connection.run_sync(Base.metadata.drop_all)
            await connection.run_sync(Base.metadata.create_all)

    asyncio.run(reset_database())
    clear_auth_rate_limits()


def register_user(client: TestClient, email: str, password: str = "Password123!"):
    return client.post(
        "/auth/register",
        json={"email": email, "password": password},
    )


def test_register_success():
    client = TestClient(app)

    response = register_user(client, "register@example.com")

    assert response.status_code == status.HTTP_201_CREATED
    body = response.json()
    assert body["email"] == "register@example.com"
    assert body["id"] > 0
    assert "created_at" in body


def test_register_duplicate_email():
    client = TestClient(app)

    first_response = register_user(client, "duplicate@example.com")
    assert first_response.status_code == status.HTTP_201_CREATED

    second_response = register_user(client, "duplicate@example.com")

    assert second_response.status_code == status.HTTP_409_CONFLICT
    assert second_response.json()["detail"] == "Email already registered"


def test_login_success():
    client = TestClient(app)

    register_response = register_user(client, "login@example.com")
    assert register_response.status_code == status.HTTP_201_CREATED

    response = client.post(
        "/auth/login",
        json={"email": "login@example.com", "password": "Password123!"},
    )

    assert response.status_code == status.HTTP_200_OK
    body = response.json()
    assert body["token_type"] == "bearer"
    assert body["access_token"]


def test_login_wrong_password():
    client = TestClient(app)

    register_response = register_user(client, "wrong@example.com")
    assert register_response.status_code == status.HTTP_201_CREATED

    response = client.post(
        "/auth/login",
        json={"email": "wrong@example.com", "password": "WrongPass123!"},
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json()["detail"] == "Invalid email or password"


def test_cors_allows_custom_portfolio_subdomain():
    client = TestClient(app)

    response = client.options(
        "/health",
        headers={
            "Origin": "https://app.anthony-hattar.com",
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert (
        response.headers["Access-Control-Allow-Origin"]
        == "https://app.anthony-hattar.com"
    )
    assert response.headers["Access-Control-Allow-Credentials"] == "true"


def test_security_headers_present():
    client = TestClient(app)

    response = client.get("/health")

    assert response.status_code == status.HTTP_200_OK
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["Referrer-Policy"] == "strict-origin-when-cross-origin"


def test_auth_rate_limit_blocks_excessive_attempts():
    client = TestClient(app)

    for _ in range(12):
        response = client.post(
            "/auth/login",
            json={"email": "nobody@example.com", "password": "WrongPass123!"},
        )
        assert response.status_code in (
            status.HTTP_401_UNAUTHORIZED,
            status.HTTP_429_TOO_MANY_REQUESTS,
        )

    final_response = client.post(
        "/auth/login",
        json={"email": "nobody@example.com", "password": "WrongPass123!"},
    )
    assert final_response.status_code == status.HTTP_429_TOO_MANY_REQUESTS
