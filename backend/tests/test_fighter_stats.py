import pandas as pd
import pytest

import src.fighterStats as fighter_stats_module
from src.fighterStats import get_career_stage, get_fighter_stats

def test_get_career_stage():
    assert get_career_stage(20) == "early"
    assert get_career_stage(25) == "early prime"
    assert get_career_stage(30) == "prime"
    assert get_career_stage(34) == "veteran"
    assert get_career_stage(38) == "late"
    assert get_career_stage(-20) == "unknown"

def test_get_fighter_stats(monkeypatch):
    test_df = pd.DataFrame(
        [
            {
                "name": "Jon Jones",
                "height_cm": 193.0,
                "reach_in_cm": 215.9,
                "weight_in_kg": 93.0,
                "age": 38,
                "strike_efficiency": 0.82,
                "grapple_efficiency": 0.71,
                "win_ratio": 0.90,
            }
        ]
    )
    monkeypatch.setattr(fighter_stats_module, "fighters_df", test_df)
    monkeypatch.setattr(fighter_stats_module, "_datasets_loaded", True)

    stats = get_fighter_stats("Jon Jones")

    assert stats is not None
    assert stats["physical"] is not None
    assert stats["performance"] is not None
    assert stats["physical"]["age"] == 38
    assert stats["physical"]["height_in_inches"] == pytest.approx(193.0 / 2.54)
    assert stats["performance"]["career_stage"] == "late"
