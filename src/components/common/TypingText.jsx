import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const TypingText = ({ text, speed = 80, className = "" }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) return; // Do nothing if text is not provided

    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayed}
    </motion.span>
  );
};

export default TypingText;
