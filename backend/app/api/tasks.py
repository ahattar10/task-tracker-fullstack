from math import ceil

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.auth import get_current_user
from app.db import get_session
from app.models import Task, User
from app.schemas import (
    TaskCreate,
    TaskListResponse,
    TaskPriority,
    TaskRead,
    TaskStatus,
    TaskUpdate,
)

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
async def create_task(
    payload: TaskCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> Task:
    task = Task(**payload.model_dump(), user_id=current_user.id)
    session.add(task)
    await session.commit()
    await session.refresh(task)
    return task


@router.get("", response_model=TaskListResponse)
async def list_tasks(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=100),
    status_filter: TaskStatus | None = Query(default=None, alias="status"),
    priority: TaskPriority | None = Query(default=None),
    search: str | None = Query(default=None, min_length=1, max_length=200),
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> TaskListResponse:
    filters = [Task.user_id == current_user.id]

    if status_filter is not None:
        filters.append(Task.status == status_filter)

    if priority is not None:
        filters.append(Task.priority == priority)

    if search is not None:
        search_term = f"%{search.strip()}%"
        filters.append(
            (Task.title.ilike(search_term)) | (Task.description.ilike(search_term))
        )

    total_result = await session.execute(select(func.count(Task.id)).where(*filters))
    total = total_result.scalar()

    offset = (page - 1) * limit
    result = await session.execute(
        select(Task)
        .where(*filters)
        .order_by(Task.created_at.desc())
        .offset(offset)
        .limit(limit)
    )
    items = list(result.scalars().all())

    pages = ceil(total / limit) if total > 0 else 0
    return TaskListResponse(items=items, total=total, page=page, pages=pages)


@router.get("/{task_id}", response_model=TaskRead)
async def get_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> Task:
    result = await session.execute(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    )
    task = result.scalar_one_or_none()
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task {task_id} not found",
        )
    return task


@router.put("/{task_id}", response_model=TaskRead)
async def update_task(
    task_id: int,
    payload: TaskUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> Task:
    result = await session.execute(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    )
    task = result.scalar_one_or_none()
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task {task_id} not found",
        )

    updates = payload.model_dump(exclude_unset=True)
    for field, value in updates.items():
        setattr(task, field, value)

    await session.commit()
    await session.refresh(task)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> None:
    result = await session.execute(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    )
    task = result.scalar_one_or_none()
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task {task_id} not found",
        )
    await session.delete(task)
    await session.commit()
