import pandas as pd

def add_features(stats):
    stats = stats.copy()

    stats['height_cm'] = stats['height_cm'].fillna(stats['height_cm'].median())

    stats['date_of_birth'] = pd.to_datetime(stats['date_of_birth'], errors='coerce')
    today = pd.to_datetime('today')
    stats['age'] = (today - stats['date_of_birth']).dt.days // 365
    stats['age'] = stats['age'].fillna(stats['age'].median())

    mean_strikes = stats['significant_strikes_landed_per_minute'].mean()
    stats['normalized_strikes'] = stats['significant_strikes_landed_per_minute'] / mean_strikes

    stats['performance'] = (
        0.3 * stats['normalized_strikes']
        + 0.3 * stats['significant_strike_defence'] / 100
        + 0.2 * stats['takedown_accuracy'] / 100
        + 0.2 * stats['takedown_defense'] / 100
    )

    stats['strike_efficiency'] = (
        stats['significant_strikes_landed_per_minute']
        - stats['significant_strikes_absorbed_per_minute']
    )

    stats['grapple_efficiency'] = (
        0.5 * stats['takedown_accuracy'] / 100
        + 0.5 * stats['takedown_defense'] / 100
    )

    stats['win_ratio'] = stats['wins'] / (stats['wins'] + stats['losses'] + stats['draws'])
    stats['win_ratio'] = stats['win_ratio'].fillna(0)
    return stats
