export default function Modal({ show, title, children, onClose }) {
  if (!show) return null

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{title}</h3>
        <div>{children}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
