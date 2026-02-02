from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.predict import predictWinner
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


@app.post("/predict", response_model=PredictionResponse)
def predict(data: Matchup):
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

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "FightIQ API"}