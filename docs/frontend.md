# Frontend Documentation

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

## App Layout

- Global layout: `frontend/app/layout.tsx`
- Root section layout (header/footer and page shell): `frontend/app/(root)/layout.tsx`

Primary shell components:

- `frontend/components/ui/Header.tsx`
- `frontend/components/ui/NavItems.tsx`
- `frontend/components/ui/Footer.tsx`

## Route Pages (`frontend/app/(root)`)

- `page.tsx`: landing page (`Welcome` component)
- `view-predictions/page.tsx`: sport picker cards
- `ufc/page.tsx`: core prediction experience
- `one/page.tsx`: placeholder page
- `toprank/page.tsx`: placeholder page
- `learn-more/page.tsx`: product/architecture explanation
- `learn-more-about-model/page.tsx`: model explanation page
- `privacy/page.tsx`: privacy policy
- `creator/page.tsx`: creator profile page

Additional route:

- `frontend/app/about/page.tsx`

## Core UFC Prediction UI Flow

### Main container

- `frontend/app/(root)/ufc/page.tsx`

Responsibilities:

- Tracks fighter input state
- Calls backend `POST /predict`
- Handles warnings and errors
- Renders prediction result sections

### Supporting components

- `FighterSelector.tsx`: fighter autocomplete + selection
- `FighterCard.tsx`: winner/probability card + stats modal trigger
- `FighterStatsModal.tsx`: detailed fighter metrics
- `KeyAdvantagesDelta.tsx` + `DeltaRow.tsx`: relative matchup advantages
- `PredictionExplanation.tsx` + `FactorBar.tsx`: explanation rendering

## Shared UI Components

- `Button.tsx`, `Card.tsx`, `FadeInSection.tsx`, `Placeholder.tsx`
- Footer/header subcomponents: `FooterItems.tsx`, `Socials.tsx`
- Modal components: `aboutModal.tsx`, `contactModal.tsx`
- Stat display components: `PhysicalStat.tsx`, `PerformanceMetric.tsx`

## Configuration and Constants

- `frontend/constants/constants.ts`: edge labels/icons used in prediction cards
- `frontend/lib/constants.ts`: nav item metadata
- `frontend/data/fighters.ts`: static fallback fighter list
- `scripts/generate-fighters.ts`: generates fallback fighter list from backend CSV

## Assets

- Logos and imagery: `frontend/public/assets/icons/`
- SVG logo set currently used by header/nav/pages: `frontend/public/assets/icons/svg/`

## API Dependency

Frontend expects backend base URL via:

- `NEXT_PUBLIC_API_URL`

Set in `frontend/.env.local`.

