import pandas as pd


def add_physical_features(stats: pd.DataFrame) -> None:
    for col in ["height_cm", "weight_in_kg", "reach_in_cm"]:
        stats[col] = (
            stats.groupby("weight_in_kg")[col]
                .transform(lambda x: x.fillna(x.median()))
                    .fillna(stats[col].median())
        )


def add_age(stats: pd.DataFrame) -> None:
    stats["date_of_birth"] = pd.to_datetime(stats["date_of_birth"], errors="coerce")
    today = pd.to_datetime("today")
    stats["age"] = (today - stats["date_of_birth"]).dt.days // 365
    stats["age"] = stats["age"].fillna(stats["age"].median())



def strike_efficiency(stats: pd.DataFrame) -> None:
    mean_strikes = (
        stats["significant_strikes_landed_per_minute"]
        .replace(0, pd.NA)
        .mean()
    )

    stats["normalized_strikes"] = (
        stats["significant_strikes_landed_per_minute"] / mean_strikes
    ).fillna(0)

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



def grapple_efficiency(stats: pd.DataFrame) -> None:
    td_pressure = (
        stats["average_takedowns_landed_per_15_minutes"]
        / stats["average_takedowns_landed_per_15_minutes"].quantile(0.95)
    ).clip(lower=0, upper=1).fillna(0)

    submission_pressure = (
        stats["average_submissions_attempted_per_15_minutes"] / 5
    ).clip(lower=0, upper=1).fillna(0)

    stats["grapple_efficiency"] = (
        0.5 * td_pressure
        + 0.3 * (stats["takedown_defense"] / 100)
        + 0.2 * submission_pressure
    )



def performance_score(stats: pd.DataFrame) -> None:
    stats["performance"] = (
        0.3 * stats["normalized_strikes"]
        + 0.3 * (stats["significant_strike_defence"] / 100)
        + 0.2 * (stats["takedown_accuracy"] / 100)
        + 0.2 * (stats["takedown_defense"] / 100)
    )

    stats["performance"] *= 0.3



def win_ratio(stats: pd.DataFrame) -> None:
    stats["win_ratio"] = (
        stats["wins"]
        / (stats["wins"] + stats["losses"] + stats["draws"])
    ).fillna(0)



def add_features(stats: pd.DataFrame) -> pd.DataFrame:
    stats = stats.copy()

    add_physical_features(stats)
    add_age(stats)
    strike_efficiency(stats)
    grapple_efficiency(stats)
    performance_score(stats)
    win_ratio(stats)

    return stats
