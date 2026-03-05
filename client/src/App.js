import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext";
import Navbar  from "./components/Navbar";
import Toast   from "./components/Toast";
import Home          from "./pages/Home";
import Products      from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart          from "./pages/Cart";
import Checkout      from "./pages/Checkout";
import Login         from "./pages/Login";
import Orders        from "./pages/Orders";
import About         from "./pages/About";

export default function App() {
  const [page, setPage]       = useState("home");
  const [toastMsg, setToastMsg] = useState(null);

  const toast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const pg = typeof page === "object" ? page.n : page;

  const renderPage = () => {
    switch (pg) {
      case "home":     return <Home     setPage={setPage} toast={toast} />;
      case "products": return <Products setPage={setPage} toast={toast} />;
      case "product":  return <ProductDetail p={page.d} setPage={setPage} toast={toast} />;
      case "cart":     return <Cart     setPage={setPage} />;
      case "checkout": return <Checkout setPage={setPage} toast={toast} />;
      case "login":    return <Login    setPage={setPage} />;
      case "orders":   return <Orders />;
      case "about":    return <About    setPage={setPage} />;
      default:         return <Home     setPage={setPage} toast={toast} />;
    }
  };

  return (
    <>
      <Navbar page={pg} setPage={setPage} />
      {renderPage()}
      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}
    </>
  );
}