"""SQLAlchemy ORM schema definitions used by runtime API endpoints."""

from datetime import datetime

from sqlalchemy import DateTime, Float, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from src.db import Base


class Fighter(Base):
    """Canonical fighter runtime record.

    Stores display identity plus engineered physical/performance fields
    currently used by the stats endpoint and autocomplete workflows.
    """

    __tablename__ = "fighters"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True, index=True)
    name_normalized: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        unique=True,
        index=True,
    )
    gender: Mapped[str | None] = mapped_column(String(20), nullable=True)

    height_cm: Mapped[float | None] = mapped_column(Float, nullable=True)
    reach_in_cm: Mapped[float | None] = mapped_column(Float, nullable=True)
    weight_in_kg: Mapped[float | None] = mapped_column(Float, nullable=True)
    age: Mapped[int | None] = mapped_column(Integer, nullable=True)
    strike_efficiency: Mapped[float | None] = mapped_column(Float, nullable=True)
    grapple_efficiency: Mapped[float | None] = mapped_column(Float, nullable=True)
    win_ratio: Mapped[float | None] = mapped_column(Float, nullable=True)
    performance: Mapped[float | None] = mapped_column(Float, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
