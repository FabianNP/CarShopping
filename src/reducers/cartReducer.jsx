/* eslint-disable no-unused-vars */

//TESTING WITH REDUCER EXAMPLE (with reducer its less complicated make testing than Provider)
// expect(
//   reducer([], { type: "ADD_TO_CART", payload: { id: 1 } })
// ).toEqual([{ id: 1, quantity: 1 }])

export const cartInitialState =  JSON.parse(window.localStorage.getItem("cart")) || []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART" 
}

//Update localStorage with state for cart
const updateLocalStorage = state => {
  window.localStorage.setItem("cart", JSON.stringify(state))
}

//USING AN OBJECT
//Explain by myself to myself: 
//The Object returns each a type of methods of the Object and if the action exists we pass the parameters to the returned function 
const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const { id } = action.payload
      const productInCartIndex = state.findIndex(item => item.id === id)
      
      if(productInCartIndex >= 0){
        //STRUCTURED CLONE -- readable
        //First way to copy (deeper) of arrays and objects are structuredClone (it´s not the efficient way but with no much code it work fine)
        // const newState = structuredClone(state)
        // newState[productInCartIndex].quantity += 1
        // updateLocalStorage(newState)
        // return newState

        //USING MAP -- common
        // const newState = state.map(item => {
        //   if(item.id === id){
        //     return {
        //       ...item,
        //       quantity: item.quantity + 1
        //     }
        //   }
        //   return item
        // })
        // updateLocalStorage(newState)
        // return newState

        //SPREAD OPERATOR & SLICE -- fastest 
        // const newState = [
        //   ...state.slice(0, productInCartIndex),
        //   {...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1},
        //   ...state.slice(productInCartIndex + 1)
        // ] 
        // updateLocalStorage(newState)
        // return newState
      }

      const newState = [...state, {...action.payload, quantity: 1}]
      updateLocalStorage(newState)
      return newState
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload
      const newState = state.filter(item => item.id !== id) 
      updateLocalStorage(newState)
      return newState
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorage([])
    return []
  }
}
export const cartReducer = (state, action) => {
  const { type: actionType } = action 
  
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}


//USING SWITCH
// export const cartReducer = (state, action) => {
//   const { type: actionType, payload: actionPayload } = action 
  
//   switch(actionType) {
//     case CART_ACTION_TYPES.ADD_TO_CART: {
//       const { id } = actionPayload
//       const productInCartIndex = state.findIndex(item => item.id === id)
      
//       if(productInCartIndex >= 0){
//         //First way to copy (deeper) of arrays and objects are structuredClone (it´s not the efficient way but with no much code it work fine)
//         const newState = structuredClone(state)
//         newState[productInCartIndex].quantity += 1
//         updateLocalStorage(newState)
//         return newState
//       }
//       const newState = [...state, {...actionPayload, quantity: 1}]
//       updateLocalStorage(newState)
//       return newState
//       }
    
//     case CART_ACTION_TYPES.REMOVE_FROM_CART: {
//       const { id } = actionPayload
//       const newState = state.filter(item => item.id !== id) 
//       updateLocalStorage(newState)
//       return newState
//     }
    
//     case CART_ACTION_TYPES.CLEAR_CART: {
//       updateLocalStorage(cartInitialState)
//       return cartInitialState
//     }
//   }
//   return state 
// }