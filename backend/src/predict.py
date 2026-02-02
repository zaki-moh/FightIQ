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


SCALES = {          
    "striking": 0.15,      
    "grappling": 0.15,
}

EXPLANATION_TEXT = {
    "striking": "more efficient striking exchanges",
    "grappling": "superior grappling control and takedown efficiency",
    "reach": "a significant reach advantage",
    "age": "a physical advantage associated with age and durability",
    "weight": "a meaningful size and weight advantage",
}

CAREER_STAGES = {
    "early": (18, 24),
    "early_prime": (25, 28),
    "prime": (29, 32),
    "veteran": (33, 37),
    "late": (38, math.inf),
}


def build_warning_response(fighter_A, fighter_B, warning):
    return {
        "fighterA": {
            "name": fighter_A["name"],
            "gender": fighter_A["gender"] or "unknown",
        },
        "fighterB": {
            "name": fighter_B["name"],
            "gender": fighter_B["gender"] or "unknown",
        },
        "winner": None,
        "confidence": None,
        "probabilities": None,
        "edge": None,
        "is_historic": None,
        "explanation": None,
        "strikeDelta": None,
        "grappleDelta": None,
        "reachDelta": None,
        "ageStageA": None,
        "ageStageB": None,
        "weightDelta": None,
        "heightDelta": None,
        "warning": warning,
    }

def build_response(
    fighter_A,
    fighter_B,
    winner_name,
    confidence,
    probabilities,
    edge_type,
    is_historic,
    explanation_summary,
    explanation_factors,
    strike_delta,
    grapple_delta,
    reach_delta,
    ageStageA,
    ageStageB,
    weight_delta_lb,
    height_diff,
    warning
):
    return {
        "fighterA": {
            "name": fighter_A["name"],
            "gender": fighter_A["gender"] or "unknown",
        },
        "fighterB": {
            "name": fighter_B["name"],
            "gender": fighter_B["gender"] or "unknown",
        },
        "winner": winner_name,
        "confidence": float(confidence),
        "probabilities": probabilities,
        "edge": {"type": edge_type},
        "is_historic": is_historic,
        "explanation": {
            "summary": explanation_summary,
            "factors": explanation_factors,
        },
        "strikeDelta": float(strike_delta),
        "grappleDelta": float(grapple_delta),
        "reachDelta": float(reach_delta),
        "ageStageA": ageStageA,
        "ageStageB": ageStageB,
        "weightDelta": float(weight_delta_lb),
        "heightDelta": float(height_diff),
        "warning": warning,
    }


def build_historic_matchups(df):
    historic_matchups = set()
    for _, row in df.iterrows():
        matchup = frozenset([
            row["r_fighter"].lower(),
            row["b_fighter"].lower(),
        ])
        historic_matchups.add(matchup)
    return historic_matchups


historic_fights = build_historic_matchups(historic_df) if historic_df is not None else se()


def prob_A_beats_B(fighter_A, fighter_B):
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
        "reach_diff": [(fighter_A["reach_in_cm"] - fighter_B["reach_in_cm"]) / 2.54],
        "age_diff": [fighter_A["age"] - fighter_B["age"]],
        "strike_eff_diff": [
            fighter_A["strike_efficiency"]
            - fighter_B["strike_efficiency"]
        ],
        "grapple_eff_diff": [
            fighter_A["grapple_efficiency"]
            - fighter_B["grapple_efficiency"]
        ],
        "performance_diff": [
            fighter_A["performance"] - fighter_B["performance"]
        ],
        "win_ratio_diff": [
            fighter_A["win_ratio"] - fighter_B["win_ratio"]
        ],
    }

    input_data = pd.DataFrame(diffs)
    input_data = input_data.fillna(0)
    input_data[numeric_cols] = scaler.transform(input_data[numeric_cols])

    return model.predict_proba(input_data)[0][1]


def determine_edge(
    fighter_A,
    fighter_B,
    winner_name,
    strike_diff,
    grapple_diff,
    weight_in_lb,
):
    STRIKE_SCALE = 0.20
    GRAPPLE_SCALE = 0.20
    WEIGHT_SCALE = 25.0

    THRESHOLD = 0.15

    candidates = []

    metrics = [
        ("striking", strike_diff / STRIKE_SCALE),
        ("grappling", grapple_diff / GRAPPLE_SCALE),
        ("weight", weight_in_lb / WEIGHT_SCALE),
    ]

    for edge_type, value in metrics:
        if abs(value) < THRESHOLD:
            continue

        if winner_name == fighter_A["name"] and value < 0:
            continue

        if winner_name == fighter_B["name"] and value > 0:
            continue

        candidates.append((edge_type, abs(value)))

    if not candidates:
        return "no_clear_advantage"

    candidates.sort(key=lambda x: x[1], reverse=True)
    return candidates[0][0]


def build_summary(winner_name, explanation_factors):
    if not explanation_factors:
        return (
            f"The model favors {winner_name} in a closely matched contest "
            "based on overall statistical balance."
        )

    types = {f["type"] for f in explanation_factors}

    if "grappling" in types and "striking" not in types:
        return (
            f"The model expects {winner_name} to dictate where the fight takes place "
            "through superior grappling control."
        )

    if "striking" in types and "grappling" not in types:
        return (
            f"The model predicts a stand-up battle where {winner_name} "
            "holds the technical striking edge."
        )

    if "striking" in types and "grappling" in types:
        return (
            f"The model favors {winner_name} as the more well-rounded fighter "
            "across both striking exchanges and grappling control."
        )

    if "reach" in types or "weight" in types or "age" in types:
        return (
            f"The matchup favors {winner_name} through meaningful physical "
            "and positional advantages."
        )

    return (
        f"The model favors {winner_name} due to a combination of statistical edges "
        "across key performance areas."
    )


def get_career_stage(age: int) -> str:
    for stage, (low, high) in CAREER_STAGES.items():
        if low <= age <= high:
            return stage
    return "unknown"


def predictWinner(fighter_A_Name, fighter_B_Name):
    if stats is None or model is None or scaler is None:
        return {"error": "Prediction system not initialized"}

    fighter_A_Name = fighter_A_Name.lower()
    fighter_B_Name = fighter_B_Name.lower()

    query = frozenset([fighter_A_Name, fighter_B_Name])
    is_historic = query in historic_fights

    rowsA = stats.loc[
        stats["name"].str.lower() == fighter_A_Name
    ]
    rowsB = stats.loc[
        stats["name"].str.lower() == fighter_B_Name
    ]

    if rowsA.empty or rowsB.empty:
        return {"error": "One or more fighters not found"}

    fighter_A = rowsA.iloc[0].fillna(0)
    fighter_B = rowsB.iloc[0].fillna(0)

    if fighter_A["gender"] != fighter_B["gender"]:
        return build_warning_response(
            fighter_A, 
            fighter_B, 
            {
                "type": "gender_mismatch",
                "message": "FightIQ predictions are only supported between fighters of the same gender."
            }
        )
        

    weight_diff_lb = abs(fighter_A["weight_in_kg"] - fighter_B["weight_in_kg"]) * 2.20462

    if weight_diff_lb > 30:
        return build_warning_response(
            fighter_A, 
            fighter_B, 
            {
                "type": "extreme_weight_mismatch",
                "message": f"This matchup has a {int(weight_diff_lb)} lb size difference, which falls outside the range of realistic sanctioned fights used to train the model."
            }
        )

    p_A_wins = prob_A_beats_B(fighter_A, fighter_B)
    p_B_wins = prob_A_beats_B(fighter_B, fighter_A)

    total = p_A_wins + p_B_wins
    p_A = p_A_wins / total
    p_B = p_B_wins / total

    weight_diff = (
        fighter_A["weight_in_kg"] - fighter_B["weight_in_kg"]
    )
    weight_in_lb = weight_diff * 2.20462

    strike_diff = (
        fighter_A["strike_efficiency"]
        - fighter_B["strike_efficiency"]
    )
    grapple_diff = (
        fighter_A["grapple_efficiency"]
        - fighter_B["grapple_efficiency"]
    )
    reach_diff = (
        fighter_A["reach_in_cm"] - fighter_B["reach_in_cm"]
    ) / 2.54

    ageStageA = get_career_stage(fighter_A["age"])
    ageStageB = get_career_stage(fighter_B["age"])

    height_diff = (
        fighter_A["height_cm"] - fighter_B["height_cm"]
    ) / 2.54

    advatange_factors = {
        "weight": weight_in_lb,
        "striking": strike_diff,
        "grappling": grapple_diff,
        "reach": reach_diff,
    }

    if p_A > p_B:
        winner_name = fighter_A["name"]
        confidence = p_A
    else:
        winner_name = fighter_B["name"]
        confidence = p_B

    probabilities = {
        fighter_A["name"]: float(p_A),
        fighter_B["name"]: float(p_B),
    }

    explanation_factors = []

    for advantage_type, advantage in advatange_factors.items():
        if abs(advantage) < 0.01:
            continue

        reason = EXPLANATION_TEXT.get(
            advantage_type,
            "a statistical advantage"
        )

        if advantage > 0 and winner_name == fighter_A["name"]:
            desc = f"{fighter_A['name']} is favored due to {reason}."

        elif advantage < 0 and winner_name == fighter_B["name"]:
            desc = f"{fighter_B['name']} is favored due to {reason}."

        else:
            continue

        explanation_factors.append({
            "type": advantage_type,
            "description": desc,
            "advantage": float(abs(advantage)),
        })


    explanation_factors.sort(
        key=lambda x: x["advantage"] / SCALES.get(x["type"], 1),
        reverse=True,
    )

    explanation_factors = explanation_factors[:3]

    explanation_summary = build_summary(
        winner_name,
        explanation_factors,
    )

    edge_type = determine_edge(
        fighter_A,
        fighter_B,
        winner_name,
        strike_diff,
        grapple_diff,
        weight_in_lb,
    )

    return build_response(
        fighter_A,
        fighter_B,
        winner_name,
        confidence,
        probabilities,
        edge_type,
        is_historic,
        explanation_summary,
        explanation_factors,
        strike_diff * 100,
        grapple_diff * 100,
        reach_diff,
        ageStageA,
        ageStageB,
        weight_in_lb,
        height_diff,
        warning=None,
    )
