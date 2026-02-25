"""Repository helpers for fighter table reads/writes.

Keeps persistence logic out of route handlers so query behavior is
consistent and reusable across API routes and scripts.
"""

from collections.abc import Iterable
from typing import Any

from sqlalchemy import select
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
    """Search fighters by name with prefix-first ranking for autocomplete."""
    cleaned = query.strip()
    if not cleaned:
        return []

    normalized_query = normalize_name(cleaned)
    excluded_normalized = (
        normalize_name(exclude_name)
        if exclude_name is not None and exclude_name.strip()
        else None
    )

    prefix_stmt = select(Fighter).where(
        Fighter.name_normalized.like(f"{normalized_query}%")
    )
    if excluded_normalized:
        prefix_stmt = prefix_stmt.where(
            Fighter.name_normalized != excluded_normalized
        )
    prefix_stmt = prefix_stmt.order_by(Fighter.name.asc()).limit(limit)
    prefix_matches = list(db.execute(prefix_stmt).scalars().all())

    if len(prefix_matches) >= limit:
        return prefix_matches

    remaining = limit - len(prefix_matches)
    contains_stmt = select(Fighter).where(
        Fighter.name_normalized.like(f"%{normalized_query}%")
    )
    if excluded_normalized:
        contains_stmt = contains_stmt.where(
            Fighter.name_normalized != excluded_normalized
        )
    if prefix_matches:
        contains_stmt = contains_stmt.where(
            Fighter.id.notin_([fighter.id for fighter in prefix_matches])
        )

    contains_stmt = contains_stmt.order_by(Fighter.name.asc()).limit(remaining)
    contains_matches = list(db.execute(contains_stmt).scalars().all())
    return prefix_matches + contains_matches


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
