# Source File Map

This map covers the maintainable source files (excluding build outputs, virtualenvs, and third-party deps).

## Root

- `README.md`: project overview and links
- `package.json`: workspace-level dependencies/scripts
- `scripts/generate-fighters.ts`: generates static fighter fallback dataset

## Backend (`backend/src`)

- `__init__.py`: package marker
- `main.py`: FastAPI app, routes, request/response models
- `db.py`: SQLAlchemy engine/session/base setup
- `models.py`: ORM schema definitions (`Fighter`)
- `fighters_repo.py`: fighter persistence/query helpers
- `seed_fighters.py`: CSV -> DB seed/upsert script
- `features.py`: feature engineering pipeline
- `predict.py`: model inference and explanation generation
- `fighterStats.py`: legacy CSV-backed fighter stats
- `train_model.py`: offline model training script

## Backend Data/Artifacts

- `backend/data/ufc-fighters-statistics-with-gender.csv`: fighter source dataset
- `backend/data/large_dataset.csv`: historical fight dataset
- `backend/data/fighters_cleaned.csv`: training-prepared dataset
- `backend/data/fightiq.db`: local SQLite DB
- `backend/models/MMA_predictor.pkl`: trained classifier
- `backend/models/scaler.pkl`: fitted scaler

## Frontend App (`frontend/app`)

- `layout.tsx`: global app layout and metadata
- `globals.css`: global styles
- `about/page.tsx`: about route
- `(root)/layout.tsx`: section shell with header/footer
- `(root)/page.tsx`: landing route
- `(root)/view-predictions/page.tsx`: sport selection route
- `(root)/ufc/page.tsx`: UFC prediction route
- `(root)/one/page.tsx`: ONE placeholder route
- `(root)/toprank/page.tsx`: Top Rank placeholder route
- `(root)/learn-more/page.tsx`: feature/flow explanation page
- `(root)/learn-more-about-model/page.tsx`: model details page
- `(root)/privacy/page.tsx`: privacy policy page
- `(root)/creator/page.tsx`: creator profile page

## Frontend UI Components (`frontend/components/ui`)

- `Welcome.tsx`: landing content
- `Header.tsx`: top navigation shell
- `NavItems.tsx`: desktop/mobile nav links and logo styling
- `Footer.tsx`: footer shell
- `FooterItems.tsx`: footer links
- `Socials.tsx`: social icon links
- `Button.tsx`: shared button component
- `Card.tsx`: shared card container component
- `FadeInSection.tsx`: reveal animation wrapper
- `FighterSelector.tsx`: fighter autocomplete inputs
- `FighterCard.tsx`: result card with confidence and edge badge
- `FighterStatsModal.tsx`: fighter detail modal
- `KeyAdvantagesDelta.tsx`: delta explanation summary
- `DeltaRow.tsx`: per-metric delta row visual
- `PredictionExplanation.tsx`: explanation card and factor bars
- `FactorBar.tsx`: explanation bar row
- `PhysicalStat.tsx`: physical stat tile
- `PerformanceMetric.tsx`: performance metric tile
- `Placeholder.tsx`: VS placeholder utility
- `aboutModal.tsx`: about modal component
- `contactModal.tsx`: contact modal component

## Frontend Config and Data

- `frontend/constants/constants.ts`: edge labels/icons
- `frontend/lib/constants.ts`: nav metadata constants
- `frontend/types/types.tsx`: shared TS types
- `frontend/data/fighters.ts`: static fallback fighter options
- `frontend/public/assets/icons/`: raster assets
- `frontend/public/assets/icons/svg/`: SVG logo assets used in UI

