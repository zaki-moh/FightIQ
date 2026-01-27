# FightIQ

**FightIQ** is a full‑stack MMA fight prediction platform that generates explainable matchup predictions using historical fight data. The project is designed to emphasize **clarity, transparency, and production‑ready engineering**, rather than black‑box prediction.

Live demo: [https://fight-iq-omega.vercel.app/](https://fight-iq-omega.vercel.app/)

---

## Overview

FightIQ allows users to select two fighters and receive:

* A predicted winner
* A calibrated confidence score
* A clear, human‑readable explanation of the key factors influencing the prediction

The system is built end‑to‑end, with a modular backend API, an ML inference layer, and a responsive frontend for visualization and interaction.

---

## Key Features

* **Explainable predictions** – Model outputs are translated into structured explanations (e.g., striking, grappling, physical advantages)
* **Production‑grade API** – FastAPI backend with strict request validation and centralized error handling
* **Clean UX flow** – Prediction results are staged (result → confidence → explanation) to mirror human reasoning
* **Real‑time inference** – Predictions are generated on demand via a REST API
* **Responsive frontend** – Built with Next.js for desktop and mobile use

---

## Tech Stack

### Backend

* Python
* FastAPI
* Pydantic (request validation)
* scikit‑learn (modeling)
* Docker

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

### Infrastructure

* RESTful API design
* Containerized backend for reproducible builds and deployment

---

## Architecture

1. **Frontend** sends a matchup request (fighter A vs fighter B)
2. **FastAPI backend** validates input and triggers model inference
3. **ML pipeline** computes prediction probabilities and edge factors
4. **Explainability layer** converts raw outputs into human‑readable insights
5. **Frontend** renders results with confidence visualization and explanations

The system is intentionally modular to allow future model iteration without frontend changes.

---

## Explainability Approach

Rather than exposing raw probabilities alone, FightIQ surfaces *why* the model favors a fighter. Explanations are derived from engineered feature groups such as:

* Striking efficiency
* Grappling pressure and defense
* Physical and age‑related factors
* Relative matchup advantages

This approach improves transparency and user trust, especially in close matchups.

---

## Disclaimer

FightIQ is an analytical and educational project.

Predictions are generated using historical data and statistical modeling and **are not betting advice**. Model outputs reflect patterns in data, not guarantees of future outcomes.

---

## Future Work

Planned improvements include:

* Strength‑of‑schedule and opponent‑quality features
* Recency‑weighted performance modeling
* Confidence calibration analysis
* Expanded explanation depth
* Enhanced loading and error states

---

## Author

Zakaria Mohamed

---

If you have feedback or questions about the architecture or modeling approach, feel free to reach out.
