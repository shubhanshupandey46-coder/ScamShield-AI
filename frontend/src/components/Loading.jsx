import "../styles/Loading.css";
import { FaRobot } from "react-icons/fa";

function Loading() {
  return (
    <div className="loadingCard">

      <FaRobot className="robot"/>

      <h2>Gemini AI is Analyzing...</h2>

      <div className="loadingBar">

        <div className="loadingFill"></div>

      </div>

      <div className="steps">

        <p>✔ Detecting phishing patterns...</p>

        <p>✔ Checking suspicious links...</p>

        <p>✔ Looking for urgency tactics...</p>

        <p>✔ Calculating AI risk score...</p>

      </div>

    </div>
  );
}

export default Loading;