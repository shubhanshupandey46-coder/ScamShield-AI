import { motion } from "framer-motion";
import { FaShieldAlt, FaBrain, FaBolt, FaLock } from "react-icons/fa";

function Hero() {
  return (
    <motion.div
      className="hero"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="heroLogo"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <FaShieldAlt />
      </motion.div>

      <h1 className="heroTitle">
        ScamShield <span>AI</span>
      </h1>

      <p className="heroSubtitle">
        AI-Powered Cybersecurity Assistant
      </p>

      <p className="heroDescription">
        Detect phishing emails, fake SMS, WhatsApp scams, malicious links,
        investment frauds and social engineering attacks using Google's Gemini AI.
      </p>

      <div className="heroBadges">
        <div className="heroBadge">
          <FaBrain />
          Gemini AI
        </div>

        <div className="heroBadge">
          <FaBolt />
          Instant Detection
        </div>

        <div className="heroBadge">
          <FaLock />
          Privacy First
        </div>
      </div>
    </motion.div>
  );
}

export default Hero;