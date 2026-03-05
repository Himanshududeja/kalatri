// ============================================================
// FILE: src/components/ProductCard.jsx
// ============================================================
import { useState, useEffect } from "react";
import Stars from "./Stars";
import { useCart } from "../context/CartContext";

export default function ProductCard({ p, setPage, toast, i = 0 }) {
  const { dispatch } = useCart();
  const [small, setSmall] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const h = () => setSmall(window.innerWidth <= 480);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const disc = Math.round((p.mrp - p.price) / p.mrp * 100);

  return (
    <div
      className="product-card"
      style={{ animationDelay:`${i * 70}ms` }}
      onClick={() => setPage({ n:"product", d:p })}
    >
      {/* Image */}
      <div style={{ height: small?150:210, background:"linear-gradient(160deg,var(--warm),var(--parchment))", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", borderBottom:"1px solid var(--parchment)" }}>
        <span className="card-emoji" style={{ fontSize: small?56:80 }}>{p.emoji}</span>
        <div style={{ position:"absolute", top:12, left:0, background:"var(--ink)", color:"var(--cream)", fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:2, padding:"4px 10px", textTransform:"uppercase" }}>{p.badge}</div>
        <div style={{ position:"absolute", top:12, right:12, background:"var(--rust)", color:"var(--cream)", fontFamily:"'DM Mono',monospace", fontSize:9, padding:"3px 8px", letterSpacing:1 }}>−{disc}%</div>
      </div>

      {/* Info */}
      <div style={{ padding: small?"12px 12px 14px":"16px 18px 20px" }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--rust)", letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>{p.cat}</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: small?16:19, fontWeight:600, color:"var(--ink)", marginBottom: small?4:6, lineHeight:1.2 }}>{p.name}</div>
        {!small && <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:11, color:"var(--bark)", fontStyle:"italic", marginBottom:8, opacity:0.7 }}>{p.note}</div>}
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom: small?10:12 }}>
          <Stars r={p.rating} />
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--bark)" }}>({p.reviews})</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
          <div>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: small?18:22, fontWeight:700, color:"var(--ink)" }}>₹{p.price}</span>
            {!small && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"var(--parchment)", textDecoration:"line-through", marginLeft:6 }}>₹{p.mrp}</span>}
          </div>
          <button
            className="btn-ink"
            style={{ padding: small?"7px 10px":"8px 14px", fontSize:10 }}
            onClick={e => { e.stopPropagation(); dispatch({ type:"ADD", item:p }); toast(`Added — ${p.name}`); }}
          >
            <span>+ Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}