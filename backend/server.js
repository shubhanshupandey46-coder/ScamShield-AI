const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { analyzeScam } = require("./gemini");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 ScamShield AI Backend is Running!");
});

app.post("/analyze", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const result = await analyzeScam(message);

        res.send(result);
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
    console.error("Server Error:", err);
});