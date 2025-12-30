import pandas as pd
import joblib


stats = pd.read_csv("data/ufc-fighters-statistics.csv")

model = joblib.load("models/MMA_predictor.pkl")
scaler = joblib.load("models/scaler.pkl")


def predictWinner(fighter_A_Name, fighter_B_Name):
    fighter_A_Name = fighter_A_Name.lower()
    fighter_B_Name = fighter_B_Name.lower()
    fighter_A = stats.loc[stats['name'].str.lower() == fighter_A_Name].squeeze()
    fighter_B = stats.loc[stats['name'].str.lower() == fighter_B_Name].squeeze()
    numeric_cols = ['height_diff',	'reach_diff',	'age_diff',	'strike_eff_diff',	'grapple_eff_diff',	'performance_diff',	'win_ratio_diff']

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

    return {
        "fighter_A": fighter_A["name"],
        "fighter_B": fighter_B["name"],
        "Winner": fighter_A["name"] if r_win_prob > b_win_prob else fighter_B["name"],
        "probabilities": {
            fighter_A["name"]: r_win_prob,
            fighter_B["name"]: b_win_prob
        }
    }
