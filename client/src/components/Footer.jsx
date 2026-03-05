// ============================================================
// FILE: src/components/Footer.jsx
// ============================================================
export default function Footer() {
  return (
    <footer style={{ background:"var(--ink)", color:"var(--cream)", padding:"36px 5vw", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16, borderTop:"2px solid var(--gold)" }}>
      <div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700 }}>Kalatri</div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:3, color:"var(--gold)", marginTop:3 }}>BY GAYATRI · KANPUR</div>
      </div>
      <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
        {["Instagram","WhatsApp","Email"].map(s => (
          <span key={s} style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:1.5, color:"#9A8C76", cursor:"pointer", textTransform:"uppercase", transition:"color .2s" }}
            onMouseEnter={e => e.target.style.color = "var(--gold)"}
            onMouseLeave={e => e.target.style.color = "#9A8C76"}>
            {s}
          </span>
        ))}
      </div>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"#9A8C76", letterSpacing:1 }}>© 2024 Kalatri</div>
    </footer>
  );
}
