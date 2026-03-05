// ============================================================
// FILE: src/pages/Products.jsx
// ============================================================
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import PRODUCTS, { CATEGORIES } from "../data/products";

export default function Products({ setPage, toast }) {
  const [cat, setCat]     = useState("All");
  const [sort, setSort]   = useState("default");
  const [search, setSearch] = useState("");

  let list = cat === "All" ? [...PRODUCTS] : PRODUCTS.filter(p => p.cat === cat);
  if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (sort === "low")   list.sort((a,b) => a.price - b.price);
  if (sort === "high")  list.sort((a,b) => b.price - a.price);
  if (sort === "rated") list.sort((a,b) => b.rating - a.rating);

  return (
    <div className="texture-bg" style={{ minHeight:"100vh", paddingTop:64 }}>
      {/* Header */}
      <div style={{ padding:"28px 4vw 20px", borderBottom:"1px solid var(--parchment)" }}>
        <span className="tag-mono">Shop</span>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,5vw,3.8rem)", fontWeight:600, color:"var(--ink)", margin:"8px 0 16px", letterSpacing:-.5 }}>All Products</h1>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
          <input className="inp-field" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" style={{ flex:"1 1 180px", maxWidth:260, fontSize:14 }} />
          <select value={sort} onChange={e => setSort(e.target.value)} className="inp-field" style={{ width:"auto", cursor:"pointer", fontSize:11, fontFamily:"'DM Mono',monospace", letterSpacing:1, flex:"0 0 auto" }}>
            <option value="default">Sort: Default</option>
            <option value="low">Price ↑</option>
            <option value="high">Price ↓</option>
            <option value="rated">Top Rated</option>
          </select>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--bark)", letterSpacing:1, marginLeft:"auto" }}>{list.length} items</span>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display:"flex", gap:0, borderBottom:"1px solid var(--parchment)", overflowX:"auto", WebkitOverflowScrolling:"touch", scrollbarWidth:"none", padding:"0 4vw" }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:1.5, textTransform:"uppercase", padding:"10px 14px", color: cat===c?"var(--rust)":"var(--bark)", borderBottom: cat===c?"2px solid var(--rust)":"2px solid transparent", marginBottom:-1, transition:"all 0.2s", whiteSpace:"nowrap", flexShrink:0 }}>{c}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding:"20px 4vw 48px" }}>
        <div className="products-grid">
          {list.map((p,i) => <ProductCard key={p.id} p={p} setPage={setPage} toast={toast} i={i} />)}
        </div>
        {!list.length && (
          <div style={{ textAlign:"center", padding:"60px 0" }}>
            <div style={{ fontSize:50, marginBottom:12 }}>🔍</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:"var(--bark)" }}>Nothing found</div>
          </div>
        )}
      </div>
    </div>
  );
}


