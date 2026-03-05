import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled]     = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMob, setIsMob]           = useState(window.innerWidth <= 768);
  const { user, logout }            = useAuth();
  const { totalQty }                = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onResize = () => setIsMob(window.innerWidth <= 768);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const nav = (p) => { setPage(p); setDrawerOpen(false); };

  return (
    <>
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:300,
        background: scrolled ? "rgba(245,239,224,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--parchment)" : "none",
        transition:"all 0.4s",height:64,
        display:"flex",alignItems:"center",padding:"0 4vw",justifyContent:"space-between",gap:16,
      }}>
        {/* Logo */}
        <div onClick={() => nav("home")} style={{ cursor:"pointer", flexShrink:0 }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isMob?19:22, fontWeight:700, color:"var(--ink)", letterSpacing:1, lineHeight:1 }}>Kalatri</div>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:3, color:"var(--rust)", textTransform:"uppercase", marginTop:1 }}>by Gayatri</div>
        </div>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{ display:"flex", gap:32, alignItems:"center" }}>
          {[["home","Home"],["products","Shop"],["about","About"]].map(([p,l]) => (
            <button key={p} onClick={() => nav(p)} className={`nav-link${page===p?" active":""}`}>{l}</button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display:"flex", alignItems:"center", gap: isMob?10:20 }}>
          {!isMob && (user
            ? <>
                <button onClick={() => nav("orders")} className="nav-link">Orders</button>
                <div onClick={logout} title="Sign out" style={{ width:30,height:30,borderRadius:"50%",background:"var(--ink)",color:"var(--cream)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontSize:12,cursor:"pointer",border:"2px solid var(--gold)" }}>
                  {user.name[0].toUpperCase()}
                </div>
              </>
            : <button onClick={() => nav("login")} className="nav-link">Sign In</button>
          )}

          {/* Cart button */}
          <button
            onClick={() => nav("cart")}
            style={{ position:"relative",background:"none",border:"1px solid var(--bark)",color:"var(--ink)",width:38,height:38,cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",flexShrink:0 }}
            onMouseEnter={e => { e.currentTarget.style.background="var(--ink)"; e.currentTarget.style.color="var(--cream)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="none";       e.currentTarget.style.color="var(--ink)"; }}
          >
            {totalQty > 0 ? totalQty : "○"}
            {totalQty > 0 && (
              <span style={{ position:"absolute",top:-6,right:-6,background:"var(--rust)",color:"var(--cream)",borderRadius:"50%",width:17,height:17,fontFamily:"'DM Mono',monospace",fontSize:9,display:"flex",alignItems:"center",justifyContent:"center" }}>{totalQty}</span>
            )}
          </button>

          {/* Hamburger */}
          {isMob && (
            <button onClick={() => setDrawerOpen(true)} style={{ background:"none",border:"none",cursor:"pointer",padding:4,display:"flex",flexDirection:"column",gap:4 }}>
              {[0,1,2].map(i => <span key={i} style={{ display:"block",width:22,height:2,background:"var(--ink)",borderRadius:1 }} />)}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile drawer */}
      {drawerOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setDrawerOpen(false)} />
          <div className="mobile-drawer">
            <button onClick={() => setDrawerOpen(false)} style={{ position:"absolute",top:20,right:20,background:"none",border:"none",fontSize:22,cursor:"pointer",color:"var(--ink)" }}>×</button>
            {[["home","Home"],["products","Shop"],["about","About"],["orders","Orders"]].map(([p,l]) => (
              <button key={p} onClick={() => nav(p)} className="mobile-nav-btn">{l}</button>
            ))}
            {user
              ? <button onClick={() => { logout(); setDrawerOpen(false); }} className="mobile-nav-btn" style={{ color:"var(--rust)" }}>Sign Out</button>
              : <button onClick={() => nav("login")} className="mobile-nav-btn" style={{ color:"var(--rust)" }}>Sign In →</button>
            }
          </div>
        </>
      )}
    </>
  );
}