import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

import { cartReducer } from './reducers/cartReducers';
import {
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productReviewSaveReducer,
    productSaveReducer
} from './reducers/productReducers';
import { userRegisterReducer, userSigninReducer, userUpdateReducer } from './reducers/userReducers';
import { myOrderListReducer, orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { cart: { cartItems, shipping: {}, payment: {}, }, userSignin: { userInfo } };
const reducer = combineReducers({
    orderCreate: orderCreateReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productReviewSave: productReviewSaveReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDelete: orderDeleteReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;