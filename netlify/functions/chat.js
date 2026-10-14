// Netlify Function: keeps the Gemini API key on the server.
// Set GEMINI_API_KEY in Netlify (Site configuration > Environment variables).

const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

const SYSTEM_PROMPT =
  "You are a friendly assistant for college students. " +
  "Give clear, accurate answers in simple language. " +
  "Keep replies short unless the student asks for detail.";

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

// Returns a clean message list, or null if the input is not valid.
function cleanMessages(input) {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_MESSAGES) return null;

  const out = [];
  for (const m of input) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) return null;
    if (typeof m.content !== "string") return null;
    const content = m.content.trim();
    if (!content || content.length > MAX_CHARS * 4) return null;
    out.push({ role: m.role, content });
  }

  if (out[0].role !== "user") return null;
  if (out[out.length - 1].role !== "user") return null;
  if (out[out.length - 1].content.length > MAX_CHARS) return null;
  return out;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Use POST to send a message." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return json(500, { error: "The server is missing its API key. Add GEMINI_API_KEY in Netlify settings." });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "The request was not valid JSON." });
  }

  const messages = cleanMessages(body.messages);
  if (!messages) {
    return json(400, { error: "Send up to 20 messages, starting and ending with your own message (max 2000 characters)." });
  }

  // Gemini calls the assistant role "model".
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 700 },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Gemini API error:", res.status, data && data.error);
      if (res.status === 429) {
        return json(429, { error: "Too many messages right now. Wait a minute and try again." });
      }
      return json(502, { error: "The AI service could not answer right now. Please try again in a moment." });
    }

    const parts = (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
    const reply = parts.map((p) => p.text || "").join("\n").trim();

    if (!reply) return json(502, { error: "The AI returned an empty answer. Try asking in a different way." });
    return json(200, { reply });
  } catch (err) {
    console.error("Function error:", err);
    return json(500, { error: "Something went wrong on the server. Please try again." });
  }
};
