import math
from pathlib import Path

import joblib
import pandas as pd

from src.features import add_features


BASE_DIR = Path(__file__).resolve().parent.parent  
DATA_DIR = BASE_DIR / "data"
MODELS_DIR = BASE_DIR / "models"


historic_df = None
stats = None
model = None
scaler = None

try:
    fights_path = DATA_DIR / "large_dataset.csv"
    historic_df = pd.read_csv(fights_path)
except FileNotFoundError:
    print(f"[WARN] Historic dataset not found at {fights_path}")

try:
    stats_path = DATA_DIR / "ufc-fighters-statistics-with-gender.csv"
    stats = pd.read_csv(stats_path)
    stats = add_features(stats)
except FileNotFoundError:
    print(f"[WARN] Fighter stats not found at {stats_path}")

try:
    model = joblib.load(MODELS_DIR / "MMA_predictor.pkl")
    scaler = joblib.load(MODELS_DIR / "scaler.pkl")
except FileNotFoundError:
    print("[WARN] Model or scaler not found")



EXPLANATION_RULES = [
    {
        "key": "weight_diff",
        "threshold": 3.0,
        "text": "meaningful weight advantage",
        "priority": 4,
    },
    {
        "key": "grapple_eff_diff",
        "threshold": 0.05,
        "text": "superior grappling control and takedown efficiency",
        "priority": 1,
    },
    {
        "key": "strike_eff_diff",
        "threshold": 0.05,
        "text": "more efficient striking exchanges",
        "priority": 2,
    },
    {
        "key": "win_ratio_diff",
        "threshold": 0.08,
        "text": "higher long-term win consistency",
        "priority": 2,
    },
    {
        "key": "performance_diff",
        "threshold": 0.06,
        "text": "stronger overall fight performance metrics",
        "priority": 3,
    },
    {
        "key": "reach_diff",
        "threshold": 5.0,
        "text": "significant reach advantage",
        "priority": 4,
    },
    {
        "key": "height_diff",
        "threshold": 5.0,
        "text": "notable physical size advantage",
        "priority": 4,
    },
    {
        "key": "age_diff",
        "threshold": 4,
        "text": "age-related physical advantage",
        "priority": 5,
    },
]

def build_historic_matchups(historic_df):  
    historic_matchups = set()  
    for index, row in historic_df.iterrows():
        matchup = frozenset([
            row['r_fighter'].lower(),
            row['b_fighter'].lower()
        ])
        historic_matchups.add(matchup)
    return historic_matchups

historic_fights = build_historic_matchups(historic_df)


def prob_A_beats_B(fighter_A, fighter_B) -> float:
    numeric_cols = [
        "weight_diff",
        "height_diff",
        "reach_diff",
        "age_diff",
        "strike_eff_diff",
        "grapple_eff_diff",
        "performance_diff",
        "win_ratio_diff",
    ]

    diffs = {
        "weight_diff": [fighter_A["weight_in_kg"] - fighter_B["weight_in_kg"]],
        "height_diff": [fighter_A["height_cm"] - fighter_B["height_cm"]],
        "reach_diff": [fighter_A["reach_in_cm"] - fighter_B["reach_in_cm"]],
        "age_diff": [fighter_A["age"] - fighter_B["age"]],
        "strike_eff_diff": [
            fighter_A["strike_efficiency"] - fighter_B["strike_efficiency"]
        ],
        "grapple_eff_diff": [
            fighter_A["grapple_efficiency"] - fighter_B["grapple_efficiency"]
        ],
        "performance_diff": [
            fighter_A["performance"] - fighter_B["performance"]
        ],
        "win_ratio_diff": [
            fighter_A["win_ratio"] - fighter_B["win_ratio"]
        ],
    }

    input_data = pd.DataFrame(diffs)
    input_data[numeric_cols] = scaler.transform(input_data[numeric_cols])

    return model.predict_proba(input_data)[0][1]




def build_summary(winner_name: str, explanation_factors: list) -> str:
    if not explanation_factors:
        return f"{winner_name} is favored based on overall statistical balance."

    top_factors = [f["text"] for f in explanation_factors[:3]]

    if len(top_factors) == 1:
        return f"{winner_name} is favored due to {top_factors[0]}."

    return (
        f"{winner_name} is favored due to "
        + " and ".join(top_factors)
        + "."
    )




def predictWinner(fighter_A_Name: str, fighter_B_Name: str):
    if stats is None or model is None or scaler is None:
        return {"error": "Prediction system not initialized"}

    fighter_A_Name = fighter_A_Name.lower()
    fighter_B_Name = fighter_B_Name.lower()
    query = frozenset([fighter_A_Name, fighter_B_Name])
    is_historic = 1 if query in historic_fights else 0
    
    rowsA = stats.loc[stats["name"].str.lower() == fighter_A_Name]

    if rowsA.empty:
        return {"error": "error"}
    
    fighter_A = rowsA.iloc[0]
    
    rowsB = stats.loc[stats["name"].str.lower() == fighter_B_Name]
    
    if rowsB.empty:
        return {"error": "error"}
    
    fighter_B = rowsB.iloc[0]

    if (fighter_A["gender"].lower() == "male" and fighter_B["gender"].lower() == "female"):
        return {
            "fighterA": fighter_A["name"],
            "fighterB": fighter_B["name"],
            "winner": fighter_A["name"],
            "confidence": 0.95,
            "probabilities": {
                fighter_A["name"]: 0.95,
                fighter_B["name"]: 0.05,
            },
            "edge": {"type": "division"},
            "is_historic": is_historic,
            "explanation": {
                "summary": "This prediction reflects division-specific competitive context."
                ,
                "factors": [
                    {
                        "type": "division",
                        "description": "division-specific matchup context",
                        "importance": 0,
                        "advantage": 0.0,
                    }
                ],
            },
        }
    
    elif (fighter_A["gender"].lower() == "female" and fighter_B["gender"].lower() == "male"):
        return {
            "fighterA": fighter_A["name"],
            "fighterB": fighter_B["name"],
            "winner": fighter_B["name"],
            "confidence": 0.95,
            "probabilities": {
                fighter_A["name"]: 0.05,
                fighter_B["name"]: 0.95,
            },
            "edge": {"type": "division"},
            "is_historic": is_historic,
            "explanation": {
                "summary": "This prediction reflects division-specific competitive context."
                ,
                "factors": [
                    {
                        "type": "division",
                        "description": "Performance metrics are evaluated within division-specific competitive baselines.",
                        "importance": 0,
                        "advantage": 0.0,
                    }
                ],
            },
        }

    if fighter_A.empty or fighter_B.empty:
        return {"error": "One or more fighters not found"}

    p_A_wins = prob_A_beats_B(fighter_A, fighter_B)
    p_B_wins = prob_A_beats_B(fighter_B, fighter_A)

    total = p_A_wins + p_B_wins
    p_A = p_A_wins / total
    p_B = p_B_wins / total
    

    weight_diff = fighter_A["weight_in_kg"] - fighter_B["weight_in_kg"]
    weight_in_lb = weight_diff * 2.20462

    if abs(weight_in_lb) >= 20:
        if abs(weight_in_lb) <= 30:
            base_conf = 0.80
        elif abs(weight_in_lb) <= 40:
            base_conf = 0.85
        else:
            base_conf = 0.90

        if weight_in_lb > 0:
            P_A = base_conf
            P_B = 1.0 - base_conf
            winner_name = fighter_A["name"]
        else:
            P_A = 1.0 - base_conf
            P_B = base_conf
            winner_name = fighter_B["name"]

        confidence = max(P_A, P_B)

        return {
            "fighterA": fighter_A["name"],
            "fighterB": fighter_B["name"],
            "winner": winner_name,
            "confidence": float(confidence),
            "probabilities": {
                fighter_A["name"]: float(P_A),
                fighter_B["name"]: float(P_B),
            },
            "edge": {"type": "weight"},
            "is_historic": is_historic,
            "explanation": {
                "summary": (
                    f"This prediction is driven by a significant size mismatch "
                    f"that strongly favors {winner_name}."
                ),
                "factors": [
                    {
                        "type": "weight_diff",
                        "description": "meaningful weight advantage",
                        "importance": 4,
                        "advantage": float(abs(weight_diff)),
                    }
                ],
            },
        }


    if p_A > p_B:
        winner_name = fighter_A["name"]
        confidence = p_A
    else:
        winner_name = fighter_B["name"]
        confidence = p_B

    strike_diff = (
        fighter_A["strike_efficiency"] - fighter_B["strike_efficiency"]
    )
    grapple_diff = (
        fighter_A["grapple_efficiency"] - fighter_B["grapple_efficiency"]
    )

    THRESHOLD = 0.08
    DOMINANCE_RATIO = 1.25
    
    if abs(strike_diff) > (abs(grapple_diff) * DOMINANCE_RATIO) and abs(strike_diff) > THRESHOLD:
        style_edge = "striking"
    elif abs(grapple_diff) > (abs(strike_diff) * DOMINANCE_RATIO) and abs(grapple_diff) > THRESHOLD:
        style_edge = "grappling"
    else:
        style_edge = "no_clear_advantage"


    diffs = {
        "weight_diff": weight_diff,
        "height_diff": fighter_A["height_cm"] - fighter_B["height_cm"],
        "reach_diff": fighter_A["reach_in_cm"] - fighter_B["reach_in_cm"],
        "age_diff": fighter_A["age"] - fighter_B["age"],
        "strike_eff_diff": strike_diff,
        "grapple_eff_diff": grapple_diff,
        "performance_diff": (
            fighter_A["performance"] - fighter_B["performance"]
        ),
        "win_ratio_diff": fighter_A["win_ratio"] - fighter_B["win_ratio"],
    }

    explanation_factors = []

    for rule in EXPLANATION_RULES:
        diff = diffs[rule["key"]]

        if abs(diff) < rule["threshold"]:
            continue

        if winner_name == fighter_A["name"] and diff < 0:
            continue

        if winner_name == fighter_B["name"] and diff > 0:
            continue

        explanation_factors.append(
            {
                "key": rule["key"],
                "text": rule["text"],
                "priority": rule["priority"],
                "value": diff,
            }
        )

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
            fighter_B["name"]: float(p_B),
        },
        "edge": {"type": style_edge},
        "is_historic": is_historic,
        "explanation": {
            "summary": build_summary(winner_name, explanation_factors),
            "factors": [
                {
                    "type": f["key"],
                    "description": f["text"],
                    "importance": f["priority"],
                    "advantage": float(abs(f["value"])),
                }
                for f in explanation_factors[:3]
            ],
        },
    }
