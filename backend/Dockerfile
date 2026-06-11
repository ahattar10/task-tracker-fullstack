# Backend Dockerfile for Task Tracker
# Uses Python 3.11 slim base for minimal image size

FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies required by psycopg and cryptography
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/ app/
COPY alembic/ alembic/
COPY alembic.ini .

# Expose the API port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

# Set environment variables for Docker execution
# Override defaults to work with compose network
ENV APP_HOST=0.0.0.0
ENV DATABASE_URL=postgresql+psycopg://taskuser:taskpass@db:5432/tasktracker
ENV JWT_SECRET_KEY=docker-dev-secret-key-change-in-production

# Start uvicorn server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
