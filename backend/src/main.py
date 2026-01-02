from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.predict import predictWinner

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
