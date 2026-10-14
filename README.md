# AI-Powered Browser Chatbot 🤖

A browser-based AI chatbot built with HTML, CSS and vanilla JavaScript. Your messages go to the Google Gemini API through a small serverless function, and the reply appears in the chat in real time.

<!-- Add a screenshot of the chat here:
![Chatbot screenshot](screenshots/chat.png)
-->

## 🔗 Live Demo

<!-- Paste your Netlify link here after deploying -->

## 🚀 Features

- Clean chat interface that works on phone and desktop
- Remembers the conversation so follow-up questions make sense
- Typing indicator while the AI is answering
- Starter questions to try right away
- "New chat" button to start fresh
- Clear error messages when something goes wrong
- API key stays on the server, never in the browser

## 🛠 Tech Stack

| Area | Technology |
| --- | --- |
| Structure and styling | HTML, CSS |
| Front-end logic | Vanilla JavaScript (fetch, async/await, DOM updates) |
| Back end | Netlify Functions (Node.js) |
| AI | Google Gemini API |
| Hosting | Netlify, code on GitHub |

## 📁 Project Structure

```
ai-chatbot/
├── index.html                 # page layout
├── style.css                  # styling
├── script.js                  # chat logic in the browser
├── netlify/functions/chat.js  # server function that calls the Gemini API
├── netlify.toml               # Netlify settings
├── .env.example               # example of the environment variables
└── .gitignore                 # keeps secrets out of GitHub
```

## 📦 Run Locally

You need [Node.js](https://nodejs.org/) and a free [Gemini API key](https://aistudio.google.com/apikey) from Google AI Studio.

```bash
git clone https://github.com/kirtighai412-star/ai-chatbot.git
cd ai-chatbot
```

1. Copy `.env.example` to a new file named `.env`.
2. Open `.env` and replace `your-key-here` with your real key.
3. Start the app:

```bash
npx netlify-cli dev
```

Open the address shown in the terminal (usually `http://localhost:8888`).

> Opening `index.html` by double-clicking will show the page, but chat replies need the function, so use the command above.

## 🌐 Deploy

1. Push this project to a GitHub repository.
2. On [Netlify](https://app.netlify.com/), choose **Add new site**, then **Import an existing project**, and pick your repo.
3. Leave the build command empty. Netlify reads `netlify.toml` for the rest.
4. Go to **Site configuration**, then **Environment variables**, and add `GEMINI_API_KEY` with your key.
5. Deploy the site again so the key is picked up.

## 🔐 API Key Safety

- The key lives only in Netlify's environment variables or your local `.env` file.
- `.env` is listed in `.gitignore`, so it is never uploaded to GitHub.
- If a key is ever shared by mistake, delete it in Google AI Studio and create a new one.
- The free tier has rate limits, so many messages in a short time may get a "try again" message. Anyone with your site link can send messages, so keep an eye on your usage in Google AI Studio.

## 👩‍💻 Author

**Kirti Ghai** – B.Tech CSE student, Ramdeobaba University

- GitHub: [kirtighai412-star](https://github.com/kirtighai412-star)
- LinkedIn: [Kirti Ghai](https://www.linkedin.com/in/kirti-ghai-6575b5401)
