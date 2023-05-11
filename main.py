from fastapi import FastAPI, requests, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import openai 
import os

app = FastAPI()

key = os.getenv("openai_key")
openai.api_key = key

origins = [
    "http://127.0.0.1:8000",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/")
async def root(request: Request):
    data = await request.json()
    input = data['input']
    response = openai.Completion.create(
    model="text-davinci-003",
    prompt=input,
    max_tokens=100,
    temperature=0
)
    print(response['choices'][0]['text'])
    return JSONResponse({"input": response['choices'][0]['text']})
