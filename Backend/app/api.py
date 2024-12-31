from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic_settings import BaseSettings
import requests
from clean import clean, getKeyValues


# Define config vars (api_url and default fetch limit)
# api_url defines the base url to fetch data from
# limit defines how many rows will be returned
class Settings(BaseSettings):
    api_url: str = "https://data.austintexas.gov/resource/3syk-w9eu.json"
    limit: int = 50

settings = Settings()
app = FastAPI()

# Allowed origins
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

# Add CORS middleware to enable frontend to query apis
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check Endpoint
@app.get("/")
async def root():
    return {"health": "healthy"}

# Fetches all data without a filter, with defined limit
@app.get("/all")
async def get_all():

    response = requests.get(settings.api_url+"?$limit="+str(settings.limit))

    if response.status_code != 200:
        return {"error": "Failed to fetch data"}
    
    data = clean(response.json())

    return data

# Fetches filtered data, with defined limit
@app.get("/filter/{filters}")
async def get_filtered(filters: str):
    baseurl = settings.api_url

    response = requests.get(baseurl+"?"+filters+"&$limit="+str(settings.limit))

    print(filters)

    if response.status_code != 200:
        return {"error": "Failed to fetch data"}
    
    data = clean(response.json())

    return data

# Fetches all keys, used to define headers in output table
@app.get("/keys")
async def get_keys():
    
    return getKeyValues()

# Sets the fetch limit
@app.post("/limit/{limit}")
async def set_limit(limit: int):
    settings.limit = limit
    return {"message": "limit set to " + str(limit)}

# Gets the fetch limit
@app.get("/limit")
async def get_limit():
    return {"limit": settings.limit}
