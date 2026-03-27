import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function LoveQuestion() {

  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [showMeme, setShowMeme] = useState(false);
  const [flowers, setFlowers] = useState([]);
  const [balloons, setBalloons] = useState([]);

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

  // Hearts data
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 5,
    size: Math.random() * 20 + 15,
    emoji: ["❤️", "💕", "💖", "💗", "💓", "💝"][Math.floor(Math.random() * 6)]
  }));

  const handleYes = () => {
    setAccepted(true);

    const newFlowers = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      emoji: ["🌸", "🌺", "🌹", "🌷", "💐"][Math.floor(Math.random() * 5)]
    }));
    setFlowers(newFlowers);

    const newBalloons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      emoji: ["🎈", "🎀", "💝", "🎊", "🎉"][Math.floor(Math.random() * 5)]
    }));
    setBalloons(newBalloons);
  };

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
      <div style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#ff758c,#ff7eb3)",
        color: "white",
        textAlign: "center",
        overflow: "hidden",
        position: "relative"
      }}>

        {/* Falling Flowers */}
        {flowers.map(f => (
          <motion.div
            key={f.id}
            initial={{ y: -100, x: `${f.left}vw`, opacity: 1 }}
            animate={{ y: "110vh", opacity: 0 }}
            transition={{ duration: 4, delay: f.delay, repeat: Infinity }}
            style={{ position: "absolute", fontSize: "30px", top: 0 }}
          >
            {f.emoji}
          </motion.div>
        ))}

        {/* Floating Balloons */}
        {balloons.map(b => (
          <motion.div
            key={b.id}
            initial={{ y: "110vh", x: `${b.left}vw`, opacity: 1 }}
            animate={{ y: -100, opacity: 0 }}
            transition={{ duration: 4, delay: b.delay, repeat: Infinity }}
            style={{ position: "absolute", fontSize: "35px", bottom: 0 }}
          >
            {b.emoji}
          </motion.div>
        ))}

        {/* Cat with flowers */}
        <motion.img
          src="/cat.jpg"
          alt="cat"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          style={{
            width: "200px",
            borderRadius: "50%",
            border: "5px solid white",
            marginBottom: "20px",
            zIndex: 1
          }}
        />

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ zIndex: 1 }}
        >
          <h1 style={{ fontSize: "45px" }}>GOOD GIRL ❤️</h1>
          <p style={{ fontSize: "22px", marginTop: "10px" }}>
            My beautiful Jonam… you just made my day 💕
          </p>
          <h2 style={{ marginTop: "15px" }}>
            I like you more than words can explain ✨
          </h2>
        </motion.div>

      </div>
    );
  }

  return (
    <div style={styles.container}>

      {/* 20 Floating Hearts */}
      {hearts.map(h => (
        <motion.div
          key={h.id}
          initial={{ y: "100vh", x: `${h.left}vw`, opacity: 1, scale: 1 }}
          animate={{ y: "-10vh", opacity: 0 }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3
          }}
          style={{
            position: "absolute",
            fontSize: `${h.size}px`,
            pointerEvents: "none",
            zIndex: 0
          }}
        >
          {h.emoji}
        </motion.div>
      ))}

      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 1 }}
      >
        Jonam… Do you like me? ❤️
      </motion.h1>

      <div style={{ marginTop: "20px", marginBottom: "30px", zIndex: 1 }}>
        <motion.button
          whileHover={{ scale: 1.2 }}
          style={styles.yes}
          onClick={handleYes}
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

      <p style={{ maxWidth: "500px", fontSize: "18px", color: "#7a0030", marginTop: "10px", zIndex: 1 }}>
        {text}
      </p>

      <div style={{ marginTop: "20px", zIndex: 1 }}>
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
    overflow: "hidden",
    position: "relative"
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