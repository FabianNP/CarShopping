import { createContext } from "react"
import { useCartReducer } from "../hooks/useCartReducer"

export const CartContext = createContext()

// La dependencia de usar React Context es MINIMA con useReducer y un coostom hook useCartReducer
export function CartProvider ({ children }) {
  const { addToCart, removeFromCart, clearCart, state } = useCartReducer()

  return (
    <CartContext.Provider value={{cart: state, addToCart, clearCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  )
}