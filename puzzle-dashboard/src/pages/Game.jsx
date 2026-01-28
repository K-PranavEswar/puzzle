import { useState, useContext } from "react";
import PuzzleGrid from "../components/Puzzle/PuzzleGrid";
import { GameContext } from "../context/GameContext";
import "./Game.css";

export default function Game() {
  const { size, setSize } = useContext(GameContext);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="game-page-container">
      {/* Settings Panel */}
      <div className={`game-settings-panel ${showSettings ? "show" : ""}`}>
        <div className="settings-header">
          <h2>⚙️ Game Settings</h2>
          <button 
            className="settings-close" 
            onClick={() => setShowSettings(false)}
          >
            ✕
          </button>
        </div>

        <div className="settings-content">
          <div className="setting-group">
            <label htmlFor="grid-size" className="setting-label">
              📐 Grid Size
            </label>
            <div className="size-buttons">
              {[2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  className={`size-btn ${size === s ? "active" : ""}`}
                  onClick={() => setSize(s)}
                  title={`${s}x${s} Grid`}
                >
                  {s}x{s}
                </button>
              ))}
            </div>
          </div>

          <div className="setting-group">
            <p className="setting-description">
              🎮 Select puzzle difficulty by choosing grid size. Larger grids are more challenging!
            </p>
          </div>
        </div>
      </div>

      {/* Main Game Content */}
      <button 
        className="settings-toggle"
        onClick={() => setShowSettings(!showSettings)}
        title="Open settings"
      >
        ⚙️
      </button>

      {/* Game Grid */}
      <PuzzleGrid />

      {/* Background Decoration */}
      <div className="game-decoration decoration-1"></div>
      <div className="game-decoration decoration-2"></div>
      <div className="game-decoration decoration-3"></div>
    </div>
  );
}