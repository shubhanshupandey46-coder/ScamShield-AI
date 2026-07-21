const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeScam(message) {
  const prompt = `
You are ScamShield AI.

Analyze the following message.

Return ONLY valid JSON.

Do NOT include markdown.
Do NOT include \`\`\`json.
Do NOT explain anything.

Use exactly this format:

{
  "riskScore": 0,
  "verdict": "",
  "reasons": [],
  "advice": []
}

Message:
${message}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  let text = response.text.trim();

  // Remove markdown if Gemini accidentally returns it
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(text);
}

module.exports = { analyzeScam };