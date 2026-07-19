
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
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.text();

      setResult(data);
    } catch (err) {
      setResult("Unable to connect to backend.");
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <h1>🛡️ ScamShield AI</h1>

      <p>Analyze suspicious SMS, emails and WhatsApp messages using Gemini AI.</p>

      <textarea
        rows="8"
        placeholder="Paste suspicious message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={analyzeMessage}>
        {loading ? "Analyzing..." : "Analyze with AI"}
      </button>

      {result && (
        <div className="result">
          <h2>Analysis</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;