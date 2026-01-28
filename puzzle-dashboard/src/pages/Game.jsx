import PuzzleGrid from "../components/Puzzle/PuzzleGrid";

export default function Game() {
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
        <PuzzleGrid />
        <div className="game-decoration decoration-1" />
        <div className="game-decoration decoration-2" />
        <div className="game-decoration decoration-3" />
      </div>
    </>
  );
}
