# AI Chatbot 🤖

A browser-based AI chatbot built with HTML, CSS and vanilla JavaScript. Messages are sent to a Netlify serverless function, which calls the Google Gemini API and returns the answer, so the API key never appears in the browser.

**🔗 Live Demo:** [ai-chatbot1.netlify.app](https://ai-chatbot1.netlify.app/)

<!-- Add a screenshot of your chatbot here:
![AI Chatbot](screenshots/chat.png)
-->

## ✨ Features

- Clean chat interface that works on phone and desktop
- Remembers the conversation, so follow-up questions make sense
- Typing indicator, starter questions and a "New chat" button
- Clear error messages, for example when the free limit is reached
- API key stays on the server and is never exposed

## 🧠 How It Works

1. `script.js` sends your message and recent chat history to a Netlify Function.
2. `chat.js` validates the input, adds the secret key from an environment variable and calls the Gemini API.
3. The reply is sent back and shown in the chat.

## 🛠 Tech Stack

| Area | Technology |
| --- | --- |
| Front end | HTML, CSS, JavaScript (fetch, async/await, DOM) |
| Back end | Node.js, Netlify Functions |
| AI | Google Gemini API |
| Tools | Git, GitHub, Netlify |

## 📁 Project Structure

```
ai-chatbot/
├── index.html                 # page layout
├── style.css                  # styling
├── script.js                  # chat logic in the browser
├── netlify/functions/chat.js  # server function that calls Gemini
├── netlify.toml               # Netlify settings
└── .env.example               # example environment variables
```

## 📦 Run Locally


```bash
git clone https://github.com/kirtighai412-star/ai-chatbot.git
cd ai-chatbot
npx netlify-cli dev
```

Add your free [Gemini API key](https://aistudio.google.com/apikey) as `GEMINI_API_KEY` in a `.env` file (copy `.env.example`), then open `http://localhost:8888`.

## 🌐 Deployment

Deployed on Netlify from this GitHub repo. The key is stored as the environment variable `GEMINI_API_KEY`, and it is never committed to the repository.

## 👩‍💻 Author

**Kirti Ghai** – B.Tech CSE student, Ramdeobaba University

[GitHub](https://github.com/kirtighai412-star) · [LinkedIn](https://www.linkedin.com/in/kirti-ghai-6575b5401)
