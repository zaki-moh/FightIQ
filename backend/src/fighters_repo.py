"""Repository helpers for fighter table reads/writes.

Keeps persistence logic out of route handlers so query behavior is
consistent and reusable across API routes and scripts.
"""

from collections.abc import Iterable
from typing import Any

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from src.models import Fighter


def normalize_name(name: str) -> str:
    """Normalize fighter name for stable equality checks."""
    return " ".join(name.strip().lower().split())


def get_fighter_by_name(db: Session, fighter_name: str) -> Fighter | None:
    """Fetch a single fighter by normalized name."""
    normalized = normalize_name(fighter_name)
    stmt = select(Fighter).where(Fighter.name_normalized == normalized)
    return db.execute(stmt).scalar_one_or_none()


def search_fighters(
    db: Session,
    query: str,
    limit: int = 10,
    exclude_name: str | None = None,
) -> list[Fighter]:
    """Search fighters by partial name for autocomplete UIs."""
    cleaned = query.strip()
    if not cleaned:
        return []

    stmt = select(Fighter).where(
        func.lower(Fighter.name).like(f"%{cleaned.lower()}%")
    )

    if exclude_name:
        stmt = stmt.where(Fighter.name_normalized != normalize_name(exclude_name))

    stmt = stmt.order_by(Fighter.name.asc()).limit(limit)
    return list(db.execute(stmt).scalars().all())


def upsert_fighter(db: Session, fighter_data: dict[str, Any]) -> Fighter:
    """Create or update one fighter row identified by normalized name."""
    name = fighter_data["name"].strip()
    normalized = normalize_name(name)

    fighter = get_fighter_by_name(db, name)
    if fighter is None:
        fighter = Fighter(name=name, name_normalized=normalized)
        db.add(fighter)

    fighter.name = name
    fighter.name_normalized = normalized
    fighter.gender = fighter_data.get("gender")
    fighter.height_cm = fighter_data.get("height_cm")
    fighter.reach_in_cm = fighter_data.get("reach_in_cm")
    fighter.weight_in_kg = fighter_data.get("weight_in_kg")
    fighter.age = fighter_data.get("age")
    fighter.strike_efficiency = fighter_data.get("strike_efficiency")
    fighter.grapple_efficiency = fighter_data.get("grapple_efficiency")
    fighter.win_ratio = fighter_data.get("win_ratio")
    fighter.performance = fighter_data.get("performance")

    db.flush()
    return fighter


def upsert_fighters(db: Session, fighters: Iterable[dict[str, Any]]) -> int:
    """Batch upsert fighters and commit once for efficiency."""
    count = 0
    for fighter_data in fighters:
        if not fighter_data.get("name"):
            continue
        upsert_fighter(db, fighter_data)
        count += 1

    db.commit()
    return count
