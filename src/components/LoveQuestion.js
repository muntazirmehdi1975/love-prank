import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function LoveQuestion() {

  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [showMeme, setShowMeme] = useState(false);

  // Music — starts on first click
  useEffect(() => {
    const startMusic = () => {
      const audio = new Audio("/romantic.mp3");
      audio.loop = true;
      audio.volume = 0.4;
      audio.play().catch(() => {});
      document.removeEventListener("click", startMusic);
    };
    document.addEventListener("click", startMusic);
  }, []);

  // Typing message
  const message = "Jonam… you are not just special, you are my peace, my happiness, and my favorite person ❤️";
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Love meter
  const [love, setLove] = useState(0);

  useEffect(() => {
    let value = 0;
    const interval = setInterval(() => {
      value += 1;
      setLove(value);
      if (value >= 100) clearInterval(interval);
    }, 30);
  }, []);

  const moveNoButton = (e) => {
    const newCount = noCount + 1;
    setNoCount(newCount);

    if (newCount >= 2) {
      setShowMeme(true);
      setTimeout(() => setShowMeme(false), 3000);
    }

    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 60);
    e.target.style.position = "absolute";
    e.target.style.left = `${x}px`;
    e.target.style.top = `${y}px`;
  };

  // Meme popup screen
  if (showMeme) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#ff9a9e,#fad0c4)"
      }}>
        <img src="/nahi.jpg" alt="nahi" style={{
          width: "350px",
          borderRadius: "16px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
        }} />
      </div>
    );
  }

  // Accepted screen
  if (accepted) {
    return (
      <div style={styles.accepted}>
        <h1>GOOD GIRL </h1>
        <p>Jonam… you just made my day 💕</p>
        <h2>I like you more than words can explain ✨</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>

      <div className="hearts">❤️ ❤️ ❤️ ❤️ ❤️</div>

      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        Jonam… Do you like me? ❤️
      </motion.h1>

      {/* YES and NO right below title */}
      <div style={{ marginTop: "20px", marginBottom: "30px" }}>
        <motion.button
          whileHover={{ scale: 1.2 }}
          style={styles.yes}
          onClick={() => setAccepted(true)}
        >
          Yes 💖
        </motion.button>

        <button
          style={styles.no}
          onMouseEnter={moveNoButton}
        >
          No 😭
        </button>
      </div>

      {/* Typing message */}
      <p style={{ maxWidth: "500px", fontSize: "18px", color: "#7a0030", marginTop: "10px" }}>
        {text}
      </p>

      {/* Love meter */}
      <div style={{ marginTop: "20px" }}>
        <h3 style={{ color: "#b5004e" }}>My Love For You</h3>
        <div style={{
          width: "250px", height: "20px", background: "#fff",
          borderRadius: "20px", overflow: "hidden", margin: "8px auto"
        }}>
          <div style={{
            height: "100%", width: `${love}%`,
            background: "#ff0066", transition: "0.3s"
          }}></div>
        </div>
        <p style={{ color: "#b5004e" }}>{love}% ❤️</p>
      </div>

    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
    textAlign: "center",
    overflow: "hidden"
  },
  accepted: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#ff758c,#ff7eb3)",
    color: "white",
    textAlign: "center"
  },
  yes: {
    padding: "14px 30px",
    margin: "10px",
    background: "#ff0066",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "20px",
    cursor: "pointer"
  },
  no: {
    padding: "14px 30px",
    margin: "10px",
    background: "#444",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "20px",
    cursor: "pointer"
  }
};

export default LoveQuestion;