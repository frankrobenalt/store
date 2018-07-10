const ADD_TO_CART = 'ADD_TO_CART';
const SET_CART = 'SET_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

const initial_state = {
    cart: []
}

if(!localStorage.getItem("cart_id")){
    localStorage.setItem("cart_id", 0);
} 
// localStorage.setItem("cart", "[]")
// localStorage.setItem("cart_id", 0)
export default function reducer(state=initial_state, action){

    switch(action.type){
        case SET_CART:
            return Object.assign({}, state, {cart: action.payload});
        case ADD_TO_CART:
            const item = Object.assign({}, action.payload);
            return { cart: [item, ...state.cart] };
        case REMOVE_FROM_CART:
            const cart = state.cart.filter(item => item.cart_id != action.payload)
            return { cart }
        default:
            return state;
    }
}

export function setCart(payload){
    console.log(payload)
    return {
        type: SET_CART,
        payload
    }
}

export function addToCart(payload){
    return {
        type: ADD_TO_CART,
        payload
    }
}

export function removeFromCart(payload){
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}