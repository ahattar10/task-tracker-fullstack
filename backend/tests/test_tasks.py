import asyncio

from fastapi import status
from fastapi.testclient import TestClient

from app.db import Base, engine
from app.main import app


def setup_function() -> None:
    async def reset_database() -> None:
        async with engine.begin() as connection:
            await connection.run_sync(Base.metadata.drop_all)
            await connection.run_sync(Base.metadata.create_all)

    asyncio.run(reset_database())


def register_and_login(client: TestClient, email: str) -> str:
    register_response = client.post(
        "/auth/register",
        json={"email": email, "password": "Password123!"},
    )
    assert register_response.status_code == status.HTTP_201_CREATED

    login_response = client.post(
        "/auth/login",
        json={"email": email, "password": "Password123!"},
    )
    assert login_response.status_code == status.HTTP_200_OK
    return login_response.json()["access_token"]


def auth_headers(token: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {token}"}


def test_create_and_list_tasks():
    client = TestClient(app)
    token = register_and_login(client, "owner@example.com")

    create_response = client.post(
        "/tasks",
        headers=auth_headers(token),
        json={
            "title": "Write tests",
            "description": "Create backend task tests",
            "status": "todo",
            "priority": "medium",
        },
    )

    assert create_response.status_code == status.HTTP_201_CREATED
    created_task = create_response.json()
    assert created_task["title"] == "Write tests"
    assert created_task["user_id"] > 0

    list_response = client.get("/tasks", headers=auth_headers(token))

    assert list_response.status_code == status.HTTP_200_OK
    body = list_response.json()
    assert body["total"] == 1
    assert body["pages"] == 1
    assert len(body["items"]) == 1
    assert body["items"][0]["title"] == "Write tests"


def test_get_task_other_user_returns_404():
    client = TestClient(app)

    owner_token = register_and_login(client, "owner2@example.com")
    other_token = register_and_login(client, "other2@example.com")

    task_response = client.post(
        "/tasks",
        headers=auth_headers(owner_token),
        json={"title": "Private task", "status": "todo", "priority": "medium"},
    )
    assert task_response.status_code == status.HTTP_201_CREATED
    task_id = task_response.json()["id"]

    detail_response = client.get(
        f"/tasks/{task_id}",
        headers=auth_headers(other_token),
    )

    assert detail_response.status_code == status.HTTP_404_NOT_FOUND
    assert detail_response.json()["detail"] == f"Task {task_id} not found"


def test_update_and_delete_task_success():
    client = TestClient(app)
    token = register_and_login(client, "editor@example.com")

    create_response = client.post(
        "/tasks",
        headers=auth_headers(token),
        json={"title": "Original title", "status": "todo", "priority": "medium"},
    )
    assert create_response.status_code == status.HTTP_201_CREATED
    task_id = create_response.json()["id"]

    update_response = client.put(
        f"/tasks/{task_id}",
        headers=auth_headers(token),
        json={"title": "Updated title", "status": "in_progress"},
    )

    assert update_response.status_code == status.HTTP_200_OK
    updated = update_response.json()
    assert updated["title"] == "Updated title"
    assert updated["status"] == "in_progress"

    delete_response = client.delete(
        f"/tasks/{task_id}",
        headers=auth_headers(token),
    )
    assert delete_response.status_code == status.HTTP_204_NO_CONTENT

    missing_response = client.get(
        f"/tasks/{task_id}",
        headers=auth_headers(token),
    )
    assert missing_response.status_code == status.HTTP_404_NOT_FOUND
