from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Matchup(BaseModel):
    fighter_A: str
    fighter_b: str


@app.get("/")
def Home():
    return {"Message": "Hello world"}

@app.post("/predict")
def predict(data: Matchup):
    return {'fighter_A': data.fighter_A, 'fighter_b': data.fighter_b, }