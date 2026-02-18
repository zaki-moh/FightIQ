# FightIQ Frontend

This is the Next.js frontend for FightIQ.

## Responsibilities

- Route/page rendering for landing, sport selection, UFC prediction, and informational pages
- Fighter selection/autocomplete and prediction request orchestration
- Visualization of winner, confidence, and explanation factors

## Run Locally

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Environment

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Key Source Paths

- `app/(root)/ufc/page.tsx`: prediction workflow page
- `components/ui/FighterSelector.tsx`: autocomplete input
- `components/ui/FighterCard.tsx`: result card + stats modal trigger
- `components/ui/PredictionExplanation.tsx`: explanation rendering
- `components/ui/NavItems.tsx`: nav logo interactions

For full project docs, see `../docs/README.md`.

