import pandas as pd
from pathlib import Path
import joblib

from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from src.features import add_features


BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"
MODELS_DIR = BASE_DIR / "models"

MODELS_DIR.mkdir(exist_ok=True)


stats_path = DATA_DIR / "ufc-fighters-statistics.csv"
fights_path = DATA_DIR / "large_dataset.csv"

stats = pd.read_csv(stats_path)
stats = add_features(stats)

historic_fights = pd.read_csv(fights_path)


historic_fights = historic_fights.iloc[50:]
historic_fights = historic_fights[['r_fighter', 'b_fighter', 'winner']].copy()

historic_fights['winner'] = historic_fights.apply(
    lambda row: row['r_fighter'] if row['winner'].lower() == 'red' else row['b_fighter'],
    axis=1
)


merged = historic_fights.merge(
    stats.add_prefix('r_'),
    left_on='r_fighter',
    right_on='r_name'
)

merged = merged.merge(
    stats.add_prefix('b_'),
    left_on='b_fighter',
    right_on='b_name'
)


merged['height_diff'] = merged['r_height_cm'] - merged['b_height_cm']
merged['reach_diff'] = merged['r_reach_in_cm'] - merged['b_reach_in_cm']
merged['age_diff'] = merged['r_age'] - merged['b_age']
merged['strike_eff_diff'] = merged['r_strike_efficiency'] - merged['b_strike_efficiency']
merged['grapple_eff_diff'] = merged['r_grapple_efficiency'] - merged['b_grapple_efficiency']
merged['performance_diff'] = merged['r_performance'] - merged['b_performance']
merged['win_ratio_diff'] = merged['r_win_ratio'] - merged['b_win_ratio']

merged['r_fighter_win'] = (merged['winner'] == merged['r_fighter']).astype(int)

merged = merged[
    [
        'height_diff',
        'reach_diff',
        'age_diff',
        'strike_eff_diff',
        'grapple_eff_diff',
        'performance_diff',
        'win_ratio_diff',
        'r_fighter_win'
    ]
].copy()


merged.to_csv(DATA_DIR / "fighters_cleaned.csv", index=False)


numeric_cols = [
    'height_diff',
    'reach_diff',
    'age_diff',
    'strike_eff_diff',
    'grapple_eff_diff',
    'performance_diff',
    'win_ratio_diff'
]

scaler = StandardScaler()
merged[numeric_cols] = scaler.fit_transform(merged[numeric_cols])

X = merged[numeric_cols]
y = merged['r_fighter_win']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, stratify=y, random_state=42
)

model = RandomForestClassifier(
    n_estimators=200,
    class_weight='balanced',
    random_state=42
)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))


joblib.dump(scaler, MODELS_DIR / "scaler.pkl")
joblib.dump(model, MODELS_DIR / "MMA_predictor.pkl")

print("Training complete. Model and scaler saved.")
