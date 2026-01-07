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


def prob_A_beats_B(fighter_A, fighter_B):
    numeric_cols = [
        'height_diff',
        'reach_diff',
        'age_diff',
        'strike_eff_diff',
        'grapple_eff_diff',
        'performance_diff',
        'win_ratio_diff'
    ]

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

    return model.predict_proba(input_data)[0][1]


def predictWinner(fighter_A_Name, fighter_B_Name):
    fighter_A_Name = fighter_A_Name.lower()
    fighter_B_Name = fighter_B_Name.lower()

    fighter_A = stats.loc[stats['name'].str.lower() == fighter_A_Name].squeeze()
    fighter_B = stats.loc[stats['name'].str.lower() == fighter_B_Name].squeeze()

    if fighter_A.empty or fighter_B.empty:
        return {"error": "One or more fighters not found"}

    p_A_wins = prob_A_beats_B(fighter_A, fighter_B)
    p_B_wins = prob_A_beats_B(fighter_B, fighter_A)

    total = p_A_wins + p_B_wins
    p_A = p_A_wins / total
    p_B = p_B_wins / total

    if p_A > p_B:
        winner_name = fighter_A["name"]
        confidence = p_A
    else:
        winner_name = fighter_B["name"]
        confidence = p_B

    strike_diff = fighter_A['strike_efficiency'] - fighter_B['strike_efficiency']
    grapple_diff = fighter_A['grapple_efficiency'] - fighter_B['grapple_efficiency']

    STYLE_THRESHOLD = 0.05
    style_edge = None

    if abs(strike_diff) > abs(grapple_diff) and abs(strike_diff) > STYLE_THRESHOLD:
        style_edge = "striking"
    elif abs(grapple_diff) > STYLE_THRESHOLD:
        style_edge = "grappling"
    else:
        style_edge = "no_clear_advantage"

    return {
        "fighterA": fighter_A["name"],
        "fighterB": fighter_B["name"],
        "winner": winner_name,
        "confidence": float(confidence),
        "probabilities": {
            fighter_A["name"]: float(p_A),
            fighter_B["name"]: float(p_B)
        },
        "edge": {
            "type": style_edge
        }
    }


