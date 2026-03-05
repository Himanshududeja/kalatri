// ============================================================
// FILE: src/pages/Cart.jsx
// ============================================================
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart({ setPage }) {
  const { cart, dispatch, totalAmount, shipping, grandTotal } = useCart();
  const { user } = useAuth();
  const [mob, setMob] = useState(window.innerWidth <= 768);
  useEffect(() => { const h=()=>setMob(window.innerWidth<=768); window.addEventListener("resize",h); return()=>window.removeEventListener("resize",h); },[]);

  if (!cart.length) return (
    <div className="texture-bg" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:14, padding:"88px 20px", textAlign:"center" }}>
      <div style={{ fontSize:72 }}>🧺</div>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:600, color:"var(--ink)" }}>Your cart is empty</h2>
      <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:14, color:"var(--bark)", fontStyle:"italic" }}>Discover handmade pieces that will last a lifetime</p>
      <button className="btn-ink" style={{ marginTop:10, padding:"13px 28px" }} onClick={() => setPage("products")}><span>Browse Collection</span></button>
    </div>
  );

  return (
    <div className="texture-bg page-pad">
      <span className="tag-mono">Cart</span>
      <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:600, color:"var(--ink)", margin:"8px 0 28px", letterSpacing:-.5 }}>
        {cart.length} {cart.length===1?"Item":"Items"}
      </h1>
      <div className="cart-grid">
        {/* Items */}
        <div>
          {!mob && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:16, padding:"0 0 10px", borderBottom:"2px solid var(--ink)", fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"var(--bark)" }}>
              <span>Product</span><span>Qty</span><span>Total</span>
            </div>
          )}
          {cart.map(item => (
            <div key={item.id} style={{ padding:"16px 0", borderBottom:"1px solid var(--parchment)" }}>
              {mob ? (
                <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <div style={{ width:58, height:58, background:"var(--warm)", border:"1px solid var(--parchment)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{item.emoji}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:8, color:"var(--rust)", letterSpacing:2, marginBottom:2 }}>{item.cat}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:600, color:"var(--ink)", marginBottom:8 }}>{item.name}</div>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                      <div style={{ display:"flex", alignItems:"center", border:"1px solid var(--parchment)" }}>
                        <button onClick={() => dispatch({type:"DEC",id:item.id})} style={{ background:"none", border:"none", width:30, height:30, cursor:"pointer", fontSize:16, color:"var(--ink)" }}>−</button>
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, minWidth:20, textAlign:"center" }}>{item.qty}</span>
                        <button onClick={() => dispatch({type:"INC",id:item.id})} style={{ background:"none", border:"none", width:30, height:30, cursor:"pointer", fontSize:16, color:"var(--ink)" }}>+</button>
                      </div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, color:"var(--ink)" }}>₹{item.price*item.qty}</div>
                      <button onClick={() => dispatch({type:"REM",id:item.id})} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:1.5, textTransform:"uppercase", color:"var(--parchment)", transition:"color .2s" }}
                        onMouseEnter={e=>e.target.style.color="var(--rust)"} onMouseLeave={e=>e.target.style.color="var(--parchment)"}>Remove</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:16, alignItems:"center" }}>
                  <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                    <div style={{ width:64, height:64, background:"var(--warm)", border:"1px solid var(--parchment)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }}>{item.emoji}</div>
                    <div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:8, color:"var(--rust)", letterSpacing:2, marginBottom:2 }}>{item.cat}</div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:600, color:"var(--ink)", marginBottom:2 }}>{item.name}</div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"var(--bark)" }}>₹{item.price} each</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", border:"1px solid var(--parchment)" }}>
                    <button onClick={() => dispatch({type:"DEC",id:item.id})} style={{ background:"none", border:"none", width:32, height:32, cursor:"pointer", fontSize:16, color:"var(--ink)" }}>−</button>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, minWidth:24, textAlign:"center" }}>{item.qty}</span>
                    <button onClick={() => dispatch({type:"INC",id:item.id})} style={{ background:"none", border:"none", width:32, height:32, cursor:"pointer", fontSize:16, color:"var(--ink)" }}>+</button>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"var(--ink)" }}>₹{item.price*item.qty}</div>
                    <button onClick={() => dispatch({type:"REM",id:item.id})} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:1.5, textTransform:"uppercase", color:"var(--parchment)", transition:"color .2s" }}
                      onMouseEnter={e=>e.target.style.color="var(--rust)"} onMouseLeave={e=>e.target.style.color="var(--parchment)"}>Remove</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button onClick={() => dispatch({type:"CLR"})} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:"var(--parchment)", marginTop:14, transition:"color .2s" }}
            onMouseEnter={e=>e.target.style.color="var(--rust)"} onMouseLeave={e=>e.target.style.color="var(--parchment)"}>Clear cart</button>
        </div>

        {/* Summary */}
        <div className="cart-sticky" style={{ background:"var(--ink)", color:"var(--cream)", padding:24, position:"sticky", top:80 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"var(--gold)", marginBottom:18 }}>Order Summary</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'DM Mono',monospace", fontSize:11, color:"#9A8C76" }}><span>Subtotal</span><span>₹{totalAmount}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'DM Mono',monospace", fontSize:11 }}><span style={{color:"#9A8C76"}}>Shipping</span><span style={{color:shipping===0?"var(--gold)":"inherit"}}>{shipping===0?"Free":"₹"+shipping}</span></div>
            {totalAmount < 499 && <div style={{ background:"rgba(200,146,42,.1)", border:"1px solid rgba(200,146,42,.2)", padding:"8px 10px", fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--gold)", letterSpacing:1, lineHeight:1.6 }}>Add ₹{499-totalAmount} for free shipping</div>}
            <div style={{ borderTop:"1px solid rgba(255,255,255,.1)", paddingTop:12, display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:600 }}>Total</span>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700 }}>₹{grandTotal}</span>
            </div>
          </div>
          <button className="btn-rust" style={{ width:"100%", padding:13, fontSize:10 }} onClick={() => user ? setPage("checkout") : setPage("login")}>
            {user ? "Proceed to Checkout →" : "Login to Checkout"}
          </button>
          <button onClick={() => setPage("products")} style={{ background:"none", border:"none", width:"100%", fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:1.5, color:"#9A8C76", cursor:"pointer", marginTop:10, padding:"8px", textTransform:"uppercase", transition:"color .2s" }}
            onMouseEnter={e=>e.target.style.color="var(--cream)"} onMouseLeave={e=>e.target.style.color="#9A8C76"}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}

