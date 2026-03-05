import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Footer      from "../components/Footer";
import PRODUCTS, { CATEGORIES } from "../data/products";

export default function Home({ setPage, toast }) {
  const [cat, setCat]   = useState("All");
  const [mob, setMob]   = useState(window.innerWidth <= 768);
  useEffect(() => { const h = () => setMob(window.innerWidth <= 768); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);

  const visible = cat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

  return (
    <div className="texture-bg" style={{ minHeight:"100vh" }}>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", padding: mob?"80px 4vw 48px":"80px 5vw 40px", display:"flex", alignItems:"center" }}>
        <div className="hero-grid" style={{ width:"100%", position:"relative" }}>
          {/* Decorative circles */}
          {!mob && <>
            <div style={{ position:"absolute",right:"-8vw",top:"5%",width:"40vw",height:"40vw",borderRadius:"50%",border:"1px solid var(--parchment)",pointerEvents:"none",opacity:.5 }} />
            <div style={{ position:"absolute",right:"-4vw",top:"12%",width:"30vw",height:"30vw",borderRadius:"50%",border:"1px solid var(--parchment)",pointerEvents:"none",opacity:.3 }} />
          </>}

          {/* Left — Text */}
          <div style={{ position:"relative", zIndex:2 }}>
            <div className="fadeIn"><span className="tag-mono">Est. 2020 · Kanpur, India</span></div>
            <h1 className="fadeIn1 hero-h1" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.6rem,6vw,5.5rem)", fontWeight:300, lineHeight:1.06, color:"var(--ink)", letterSpacing:-1, margin:"14px 0 8px" }}>
              <em style={{ fontStyle:"italic" }}>Woven</em> with<br/>intention,<br/><span style={{ fontWeight:700 }}>made by hand.</span>
            </h1>
            <div className="fadeIn2" style={{ height:1, background:"var(--parchment)", margin:"18px 0 22px", maxWidth:480 }} />
            <p className="fadeIn3" style={{ fontFamily:"'Libre Baskerville',serif", fontSize: mob?14:16, lineHeight:1.85, color:"var(--bark)", maxWidth:440, marginBottom:32 }}>
              Every stitch carries the warmth of its maker. Crochet toys, bags, wearables and gifts — shipped across India from Kanpur.
            </p>
            <div className="fadeIn4 hero-btns" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button className="btn-ink" onClick={() => setPage("products")}><span>Explore Collection</span></button>
              <button className="btn-outline" onClick={() => setPage("about")}>Our Story</button>
            </div>
            <div className="fadeIn5 hero-stats" style={{ display:"flex", gap: mob?20:32, marginTop:40, paddingTop:28, borderTop:"1px solid var(--parchment)", flexWrap:"wrap" }}>
              {[["306","Products crafted"],["531","Happy homes"],["4.9★","Avg rating"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:"var(--ink)" }}>{n}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:1.5, color:"var(--rust)", textTransform:"uppercase", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero visual (hidden on mobile via CSS) */}
          <div className="scaleIn hero-visual" style={{ display:"flex", alignItems:"center", justifyContent:"center", height:480, position:"relative" }}>
            <div style={{ width:320, height:400, background:"var(--warm)", border:"1px solid var(--parchment)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", boxShadow:"12px 20px 60px var(--shadow)" }}>
              <div style={{ fontSize:100, animation:"floatY 4s ease infinite" }}>🪷</div>
              <div style={{ position:"absolute", bottom:24, textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:"var(--ink)" }}>Kalatri Collection</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--rust)", letterSpacing:2, marginTop:3 }}>Spring / Summer 2024</div>
              </div>
              <div style={{ position:"absolute", top:18, right:18, background:"var(--rust)", color:"var(--cream)", fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:2, padding:"4px 10px", textTransform:"uppercase" }}>New In</div>
            </div>
            <div style={{ position:"absolute", top:"10%", left:"5%", background:"var(--ink)", color:"var(--cream)", padding:"10px 14px", fontSize:26, boxShadow:"4px 8px 24px var(--shadow)", animation:"floatY 3.5s 0.5s ease infinite" }}>🐰</div>
            <div style={{ position:"absolute", bottom:"12%", right:"6%", background:"var(--gold)", color:"var(--ink)", padding:"9px 13px", fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:1.5, textTransform:"uppercase", lineHeight:1.6, boxShadow:"4px 8px 24px var(--shadow)", animation:"floatY 4.5s 1s ease infinite" }}>Pan India<br/>Shipping</div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background:"var(--ink)", color:"var(--cream)", padding:"12px 0", overflow:"hidden", borderTop:"2px solid var(--gold)", borderBottom:"1px solid var(--bark)" }}>
        <div style={{ display:"flex", gap:48, whiteSpace:"nowrap", animation:"marquee 16s linear infinite", fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:2, textTransform:"uppercase" }}>
          {["✦ 100% Handmade","✦ Eco Friendly","✦ Custom Orders","✦ Pan India Shipping","✦ Sustainable Yarn","✦ Gift Wrapping","✦ Premium Quality","✦ Made With Love",
            "✦ 100% Handmade","✦ Eco Friendly","✦ Custom Orders","✦ Pan India Shipping"].map((t,i) => (
            <span key={i} style={{ color: i%3===1 ? "var(--gold)" : "inherit" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section className="section-pad">
        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:10, flexWrap:"wrap", gap:10 }}>
          <h2 className="section-h2" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,3.5vw,3rem)", fontWeight:600, color:"var(--ink)", letterSpacing:-.5 }}><em>The</em> Collection</h2>
          <button className="nav-link" onClick={() => setPage("products")} style={{ fontSize:10 }}>View all →</button>
        </div>
        <div style={{ display:"flex", gap:0, marginBottom:32, borderBottom:"1px solid var(--parchment)", overflowX:"auto", WebkitOverflowScrolling:"touch", scrollbarWidth:"none" }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:1.5, textTransform:"uppercase", padding:"10px 16px", color: cat===c?"var(--rust)":"var(--bark)", borderBottom: cat===c?"2px solid var(--rust)":"2px solid transparent", marginBottom:-1, transition:"all 0.2s", whiteSpace:"nowrap", flexShrink:0 }}>{c}</button>
          ))}
        </div>
        <div className="products-grid">
          {visible.map((p,i) => <ProductCard key={p.id} p={p} setPage={setPage} toast={toast} i={i} />)}
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={{ background:"var(--ink)", color:"var(--cream)", padding: mob?"48px 4vw":"80px 5vw" }}>
        <div className="philosophy-grid">
          <div>
            <span className="tag-mono" style={{ color:"var(--gold)" }}>Philosophy</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,3.5vw,3.2rem)", fontWeight:300, lineHeight:1.2, margin:"14px 0 20px" }}>
              <em>Slow made.</em><br/>Fast loved.
            </h2>
            <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:14, lineHeight:1.9, color:"#C4B49A", marginBottom:28 }}>
              In a world of mass production, we choose the opposite. Every item is made to order, taking hours of focused craft. The result isn't just a product — it's an heirloom.
            </p>
            <button className="btn-rust" onClick={() => setPage("about")}>Read Our Story</button>
          </div>
          <div className="features-grid">
            {[{e:"🎨",t:"Custom made",d:"Send us your colour, size, idea"},{e:"🌿",t:"Sustainable",d:"Recycled and organic yarns"},{e:"🔄",t:"Easy returns",d:"Not happy? We'll fix it"},{e:"📦",t:"Gift ready",d:"Every box wrapped with a note"}].map(({e,t,d}) => (
              <div key={t} style={{ background:"rgba(255,255,255,.04)", padding:"22px 18px", borderTop:"1px solid rgba(255,255,255,.08)", transition:"background .2s", cursor:"default" }}
                onMouseEnter={el => el.currentTarget.style.background = "rgba(255,255,255,.07)"}
                onMouseLeave={el => el.currentTarget.style.background = "rgba(255,255,255,.04)"}>
                <div style={{ fontSize:28, marginBottom:10 }}>{e}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:1.5, color:"var(--gold)", textTransform:"uppercase", marginBottom:6 }}>{t}</div>
                <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:12, color:"#9A8C76", lineHeight:1.7 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: mob?"48px 4vw":"80px 5vw", background:"var(--warm)" }}>
        <span className="tag-mono">What they say</span>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,3.5vw,3rem)", fontWeight:600, color:"var(--ink)", margin:"10px 0 36px", letterSpacing:-.5 }}>Stories from our customers</h2>
        <div className="testimonials-grid">
          {[{n:"Priya S.",c:"Mumbai",r:5,t:"The amigurumi bunny arrived beautifully packed with a handwritten note. My daughter hasn't put it down in weeks."},
            {n:"Rahul M.",c:"Delhi",r:5,t:"Got the eternal bouquet for our anniversary. My wife cried. In a good way. It felt like it was made for us."},
            {n:"Anjali K.",c:"Bangalore",r:5,t:"The specs holder has been on my desk four months and I've gotten more compliments on it than anything else."}
          ].map(({n,c,r,t}) => (
            <div key={n} style={{ background:"var(--cream)", border:"1px solid var(--parchment)", padding:"24px", position:"relative" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:60, lineHeight:1, color:"var(--parchment)", position:"absolute", top:10, left:16, fontWeight:700 }}>"</div>
              <div style={{ position:"relative", zIndex:1 }}>
                <span>{[1,2,3,4,5].map(i=><span key={i} style={{color:"var(--gold)",fontSize:12}}>★</span>)}</span>
                <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:13, lineHeight:1.85, color:"var(--bark)", margin:"12px 0 18px", fontStyle:"italic" }}>{t}</p>
                <div style={{ borderTop:"1px solid var(--parchment)", paddingTop:12 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontWeight:600, color:"var(--ink)" }}>{n}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--rust)", letterSpacing:1.5, marginTop:2 }}>{c}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ margin: mob?"0 4vw 48px":"0 5vw 72px", background:"linear-gradient(135deg,rgba(184,74,30,.08),rgba(200,146,42,.06))", border:"1px solid rgba(184,74,30,.18)", padding: mob?"36px 24px":"60px 48px", textAlign:"center" }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.6rem,3.5vw,2.8rem)", fontWeight:600, color:"var(--ink)", marginBottom:10 }}>Want something custom? 🎨</h2>
        <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:14, color:"var(--bark)", marginBottom:24, fontStyle:"italic" }}>DM on Instagram or WhatsApp with your idea — we'll bring it to life.</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-ink" onClick={() => setPage("products")}><span>Shop Now</span></button>
          <button className="btn-outline" onClick={() => setPage("about")}>Contact Us</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}