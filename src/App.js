import React, { useState, useEffect } from "react";
import "./App.css";

const PASSWORD = "12345";
const SESSION_TIME = 10 * 60; // 10 minutes

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(SESSION_TIME);
  const [timerActive, setTimerActive] = useState(false);
  const [lockedOut, setLockedOut] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [selectedTech, setSelectedTech] = useState("");

  // Countdown timer
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsLoggedIn(false);
      setLockedOut(true);
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleLogin = () => {
    if (lockedOut) {
      setError("Access Denied: Time Expired.");
      return;
    }
    if (password === PASSWORD) {
      setError("");
      setAnimating(true);
      setTimeout(() => {
        setIsLoggedIn(true);
        setTimerActive(true);
        setAnimating(false);
      }, 2500);
    } else {
      setError("Incorrect Password!");
    }
  };

  const handleExit = () => {
    setIsLoggedIn(false);
    setTimerActive(false);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleTechClick = (tech) => {
    setSelectedTech(tech);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <div className="login-screen">
          <h2>🔒 Lab Access</h2>
          {lockedOut ? (
            <p className="error">Access Denied: Time Expired.</p>
          ) : (
            <>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Enter</button>
              {error && <p className="error">{error}</p>}
            </>
          )}
          {animating && (
            <div className="animation">
              <div className="lock"></div>
              <div className="door left"></div>
              <div className="door right"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="lab-screen">
          <h2>🔬 Welcome to the Lab</h2>
          <p>Remaining Time: {formatTime(timeLeft)}</p>

          {/* Technology Buttons */}
          <div className="tech-buttons">
            <button onClick={() => handleTechClick("HTML")}>HTML</button>
            <button onClick={() => handleTechClick("CSS")}>CSS</button>
            <button onClick={() => handleTechClick("JavaScript")}>JavaScript</button>
            <button onClick={() => handleTechClick("React")}>React</button>
            <button onClick={() => handleTechClick("Node.js")}>Node.js</button>
          </div>

          {/* Show description */}
          {selectedTech && (
            <div className="tech-info">
              {selectedTech === "HTML" && <p>🌐 HTML → Frontend (Structure of web pages)</p>}
              {selectedTech === "CSS" && <p>🎨 CSS → Frontend (Styling and layouts)</p>}
              {selectedTech === "JavaScript" && <p>⚡ JavaScript → Frontend + Backend (Logic & interactivity)</p>}
              {selectedTech === "React" && <p>⚛️ React → Frontend (Component-based UI library)</p>}
              {selectedTech === "Node.js" && <p>🖥️ Node.js → Backend (Server-side runtime)</p>}
            </div>
          )}

          <button className="exit" onClick={handleExit}>Exit Lab</button>
        </div>
      )}
    </div>
  );
}

export default App;
