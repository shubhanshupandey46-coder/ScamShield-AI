 import { motion } from "framer-motion";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

function InputCard({
  message,
  setMessage,
  analyzeMessage,
  loading,
}) {
  return (
    <motion.div
      className="glass inputGlass"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="inputHeader">
        <FaRobot className="inputIcon" />

        <div>
          <h2>Paste a Suspicious Message</h2>

          <p>
            SMS • Email • WhatsApp • Social Media
          </p>
        </div>
      </div>

      <textarea
        placeholder="Paste any suspicious SMS, Email or WhatsApp message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={analyzeMessage}
        disabled={loading}
      >
        <FaPaperPlane />

        {loading
          ? "Analyzing with Gemini..."
          : "Analyze with Gemini AI"}
      </button>
    </motion.div>
  );
}

export default InputCard;