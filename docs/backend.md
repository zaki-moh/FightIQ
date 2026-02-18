# Backend Documentation

## Stack

- Python 3.10+
- FastAPI
- Pydantic
- SQLAlchemy (runtime fighter store)
- pandas + scikit-learn + joblib (feature engineering and model inference)

## Module Guide (`backend/src`)

### `main.py`

FastAPI entrypoint and route layer.

Responsibilities:

- Initializes DB tables on startup (`init_db`)
- Exposes API endpoints:
- `POST /predict`
- `GET /fighters`
- `GET /fighters/{fighter_name}/stats`
- `GET /health`
- Uses request-scoped DB sessions via `Depends(get_db)`

### `db.py`

Database infrastructure module.

Responsibilities:

- Reads `DATABASE_URL` (defaults to local SQLite file)
- Creates SQLAlchemy `engine`
- Creates `SessionLocal` factory
- Defines ORM `Base`
- Provides `get_db()` dependency (open/yield/close session)
- Provides `init_db()` (create missing tables from ORM metadata)

### `models.py`

ORM schema definitions.

Responsibilities:

- Defines `Fighter` table structure (`fighters`)
- Includes identity, physical, and performance columns
- Enforces uniqueness/indexing for lookup fields

### `fighters_repo.py`

Persistence/query logic for fighters.

Responsibilities:

- Name normalization (`normalize_name`)
- Exact lookup (`get_fighter_by_name`)
- Autocomplete search (`search_fighters`)
- Upsert helpers (`upsert_fighter`, `upsert_fighters`)

### `seed_fighters.py`

CSV -> DB ingestion script.

Responsibilities:

- Loads fighter CSV
- Applies feature engineering (`add_features`)
- Normalizes payload
- Upserts fighters into DB

Run with:

```bash
cd backend
python -m src.seed_fighters
```

### `features.py`

Feature engineering functions used by model training/inference and seeding.

Key outputs include:

- `age`
- `strike_efficiency`
- `grapple_efficiency`
- `performance`
- `win_ratio`

### `predict.py`

Model inference + explanation layer.

Responsibilities:

- Loads scaler/model artifacts (`models/*.pkl`)
- Computes matchup feature differentials
- Produces probabilities and winner
- Builds explanation factors and summaries
- Applies warning logic (gender mismatch, extreme weight mismatch)

### `fighterStats.py`

Legacy CSV-backed fighter stats retrieval and career-stage mapping.

Currently used as fallback in `GET /fighters/{fighter_name}/stats` when DB data is missing.

### `train_model.py`

Offline training script.

Responsibilities:

- Merges historical fight outcomes with fighter-level stats
- Builds differential feature set
- Trains `RandomForestClassifier`
- Saves scaler and model artifacts

## Data Files (`backend/data`)

- `ufc-fighters-statistics-with-gender.csv`: fighter-level source data
- `large_dataset.csv`: historical fight-level data
- `fighters_cleaned.csv`: engineered training dataset output
- `fightiq.db`: local runtime SQLite DB

## Runtime Notes

- CSV is still used by prediction path for current model compatibility
- DB is now used for fighter search and DB-first stats reads

