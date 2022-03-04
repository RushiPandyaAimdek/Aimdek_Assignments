const initialState = {
    cartItems: []
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type){
        
        case 'ADD_TO_CART': {
            return{
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        }
        case 'REMOVE_FROM_CART': {
            return{
                ...state,
                cartItems: state.cartItems.filter(obj=>obj.id !== action.payload.id)
            }
        }
        case 'REMOVE_ALL_FROM_CART': {
            return{
                ...state,
                cartItems: []
            }
        }
        default: return state
    }
}