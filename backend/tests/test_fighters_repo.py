from sqlalchemy import select

from src.fighters_repo import (
    get_fighter_by_name,
    normalize_name,
    search_fighters,
    upsert_fighter,
    upsert_fighters,
)
from src.models import Fighter


def test_normalize_name():
    assert normalize_name("  Jon   Jones  ") == "jon jones"
    assert normalize_name("ALEX PEREIRA") == "alex pereira"
    assert normalize_name("  Valentina   Shevchenko ") == "valentina shevchenko"


def test_get_fighter_by_name(db_session):
    fighter = Fighter(
        name="Jon Jones",
        name_normalized=normalize_name("Jon Jones"),
        gender="male",
    )

    db_session.add(fighter)
    db_session.commit()
    db_session.refresh(fighter)

    result = get_fighter_by_name(db_session, "Jon jOneS")

    assert result is not None
    assert result.id == fighter.id
    assert result.name == "Jon Jones"
    assert result.created_at is not None
    assert result.updated_at is not None


def test_get_fighter_by_name_not_found(db_session):
    result = get_fighter_by_name(db_session, "Not a real fighter")
    assert result is None


def test_search_fighters(db_session):
    fighter = Fighter(
        name="Jon Jones",
        name_normalized=normalize_name("Jon Jones"),
        gender="male",
    )

    db_session.add(fighter)
    db_session.commit()
    db_session.refresh(fighter)

    result = search_fighters(db_session, "Jon")

    assert len(result) == 1
    assert result[0].id == fighter.id
    assert result[0].name == "Jon Jones"


def test_upsert_fighter(db_session):
    fighter = Fighter(
        name="Jon Jones",
        name_normalized=normalize_name("Jon Jones"),
        gender="male",
        height_cm=165,
    )

    db_session.add(fighter)
    db_session.commit()
    db_session.refresh(fighter)

    data = {
        "name": "  JON   JONES ",
        "height_cm": 164,
    }
    result = upsert_fighter(db_session, data)
    db_session.commit()

    fighters_named_jon = db_session.execute(
        select(Fighter).where(Fighter.name_normalized == normalize_name("Jon Jones"))
    ).scalars().all()

    assert result.id == fighter.id
    assert result.height_cm == 164
    assert len(fighters_named_jon) == 1


def test_upsert_fighters(db_session):
    existing = Fighter(
        name="Jon Jones",
        name_normalized=normalize_name("Jon Jones"),
        gender="male",
        height_cm=165,
    )
    db_session.add(existing)
    db_session.commit()
    db_session.refresh(existing)

    payload = [
        {"name": "Jon Jones", "height_cm": 170},
        {"name": "Alex Pereira", "gender": "male", "height_cm": 193},
        {"name": ""},
    ]

    count = upsert_fighters(db_session, payload)

    all_fighters = db_session.execute(select(Fighter).order_by(Fighter.name.asc())).scalars().all()
    jon = get_fighter_by_name(db_session, "Jon Jones")
    alex = get_fighter_by_name(db_session, "Alex Pereira")

    assert count == 2
    assert len(all_fighters) == 2
    assert jon is not None
    assert jon.id == existing.id
    assert jon.height_cm == 170
    assert alex is not None
    assert alex.height_cm == 193
