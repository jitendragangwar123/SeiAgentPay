import json
import joblib
import numpy as np
import uvicorn
import threading
from pyngrok import ngrok
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-ngrok-url.ngrok-free.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model and Encoders
try:
    model = joblib.load("models/stablecoin_model.pkl")
    stablecoin_encoder = joblib.load("models/stablecoin_encoder.pkl")
    user_encoder = joblib.load("models/user_encoder.pkl")
    merchant_encoder = joblib.load("models/merchant_encoder.pkl")
    purpose_encoder = joblib.load("models/purpose_encoder.pkl")

    with open("data/user_history.json", "r") as f:
        user_history = json.load(f)

except FileNotFoundError as e:
    raise RuntimeError(f"Error loading model files: {e}")

# Request Model
class TransactionRequest(BaseModel):
    user_id: int
    merchant_category: str
    transaction_purpose: str

@app.get("/")
def home():
    return {"message": "Stablecoin Recommendation API is running!"}

@app.get("/users")
def get_all_users():
    """Fetch all user transaction data"""
    return user_history

@app.post("/recommend")
def recommend_stablecoin(request: TransactionRequest):
    """Predict the best stablecoin based on user history and transaction details"""
    try:
        merchant_encoded = merchant_encoder.transform([request.merchant_category])[0]
        purpose_encoded = purpose_encoder.transform([request.transaction_purpose])[0]
        user_encoded = user_encoder.transform([request.user_id])[0]
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Encoding error: {e}")

    # Fetch user history or set defaults
    user_data = user_history.get(str(request.user_id), {"avg_tx_volume": 200, "avg_tx_count": 5})
    tx_volume, tx_count = user_data["avg_tx_volume"], user_data["avg_tx_count"]

    # Model Prediction
    features = np.array([[user_encoded, tx_volume, tx_count, merchant_encoded, purpose_encoded]])
    prediction = model.predict(features)
    stablecoin = stablecoin_encoder.inverse_transform(prediction)[0]

    return {
        "user_id": request.user_id,
        "merchant_category": request.merchant_category,
        "transaction_purpose": request.transaction_purpose,
        "tx_volume_used": tx_volume,
        "tx_count_used": tx_count,
        "recommended_stablecoin": stablecoin
    }

# Expose the API via Ngrok
ngrok_tunnel = ngrok.connect(8000)
print(f"Public URL: {ngrok_tunnel.public_url}")

# Run FastAPI server
def run():
    for port in range(8000, 8010):
        try:
            uvicorn.run(app, host="0.0.0.0", port=port)
            break
        except OSError:
            print(f"Port {port} in use, trying next port...")

threading.Thread(target=run, daemon=True).start()
