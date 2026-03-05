// ============================================================
// FILE: src/pages/ProductDetail.jsx
// ============================================================
import { useState, useEffect } from "react";
import Stars from "../components/Stars";
import { useCart } from "../context/CartContext";

export default function ProductDetail({ p, setPage, toast }) {
  const [qty, setQty] = useState(1);
  const [mob, setMob] = useState(window.innerWidth <= 768);
  const { dispatch }  = useCart();

  useEffect(() => {
    const h = () => setMob(window.innerWidth <= 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const disc = Math.round((p.mrp - p.price) / p.mrp * 100);

  return (
    <div className="texture-bg page-pad">
      <button className="nav-link" style={{ marginBottom:24, fontSize:10 }} onClick={() => setPage("products")}>← Back to shop</button>
      <div className="two-col" style={{ maxWidth:1000, margin:"0 auto" }}>
        {/* Image */}
        <div className="scaleIn">
          <div style={{ height: mob?240:420, background:"linear-gradient(160deg,var(--warm),var(--parchment))", display:"flex", alignItems:"center", justifyContent:"center", fontSize: mob?80:130, position:"relative", boxShadow:"8px 16px 48px var(--shadow)", border:"1px solid var(--parchment)" }}>
            <span style={{ animation:"floatY 4s ease infinite" }}>{p.emoji}</span>
            <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"var(--ink)", padding:"10px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:2, color:"var(--gold)", textTransform:"uppercase" }}>{p.badge}</span>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--rust)", letterSpacing:1 }}>−{disc}% off</span>
            </div>
          </div>
          <div style={{ background:"var(--warm)", border:"1px solid var(--parchment)", borderTop:"none", padding:"12px 16px", fontFamily:"'Libre Baskerville',serif", fontSize:12, color:"var(--bark)", fontStyle:"italic" }}>✦ {p.note}</div>
          {/* Thumbnails (desktop) */}
          <div style={{ display: mob?"none":"flex", gap:8, marginTop:8 }}>
            {[0,1,2].map(i => <div key={i} style={{ flex:1, height:64, background:"linear-gradient(160deg,var(--warm),var(--parchment))", border:"1px solid var(--parchment)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, cursor:"pointer" }}>{p.emoji}</div>)}
          </div>
        </div>

        {/* Info */}
        <div className="fadeIn">
          <span className="tag-mono">{p.cat}</span>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:600, color:"var(--ink)", margin:"8px 0 10px", lineHeight:1.15, letterSpacing:-.5 }}>{p.name}</h1>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
            <Stars r={p.rating} />
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"var(--bark)", letterSpacing:.5 }}>{p.rating} · {p.reviews} reviews</span>
          </div>
          <div style={{ borderTop:"1px solid var(--parchment)", borderBottom:"1px solid var(--parchment)", padding:"16px 0", marginBottom:18, display:"flex", alignItems:"baseline", gap:14, flexWrap:"wrap" }}>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, fontWeight:700, color:"var(--ink)" }}>₹{p.price}</span>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, color:"var(--parchment)", textDecoration:"line-through" }}>₹{p.mrp}</span>
            <span style={{ background:"var(--rust)", color:"var(--cream)", fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:1, padding:"3px 9px" }}>Save ₹{p.mrp - p.price}</span>
          </div>
          <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:14, lineHeight:1.9, color:"var(--bark)", marginBottom:22 }}>{p.desc}</p>
          {/* Qty + Cart */}
          <div style={{ display:"flex", gap:12, marginBottom:12, flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", border:"1px solid var(--bark)", flexShrink:0 }}>
              <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ background:"none", border:"none", cursor:"pointer", width:38, height:42, fontSize:18, color:"var(--ink)" }}>−</button>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:14, minWidth:30, textAlign:"center", color:"var(--ink)" }}>{qty}</span>
              <button onClick={() => setQty(q => q+1)} style={{ background:"none", border:"none", cursor:"pointer", width:38, height:42, fontSize:18, color:"var(--ink)" }}>+</button>
            </div>
            <button className="btn-ink" style={{ flex:1, padding:"12px", minWidth:140 }}
              onClick={() => { for(let i=0;i<qty;i++) dispatch({type:"ADD",item:p}); toast(`${qty}× ${p.name} added`); }}>
              <span>Add to Cart</span>
            </button>
          </div>
          <button className="btn-outline" style={{ width:"100%", padding:"12px" }} onClick={() => { dispatch({type:"ADD",item:p}); setPage("cart"); }}>Buy Now →</button>
          <div style={{ marginTop:20 }}>
            {[["🚚","Free shipping above ₹499"],["🎁","Gift wrapping on request"],["🔄","Returns within 7 days"]].map(([e,t]) => (
              <div key={t} style={{ display:"flex", gap:12, alignItems:"center", padding:"10px 0", borderBottom:"1px solid var(--parchment)" }}>
                <span style={{ fontSize:15 }}>{e}</span>
                <span style={{ fontFamily:"'Libre Baskerville',serif", fontSize:13, color:"var(--bark)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}