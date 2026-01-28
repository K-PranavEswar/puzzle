import React, { useEffect, useState, useCallback, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameContext } from "../../context/GameContext";

// --- Advanced Logic: Solvability & Mechanics ---
const generateSolvedGrid = (size) => {
  const arr = Array.from({ length: size * size - 1 }, (_, i) => i + 1);
  arr.push(0);
  return arr;
};

const isSolved = (grid) => grid.every((val, i) => (val === 0 ? i === grid.length - 1 : val === i + 1));

const getInversions = (grid) => {
  let inv = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = i + 1; j < grid.length; j++) {
      if (grid[i] && grid[j] && grid[i] > grid[j]) inv++;
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
    grid = generateSolvedGrid(size).sort(() => Math.random() - 0.5);
  } while (!isSolvable(grid, size) || isSolved(grid));
  return grid;
};

// Calculate completion percentage
const getCompletionPercentage = (grid, size) => {
  const correct = grid.filter((v, i) => v !== 0 && v === i + 1).length;
  return Math.round((correct / (size * size - 1)) * 100);
};

// --- Premium UI Styles Object ---
const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0e27 0%, #1a1a3e 50%, #0f172a 100%)",
    color: "#f8fafc",
    fontFamily: "'Inter', -apple-system, sans-serif",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowX: "hidden",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: "radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
      pointerEvents: "none",
    }
  },
  glassCard: {
    background: "rgba(15, 23, 42, 0.7)",
    backdropFilter: "blur(20px)",
    borderRadius: "28px",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    boxShadow: "0 30px 60px -20px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
    padding: "32px",
    width: "100%",
    maxWidth: "600px",
    "@media (max-width: 640px)": {
      padding: "20px",
      borderRadius: "20px",
    }
  },
  gridContainer: (size) => ({
    display: "grid",
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gap: "14px",
    background: "linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(99, 102, 241, 0.05) 100%)",
    padding: "20px",
    borderRadius: "24px",
    aspectRatio: "1/1",
    position: "relative",
    boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.4)",
  }),
  tile: (isEmpty, size, isCorrect) => ({
    background: isEmpty 
      ? "rgba(255, 255, 255, 0.02)"
      : isCorrect
      ? "linear-gradient(145deg, #10b981, #059669)"
      : "linear-gradient(145deg, #6366f1, #4f46e5)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size > 4 ? "1.1rem" : "1.6rem",
    fontWeight: "800",
    color: isEmpty ? "rgba(255,255,255,0.1)" : "white",
    cursor: isEmpty ? "default" : "pointer",
    boxShadow: isEmpty 
      ? "inset 0 2px 4px rgba(0,0,0,0.2)"
      : `0 8px 20px ${isCorrect ? "rgba(16, 185, 129, 0.4)" : "rgba(99, 102, 241, 0.4)"}`,
    userSelect: "none",
    position: "relative",
    border: isEmpty ? "1px solid rgba(255,255,255,0.05)" : `2px solid rgba(255,255,255,${isCorrect ? "0.6" : "0.2"})`,
    transition: "all 0.3s ease",
  }),
  statBadge: {
    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)",
    padding: "14px 20px",
    borderRadius: "16px",
    textAlign: "center",
    flex: 1,
    border: "1px solid rgba(148, 163, 184, 0.2)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  goalStateContainer: {
    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)",
    borderRadius: "20px",
    padding: "20px",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    marginTop: "24px",
  },
  goalGrid: (size) => ({
    display: "grid",
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gap: "8px",
    background: "rgba(0, 0, 0, 0.2)",
    padding: "12px",
    borderRadius: "16px",
    aspectRatio: "1/1",
  }),
  goalTile: {
    background: "linear-gradient(145deg, #10b981, #059669)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "900",
    color: "white",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
    border: "1px solid rgba(255,255,255,0.3)",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #818cf8, #6366f1)",
    border: "none",
    padding: "14px 28px",
    borderRadius: "12px",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
    fontSize: "0.95rem",
  },
  progressBar: {
    width: "100%",
    height: "8px",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid rgba(99, 102, 241, 0.2)",
  },
  progressFill: (percentage) => ({
    height: "100%",
    background: `linear-gradient(90deg, #6366f1, #a78bfa)`,
    width: `${percentage}%`,
    transition: "width 0.4s ease",
    boxShadow: "0 0 10px rgba(99, 102, 241, 0.6)",
  })
};

// --- Tile Component with Framer Motion ---
const PuzzleTile = ({ val, idx, size, onClick, isCorrect }) => {
  const isEmpty = val === 0;
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={styles.tile(isEmpty, size, isCorrect)}
      onClick={onClick}
      whileHover={!isEmpty ? { scale: 1.08, filter: "brightness(1.2)", translateY: -4 } : {}}
      whileTap={!isEmpty ? { scale: 0.92, translateY: 2 } : {}}
      animate={isCorrect ? { boxShadow: "0 0 20px rgba(16, 185, 129, 0.6)" } : {}}
    >
      {!isEmpty && (
        <>
          <span>{val}</span>
          <AnimatePresence>
            {isCorrect && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  position: "absolute", top: 6, right: 6, 
                  width: 12, height: 12, background: "#fbbf24", borderRadius: "50%",
                  boxShadow: "0 0 8px rgba(251, 191, 36, 0.8)"
                }} 
              />
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};

// --- Goal State Tile Component ---
const GoalStateTile = ({ val, size }) => {
  const isEmpty = val === 0;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={isEmpty ? { ...styles.goalTile, opacity: 0.3 } : styles.goalTile}
    >
      {!isEmpty && <span>{val}</span>}
    </motion.div>
  );
};

export default function PuzzleGrid() {
  const { size = 3 } = useContext(GameContext) || {};
  const [grid, setGrid] = useState([]);
  const [history, setHistory] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [gameState, setGameState] = useState("idle"); // idle, playing, won
  const [isMuted, setIsMuted] = useState(false);
  const [solvedGrid, setSolvedGrid] = useState([]);

  // Initialize Game
  const initGame = useCallback(() => {
    const solved = generateSolvedGrid(size);
    setSolvedGrid(solved);
    setGrid(shuffleGrid(size));
    setMoves(0);
    setSeconds(0);
    setHistory([]);
    setGameState("playing");
  }, [size]);

  useEffect(() => { initGame(); }, [initGame]);

  // Timer Logic
  useEffect(() => {
    let timer;
    if (gameState === "playing") {
      timer = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const handleMove = (index) => {
    if (gameState !== "playing") return;

    const emptyIdx = grid.indexOf(0);
    const size_int = parseInt(size);
    const row = Math.floor(index / size_int);
    const col = index % size_int;
    const emptyRow = Math.floor(emptyIdx / size_int);
    const emptyCol = emptyIdx % size_int;

    const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;

    if (isAdjacent) {
      const newGrid = [...grid];
      [newGrid[emptyIdx], newGrid[index]] = [newGrid[index], newGrid[emptyIdx]];
      
      setHistory(prev => [...prev, grid]);
      setGrid(newGrid);
      setMoves(m => m + 1);

      if (isSolved(newGrid)) setGameState("won");
    }
  };

  const undoMove = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setGrid(lastState);
    setHistory(history.slice(0, -1));
    setMoves(m => m - 1);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const completion = getCompletionPercentage(grid, size);

  return (
    <div style={styles.wrapper}>
      {/* Animated Background Elements */}
      <motion.div 
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "-100px",
          left: "-100px",
          zIndex: 0,
        }}
        animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Header Info */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "32px", zIndex: 10, position: "relative" }}
      >
        <motion.h1 
          style={{ 
            fontSize: "clamp(2rem, 8vw, 3.5rem)", 
            fontWeight: "900", 
            margin: 0, 
            background: "linear-gradient(135deg, #6366f1, #a78bfa, #6366f1)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px"
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          PUZZLE MAZE
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.2 }}
          style={{ color: "#94a3b8", letterSpacing: "3px", fontSize: "0.95rem", marginTop: "8px" }}
        >
          DIMENSION: {size}×{size} • CHALLENGE MODE
        </motion.p>
      </motion.div>

      {/* Main Game Card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ ...styles.glassCard, zIndex: 10, position: "relative" }}
      >
        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
          <motion.div 
            style={styles.statBadge}
            whileHover={{ translateY: -4 }}
          >
            <motion.div style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>
              📍 Moves
            </motion.div>
            <motion.div 
              style={{ fontSize: "1.8rem", fontWeight: "900", color: "#6366f1" }}
              key={moves}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {moves}
            </motion.div>
          </motion.div>

          <motion.div 
            style={styles.statBadge}
            whileHover={{ translateY: -4 }}
          >
            <motion.div style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>
              ⏱️ Time
            </motion.div>
            <motion.div style={{ fontSize: "1.8rem", fontWeight: "900", color: "#f59e0b" }}>
              {formatTime(seconds)}
            </motion.div>
          </motion.div>

          <motion.div 
            style={styles.statBadge}
            whileHover={{ translateY: -4 }}
          >
            <motion.div style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>
              ✨ Rank
            </motion.div>
            <motion.div 
              style={{ fontSize: "1.8rem", fontWeight: "900", color: "#fbbf24" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              {completion < 25 ? "D" : completion < 50 ? "C" : completion < 75 ? "B" : completion < 95 ? "A" : "S"}
            </motion.div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: "600" }}>PROGRESS</span>
            <span style={{ fontSize: "0.9rem", color: "#6366f1", fontWeight: "700" }}>{completion}%</span>
          </div>
          <div style={styles.progressBar}>
            <motion.div 
              style={styles.progressFill(completion)}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            />
          </div>
        </div>

        {/* Current Grid Area */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600", marginBottom: "12px" }}>Current State</p>
          <div style={styles.gridContainer(size)}>
            {grid.map((val, idx) => (
              <PuzzleTile 
                key={`${idx}-${val}`}
                val={val}
                idx={idx}
                size={size}
                onClick={() => handleMove(idx)}
                isCorrect={val !== 0 && val === idx + 1}
              />
            ))}

            {/* Win Overlay */}
            <AnimatePresence>
              {gameState === "won" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    position: "absolute", inset: 0, background: "rgba(16, 185, 129, 0.95)",
                    borderRadius: "20px", display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", zIndex: 20,
                    backdropFilter: "blur(12px)", gap: "16px"
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span style={{ fontSize: "3rem" }}>🎉</span>
                  </motion.div>
                  <h2 style={{ fontSize: "2.2rem", margin: 0, fontWeight: "900" }}>EXCELLENT!</h2>
                  <p style={{ margin: 0, fontSize: "1.1rem", opacity: 0.95 }}>Puzzle synchronized in {formatTime(seconds)}</p>
                  <p style={{ margin: 0, fontSize: "0.95rem", opacity: 0.8 }}>{moves} moves • {Math.round((size*size-1)/moves).toFixed(1)} avg</p>
                  <motion.button 
                    onClick={initGame} 
                    style={{ ...styles.btnPrimary, background: "white", color: "#10b981", marginTop: "12px" }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🚀 NEXT DIMENSION
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Goal State Display */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={styles.goalStateContainer}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span style={{ fontSize: "1.2rem" }}>🎯</span>
            <p style={{ fontSize: "0.8rem", color: "#10b981", textTransform: "uppercase", fontWeight: "700", margin: 0 }}>Goal State - Solve This</p>
          </div>
          <div style={styles.goalGrid(size)}>
            {solvedGrid.map((val, idx) => (
              <GoalStateTile key={`goal-${idx}`} val={val} size={size} />
            ))}
          </div>
        </motion.div>

        {/* Action Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "24px" }}>
          <motion.button 
            onClick={undoMove} 
            disabled={history.length === 0} 
            style={{ 
              background: "transparent", 
              border: "1.5px solid rgba(99, 102, 241, 0.4)", 
              color: history.length === 0 ? "#64748b" : "#a78bfa",
              padding: "12px 20px", 
              borderRadius: "12px", 
              cursor: history.length === 0 ? "not-allowed" : "pointer", 
              opacity: history.length === 0 ? 0.4 : 1,
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
            whileHover={history.length > 0 ? { scale: 1.05, borderColor: "rgba(168, 85, 247, 0.6)" } : {}}
            whileTap={history.length > 0 ? { scale: 0.95 } : {}}
          >
            ↶ Undo
          </motion.button>

          <motion.button 
            onClick={initGame} 
            style={styles.btnPrimary}
            whileHover={{ scale: 1.05, boxShadow: "0 12px 28px rgba(99, 102, 241, 0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            🔀 Shuffle
          </motion.button>
        </div>
      </motion.div>

      {/* Responsive Footer Info */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: "32px", color: "#475569", fontSize: "0.85rem", textAlign: "center", maxWidth: "600px", zIndex: 10 }}
      >
        <p style={{ margin: "8px 0", fontWeight: "500" }}>💡 Tip: Click tiles adjacent to the empty space to move them!</p>
        <div style={{ display: "flex", gap: "20px", marginTop: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <span>✓ Accuracy: <strong>{completion}%</strong></span>
          <span>⚡ Performance: <strong>{moves === 0 ? "Ready" : "Active"}</strong></span>
        </div>
      </motion.footer>
    </div>
  );
}