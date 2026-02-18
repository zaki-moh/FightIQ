# Data Model and Storage

## Why DB Instead of CSV at Runtime

CSV files were useful for bootstrapping model work, but they are weak for live application data:

- no transactional guarantees
- no indexed search
- difficult concurrent writes
- difficult safe upserts
- poor fit for incremental updates and event-driven ingestion

A DB-backed runtime enables stable reads/writes as the product grows.

## Current Storage Strategy

### Runtime DB

- SQLite (default local): `backend/data/fightiq.db`
- SQLAlchemy ORM-based schema and queries
- Intended to be Postgres-compatible via `DATABASE_URL`

### Legacy CSV Sources

Still used for model training/inference compatibility:

- `backend/data/ufc-fighters-statistics-with-gender.csv`
- `backend/data/large_dataset.csv`

## Fighter Table Schema

Defined in `backend/src/models.py` (`fighters` table).

Key columns:

- `id`: primary key
- `name`: canonical display name (unique)
- `name_normalized`: normalized lookup key (unique)
- `gender`
- `height_cm`, `reach_in_cm`, `weight_in_kg`, `age`
- `strike_efficiency`, `grapple_efficiency`, `win_ratio`, `performance`
- `created_at`, `updated_at`

## Seeding Process

Script: `backend/src/seed_fighters.py`

Flow:

1. Read fighter CSV
2. Compute engineered features using `add_features`
3. Normalize fields and map to DB payload
4. Upsert into `fighters` table

Command:

```bash
cd backend
python -m src.seed_fighters
```

## Migration Path (Current -> Future)

Current:

- Prediction path uses CSV-derived data
- Search/stats endpoints are DB-enabled

Planned:

1. Add more runtime tables (events, bouts, follows, news)
2. Add ingestion jobs for live feeds
3. Gradually move prediction inputs to DB snapshots
4. Add schema migrations (Alembic) for production lifecycle

