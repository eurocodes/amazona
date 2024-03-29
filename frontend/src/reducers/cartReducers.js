import { ADD_TO_CART, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING, REMOVE_FROM_CART } from "../constants/cartConstant";

function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const product = state.cartItems.find(i => i.product === item.product);
            if (product) {
                return { cartItems: state.cartItems.map(i => i.product === product.product ? item : i) };
            } else {
                return { cartItems: [...state.cartItems, item] }
            }

        case REMOVE_FROM_CART:
            return { cartItems: state.cartItems.filter(item => item.product !== action.payload) }
        default:
            return state

        case CART_SAVE_SHIPPING:
            return { ...state, shipping: action.payload }

        case CART_SAVE_PAYMENT:
            return { ...state, payment: action.payload }
    }
}

export { cartReducer };