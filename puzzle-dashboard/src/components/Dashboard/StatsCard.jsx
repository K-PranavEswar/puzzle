export default function StatsCard({ label, value }) {
  return (
    <div className="card">
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  )
}
