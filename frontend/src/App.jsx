  import { useState } from "react";

import "./App.css";

import Hero from "./components/Hero";
import InputCard from "./components/InputCard";
import Loading from "./components/Loading";
import ResultCard from "./components/ResultCard";
import CyberBackground from "./components/CyberBackground";

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
    setResult(null);

    try {
      const response = await fetch(
        "https://scamshield-ai-aqg0.onrender.com/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await response.json();

      setResult({
        riskScore: data.riskScore ?? 0,
        verdict: data.verdict ?? "Unknown",
        reasons: data.reasons ?? [],
        advice: data.advice ?? [],
      });
    } catch (error) {
      console.error(error);

      setResult({
        riskScore: 0,
        verdict: "Error",
        reasons: [
          "Unable to connect to the AI server."
        ],
        advice: [
          "Please try again after a few seconds."
        ],
      });
    }

    setLoading(false);
  }

  function getColor(score) {
    if (score >= 70) return "#ef4444";
    if (score >= 40) return "#f59e0b";
    return "#22c55e";
  }

  return (
    <>
      {/* Animated Cyber Background */}
      <CyberBackground />

      <div className="container">

        {/* Hero */}
        <Hero />

        {/* Input */}
        <InputCard
          message={message}
          setMessage={setMessage}
          analyzeMessage={analyzeMessage}
          loading={loading}
        />

        {/* Loading Animation */}
        {loading && <Loading />}

        {/* Results */}
        {!loading && result && (
          <ResultCard
            result={result}
            getColor={getColor}
          />
        )}

      </div>
    </>
  );
}

export default App;