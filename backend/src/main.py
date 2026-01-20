from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.predict import predictWinner
import os

app = FastAPI()


origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Edge(BaseModel):
    type: str | None
    
class Matchup(BaseModel):
    fighterA: str
    fighterB: str
    
class ExplanationFactor(BaseModel):
    type: str
    description: str
    importance: int
    advantage: float
    
class Explanation(BaseModel):
    summary: str
    factors: list[ExplanationFactor]

class PredictionResponse(BaseModel):
    fighterA: str
    fighterB: str
    winner: str
    confidence: float
    probabilities: dict[str, float]
    edge: Edge
    is_historic: bool
    explanation: Explanation

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