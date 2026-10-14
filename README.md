
# AI Chatbot 🤖

A browser-based AI chatbot built with HTML, CSS and JavaScript. It uses a Netlify serverless function to call the Google Gemini API, so the API key stays private.

**🔗 Live Demo:** [ai-chatbot1.netlify.app](https://ai-chatbot1.netlify.app/)

## Features

- Clean chat interface for phone and desktop
- Remembers the conversation for follow-up questions
- Typing indicator, starter questions and a "New chat" button
- API key kept on the server, never in the browser

## Tech Stack

HTML, CSS, JavaScript (fetch, async/await, DOM) · Node.js · Netlify Functions · Gemini API · Git and GitHub

## Run Locally

```bash
git clone https://github.com/kirtighai412-star/ai-chatbot.git
cd ai-chatbot
```

Copy `.env.example` to `.env`, add your free [Gemini API key](https://aistudio.google.com/apikey), then run:

```bash
npx netlify-cli dev
```

## Author

**Kirti Ghai** – B.Tech CSE, Ramdeobaba University
[GitHub](https://github.com/kirtighai412-star) · [LinkedIn](https://www.linkedin.com/in/kirti-ghai-6575b5401)
