const express = require("express");
const path = require("path");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
const modelName = process.env.OPENROUTER_MODEL || process.env.OPENAI_MODEL || "openrouter/auto";

const client = apiKey
  ? new OpenAI({
      apiKey: apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "X-OpenRouter-Title": "NEXORA - Design the Digital Future"
      }
    })
  : null;

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    aiConfigured: Boolean(apiKey),
    provider: "OpenRouter",
    model: modelName
  });
});

// NOVA AI
app.post("/api/chat", async (req, res) => {
  try {
    if (!client) {
      return res.status(503).json({
        error: "NOVA AI is not configured. Add OPENROUTER_API_KEY to .env"
      });
    }

    const messages = Array.isArray(req.body.messages)
      ? req.body.messages
      : [];

    const cleaned = messages
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string"
      )
      .slice(-20)
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, 8000)
      }));

    if (
      !cleaned.length ||
      cleaned[cleaned.length - 1].role !== "user"
    ) {
      return res.status(400).json({
        error: "Please send a user question."
      });
    }

    const systemPrompt = `
You are NOVA, the intelligent AI assistant inside NEXORA,
a student competition website about "Design the Digital Future".

You should answer the user's actual question, not only questions
about NEXORA.

You can help with:
- General knowledge
- Technology
- AI
- Coding
- Programming
- Science
- Mathematics
- Education
- Careers
- Writing
- Ideas
- Digital safety
- Future technology
- Everyday questions

Rules:
- Give useful and accurate answers.
- Do not invent facts.
- If you are unsure, clearly say so.
- Use simple language unless the user asks for technical depth.
- For coding questions, provide practical code and explanations.
- Maintain conversation context.
- Keep answers clear and well structured.
- Use bullets when useful.
- Do not claim to have performed actions you cannot perform.
- For unsafe requests, refuse briefly and provide a safe alternative.
- Be friendly, intelligent and helpful.
`;

    const response = await client.chat.completions.create({
      model: modelName,
      max_tokens: 600,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        ...cleaned
      ]
    });

    const answer =
      response.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return res.status(502).json({
        error: "NOVA could not generate a response."
      });
    }

    res.json({
      answer
    });

  } catch (error) {
    console.error("NOVA error:", error);

    res.status(500).json({
      error:
        error?.error?.message ||
        error?.message ||
        "NOVA is temporarily unavailable."
    });
  }
});

// Serve website
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`NEXORA running at http://localhost:${PORT}`);
});