import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib
import json


data = {
    "user_id": [101, 101, 102, 102, 103, 103, 104, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116],
    "merchant_category": [
        "Groceries", "Utilities", "Entertainment", "Groceries", "Rent",
        "Utilities", "Dining", "Entertainment", "Online Shopping", "Bills",
        "Groceries", "Transport", "Healthcare", "Bills", "Education", "Gaming",
        "Groceries", "Utilities", "Investment", "Travel"
    ],
    "transaction_purpose": [
        "Buying Food", "Paying Electricity Bill", "Movie Tickets", "Supermarket",
        "Monthly Rent", "Water Bill", "Restaurant", "Concert", "Amazon Purchase",
        "Phone Bill", "Supermarket", "Taxi Fare", "Hospital Bill", "Internet Bill",
        "College Fees", "Online Game", "Daily Essentials", "Electricity Bill",
        "Crypto Purchase", "Airplane Ticket"
    ],
    "stablecoin": ["USDC", "DAI", "USDT", "USDC", "USDT", "DAI", "DAI", "USDT", "USDC",
                   "USDT", "USDC", "DAI", "USDT", "DAI", "USDT", "USDC", "DAI", "USDC",
                   "DAI", "USDT"],
    "tx_volume": [150, 220, 90, 180, 950, 300, 120, 200, 170, 450, 130, 70, 500, 260, 1000, 50, 140, 230, 850, 300],
    "tx_count": [7, 10, 4, 8, 1, 11, 5, 7, 9, 15, 5, 3, 2, 12, 3, 9, 6, 14, 2, 8]
}

df = pd.DataFrame(data)

# Encode categorical features
stablecoin_encoder = LabelEncoder()
df["stablecoin_encoded"] = stablecoin_encoder.fit_transform(df["stablecoin"])

merchant_encoder = LabelEncoder()
df["merchant_category_encoded"] = merchant_encoder.fit_transform(df["merchant_category"])

purpose_encoder = LabelEncoder()
df["transaction_purpose_encoded"] = purpose_encoder.fit_transform(df["transaction_purpose"])

user_encoder = LabelEncoder()
df["user_encoded"] = user_encoder.fit_transform(df["user_id"])

# Define Features & Labels
X = df[["user_encoded", "tx_volume", "tx_count", "merchant_category_encoded", "transaction_purpose_encoded"]]
y = df["stablecoin_encoded"]

# Train Model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save Model & Encoders
joblib.dump(model, "models/stablecoin_model.pkl")
joblib.dump(stablecoin_encoder, "models/stablecoin_encoder.pkl")
joblib.dump(user_encoder, "models/user_encoder.pkl")
joblib.dump(merchant_encoder, "models/merchant_encoder.pkl")
joblib.dump(purpose_encoder, "models/purpose_encoder.pkl")

print("Model training complete. Model and encoders saved.")
