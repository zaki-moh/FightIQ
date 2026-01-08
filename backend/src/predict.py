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

EXPLANATION_RULES = [
    {
    "key": "grapple_eff_diff",
    "threshold": 0.05,
    "text": "superior grappling control and takedown efficiency",
    "priority": 1
    },
    {
        "key": "strike_eff_diff",
        "threshold": 0.05,
        "text": "more efficient striking exchanges",
        "priority": 2
    },
    {
    "key": "win_ratio_diff",
    "threshold": 0.08,
    "text": "higher long-term win consistency",
    "priority": 2
    },
    {
    "key": "performance_diff",
    "threshold": 0.06,
    "text": "stronger overall fight performance metrics",
    "priority": 3
    },
    {
    "key": "reach_diff",
    "threshold": 5.0,  # cm
    "text": "significant reach advantage",
    "priority": 4
    },
    {
    "key": "height_diff",
    "threshold": 5.0,  # cm
    "text": "notable physical size advantage",
    "priority": 4
    },
    {
    "key": "age_diff",
    "threshold": 4,  # years
    "text": "age-related physical advantage",
    "priority": 5
    }
]

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
    diffs = {
        'height_diff': [fighter_A['height_cm'] - fighter_B['height_cm']],
        'reach_diff': [fighter_A['reach_in_cm'] - fighter_B['reach_in_cm']],
        'age_diff': [fighter_A['age'] - fighter_B['age']],
        'strike_eff_diff': [fighter_A['strike_efficiency'] - fighter_B['strike_efficiency']],
        'grapple_eff_diff': [fighter_A['grapple_efficiency'] - fighter_B['grapple_efficiency']],
        'performance_diff': [fighter_A['performance'] - fighter_B['performance']],
        'win_ratio_diff': [fighter_A['win_ratio'] - fighter_B['win_ratio']]
    }

        
    input_data = pd.DataFrame(diffs)

    input_data[numeric_cols] = scaler.transform(input_data[numeric_cols])

    return model.predict_proba(input_data)[0][1]

def build_summary(winner_name, explanation_factors):
    if not explanation_factors:
        return f"{winner_name} is favored based on overall statistical balance."
    
    top_factors = [f['text'] for f in explanation_factors[:3]]
    
    if len(top_factors) == 1:
        return f"{winner_name} is favored due to {top_factors[0]}."
        
    return (
        f"{winner_name} is favored due to " +
        " and ".join(top_factors) + 
        "."
    )
        
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
        
    diffs = {
        'height_diff': fighter_A['height_cm'] - fighter_B['height_cm'],
        'reach_diff': fighter_A['reach_in_cm'] - fighter_B['reach_in_cm'],
        'age_diff': fighter_A['age'] - fighter_B['age'],
        'strike_eff_diff': fighter_A['strike_efficiency'] - fighter_B['strike_efficiency'],
        'grapple_eff_diff': fighter_A['grapple_efficiency'] - fighter_B['grapple_efficiency'],
        'performance_diff': fighter_A['performance'] - fighter_B['performance'],
        'win_ratio_diff': fighter_A['win_ratio'] - fighter_B['win_ratio']
    }
    
    explanation_factors = []

    for rule in EXPLANATION_RULES:
        key = rule["key"]
        threshold = rule["threshold"]
        diff = diffs[key]

        if abs(diff) < threshold:
            continue

        if winner_name == fighter_A["name"] and diff < 0:
            continue
        
        if winner_name == fighter_B["name"] and diff > 0:
            continue

        explanation_factors.append({
            "key": key,
            "text": rule["text"],
            "priority": rule["priority"],
            "value": diff
        })
            
    explanation_factors.sort(
        key=lambda f: (f["priority"], -abs(f["value"]))
    ) 

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
        },
        "explanation": {
            "summary": build_summary(winner_name, explanation_factors),
            "factors": [
                {
                    "type": f["key"],
                    "description": f["text"],
                    "importance": f["priority"],
                    "advantage": float(abs(f["value"]))
                }
                for f in explanation_factors[:3]
            ]
        }
        
    }


