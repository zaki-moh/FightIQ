# FightIQ

FightIQ is a full-stack combat sports analytics app that predicts UFC matchups and explains why the model favors one fighter.

## What It Does

- Predicts winner and confidence for a selected UFC matchup
- Provides explanation factors (striking, grappling, physical edges)
- Supports fighter autocomplete and stats retrieval through backend APIs

## Tech Stack

- Frontend: Next.js + React + TypeScript + Tailwind
- Backend: FastAPI + pandas + scikit-learn + SQLAlchemy
- Storage: CSV (legacy model pipeline) + SQLite DB (runtime fighter data)

## Documentation

Comprehensive docs are in `docs/`:

- `docs/architecture.md`
- `docs/backend.md`
- `docs/frontend.md`
- `docs/api.md`
- `docs/data-model-and-storage.md`
- `docs/development.md`
- `docs/file-map.md`

Start with `docs/README.md` for reading order.

## Quick Start

### Backend

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python -m src.seed_fighters
uvicorn src.main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Set `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Disclaimer

FightIQ is an analytical and educational project. Predictions are data-driven estimates, not guarantees or betting advice.

