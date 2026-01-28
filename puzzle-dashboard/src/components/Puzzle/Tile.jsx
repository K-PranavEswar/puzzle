import React, { useState } from "react";
import "./Tile.css";

export default function Tile({ value, onClick, size, showHints }) {
  const isZero = value === 0;
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = (e) => {
    if (!isZero) {
      setIsPressed(true);
      e.currentTarget.classList.add("tile-pressed");
    }
  };

  const handleMouseUp = (e) => {
    if (!isZero) {
      setIsPressed(false);
      e.currentTarget.classList.remove("tile-pressed");
    }
  };

  const handleTouchStart = (e) => {
    if (!isZero) {
      setIsPressed(true);
      e.currentTarget.classList.add("tile-pressed");
    }
  };

  const handleTouchEnd = (e) => {
    if (!isZero) {
      setIsPressed(false);
      e.currentTarget.classList.remove("tile-pressed");
    }
  };

  return (
    <button
      className={`puzzle-tile ${isZero ? "tile-empty" : "tile-active"} ${showHints ? "tile-hint" : ""} ${isPressed ? "tile-pressed" : ""}`}
      onClick={!isZero ? onClick : undefined}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      disabled={isZero}
      aria-label={isZero ? "Empty slot" : `Tile number ${value}`}
      style={{
        fontSize: `calc(min(75vw, 400px) / ${size} * 0.35)`,
      }}
    >
      {!isZero && <span className="tile-number">{value}</span>}
    </button>
  );
}