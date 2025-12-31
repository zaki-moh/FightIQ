from fastapi import HTTPException, FastAPI
from pydantic import BaseModel
from predict import predictWinner

app = FastAPI()

class Matchup(BaseModel):
    fighterA: str
    fighterB: str

class PredictionResult(BaseModel):
    winner: str
    confidence: float

@app.post("/predict", response_model=PredictionResult)
def predict(data: Matchup):
    if data.fighterA == data.fighterB:
        raise HTTPException(
            status_code=400,
            detail="Fighters must be different"
        )

    result = predictWinner(data.fighterA, data.fighterB)

    if "error" in result:
        raise HTTPException(
            status_code=404,
            detail=result["error"]
        )

    return result
