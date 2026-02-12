from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.predict import predictWinner
from src.fighterStats import get_fighter_stats
import os

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://fight-iq-omega.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Warning(BaseModel):
    type: str
    message: str

class Edge(BaseModel):
    type: str | None
    
class Matchup(BaseModel):
    fighterA: str
    fighterB: str
    
class ExplanationFactor(BaseModel):
    type: str
    description: str
    advantage: float
    
class Explanation(BaseModel):
    summary: str
    factors: list[ExplanationFactor]

class Fighter(BaseModel):
    name: str
    gender: str

class Physical(BaseModel):
    height_in_inches: float
    reach_in_inches: float
    weight_in_lb: float
    age: int

class Performance(BaseModel):
    striking_efficiency: float
    grappling_efficiency: float
    win_ratio: float
    career_stage: str

class PredictionResponse(BaseModel):
    fighterA: Fighter
    fighterB: Fighter
    winner: str | None
    confidence: float | None
    probabilities: dict[str, float] | None
    edge: Edge | None
    is_historic: bool | None
    explanation: Explanation | None
    strikeDelta: float | None
    grappleDelta: float | None
    reachDelta: float | None
    ageStageA: str | None
    ageStageB: str | None
    weightDelta: float | None
    heightDelta: float | None
    warning: dict | None

class FighterStatsResponse(BaseModel):
    physical: Physical
    performance: Performance


@app.post("/predict", response_model=PredictionResponse)
def predict_endpoint(data: Matchup):
    if data.fighterA == data.fighterB:
        raise HTTPException(
            status_code=400,
            detail="Fighters must be different"
        )

    try:
        result = predictWinner(data.fighterA, data.fighterB)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Prediction failed")

    if "error" in result:
        raise HTTPException(
            status_code=404,
            detail=result["error"]
        )

    return result


@app.get("/fighters/{fighter_name}/stats", response_model=FighterStatsResponse)
def get_fighters_endpoint(fighter_name: str):
    try:
        stats = get_fighter_stats(fighter_name)
        return stats
    except ValueError as e:
        raise HTTPException(
            status_code=404,
             detail="Fighter not found"
        )
    except FileNotFoundError as e:
        raise HTTPException(
            status_code=500,
            detail="Fighter data not available"
        )

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "FightIQ API"}