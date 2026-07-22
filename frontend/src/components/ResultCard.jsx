 import "../styles/ResultCard.css";
import { motion } from "framer-motion";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  FaExclamationTriangle,
  FaShieldAlt,
  FaCheckCircle,
  FaLock,
  FaRobot,
} from "react-icons/fa";

function ResultCard({ result, getColor }) {
  const score = result.riskScore || 0;

  const level =
    score >= 80
      ? "CRITICAL"
      : score >= 60
      ? "HIGH"
      : score >= 40
      ? "MEDIUM"
      : "LOW";

  return (
    <motion.div
      className="resultCard"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>🛡 AI Scam Analysis</h2>

      <div className="resultTop">
        <div className="gauge">
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              pathColor: getColor(score),
              trailColor: "#1f2937",
              textColor: "#ffffff",
              textSize: "18px",
            })}
          />
        </div>

        <div className="verdictPanel">
          <span className="riskLabel">
            Threat Level
          </span>

          <h1
            style={{
              color: getColor(score),
              margin: "10px 0",
            }}
          >
            {score}/100
          </h1>

          <div
            className="badge"
            style={{
              background: getColor(score),
            }}
          >
            {(result.verdict || "UNKNOWN").toUpperCase()}
          </div>

          <p
            style={{
              marginTop: "18px",
              lineHeight: "1.7",
            }}
          >
            <FaRobot /> Gemini AI analyzed this message using
            contextual reasoning, phishing detection,
            urgency analysis and scam pattern recognition.
          </p>

          <h3
            style={{
              marginTop: "18px",
              color: getColor(score),
            }}
          >
            {level} RISK
          </h3>
        </div>
      </div>

      <div className="section">
        <h3>
          <FaExclamationTriangle />
          Threat Indicators
        </h3>

        <ul>
          {result.reasons.map((item, index) => (
            <li key={index}>
              <FaExclamationTriangle
                style={{
                  color: "#ef4444",
                  marginRight: 10,
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>
          <FaShieldAlt />
          Recommended Actions
        </h3>

        <ul>
          {result.advice.map((item, index) => (
            <li key={index}>
              <FaCheckCircle
                style={{
                  color: "#22c55e",
                  marginRight: 10,
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <motion.div
        className="summaryBox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <FaLock />

        <strong> AI Summary</strong>

        <p style={{ marginTop: 10 }}>
          This message exhibits multiple scam indicators
          including suspicious language, social engineering,
          urgency tactics and potentially malicious links.
          Exercise caution before interacting with the sender.
        </p>
      </motion.div>

      <div className="summaryBox">

<h3>🤖 AI Summary</h3>

<p>

This message was classified as

<strong> {(result.verdict || "Unknown").toUpperCase()} </strong>

with a

<strong> {result.riskScore}% </strong>

risk score.

Gemini AI detected several phishing indicators including suspicious language,
social engineering patterns and unsafe links. The message should not be trusted.

</p>

</div>

      <div className="footer">
        Powered by Google Gemini AI • React • Node.js • Express
      </div>
    </motion.div>
  );
}

export default ResultCard;
