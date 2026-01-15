import pandas as pd


def add_features(stats: pd.DataFrame) -> pd.DataFrame:
    stats = stats.copy()

    stats["height_cm"] = stats["height_cm"].fillna(stats["height_cm"].median())
    stats["weight_in_kg"] = stats["weight_in_kg"].fillna(stats["weight_in_kg"].median())

    stats["date_of_birth"] = pd.to_datetime(stats["date_of_birth"], errors="coerce")
    today = pd.to_datetime("today")
    stats["age"] = (today - stats["date_of_birth"]).dt.days // 365
    stats["age"] = stats["age"].fillna(stats["age"].median())

    # -------------------------
    # Striking features
    # -------------------------
    # Normalize output volume
    mean_strikes = (
        stats["significant_strikes_landed_per_minute"]
        .replace(0, pd.NA)
        .mean()
    )

    stats["normalized_strikes"] = (
        stats["significant_strikes_landed_per_minute"] / mean_strikes
    ).fillna(0)

    # Separate volume and accuracy (no circular weighting)
    strike_volume = stats["significant_strikes_landed_per_minute"]
    strike_accuracy = stats["significant_striking_accuracy"] / 100

    volume_norm = strike_volume / strike_volume.quantile(0.95)
    volume_norm = volume_norm.clip(lower=0, upper=1).fillna(0)

    defense_penalty = (
        stats["significant_strike_defence"] / 100
        * stats["significant_strikes_absorbed_per_minute"]
    )

    stats["strike_efficiency"] = (
        0.6 * volume_norm
        + 0.4 * strike_accuracy
        - defense_penalty
    )

    # -------------------------
    # Grappling features
    # -------------------------
    # Pressure via takedown volume (since attempts not available)
    td_pressure = (
        stats["average_takedowns_landed_per_15_minutes"]
        / stats["average_takedowns_landed_per_15_minutes"].quantile(0.95)
    )

    td_pressure = td_pressure.clip(lower=0, upper=1).fillna(0)

    submission_pressure = (
        stats["average_submissions_attempted_per_15_minutes"] / 5
    ).clip(lower=0, upper=1).fillna(0)

    stats["grapple_efficiency"] = (
        0.5 * td_pressure
        + 0.3 * (stats["takedown_defense"] / 100)
        + 0.2 * submission_pressure
    )

    # -------------------------
    # Overall performance (light stabilizer)
    # -------------------------
    stats["performance"] = (
        0.3 * stats["normalized_strikes"]
        + 0.3 * (stats["significant_strike_defence"] / 100)
        + 0.2 * (stats["takedown_accuracy"] / 100)
        + 0.2 * (stats["takedown_defense"] / 100)
    )

    # Reduce dominance so it does not overpower style features
    stats["performance"] *= 0.3

    # -------------------------
    # Win ratio
    # -------------------------
    stats["win_ratio"] = (
        stats["wins"]
        / (stats["wins"] + stats["losses"] + stats["draws"])
    ).fillna(0)

    return stats
