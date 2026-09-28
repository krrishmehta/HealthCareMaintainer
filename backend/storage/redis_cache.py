from dotenv import load_dotenv, find_dotenv
import redis
import os

load_dotenv(find_dotenv())

class CacheRedis:
    def __init__(self):
        self.r = redis.Redis(
            host=os.getenv('REDIS_CACHE_HOST'),
            port=os.getenv('REDIS_CACHE_PORT'),
            decode_responses=True,
            username=os.getenv('REDIS_CACHE_USERNAME'),
            password=os.getenv('REDIS_CACHE_PASSWORD')
        )
        
    def set_cache_qr(self, uid:int, qr_hash:str, ex:int = 300):
        self.r.setex(name=f"qrToken:{uid}", time=ex, value=qr_hash)
        return True
    
    def get_cache_qr(self, uid:int):
        return self.r.get(f"qrToken:{uid}")
    
    def delete_cache_qr(self, uid:int):
        self.r.delete(f"qrToken:{uid}")