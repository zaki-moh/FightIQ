# Development Guide

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm

## Environment Variables

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (`backend`)

Optional:

```env
DATABASE_URL=sqlite:///.../fightiq.db
```

If not set, backend defaults to local SQLite at `backend/data/fightiq.db`.

## Local Run

### 1) Backend

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python -m src.seed_fighters
uvicorn src.main:app --reload --host 127.0.0.1 --port 8000
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Useful Commands

### Backend compile check

```bash
python -m py_compile src/*.py
```

### Frontend lint

```bash
npm run lint
```

### Regenerate static fighter fallback list

```bash
node scripts/generate-fighters.ts
```

## Common Workflows

### Update fighter data in DB

1. Update source CSV or ingestion payload
2. Rerun seed script
3. Verify `/fighters?query=...`

### Change schema

1. Update `backend/src/models.py`
2. Re-run backend startup or call `init_db`
3. For production-grade changes, move to migration tooling (Alembic)

## Troubleshooting

### `No module named sqlalchemy`

Install backend requirements inside the active backend venv:

```bash
pip install -r backend/requirements.txt
```

### Empty fighter autocomplete

- Ensure seed script has run
- Check backend is pointing to expected DB via `DATABASE_URL`

