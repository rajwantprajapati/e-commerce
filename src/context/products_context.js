import { createContext, useContext, useReducer } from "react";
import axios from 'axios';
import { GET_PRODUCTS_BEGIN, GET_PRODUCTS_ERROR, GET_PRODUCTS_SUCCESS, GET_SINGLE_PRODUCT_BEGIN, GET_SINGLE_PRODUCT_ERROR, GET_SINGLE_PRODUCT_SUCCESS, SIDEBAR_CLOSE, SIDEBAR_OPEN } from "../actions";
import productsReducer from "../reducers/productsReducer";
import { useEffect } from "react";
import { products_url } from "../utils/constants";

const initialState = {
    isSidebarOpen: false,
    isProductsLoading: false,
    isProductsError: false,
    products: [],
    featuredProducts: [],
    isSingleProductLoading: false,
    singleProduct: {},
    isSingleProductError: false,
};

const ProductsContext = createContext({
    isSidebarOpen: false,
    isProductsLoading: false,
    isProductsError: false,
    products: [],
    featuredProducts: [],
    isSingleProductLoading: false,
    isSingleProductError: false,
    fetchSingleProduct: () => {},
});

export const ProductsProvider = ({children}) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);

    const openSidebar = () => {
        dispatch({ type:  SIDEBAR_OPEN });
    }

    const closeSidebar = () => {
        dispatch({ type:  SIDEBAR_CLOSE });
    }

    const fetchProducts = async (url) => {
        dispatch({ type: GET_PRODUCTS_BEGIN });

        try {
            const { data } = await axios.get(url);
            console.log(data);
            dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: GET_PRODUCTS_ERROR });
        }
    }

    const fetchSingleProduct = async (url) => {
        dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });

        try {
            const { data } = await axios.get(url);
            console.log(data);
            dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
        }
    }

    useEffect(() => {
        fetchProducts(products_url);
    }, [])
    
    const value = {
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
    };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export const useProductsContext = () => useContext(ProductsContext);