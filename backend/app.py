from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded
from pathrouters.v1 import router

app = FastAPI()
app.include_router(router=router.r)
app.state.limiter = router.limiter

@app.exception_handler(RateLimitExceeded)
def rate_limit_exception(request: Request, exec: RateLimitExceeded):
    return JSONResponse(content={
        "status": False,
        "message": "Too Many Request"
    }, status_code=status.HTTP_429_TOO_MANY_REQUESTS) 