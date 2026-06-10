"""Runtime entrypoint for local development.

Runs FastAPI on a Selector event loop on Windows so psycopg async connections
work without relying on deprecated event loop policy APIs.
"""

from __future__ import annotations

import asyncio
import selectors
import sys

import uvicorn

from app.core.config import settings


def _selector_loop_factory() -> asyncio.AbstractEventLoop:
    return asyncio.SelectorEventLoop(selectors.SelectSelector())


def run() -> None:
    config = uvicorn.Config(
        app="app.main:app",
        host=settings.app_host,
        port=settings.app_port,
        reload=False,
    )
    server = uvicorn.Server(config)

    if sys.platform.startswith("win"):
        asyncio.run(server.serve(), loop_factory=_selector_loop_factory)
    else:
        asyncio.run(server.serve())


if __name__ == "__main__":
    run()
