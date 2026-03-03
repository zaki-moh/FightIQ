"""Pytest fixtures shared across backend test modules.

Provides a transaction-scoped SQLAlchemy session backed by an in-memory
SQLite database so repository tests can run quickly and in isolation.
"""

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from src.db import Base
from src import models  # noqa: F401  # Register ORM models on Base metadata.


# Shared in-memory SQLite engine for tests.
# StaticPool keeps the same connection alive so the in-memory DB persists
# across sessions during the test process.
TEST_DATABASE_URL = "sqlite+pysqlite:///:memory:"
engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

SessionTesting = sessionmaker(autocommit=False, autoflush=False)


@pytest.fixture(scope="session", autouse=True)
def setup_test_database():
    """Create all ORM tables once for the full test session."""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def db_session() -> Session:
    """Yield a per-test DB session and rollback all writes after each test."""
    connection = engine.connect()
    transaction = connection.begin()
    session = SessionTesting(bind=connection)
    try:
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()
