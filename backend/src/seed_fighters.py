"""Seed utility to migrate fighter CSV records into runtime DB storage."""

from pathlib import Path

import pandas as pd

from src.db import SessionLocal, init_db
from src.features import add_features
from src.fighters_repo import upsert_fighters


BASE_DIR = Path(__file__).resolve().parent.parent
DEFAULT_CSV_PATH = BASE_DIR / "data" / "ufc-fighters-statistics-with-gender.csv"


def _normalize_gender(value: object) -> str | None:
    """Convert source gender values into normalized labels."""
    if value is None:
        return None
    text = str(value).strip().lower()
    if not text:
        return None
    if text.startswith("f"):
        return "female"
    return "male"


def seed_fighters(csv_path: Path = DEFAULT_CSV_PATH) -> int:
    """Load fighter CSV, engineer features, and upsert into DB."""
    if not csv_path.exists():
        raise FileNotFoundError(f"Seed CSV not found at {csv_path}")

    stats = pd.read_csv(csv_path)
    stats = add_features(stats)

    payload = []
    for _, row in stats.iterrows():
        name = str(row.get("name", "")).strip()
        if not name:
            continue

        payload.append(
            {
                "name": name,
                "gender": _normalize_gender(row.get("gender")),
                "height_cm": float(row["height_cm"]) if pd.notna(row["height_cm"]) else None,
                "reach_in_cm": float(row["reach_in_cm"]) if pd.notna(row["reach_in_cm"]) else None,
                "weight_in_kg": float(row["weight_in_kg"]) if pd.notna(row["weight_in_kg"]) else None,
                "age": int(row["age"]) if pd.notna(row["age"]) else None,
                "strike_efficiency": float(row["strike_efficiency"]) if pd.notna(row["strike_efficiency"]) else None,
                "grapple_efficiency": float(row["grapple_efficiency"]) if pd.notna(row["grapple_efficiency"]) else None,
                "win_ratio": float(row["win_ratio"]) if pd.notna(row["win_ratio"]) else None,
                "performance": float(row["performance"]) if pd.notna(row["performance"]) else None,
            }
        )

    db = SessionLocal()
    try:
        count = upsert_fighters(db, payload)
    finally:
        db.close()

    return count


if __name__ == "__main__":
    init_db()
    inserted = seed_fighters()
    print(f"Seed completed. Upserted {inserted} fighters.")
