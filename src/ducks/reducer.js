const ADD_TO_CART = 'ADD_TO_CART';
const SET_CART = 'SET_CART'

const initial_state = {
    cart: []
}

export default function reducer(state=initial_state, action){

    switch(action.type){
        case SET_CART:
            return Object.assign({}, state, {cart: action.payload});
        case ADD_TO_CART:
            return Object.assign({}, state, {cart: [...state.cart, action.payload]});
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