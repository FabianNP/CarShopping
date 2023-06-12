import { createContext, useState } from "react"

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = product => {
    //Check if the product is already in the cart
    const productInCartIndex = cart.findIndex(item => item.id === product.id)
    
    if(productInCartIndex >= 0){
      //First way to copy (deeper) of arrays and objects are structuredClone (it´s not the efficient way but with no much code it work fine)
      const newCart = structuredClone(cart)
      newCart[productInCartIndex].quantity += 1
      return setCart(newCart)
    }

    //Product does´t exists 
    setCart(prevState => ([...prevState, {...product, quantity: 1}]))

  }

  const removeFromCart = product => {
    setCart(prevState => prevState.filter(item => item.id !== product.id))
  }


  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{cart, addToCart, clearCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  )
}