const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeScam(message) {
  const prompt = `
You are ScamShield AI.

Analyze the following message.

Return ONLY valid JSON in this format:

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
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = { analyzeScam };