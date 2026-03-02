from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()
class AnalyzeInput(BaseModel):
    input: str
    mode: str = "text"
@app.post("/analyze")
async def analyze(payload: AnalyzeInput):
    text = payload.input or ""
    emotion = "mixed"
    confidence = 0.87 if text else 0.5
    state = "high_cognitive_load" if "overwhelmed" in text.lower() else "unknown"
    return {"emotion": emotion, "confidence": confidence, "state": state}
def run():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
if __name__ == "__main__":
    run()
