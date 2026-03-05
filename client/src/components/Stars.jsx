// ============================================================
// FILE: src/components/Stars.jsx
// ============================================================
export default function Stars({ r }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(r) ? "var(--gold)" : "var(--parchment)", fontSize:12 }}>★</span>
      ))}
    </span>
  );
}

