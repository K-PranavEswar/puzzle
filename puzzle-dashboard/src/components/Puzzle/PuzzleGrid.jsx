import React, { useEffect, useState, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameContext } from "../../context/GameContext";

// --- ADVANCED MATH & LOGIC ---
const generateSolvedGrid = (size) => {
  const arr = Array.from({ length: size * size - 1 }, (_, i) => i + 1);
  arr.push(0);
  return arr;
};

const isSolved = (grid) => 
  grid.every((val, i) => (val === 0 ? i === grid.length - 1 : val === i + 1));

const getInversions = (grid) => {
  let inv = 0;
  const flat = grid.filter(n => n !== 0);
  for (let i = 0; i < flat.length; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i] > flat[j]) inv++;
    }
  }
  return inv;
};

const isSolvable = (grid, size) => {
  const inv = getInversions(grid);
  if (size % 2 !== 0) return inv % 2 === 0;
  const emptyRowFromBottom = size - Math.floor(grid.indexOf(0) / size);
  return emptyRowFromBottom % 2 === 0 ? inv % 2 !== 0 : inv % 2 === 0;
};

const shuffleGrid = (size) => {
  let grid;
  do {
    grid = [...generateSolvedGrid(size)].sort(() => Math.random() - 0.5);
  } while (!isSolvable(grid, size) || isSolved(grid));
  return grid;
};

// --- ENHANCED DESIGN SYSTEM ---
const theme = {
  accent: "#6366f1",
  success: "#10b981",
  warning: "#f59e0b",
  background: "radial-gradient(circle at top, #1e1b4b 0%, #0f172a 100%)",
  glass: "rgba(30, 41, 59, 0.4)",
  textMain: "#f8fafc",
  textMuted: "#94a3b8",
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: theme.background,
    color: theme.textMain,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: theme.glass,
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "32px",
    padding: "32px",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    position: "relative",
    overflow: "hidden",
  },
  statBox: {
    background: "rgba(15, 23, 42, 0.6)",
    borderRadius: "16px",
    padding: "12px 20px",
    border: "1px solid rgba(255,255,255,0.05)",
    textAlign: "center",
    flex: 1,
  },
  grid: (size) => ({
    display: "grid",
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gap: "12px",
    aspectRatio: "1/1",
    margin: "24px 0",
    perspective: "1000px",
  }),
  button: {
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    transition: "all 0.2s ease",
  }
};

// --- MAIN COMPONENT ---
export default function PuzzleGrid() {
  const context = useContext(GameContext);
  const size = context?.size || 3;

  const [grid, setGrid] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let interval;
    if (gameState === "playing") {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const initGame = useCallback(() => {
    setGrid(shuffleGrid(size));
    setMoves(0);
    setSeconds(0);
    setHistory([]);
    setGameState("playing");
  }, [size]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleMove = (index) => {
    if (gameState !== "playing") return;
    const emptyIdx = grid.indexOf(0);
    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(emptyIdx / size);
    const emptyCol = emptyIdx % size;

    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
      const newGrid = [...grid];
      [newGrid[emptyIdx], newGrid[index]] = [newGrid[index], newGrid[emptyIdx]];
      setHistory(prev => [...prev, grid]);
      setGrid(newGrid);
      setMoves(m => m + 1);
      if (isSolved(newGrid)) setGameState("won");
    }
  };

  const undo = () => {
    if (history.length > 0) {
      setGrid(history[history.length - 1]);
      setHistory(prev => prev.slice(0, -1));
      setMoves(m => m - 1);
    }
  };

  const completion = Math.round((grid.filter((v, i) => v !== 0 && v === i + 1).length / (size * size - 1)) * 100);

  return (
    <div style={styles.wrapper}>
      {/* Dynamic Background Element */}
      <div style={{ position: "fixed", top: "10%", left: "10%", width: "300px", height: "300px", background: theme.accent, filter: "blur(150px)", opacity: 0.15, borderRadius: "50%", zIndex: 0 }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={styles.card}>
        <header style={{ textAlign: "center", marginBottom: "24px" }}>
          <motion.h1 
             animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
             transition={{ duration: 5, repeat: Infinity }}
             style={{ fontSize: "2rem", fontWeight: "900", letterSpacing: "-1px", marginBottom: "4px", background: `linear-gradient(90deg, ${theme.accent}, #a855f7, ${theme.accent})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            PUZZLE MAZE
          </motion.h1>
          <p style={{ color: theme.textMuted, fontSize: "0.85rem", fontWeight: "500" }}>{size}x{size} Strategic Logic</p>
        </header>

        {/* Improved Stats Section */}
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={styles.statBox}>
            <span style={{ fontSize: "0.7rem", color: theme.textMuted, display: "block" }}>MOVES</span>
            <span style={{ fontSize: "1.1rem", fontWeight: "800", color: theme.accent }}>{moves}</span>
          </div>
          <div style={styles.statBox}>
            <span style={{ fontSize: "0.7rem", color: theme.textMuted, display: "block" }}>TIME</span>
            <span style={{ fontSize: "1.1rem", fontWeight: "800" }}>{Math.floor(seconds/60)}:{(seconds%60).toString().padStart(2, '0')}</span>
          </div>
          <div style={styles.statBox}>
            <span style={{ fontSize: "0.7rem", color: theme.textMuted, display: "block" }}>DONE</span>
            <span style={{ fontSize: "1.1rem", fontWeight: "800", color: theme.success }}>{completion}%</span>
          </div>
        </div>

        {/* Interactive Grid */}
        <div style={styles.grid(size)}>
          <AnimatePresence mode="popLayout">
            {grid.map((val, idx) => {
              const isCorrect = val !== 0 && val === idx + 1;
              return (
                <motion.div
                  key={val}
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={val !== 0 ? { scale: 1.02, y: -2 } : {}}
                  whileTap={val !== 0 ? { scale: 0.96 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  onClick={() => handleMove(idx)}
                  style={{
                    background: val === 0 ? "transparent" : isCorrect 
                      ? `linear-gradient(145deg, ${theme.success}, #065f46)` 
                      : `linear-gradient(145deg, #312e81, #1e1b4b)`,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    fontWeight: "800",
                    cursor: val === 0 ? "default" : "pointer",
                    boxShadow: val === 0 ? "inset 0 2px 10px rgba(0,0,0,0.4)" : "0 8px 20px rgba(0,0,0,0.3)",
                    border: isCorrect ? `2px solid ${theme.success}` : "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                    position: "relative"
                  }}
                >
                  {val !== 0 && val}
                  {isCorrect && (
                    <motion.div 
                      layoutId="correct-indicator"
                      style={{ position: "absolute", top: 6, right: 6, width: 6, height: 6, background: "#fff", borderRadius: "50%" }} 
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Sleek Progress Bar */}
        <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "10px", overflow: "hidden", marginBottom: "24px" }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={{ type: "spring", bounce: 0 }}
            style={{ height: "100%", background: `linear-gradient(90deg, ${theme.accent}, #818cf8)` }}
          />
        </div>

        {/* Action Controls */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <motion.button 
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={undo} disabled={history.length === 0}
            style={{ ...styles.button, background: "rgba(255,255,255,0.05)", color: theme.textMain, opacity: history.length ? 1 : 0.4 }}>
            ↺ Undo
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={initGame}
            style={{ ...styles.button, background: theme.accent, color: "white", boxShadow: `0 10px 20px -5px ${theme.accent}66` }}>
            ⟳ Reset
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced Victory Modal */}
      <AnimatePresence>
        {gameState === "won" && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(10, 10, 20, 0.9)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" }}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }}
              style={{ background: "#1e293b", padding: "48px", borderRadius: "40px", textAlign: "center", maxWidth: "400px", border: `1px solid ${theme.success}44` }}>
              <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🏆</div>
              <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "8px" }}>Legendary!</h2>
              <p style={{ color: theme.textMuted, lineHeight: "1.6", marginBottom: "32px" }}>
                You mastered the maze in <strong>{moves}</strong> moves within <strong>{Math.floor(seconds/60)}m {seconds%60}s</strong>.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={initGame}
                style={{ ...styles.button, background: theme.success, color: "white", width: "100%", boxShadow: `0 10px 20px -5px ${theme.success}66` }}>
                Start New Maze
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}