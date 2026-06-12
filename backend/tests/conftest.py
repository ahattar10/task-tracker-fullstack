import os
from pathlib import Path

os.environ["APP_ENV"] = "testing"
os.environ["JWT_SECRET_KEY"] = "test-secret-key"
os.environ["DATABASE_URL"] = os.environ.get(
    "TEST_DATABASE_URL",
    "sqlite+aiosqlite:///./test.db",
)


def pytest_sessionfinish(session, exitstatus):
    del session, exitstatus
    test_db = Path(__file__).resolve().parents[1] / "test.db"
    if test_db.exists():
        try:
            test_db.unlink()
        except PermissionError:
            pass
