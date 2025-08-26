import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const CORRECT_PASSWORD = "12345";
  const INITIAL_TIME = 10 * 60; // 10 minutes

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timer;
    if (isAuthenticated && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    if (timeLeft === 0) {
      setIsAuthenticated(false);
      setError("⏳ Time expired! Access denied.");
    }
    return () => clearInterval(timer);
  }, [isAuthenticated, timeLeft]);

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD && timeLeft > 0) {
      setError("");
      setIsAnimating(true); // start animation
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsAnimating(false);
      }, 3000); // animation duration (3s)
    } else {
      setError("❌ Wrong password or time expired.");
    }
    setPassword("");
  };

  const handleExit = () => {
    setIsAuthenticated(false);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="container">
      {isAnimating ? (
        <div className="animation-screen">
          <div className="lock-icon">🔒</div>
          <div className="door left-door"></div>
          <div className="door right-door"></div>
        </div>
      ) : !isAuthenticated ? (
        <div className="login-screen">
          <h1 className="title">🔒 Lab Entry</h1>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Enter</button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div className="lab-screen">
          <div className="top-bar">
            <p>⏱ Time left: {formatTime(timeLeft)}</p>
            <button className="exit-btn" onClick={handleExit}>
              🚪 Exit
            </button>
          </div>
          <h2 className="lab-title">🧑‍💻 Welcome to the Lab</h2>
          <div className="tech-buttons">
            <button className="tech">HTML</button>
            <button className="tech">CSS</button>
            <button className="tech">JavaScript</button>
            <button className="tech">React</button>
            <button className="tech">Node.js</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
