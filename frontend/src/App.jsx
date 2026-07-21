import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyzeMessage() {
    if (!message.trim()) {
      alert("Please enter a suspicious message.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://scamshield-ai-aqg0.onrender.com/analyze",  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      setResult(data);
    } catch (err) {
      setResult({
        riskScore: 0,
        verdict: "Error",
        reasons: ["Unable to connect to backend."],
        advice: ["Please check if the backend server is running."],
      });
    }

    setLoading(false);
  }

  const getColor = (score) => {
    if (score >= 70) return "#ef4444";
    if (score >= 40) return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div className="app">
      <div className="background"></div>

      <div className="container">

        <div className="glass">

          <h1>🛡 ScamShield AI</h1>

          <p className="subtitle">
            AI-Powered Scam Detection using Google Gemini
          </p>

          <textarea
            rows="8"
            placeholder="Paste any suspicious SMS, Email or WhatsApp message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={analyzeMessage}>
            {loading ? "🧠 Analyzing..." : "🛡 Analyze with Gemini AI"}
          </button>

          {loading && (
            <div className="loading">
              <div className="loader"></div>
              <p>Checking for phishing patterns...</p>
            </div>
          )}

          {result && !loading && (
            <div className="result">

              <h2>📊 Scam Analysis</h2>

              <div className="scoreCard">

                <div className="scoreTop">
                  <span>Risk Score</span>

                  <span
                    style={{
                      color: getColor(result.riskScore),
                      fontWeight: "bold",
                    }}
                  >
                    {result.riskScore}/100
                  </span>
                </div>

                <div className="progress">
                  <div
                    className="progressFill"
                    style={{
                      width: `${result.riskScore}%`,
                      background: getColor(result.riskScore),
                    }}
                  ></div>
                </div>

              </div>

              <div className="verdict">
                <h3>Verdict</h3>

                <span
                  style={{
                    color: getColor(result.riskScore),
                    fontWeight: "bold",
                    fontSize: "22px",
                  }}
                >
                  {result.verdict}
                </span>
              </div>

              <div className="section">

                <h3>🚨 Reasons</h3>

                <ul>
                  {result.reasons.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

              </div>

              <div className="section">

                <h3>🛡 Safety Advice</h3>

                <ul>
                  {result.advice.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;