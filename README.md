# 🚀 SeiAgentPay  

## 📌 Problem Statement  
Traditional payment systems lack transparency, efficiency, and security, especially when it comes to stablecoin payments. Businesses and users face challenges such as:  
⚡ High transaction fees  
🔗 Lack of interoperability  
🐢 Slow processing times  


## 💡 Solution  
**SeiAgentPay** is a **decentralized stablecoin payment system** that allows users to make payments seamlessly using **DAI, USDT, and USDC**. It integrates an **AI-powered recommendation system** to suggest the best stablecoin based on transaction history and user behavior, ensuring **cost-effective and efficient** transactions.  


## ✨ Features  
✅ **🔍 Stablecoin Recommendation** – AI-powered system to suggest the best stablecoin for payments.  
✅ **💰 Multi-Stablecoin Support** – Supports **DAI, USDT, and USDC** transactions.  
✅ **🔐 Secure Transactions** – Trustless and transparent payments using **smart contracts**.  
✅ **🏪 Merchant Payments** – Enables **direct stablecoin transfers** to merchants.  
✅ **⚡ Fast & Low-Cost** – Built on **Sei Network** for **high-speed** and **low-fee** transactions.  
✅ **🔧 Admin Control** – Allows updating stablecoin addresses and managing settings securely.  


## 🏗 Stablecoin Recommendation Model  
SeiAgentPay integrates a **machine learning-based stablecoin recommendation model** that suggests the best stablecoin for a given transaction based on:  
- **User Transaction History** (average volume & frequency)  
- **Merchant Category**  
- **Transaction Purpose**  


### **Model Training & Deployment**  
- The **RandomForestClassifier** is used to train a model with transaction data.  
- The model is exposed via a **FastAPI backend** that provides an API for recommendations.  
- Encoders ensure categorical data (merchant category & transaction purpose) is processed correctly.  
- The recommendation engine runs on **Google Colab** for model training and can be deployed locally or on a server.  


## 🚀 Getting Started  


### **1️⃣ Clone the Repository**  
```sh  
git clone https://github.com/jitendragangwar123/SeiAgentPay
cd SeiAgentPay  
```


### **2️⃣ Install Backend Dependencies**  
```sh  
cd stablecoin-recommender
pip install -r requirements.txt  
```


### **3️⃣ Train the Stablecoin Recommendation Model (Optional)**  
If you want to retrain the model, run:  
```sh  
python train_model.py  
```
This generates updated **.pkl** model files and user transaction history.  


### **4️⃣ Run the Backend API**  
```sh  
python main.py  
```


### **5️⃣ Install Frontend Dependencies**  
```sh  
cd frontend  
npm install  
```


### **6️⃣ Run the Frontend**  
```sh  
npm run dev  
```


## 📡 API Endpoints  
The backend provides the following endpoints:  
| Endpoint  | Method | Description  |  
|-----------|--------|--------------------------------------------|  
| `/`  | GET  | Check API status  |  
| `/users`  | GET  | Fetch user transaction data  |  
| `/recommend`  | POST  | Get the best stablecoin recommendation  |  


## 🤝 Contributing  
We welcome contributions from the community! 🌍  
Feel free to **open issues**, **submit pull requests**, or **suggest new features**.  


## 📜 License  
This project is licensed under the **MIT License**. 📝  

## Contact Us
Please reach out to us at rajeebk.malik@gmail.com or jitendragangwar2498@gmail.com
