// The browser never sees the API key.
// Messages go to a Netlify Function, which calls the Anthropic API.
const ENDPOINT = "/.netlify/functions/chat";
const MAX_HISTORY = 20;

const chat = document.getElementById("chat");
const empty = document.getElementById("empty");
const form = document.getElementById("composer");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clear");

let history = []; // [{ role: "user" | "assistant", content: "..." }]
let busy = false;

function addMessage(text, type) {
  if (empty) empty.hidden = true;
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.textContent = text; // textContent keeps user and AI text safe from HTML injection
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

function addTyping() {
  const div = document.createElement("div");
  div.className = "msg bot";
  div.setAttribute("aria-label", "The assistant is typing");
  div.innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

function setBusy(state) {
  busy = state;
  sendBtn.disabled = state;
  input.disabled = state;
  if (!state) input.focus();
}

async function sendMessage(text) {
  text = text.trim();
  if (!text || busy) return;

  addMessage(text, "user");
  history.push({ role: "user", content: text });
  input.value = "";
  autoGrow();
  setBusy(true);

  const typing = addTyping();

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-MAX_HISTORY) }),
    });

    const data = await res.json().catch(() => ({}));
    typing.remove();

    if (!res.ok || !data.reply) {
      throw new Error(data.error || "Something went wrong. Please try again.");
    }

    history.push({ role: "assistant", content: data.reply });
    addMessage(data.reply, "bot");
  } catch (err) {
    typing.remove();
    history.pop(); // remove the failed question so the conversation stays valid
    addMessage(err.message || "Could not reach the server. Check your connection and try again.", "error");
  } finally {
    setBusy(false);
  }
}

function autoGrow() {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 140) + "px";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage(input.value);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage(input.value);
  }
});

input.addEventListener("input", autoGrow);

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => sendMessage(chip.textContent));
});

clearBtn.addEventListener("click", () => {
  history = [];
  chat.querySelectorAll(".msg").forEach((m) => m.remove());
  empty.hidden = false;
  input.focus();
});
