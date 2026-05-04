"""FightIQ API entrypoint.

Exposes prediction and fighter data endpoints used by the frontend.
"""

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from src.db import get_db, init_db
from src.fighterStats import get_career_stage, get_fighter_stats
from src.fighters_repo import get_fighter_by_name, search_fighters
from src.predict import predictWinner

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

class FighterOption(BaseModel):
    id: int
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


@app.on_event("startup")
def startup_event():
    """Initialize DB tables on API startup."""
    init_db()


@app.post("/predict", response_model=PredictionResponse)
def predict_endpoint(
    data: Matchup,
    db: Session = Depends(get_db)
    ):
    """Return matchup prediction payload for two selected fighters."""
    if data.fighterA == data.fighterB:
        raise HTTPException(
            status_code=400,
            detail="Fighters must be different"
        )

    try:
        result = predictWinner(db, data.fighterA, data.fighterB)
    except Exception:
        raise HTTPException(status_code=500, detail="Prediction failed")

    if "error" in result:
        raise HTTPException(
            status_code=404,
            detail=result["error"]
        )

    return result


@app.get("/fighters", response_model=list[FighterOption])
def list_fighters(
    query: str,
    limit: int = 10,
    exclude_name: str | None = None,
    db: Session = Depends(get_db),
):
    """Autocomplete fighter names from runtime DB store."""
    cleaned_query = query.strip()
    if len(cleaned_query) < 2:
        return []

    fighters = search_fighters(
        db,
        query=cleaned_query,
        limit=max(1, min(limit, 25)),
        exclude_name=exclude_name,
    )

    return [
        FighterOption(
            id=fighter.id,
            name=fighter.name,
            gender=fighter.gender or "unknown",
        )
        for fighter in fighters
    ]


@app.get("/fighters/{fighter_name}/stats", response_model=FighterStatsResponse)
def get_fighters_endpoint(
    fighter_name: str,
    db: Session = Depends(get_db),
):
    """Return fighter stats from DB with CSV fallback for migration safety."""
    fighter = get_fighter_by_name(db, fighter_name)

    if fighter is not None:
        required_fields = [
            fighter.height_cm,
            fighter.reach_in_cm,
            fighter.weight_in_kg,
            fighter.age,
            fighter.strike_efficiency,
            fighter.grapple_efficiency,
            fighter.win_ratio,
        ]

        if all(value is not None for value in required_fields):
            return {
                "physical": {
                    "height_in_inches": fighter.height_cm / 2.54,
                    "reach_in_inches": fighter.reach_in_cm / 2.54,
                    "weight_in_lb": fighter.weight_in_kg * 2.20462,
                    "age": fighter.age,
                },
                "performance": {
                    "striking_efficiency": fighter.strike_efficiency,
                    "grappling_efficiency": fighter.grapple_efficiency,
                    "win_ratio": fighter.win_ratio,
                    "career_stage": get_career_stage(fighter.age),
                },
            }

    try:
        stats = get_fighter_stats(fighter_name)
        return stats
    except ValueError:
        raise HTTPException(
            status_code=404,
             detail="Fighter not found"
        )
    except FileNotFoundError:
        raise HTTPException(
            status_code=500,
            detail="Fighter data not available"
        )

@app.get("/health")
def health():
    """Simple health probe endpoint."""
    return {"status": "ok"}

@app.get("/")
def root():
    """Service identity endpoint."""
    return {"message": "FightIQ API"}
