# Architecture

## High-Level Overview

FightIQ is a full-stack web application composed of:

1. A **Next.js frontend** (`frontend/`) for user interaction and visualization
2. A **FastAPI backend** (`backend/`) for prediction and fighter data endpoints
3. A **model inference layer** in backend Python modules using `scikit-learn`
4. A **hybrid data layer**:
- legacy CSVs for model training/inference compatibility
- SQLite/SQLAlchemy runtime store for fighter search and migration toward live updates

## Request Flow

### Prediction Flow (`/ufc` page)

1. User selects two fighters in `frontend/app/(root)/ufc/page.tsx`
2. Frontend sends `POST /predict` to backend
3. Backend validates payload in `backend/src/main.py`
4. Backend calls `predictWinner` in `backend/src/predict.py`
5. Response includes winner, confidence, probabilities, and explanation factors
6. Frontend renders cards, deltas, and explanation components

### Fighter Search Flow (autocomplete)

1. User types in `FighterSelector`
2. Frontend calls `GET /fighters?query=...`
3. Backend route in `main.py` queries DB via `fighters_repo.search_fighters`
4. Frontend receives list of fighter options and displays dropdown results

### Fighter Stats Modal Flow

1. User opens `FighterCard` modal
2. Frontend calls `GET /fighters/{fighter_name}/stats`
3. Backend attempts DB-first lookup
4. If DB record is unavailable/incomplete, backend falls back to legacy CSV path

## Design Principles Used

- **Separation of concerns**
- transport (`main.py`) vs persistence (`fighters_repo.py`) vs schema (`models.py`) vs DB setup (`db.py`)
- **Migration safety**
- DB-first read paths with CSV fallback to avoid breaking current behavior
- **Incremental modernization**
- existing model pipeline remains stable while data layer is upgraded
- **Runtime reliability**
- request-scoped DB sessions via FastAPI dependency injection (`Depends(get_db)`)

## Current Tradeoffs

- Prediction and explanation paths still read CSV-derived data (`predict.py`)
- DB currently supports fighter search/stats and migration foundations
- Full live-feed ingestion pipeline is not implemented yet

