import { useState, useContext, useEffect } from "react";
import { GameProvider, GameContext } from "./context/GameContext";
import Game from "./pages/Game";

function AppContent() {
  const { size, setSize } = useContext(GameContext);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showSettings ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showSettings]);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background: #020617;
          color: white;
          font-family: system-ui, sans-serif;
        }

        .app-header {
          position: sticky;
          top: 0;
          z-index: 20;
          background: linear-gradient(90deg, #020617, #0f172a);
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.6);
        }

        .logo {
          font-size: 22px;
          font-weight: 800;
        }

        .settings-toggle {
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
          font-size: 22px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
        }

        .settings-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 300px;
          height: 100%;
          background: linear-gradient(180deg, #111827, #020617);
          transform: translateX(100%);
          transition: transform 0.35s ease;
          z-index: 30;
          padding: 24px;
          box-shadow: -8px 0 40px rgba(0,0,0,0.7);
        }

        .settings-sidebar.show {
          transform: translateX(0);
        }

        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .close-x {
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
        }

        .settings-content {
          margin-top: 30px;
        }

        .setting-label {
          font-weight: 600;
          margin-bottom: 12px;
          display: block;
        }

        .size-buttons {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .size-btn {
          padding: 12px;
          border-radius: 10px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        .size-btn.active {
          background: linear-gradient(135deg, #6366f1, #22d3ee);
          color: #020617;
          font-weight: 700;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 25;
        }

        footer {
          text-align: center;
          padding: 14px;
          font-size: 13px;
          opacity: 0.85;
        }
      `}</style>

      {showSettings && (
        <div className="overlay" onClick={() => setShowSettings(false)} />
      )}

      <div className={`settings-sidebar ${showSettings ? "show" : ""}`}>
        <div className="settings-header">
          <h2>⚙️ Game Settings</h2>
          <button className="close-x" onClick={() => setShowSettings(false)}>
            ✕
          </button>
        </div>

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
        </div>
      </div>

      <header className="app-header">
        <div className="logo">Puzzle Master</div>
        <button className="settings-toggle" onClick={() => setShowSettings(true)}>
          ⚙️
        </button>
      </header>

      <Game />

      <footer>© 2026 Puzzle Master | Brain Training Game</footer>
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
