import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

stats = pd.read_csv("ufc-fighters-statistics.csv")
historic_fights = pd.read_csv("large_dataset.csv")

historic_fights = historic_fights.iloc[50:]
#print(historic_fights)
historic_fights = historic_fights[['r_fighter', 'b_fighter', 'winner']].copy()
historic_fights['winner'] = historic_fights.apply(
    lambda row: row['r_fighter'] if row['winner'].lower() == 'red' else row['b_fighter'],
    axis = 1
)

stats['height_cm'] = stats['height_cm'].fillna(stats['height_cm'].median())
stats['date_of_birth'] = pd.to_datetime(stats['date_of_birth'], errors='coerce')
today = pd.to_datetime('today')
stats['age'] = (today - stats['date_of_birth']).dt.days // 365
stats['age'] = stats['age'].fillna(stats['age'].median())
mean_strikes = stats['significant_strikes_landed_per_minute'].mean()
stats['normalized_strikes'] = stats['significant_strikes_landed_per_minute'] / mean_strikes
stats['performance'] = (0.3 * stats['normalized_strikes']
                        + 0.3 * stats['significant_strike_defence'] / 100
                        + 0.2 * stats['takedown_accuracy'] / 100
                        + 0.2 * stats['takedown_defense'] / 100)
stats['strike_efficiency'] = (
    stats['significant_strikes_landed_per_minute']
    - stats['significant_strikes_absorbed_per_minute']
)
stats['grapple_efficiency'] = (
    0.5 * stats['takedown_accuracy'] / 100 + 0.5 * stats['takedown_defense'] / 100
)
stats['win_indicator'] = (stats['wins'] > stats['losses']).astype(int)
stats['win_ratio'] = stats['wins'] / (stats['wins'] + stats["losses"] + stats['draws'])
stats['win_ratio'] = stats['win_ratio'].fillna(0)

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
merged = merged[['r_fighter', 'b_fighter', 'height_diff', 'reach_diff', 'age_diff', 'strike_eff_diff', 'grapple_eff_diff', 'performance_diff', 'win_ratio_diff', 'r_fighter_win']].copy()
#print(merged.columns.tolist())
#merged.head()
merged.to_csv("fighters_cleaned.csv", index=False)

scaler = StandardScaler()

numeric_cols = ['height_diff',	'reach_diff',	'age_diff',	'strike_eff_diff',	'grapple_eff_diff',	'performance_diff',	'win_ratio_diff']

merged[numeric_cols] = scaler.fit_transform(merged[numeric_cols])
joblib.dump(scaler, "Scalar.pkl")
X = merged[['height_diff',	'reach_diff',	'age_diff',	'strike_eff_diff',	'grapple_eff_diff',	'performance_diff',	'win_ratio_diff']]
y = merged['r_fighter_win']
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, random_state=42)

model = RandomForestClassifier(n_estimators=200, class_weight='balanced', random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
joblib.dump(model, "MMA_predictor.pkl")

