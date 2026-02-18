"""Database configuration and session lifecycle utilities.

This module centralizes SQLAlchemy setup for the backend:
- connection URL resolution
- engine/session factory creation
- ORM base class registration
- FastAPI dependency for request-scoped sessions
"""

from pathlib import Path
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker


BASE_DIR = Path(__file__).resolve().parent.parent
DEFAULT_SQLITE_PATH = BASE_DIR / "data" / "fightiq.db"

# Defaults to local SQLite for fast setup; set DATABASE_URL for Postgres.
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"sqlite:///{DEFAULT_SQLITE_PATH}",
)

is_sqlite = DATABASE_URL.startswith("sqlite")

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    connect_args={"check_same_thread": False} if is_sqlite else {},
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    """Base class for all ORM models."""
    pass


def get_db():
    """Yield a request-scoped DB session and always close it."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    """Create all tables currently registered in ORM metadata."""
    # Import models here so metadata is populated before create_all.
    from src import models  # noqa: F401

    Base.metadata.create_all(bind=engine)
