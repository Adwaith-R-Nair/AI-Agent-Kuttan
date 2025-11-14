# 🤖 Agent Kuttan - The Friendly AI Broski

Agent Kuttan is a lightweight Command-Line AI Agent built using **Google Gemini's Function Calling** capabilities.  
He uses real tools — like `sum`, `prime`, and `getCryptoPrice` - to solve user problems smartly, and roasts you (gently) if you ask nonsense 🤭

This was a **fun lil project** I built to understand:
- How to build agents in JavaScript
- How function calling works in LLMs
- How to plug custom tools into an AI workflow
- How to run an infinite loop chat in Node.js

---

## ⭐ Features

### 🧠 Smart Agent Logic  
Agent Kuttan automatically decides:
- Should he answer directly?
- Or should he call one of the tools?
- Or should he roast you? 😆

### 🛠️ Tool Support  
Built-in functions the agent can call:
- **sum(a, b)** → returns the sum  
- **prime(n)** → checks if a number is prime  
- **getCryptoPrice(coin)** → fetches real-time crypto prices using CoinGecko API  

### 🔁 Infinite CLI Chat  
You can keep chatting and testing function calls without restarting the script.

### ✨ Friendly & Cheerful Personality  
Agent Kuttan is designed to be playful, cheerful, and fun to use!

---


## 🧰 Getting Started

To run **Agent Kuttan** locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/Adwaith-R-Nair/AI-Agent-Kuttan.git
```

### 2.  **Install dependencies:**
  ```bash
    npm install
  ```

### 3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google Gemini API key. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).
  ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
  ```

### 4.  **Start the server:**
  ```bash
    node index.js
  ```
