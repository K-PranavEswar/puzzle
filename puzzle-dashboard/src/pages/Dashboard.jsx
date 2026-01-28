import Clock from "../components/Dashboard/Clock"

export default function Dashboard() {
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: "'Inter', sans-serif",
    padding: "20px",
    boxSizing: "border-box"
  };

  const cardStyle = {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px"
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ fontSize: "2rem", color: "#1e293b", margin: "0 0 10px 0" }}>
          Puzzle Game
        </h1>
        <div style={{ marginBottom: "20px" }}>
          <Clock />
        </div>
        
        <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6" }}>
          Welcome back! Ready to sharpen your mind? Select a difficulty and start playing.
        </p>

        <a href="/game" style={navButtonStyle}>
          Go to Game
        </a>
      </div>
    </div>
  )
}

const navButtonStyle = {
  display: "inline-block",
  marginTop: "20px",
  padding: "12px 24px",
  backgroundColor: "#6366f1",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "12px",
  fontWeight: "700",
  boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
  transition: "transform 0.2s"
};