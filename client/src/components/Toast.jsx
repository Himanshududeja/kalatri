
// FILE: src/components/Toast.jsx
// ============================================================
export default function Toast({ msg, onClose }) {
  return (
    <div className="toast-wrap" onClick={onClose}>
      <span style={{ color:"var(--gold)", marginRight:10 }}>✦</span>
      {msg}
    </div>
  );
}




