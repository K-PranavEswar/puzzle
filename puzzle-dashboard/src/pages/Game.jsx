import { useState, useContext, useEffect } from "react";
import PuzzleGrid from "../components/Puzzle/PuzzleGrid";
import { GameContext } from "../context/GameContext";

export default function Game() {
  const { size, setSize } = useContext(GameContext);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showSettings ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showSettings]);

  return (
    <>
      <style>{`
        .game-page-container {
          min-height: 100vh;
          background: radial-gradient(circle at top, #1f2933, #0f172a);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: system-ui, sans-serif;
        }

        .game-main-content {
          z-index: 2;
        }

        .settings-toggle {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 5;
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
          font-size: 22px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          backdrop-filter: blur(8px);
        }

        .game-settings-panel {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 300px;
          background: linear-gradient(180deg, #111827, #020617);
          transform: translateX(-100%);
          transition: transform 0.35s ease;
          z-index: 10;
          padding: 24px;
          box-shadow: 8px 0 40px rgba(0,0,0,0.6);
        }

        .game-settings-panel.show {
          transform: translateX(0);
        }

        .settings-header h2 {
          margin: 0 0 20px 0;
          font-size: 22px;
        }

        .sidebar-close-x {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
          font-size: 22px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: grid;
          place-items: center;
        }

        .settings-content {
          margin-top: 40px;
        }

        .setting-label {
          display: block;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .size-buttons {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .size-btn {
          padding: 12px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          border-radius: 10px;
          cursor: pointer;
          font-size: 16px;
        }

        .size-btn.active {
          background: linear-gradient(135deg, #6366f1, #22d3ee);
          color: #020617;
          font-weight: 700;
        }

        .setting-description {
          margin-top: 20px;
          font-size: 14px;
          opacity: 0.85;
        }

        .game-decoration {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }

        .decoration-1 {
          width: 300px;
          height: 300px;
          background: #6366f1;
          top: -100px;
          right: -100px;
        }

        .decoration-2 {
          width: 250px;
          height: 250px;
          background: #22d3ee;
          bottom: -80px;
          left: -80px;
        }

        .decoration-3 {
          width: 200px;
          height: 200px;
          background: #ec4899;
          bottom: 40%;
          right: -100px;
        }
      `}</style>

      <div className="game-page-container">
        <div
          className={`game-settings-panel ${showSettings ? "show" : ""}`}
          role="dialog"
          aria-hidden={!showSettings}
        >
          <div className="settings-header">
            <h2>⚙️ Game Settings</h2>
          </div>

          <button
            className="sidebar-close-x"
            onClick={() => setShowSettings(false)}
          >
            ✕
          </button>

          <div className="settings-content">
            <label className="setting-label">📐 Grid Size</label>

            <div className="size-buttons">
              {[2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  className={`size-btn ${size === s ? "active" : ""}`}
                  onClick={() => {
                    setSize(s);
                    setShowSettings(false);
                  }}
                >
                  {s} × {s}
                </button>
              ))}
            </div>

            <p className="setting-description">
              🎮 Larger grids increase difficulty and strategy.
            </p>
          </div>
        </div>

        <button
          className="settings-toggle"
          onClick={() => setShowSettings(true)}
        >
          ⚙️
        </button>

        <div className="game-main-content">
          <PuzzleGrid />
        </div>

        <div className="game-decoration decoration-1"></div>
        <div className="game-decoration decoration-2"></div>
        <div className="game-decoration decoration-3"></div>
      </div>
    </>
  );
}
