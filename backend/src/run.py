"""Container entrypoint for running the API with a validated PORT value."""

import os

import uvicorn


def _read_port() -> int:
    """Read PORT from env and return a valid integer."""
    raw_value = os.getenv("PORT", "8000").strip()
    try:
        return int(raw_value)
    except ValueError as exc:
        raise RuntimeError(
            f"Invalid PORT environment value {raw_value!r}; expected an integer."
        ) from exc


def main() -> None:
    """Start Uvicorn for the FightIQ API."""
    uvicorn.run("src.main:app", host="0.0.0.0", port=_read_port())


if __name__ == "__main__":
    main()
