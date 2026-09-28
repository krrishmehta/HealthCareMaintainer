from sqlmodel import SQLModel, Session, select, Field, create_engine, Column, col
from sqlalchemy import BigInteger
from datetime import datetime, timezone
from uuid import uuid4, UUID
from dotenv import load_dotenv, find_dotenv
import os, time

load_dotenv(find_dotenv())

engine = create_engine(os.getenv("DATABASE_URL"))
SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as s:
        yield s
        
        
class users(SQLModel, table=True):
    __tablename__ = "users"
    id: int = Field(primary_key=True, default=None, nullable=False)
    email: str = Field(unique=True, nullable=False, default=None)
    password: str = Field(default=None)
    name: str = Field(default=None, nullable=False)
    dob: str = Field(default=None, nullable=False)
    mobile: str = Field(default=None, nullable=False)
    rbac: str = Field(default=None, nullable=False)
    jti: str | None
    pass_changed_at: int = Field(sa_column=Column(BigInteger),default_factory= lambda: int(time.time() * 1000))
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory= lambda: datetime.now(timezone.utc))
    
class oauth_accounts(SQLModel, table=True):
    __tablename__ = "oauth_accounts"
    id: int = Field(primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    provider: str = Field(unique=True, nullable=False)
    provider_uid: str
    created_at: datetime = Field(default_factory= lambda: datetime.now(timezone.utc))
    
class patients(SQLModel, table=True):
    __tablename__ = "patients"
    id: int = Field(foreign_key="users.id")
    patient_id: UUID = Field(default_factory=uuid4)
    blood: str = Field(default=None)
    
class doctors(SQLModel, table=True):
    __tablename__ = "doctors"
    id: int = Field(foreign_key="users.id")
    doctor_id: UUID = Field(unique=True, default_factory=uuid4)
    registration: str = Field(unique=True, nullable=False)
    is_verified: bool = Field(default=False)
    

def add_orm(model: object, session: Session):
    session.add(model)
    session.commit()
    session.refresh()
