// ============================================================
// FILE: src/pages/About.jsx
// ============================================================
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function About({ setPage }) {
  const [mob, setMob] = useState(window.innerWidth <= 768);
  useEffect(() => { const h=()=>setMob(window.innerWidth<=768); window.addEventListener("resize",h); return()=>window.removeEventListener("resize",h); },[]);

  return (
    <div style={{ background:"var(--cream)" }}>
      {/* Hero */}
      <div style={{ background:"var(--ink)", color:"var(--cream)", padding: mob?"80px 4vw 48px":"88px 5vw 60px" }}>
        <div className="about-hero-grid">
          <div className="fadeIn">
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:3, color:"var(--gold)", textTransform:"uppercase" }}>Est. 2020 · Kanpur, UP</span>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,5vw,4.5rem)", fontWeight:300, lineHeight:1.1, color:"var(--cream)", margin:"14px 0", letterSpacing:-1 }}>
              A craft born<br/>from <em style={{ fontStyle:"italic", fontWeight:600 }}>pure love.</em>
            </h1>
            <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:14, color:"#9A8C76", lineHeight:1.9, maxWidth:440 }}>
              What began as gifts for friends became a calling. Kalatri is Gayatri's love letter to crochet — slow, intentional, and made with care machines cannot replicate.
            </p>
          </div>
          <div className="about-emoji scaleIn" style={{ display:"flex", alignItems:"center", justifyContent:"center", fontSize:120, animation:"floatY 4s ease infinite" }}>🪷</div>
        </div>
      </div>

      {/* Values */}
      <div className="texture-bg section-pad">
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <span className="tag-mono">Values</span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,3.5vw,3rem)", fontWeight:600, color:"var(--ink)", marginTop:10, marginBottom:40, letterSpacing:-.5 }}>What we stand for</h2>
          <div className="values-grid">
            {[{n:"01",t:"Handmade always",d:"Every product is made to order, by hand."},
              {n:"02",t:"Sustainable sourcing",d:"Recycled cotton, organic wool, eco packaging."},
              {n:"03",t:"Fully custom",d:"Colour, size, name — we make exactly what you want."},
              {n:"04",t:"Personal touch",d:"Every order ships with a handwritten note from Gayatri."}
            ].map(({n,t,d}) => (
              <div key={n} style={{ padding:"28px 24px", borderTop:"2px solid var(--ink)", transition:"background .3s", cursor:"default" }}
                onMouseEnter={el=>el.currentTarget.style.background="var(--warm)"}
                onMouseLeave={el=>el.currentTarget.style.background="transparent"}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:3, color:"var(--rust)", marginBottom:12 }}>{n}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:"var(--ink)", marginBottom:8 }}>{t}</div>
                <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:13, color:"var(--bark)", lineHeight:1.8 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div style={{ background:"var(--ink)", padding: mob?"48px 4vw":"72px 5vw", textAlign:"center" }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:3, color:"var(--gold)", textTransform:"uppercase" }}>Contact</span>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,3.5vw,3rem)", fontWeight:600, color:"var(--cream)", margin:"10px 0 10px", letterSpacing:-.5 }}>Let's make something together.</h2>
        <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:14, color:"#9A8C76", marginBottom:36, fontStyle:"italic" }}>Custom orders, bulk enquiries, or just to say hello</p>
        <div style={{ display:"flex", gap:2, justifyContent:"center", flexWrap:"wrap", marginBottom:36 }}>
          {[["📸","Instagram","@kalatri__"],["💬","WhatsApp","Custom Orders"],["📧","Email","hello@kalatri.in"]].map(([e,t,d]) => (
            <div key={t} style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", padding:"18px 24px", textAlign:"center", minWidth:130, transition:"background .2s", cursor:"pointer" }}
              onMouseEnter={el=>el.currentTarget.style.background="rgba(200,146,42,.1)"}
              onMouseLeave={el=>el.currentTarget.style.background="rgba(255,255,255,.04)"}>
              <div style={{ fontSize:26, marginBottom:8 }}>{e}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:2, color:"var(--gold)", textTransform:"uppercase", marginBottom:3 }}>{t}</div>
              <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:11, color:"#9A8C76", fontStyle:"italic" }}>{d}</div>
            </div>
          ))}
        </div>
        <button className="btn-rust" style={{ padding:"13px 32px", fontSize:10 }} onClick={() => setPage("products")}>Shop the Collection</button>
      </div>

      <Footer />
    </div>
  );
}