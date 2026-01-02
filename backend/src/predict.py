import pandas as pd
import joblib
from pathlib import Path
from src.features import add_features


BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"
MODELS_DIR = BASE_DIR / "models"

stats = pd.read_csv(DATA_DIR / "ufc-fighters-statistics.csv")
stats = add_features(stats)

model = joblib.load(MODELS_DIR / "MMA_predictor.pkl")
scaler = joblib.load(MODELS_DIR / "scaler.pkl")


def predictWinner(fighter_A_Name, fighter_B_Name):
    fighter_A_Name = fighter_A_Name.lower()
    fighter_B_Name = fighter_B_Name.lower()

    fighter_A = stats.loc[stats['name'].str.lower() == fighter_A_Name].squeeze()
    fighter_B = stats.loc[stats['name'].str.lower() == fighter_B_Name].squeeze()

    numeric_cols = [
        'height_diff',
        'reach_diff',
        'age_diff',
        'strike_eff_diff',
        'grapple_eff_diff',
        'performance_diff',
        'win_ratio_diff'
    ]

    if fighter_A.empty or fighter_B.empty:
        return {"error": "One or more fighters not found"}

    input_data = pd.DataFrame({
        'height_diff': [fighter_A['height_cm'] - fighter_B['height_cm']],
        'reach_diff': [fighter_A['reach_in_cm'] - fighter_B['reach_in_cm']],
        'age_diff': [fighter_A['age'] - fighter_B['age']],
        'strike_eff_diff': [fighter_A['strike_efficiency'] - fighter_B['strike_efficiency']],
        'grapple_eff_diff': [fighter_A['grapple_efficiency'] - fighter_B['grapple_efficiency']],
        'performance_diff': [fighter_A['performance'] - fighter_B['performance']],
        'win_ratio_diff': [fighter_A['win_ratio'] - fighter_B['win_ratio']]
    })

    input_data[numeric_cols] = scaler.transform(input_data[numeric_cols])

    probs = model.predict_proba(input_data)[0]
    r_win_prob = probs[1]
    b_win_prob = probs[0]

    confidence = max(r_win_prob, b_win_prob)

    return {
        "fighter_A": fighter_A["name"],
        "fighter_B": fighter_B["name"],
        "winner": fighter_A["name"] if r_win_prob > b_win_prob else fighter_B["name"],
        "confidence": float(confidence),
        "probabilities": {
            fighter_A["name"]: float(r_win_prob),
            fighter_B["name"]: float(b_win_prob)
        }
    }