# API Reference

Base URL (local): `http://localhost:8000`

## `GET /health`

Health probe endpoint.

Response:

```json
{"status": "ok"}
```

## `GET /`

Basic service identification endpoint.

Response:

```json
{"message": "FightIQ API"}
```

## `POST /predict`

Generates UFC matchup prediction and explanation.

Request body:

```json
{
  "fighterA": "Fighter Name A",
  "fighterB": "Fighter Name B"
}
```

Response includes:

- fighter identity objects
- winner/confidence/probabilities
- edge type
- historic matchup flag
- explanation summary + factors
- delta metrics used by UI
- optional warning payload

Errors:

- `400` if same fighter selected
- `404` if fighter not found
- `500` on internal prediction failure

## `GET /fighters`

Autocomplete/search endpoint backed by DB.

Query parameters:

- `query` (required)
- `limit` (optional, default `10`, clamped to `1..25`)
- `exclude_name` (optional)

Response:

```json
[
  {
    "id": 123,
    "name": "Conor McGregor",
    "gender": "male"
  }
]
```

Behavior notes:

- returns empty list for queries shorter than 2 chars

## `GET /fighters/{fighter_name}/stats`

Returns physical and performance stats.

Response shape:

```json
{
  "physical": {
    "height_in_inches": 70.0,
    "reach_in_inches": 74.0,
    "weight_in_lb": 155.0,
    "age": 33
  },
  "performance": {
    "striking_efficiency": 0.61,
    "grappling_efficiency": 0.43,
    "win_ratio": 0.82,
    "career_stage": "prime"
  }
}
```

Behavior notes:

- DB-first lookup
- CSV fallback when DB record is missing/incomplete

