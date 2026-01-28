import React, { useState, useContext } from "react";
import { GameContext, GameProvider } from "./context/GameContext";
import Game from "./pages/Game";
import "./App.css";

function AppContent() {
  const gameContext = useContext(GameContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo-icon">🧩</span>
            <h1 className="logo-text">Puzzle Master</h1>
          </div>
        </div>
      </header>

      {/* Main Game Content */}
      <main className="app-main">
        <Game />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2026 Puzzle Master Game | Designed with ❤️ for Brain Training</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}