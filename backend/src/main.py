from fastapi import HTTPException
from fastapi import FastAPI
from pydantic import BaseModel
from predict import predictWinner

app = FastAPI()

class Matchup(BaseModel):
    fighter_A: str
    fighter_B: str
    
@app.post("/predict")
def predict(data: Matchup):
    result = predictWinner(data.fighter_A, data.fighter_B)
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    return result