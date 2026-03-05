// ============================================================
// FILE: src/pages/Checkout.jsx
// ============================================================
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";

export default function Checkout({ setPage, toast }) {
  const { cart, dispatch, grandTotal } = useCart();
  const { user } = useAuth();
  const [step, setStep]   = useState(1);
  const [paying, setPaying] = useState(false);
  const [addr, setAddr]   = useState({ name:user?.name||"", phone:"", street:"", city:"", state:"", pincode:"" });
  const upd = (k,v) => setAddr(p => ({...p,[k]:v}));

  const F = ({label, k, type="text", full=false}) => (
    <div style={{ gridColumn: full?"1/-1":"auto" }}>
      <label style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"var(--rust)", display:"block", marginBottom:5 }}>{label}</label>
      <input type={type} value={addr[k]} onChange={e=>upd(k,e.target.value)} className="inp-field" placeholder={label} />
    </div>
  );

  const handlePay = async () => {
    setPaying(true);
    try {
      // 1. Create order on backend
      const { data } = await API.post("/orders/create", {
        items: cart.map(i => ({ product: i._id || i.id, quantity: i.qty })),
        shippingAddress: addr,
      });
      // 2. Open Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: data.totalAmount * 100,
        currency: "INR",
        name: "Kalatri by Gayatri",
        description: "Handmade Crochet Products",
        order_id: data.razorpayOrderId,
        handler: async (response) => {
          await API.post("/orders/verify-payment", {
            razorpayOrderId:   response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          dispatch({ type:"CLR" });
          toast("Order placed! Thank you.");
          setPage("orders");
        },
        prefill: { name: user?.name, email: user?.email },
        theme: { color:"#B84A1E" },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => toast("Payment failed. Try again."));
      rzp.open();
    } catch (err) {
      toast(err.response?.data?.message || "Something went wrong");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="texture-bg page-pad">
      <span className="tag-mono">Checkout</span>
      <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:600, color:"var(--ink)", margin:"8px 0 24px", letterSpacing:-.5 }}>Complete your order</h1>
      {/* Stepper */}
      <div style={{ display:"flex", gap:0, marginBottom:28, borderBottom:"2px solid var(--parchment)" }}>
        {["Delivery","Payment"].map((s,i) => (
          <div key={s} style={{ padding:"8px 20px", fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:2, textTransform:"uppercase", color: step===i+1?"var(--rust)":"var(--parchment)", borderBottom: step===i+1?"2px solid var(--rust)":"2px solid transparent", marginBottom:-2, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:18, height:18, borderRadius:"50%", background: step>i?"var(--rust)":step===i+1?"var(--ink)":"var(--parchment)", color: step>i||step===i+1?"var(--cream)":"var(--bark)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700 }}>{step>i+1?"✓":i+1}</span>
            {s}
          </div>
        ))}
      </div>
      <div className="checkout-grid">
        {/* Form */}
        <div style={{ background:"var(--warm)", border:"1px solid var(--parchment)", padding:"24px" }}>
          {step === 1 ? (
            <>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:600, color:"var(--ink)", marginBottom:20 }}>Delivery Address</div>
              <div className="addr-grid">
                <F label="Full Name" k="name" />
                <F label="Phone" k="phone" type="tel" />
                <F label="Street Address" k="street" full />
                <F label="City" k="city" />
                <F label="State" k="state" />
                <F label="Pincode" k="pincode" />
              </div>
              <button className="btn-ink" style={{ marginTop:22, padding:"13px 28px" }} onClick={() => setStep(2)}><span>Continue →</span></button>
            </>
          ) : (
            <>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:600, color:"var(--ink)", marginBottom:4 }}>Payment</div>
              <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:12, color:"var(--bark)", fontStyle:"italic", marginBottom:20 }}>Secured by Razorpay</p>
              {[["📱","UPI / QR","Google Pay, PhonePe, Paytm"],["💳","Cards","Visa, Mastercard, RuPay"],["🏦","Net Banking","All major banks"],["👝","Wallets","Paytm, Mobikwik"]].map(([e,t,d]) => (
                <div key={t} style={{ border:"1px solid var(--parchment)", padding:"12px 16px", marginBottom:8, display:"flex", gap:14, alignItems:"center", transition:"border-color .2s", cursor:"pointer" }}
                  onMouseEnter={el=>el.currentTarget.style.borderColor="var(--bark)"}
                  onMouseLeave={el=>el.currentTarget.style.borderColor="var(--parchment)"}>
                  <span style={{ fontSize:20 }}>{e}</span>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontWeight:600, color:"var(--ink)" }}>{t}</div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--bark)", letterSpacing:.5 }}>{d}</div>
                  </div>
                </div>
              ))}
              <div style={{ display:"flex", gap:10, marginTop:20, flexWrap:"wrap" }}>
                <button className="btn-outline" style={{ padding:"12px 18px" }} onClick={() => setStep(1)}>← Back</button>
                <button className="btn-ink" style={{ flex:1, padding:"12px", minWidth:160, opacity: paying?.7:1 }} onClick={handlePay} disabled={paying}>
                  <span>{paying ? "Processing…" : `Pay ₹${grandTotal} via Razorpay`}</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Summary */}
        <div className="checkout-summary" style={{ background:"var(--ink)", color:"var(--cream)", padding:22 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:3, color:"var(--gold)", marginBottom:14 }}>Your Order</div>
          {cart.map(i => (
            <div key={i.id} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10, paddingBottom:10, borderBottom:"1px solid rgba(255,255,255,.07)" }}>
              <div style={{ width:36, height:36, background:"rgba(255,255,255,.05)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{i.emoji}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{i.name}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"#9A8C76" }}>×{i.qty}</div>
              </div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, flexShrink:0 }}>₹{i.price*i.qty}</div>
            </div>
          ))}
          <div style={{ borderTop:"1px solid rgba(255,255,255,.1)", paddingTop:12, display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"#9A8C76", textTransform:"uppercase", letterSpacing:1 }}>Total</span>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700 }}>₹{grandTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}