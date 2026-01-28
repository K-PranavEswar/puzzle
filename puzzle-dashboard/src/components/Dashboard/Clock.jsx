import { useEffect, useState } from "react"

export default function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const clockStyle = {
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "#64748b",
    margin: "0",
    fontFamily: "'Inter', sans-serif"
  };

  return <h3 style={clockStyle}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</h3>
}