FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONPATH=/app \
    PORT=8000

WORKDIR /app

COPY requirements.txt ./requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY src ./src
COPY data ./data
COPY models ./models

EXPOSE 8000

# Start via Python so PORT parsing is explicit and shell expansion is not required.
CMD ["python", "-m", "src.run"]
