"""add users and task ownership

Revision ID: 0002
Revises: 0001
Create Date: 2026-06-10

"""

from __future__ import annotations

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0002"
down_revision: Union[str, Sequence[str], None] = "0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)

    op.add_column(
        "tasks",
        sa.Column("user_id", sa.Integer(), nullable=True),
    )

    op.execute("""
        INSERT INTO users (email, hashed_password)
        VALUES ('legacy@local.invalid', '$2b$12$U5wByIaf5hjfQa0f2qvTROtQYQMUGi9vM6VL.4n1WJrB4sPtoJ2/a')
        ON CONFLICT (email) DO NOTHING
        """)
    op.execute("""
        UPDATE tasks
        SET user_id = (SELECT id FROM users WHERE email = 'legacy@local.invalid' LIMIT 1)
        WHERE user_id IS NULL
        """)

    op.alter_column("tasks", "user_id", nullable=False)
    op.create_index(op.f("ix_tasks_user_id"), "tasks", ["user_id"], unique=False)
    op.create_foreign_key(
        "fk_tasks_user_id_users",
        "tasks",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
    )


def downgrade() -> None:
    op.drop_constraint("fk_tasks_user_id_users", "tasks", type_="foreignkey")
    op.drop_index(op.f("ix_tasks_user_id"), table_name="tasks")
    op.drop_column("tasks", "user_id")

    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")
