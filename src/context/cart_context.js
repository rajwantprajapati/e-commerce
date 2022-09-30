import { useReducer } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { ADD_TO_CART } from "../actions";
import cartReducer from "../reducers/cartReducer";

const getLocalStorage = () => {
    const cart = localStorage.getItem('cart');

    if (!cart) {
        return [];
    }

    return JSON.parse(cart);
};

const initialState = {
    cart: getLocalStorage(),
    totalItems: 0,
    totalAmount: 0,
    shippingFee: 534,
};

const CartContext = createContext({
    cart: [],
    totalItems: Number,
    totalAmount: Number,
    shippingFee: Number,
    addToCart: () => null,
});

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // add to cart.
    const addToCart = (id, color, amount, product) => {
        dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
    };

    // remove item
    const removeItem = (id) => {
        
    }

    // toggle amount
    const toggleAmount = () => {

    }

    // clear cart
    const clearCart = () => {

    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state.cart]);

    const value = {
        ...state,
        addToCart,
        removeItem,
        toggleAmount,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

export const useCartContext = () => useContext(CartContext);