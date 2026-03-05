// ============================================================
// FILE: src/pages/Login.jsx
// ============================================================
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login({ setPage }) {
  const [isReg, setIsReg]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");
  const [form, setForm]     = useState({ name:"", email:"", password:"" });
  const { login, register } = useAuth();
  const upd = (k,v) => setForm(p => ({...p,[k]:v}));

  const handle = async () => {
    setError(""); setLoading(true);
    try {
      if (isReg) await register(form.name, form.email, form.password);
      else       await login(form.email, form.password);
      setPage("home");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  const F = ({label, k, type="text"}) => (
    <div>
      <label style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"var(--rust)", display:"block", marginBottom:5 }}>{label}</label>
      <input type={type} value={form[k]} onChange={e=>upd(k,e.target.value)} className="inp-field" placeholder={label}
        onKeyDown={e => e.key==="Enter" && handle()} />
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"var(--ink)", display:"flex", alignItems:"center", justifyContent:"center", padding:"88px 16px 40px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, opacity:.03, backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C8922A'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")" }} />
      <div className="scaleIn" style={{ background:"var(--cream)", padding:"clamp(28px,6vw,48px) clamp(24px,6vw,44px)", width:"100%", maxWidth:420, position:"relative", boxShadow:"0 40px 100px rgba(0,0,0,.5)" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:44, marginBottom:10 }}>🪷</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:600, color:"var(--ink)" }}>{isReg?"Create Account":"Welcome Back"}</div>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:2, color:"var(--rust)", marginTop:4, textTransform:"uppercase" }}>{isReg?"Join the Kalatri family":"Sign in to continue"}</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {isReg && <F label="Full Name" k="name" />}
          <F label="Email" k="email" type="email" />
          <F label="Password" k="password" type="password" />
        </div>
        {error && <div style={{ marginTop:12, fontFamily:"'DM Mono',monospace", fontSize:10, color:"var(--rust)", letterSpacing:1 }}>{error}</div>}
        <button className="btn-ink" style={{ width:"100%", padding:"14px", marginTop:22, opacity: loading?.7:1, fontSize:11 }} onClick={handle} disabled={loading}>
          <span>{loading ? "Please wait…" : isReg ? "Create Account →" : "Sign In →"}</span>
        </button>
        <div style={{ textAlign:"center", marginTop:18, fontFamily:"'Libre Baskerville',serif", fontSize:13, color:"var(--bark)" }}>
          {isReg ? "Already have an account? " : "New here? "}
          <span onClick={() => setIsReg(p => !p)} style={{ color:"var(--rust)", cursor:"pointer", fontWeight:700 }}>{isReg?"Sign in":"Create one"}</span>
        </div>
      </div>
    </div>
  );
}

