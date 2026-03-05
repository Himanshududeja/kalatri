// ============================================================
// FILE: src/pages/Orders.jsx
// ============================================================
import { useState, useEffect } from "react";
import API from "../utils/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/orders/my-orders")
      .then(({ data }) => setOrders(data))
      .catch(() => {
        // Fallback demo data if API not connected yet
        setOrders([
          { _id:"KTR-001", items:[{emoji:"🐰",name:"Amigurumi Bunny",quantity:1,price:349},{emoji:"🔑",name:"Fidget Keychain",quantity:2,price:149}], totalAmount:647, orderStatus:"delivered",  createdAt:"2024-02-12" },
          { _id:"KTR-002", items:[{emoji:"🧣",name:"Winter Muffler",quantity:1,price:449}],                                                          totalAmount:449, orderStatus:"shipped",    createdAt:"2024-02-28" },
          { _id:"KTR-003", items:[{emoji:"💐",name:"Eternal Bouquet",quantity:1,price:799}],                                                         totalAmount:848, orderStatus:"processing", createdAt:"2024-03-03" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const steps = ["placed","confirmed","shipped","delivered"];
  const statusColor = { delivered:"var(--sage)", shipped:"var(--gold)", processing:"var(--rust)", confirmed:"var(--bark)" };

  if (loading) return (
    <div className="texture-bg" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:2, color:"var(--bark)" }}>Loading orders…</div>
    </div>
  );

  return (
    <div className="texture-bg page-pad">
      <span className="tag-mono">My Account</span>
      <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:600, color:"var(--ink)", margin:"8px 0 28px", letterSpacing:-.5 }}>My Orders</h1>
      {!orders.length && (
        <div style={{ textAlign:"center", padding:"60px 0" }}>
          <div style={{ fontSize:60, marginBottom:16 }}>📦</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, color:"var(--bark)" }}>No orders yet</div>
        </div>
      )}
      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
        {orders.map(o => {
          const stepIdx = steps.indexOf(o.orderStatus) + 1 || 1;
          const col = statusColor[o.orderStatus] || "var(--bark)";
          return (
            <div key={o._id} style={{ background:"var(--warm)", border:"1px solid var(--parchment)", overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid var(--parchment)", flexWrap:"wrap", gap:12 }}>
                <div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:2, color:"var(--rust)", textTransform:"uppercase", marginBottom:3 }}>#{o._id?.toString().slice(-8).toUpperCase()}</div>
                  <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:12, color:"var(--bark)", fontStyle:"italic" }}>Placed {new Date(o.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"var(--ink)" }}>₹{o.totalAmount}</span>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:2, textTransform:"uppercase", padding:"4px 12px", border:`1px solid ${col}`, color:col }}>{o.orderStatus}</span>
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ padding:"14px 20px 6px" }}>
                <div style={{ display:"flex", alignItems:"center", position:"relative" }}>
                  <div style={{ position:"absolute", top:10, left:"5%", right:"5%", height:1, background:"var(--parchment)", zIndex:0 }}>
                    <div style={{ height:"100%", background:`linear-gradient(90deg,var(--rust),${col})`, width:`${((stepIdx-1)/3)*100}%`, transition:"width 1s ease" }} />
                  </div>
                  {["Placed","Confirmed","Shipped","Delivered"].map((s,i) => (
                    <div key={s} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, zIndex:1 }}>
                      <div style={{ width:20, height:20, borderRadius:"50%", background: i<stepIdx?"var(--ink)":"var(--warm)", border:`1px solid ${i<stepIdx?"var(--ink)":"var(--parchment)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontSize:8, color: i<stepIdx?"var(--cream)":"var(--parchment)", transition:"all .3s" }}>{i<stepIdx?"✓":""}</div>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:7, letterSpacing:.5, textTransform:"uppercase", color: i<stepIdx?"var(--ink)":"var(--parchment)", whiteSpace:"nowrap" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Items */}
              <div style={{ padding:"8px 20px 16px", display:"flex", gap:8, flexWrap:"wrap" }}>
                {o.items.map((item,idx) => (
                  <div key={idx} style={{ display:"flex", gap:8, alignItems:"center", background:"var(--cream)", border:"1px solid var(--parchment)", padding:"5px 12px" }}>
                    <span style={{ fontSize:14 }}>{item.emoji || "📦"}</span>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, fontWeight:600, color:"var(--ink)" }}>{item.name}</span>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--bark)" }}>×{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

