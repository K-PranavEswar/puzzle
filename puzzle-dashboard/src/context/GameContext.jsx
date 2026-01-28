import { createContext, useState, useCallback, useEffect } from "react";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [size, setSize] = useState(3);
  const [gameMode, setGameMode] = useState("classic"); // classic, timed, endless
  const [difficulty, setDifficulty] = useState("normal"); // easy, normal, hard
  const [theme, setTheme] = useState("light"); // light, dark
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [stats, setStats] = useState({
    totalGames: 0,
    totalWins: 0,
    totalMoves: 0,
    totalTime: 0,
    averageTime: 0,
    bestTime: null,
    bestMoves: null,
  });

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem("gameStats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Save stats to localStorage
  const updateStats = useCallback(
    (newStats) => {
      setStats((prevStats) => {
        const updated = { ...prevStats, ...newStats };
        localStorage.setItem("gameStats", JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const resetStats = useCallback(() => {
    const defaultStats = {
      totalGames: 0,
      totalWins: 0,
      totalMoves: 0,
      totalTime: 0,
      averageTime: 0,
      bestTime: null,
      bestMoves: null,
    };
    setStats(defaultStats);
    localStorage.removeItem("gameStats");
  }, []);

  const value = {
    size,
    setSize,
    gameMode,
    setGameMode,
    difficulty,
    setDifficulty,
    theme,
    setTheme,
    soundEnabled,
    setSoundEnabled,
    stats,
    updateStats,
    resetStats,
  };

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  );
}
