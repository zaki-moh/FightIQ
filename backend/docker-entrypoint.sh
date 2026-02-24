#!/usr/bin/env sh
set -e

if [ "${RUN_SEED_ON_STARTUP:-1}" = "1" ]; then
  echo "[entrypoint] Seeding fighter database..."
  python -m src.seed_fighters
fi

echo "[entrypoint] Starting API server..."
exec uvicorn src.main:app --host 0.0.0.0 --port "${PORT:-8000}"
