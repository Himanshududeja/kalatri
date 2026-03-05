import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const existing = state.find(i => i.id === action.item.id);
      return existing
        ? state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state, { ...action.item, qty: 1 }];
    }
    case "REM": return state.filter(i => i.id !== action.id);
    case "INC": return state.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i);
    case "DEC": return state.map(i => i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i);
    case "CLR": return [];
    default:    return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const totalQty    = cart.reduce((s, i) => s + i.qty, 0);
  const totalAmount = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping    = totalAmount >= 499 ? 0 : 49;
  const grandTotal  = totalAmount + shipping;

  return (
    <CartContext.Provider value={{ cart, dispatch, totalQty, totalAmount, shipping, grandTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;