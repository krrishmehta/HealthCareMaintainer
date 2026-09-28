from database import *
from typing import Literal

class OAuthOPT:
    def get_user(id: int, session: Session):
        if id:
            stmt = select(oauth_accounts).where(oauth_accounts.id == id)
        else:
            return None
        
        user_data = session.exec(stmt).first()
        return user_data
    
    def insert_user(user_id: int, provider_uid: int, provider: Literal["google"], session: Session):
        new_model = oauth_accounts(user_id=user_id, provider=provider, provider_uid=provider_uid)
        
        session.add(new_model)
        session.commit()
        session.refresh()