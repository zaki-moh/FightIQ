"""Legacy CSV-backed fighter stats helpers.

This module remains as compatibility fallback while DB-backed runtime
storage is rolled out.
"""

from pathlib import Path
import pandas as pd
from src.features import add_features
import math


BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
MODELS_DIR = BASE_DIR / "models"


historic_df = None
fighters_df = None


try:
    fights_path = DATA_DIR / "large_dataset.csv"
    historic_df = pd.read_csv(fights_path)
except FileNotFoundError:
    print(f"[WARN] Historic dataset not found at {fights_path}")


try:
    stats_path = DATA_DIR / "ufc-fighters-statistics-with-gender.csv"
    fighters_df = pd.read_csv(stats_path)
    fighters_df = add_features(fighters_df)
except FileNotFoundError:
    print(f"[WARN] Fighter stats not found at {stats_path}")

CAREER_STAGES = {
    "early": (18, 24),
    "early prime": (25, 28),
    "prime": (29, 32),
    "veteran": (33, 37),
    "late": (38, math.inf),
}


def get_career_stage(age: int) -> str:
    """Map numeric age into a descriptive career stage bucket."""
    for stage, (low, high) in CAREER_STAGES.items():
        if low <= age <= high:
            return stage
    return "unknown"

def get_fighter_stats(fighter_name: str):
    """Return physical/performance stats for one fighter from CSV dataset."""
    if fighters_df is None:
        raise FileNotFoundError("fighter stats dataset not found")

    # fighter_name is a string, so just use regular string methods
    fighter_stats = fighters_df[
        fighters_df["name"].str.lower().str.strip() == fighter_name.lower().strip()
    ]
    
    if fighter_stats.empty:
        raise ValueError(f"Fighter '{fighter_name}' not found in stats dataset")

    fighter = fighter_stats.iloc[0]
    return {
        "physical": {
            "height_in_inches": fighter["height_cm"] / 2.54,
            "reach_in_inches": fighter["reach_in_cm"] / 2.54,
            "weight_in_lb": fighter["weight_in_kg"] * 2.20462,
            "age": fighter["age"]
        },
        "performance": {
            "striking_efficiency": fighter["strike_efficiency"],
            "grappling_efficiency": fighter["grapple_efficiency"],
            "win_ratio": fighter["win_ratio"],
            "career_stage": get_career_stage(fighter["age"])
        }
    }
