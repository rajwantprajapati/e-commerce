import {
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_ERROR,
    GET_SINGLE_PRODUCT_SUCCESS,
    SIDEBAR_CLOSE,
    SIDEBAR_OPEN,
} from "../actions";

const productsReducer = (state, action) => {
    switch (action.type) {
        case SIDEBAR_OPEN:
            return { ...state, isSidebarOpen: true };
        case SIDEBAR_CLOSE:
            return { ...state, isSidebarOpen: false };

        case GET_PRODUCTS_BEGIN:
            return { ...state, isProductsLoading: true }
        case GET_PRODUCTS_SUCCESS:
            const { payload } = action;
            const featuredProducts = payload.filter(product => product.featured);

            return {
                ...state, 
                products: payload,
                featuredProducts,
                isProductsLoading: false,
                isProductsError: false,
            }
        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                isProductsLoading: false,
                isProductsError: true,
            }

        case GET_SINGLE_PRODUCT_BEGIN:
            return {
                ...state,
                isSingleProductsLoading: true,
                isSingleProductError: false,
            }
        case GET_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                singleProduct: action.payload,
                isSingleProductsLoading: false,
                isSingleProductError: false,
            }
        case GET_SINGLE_PRODUCT_ERROR:
            return {
                ...state,
                isSingleProductsLoading: false,
                isSingleProductError: true,
            }
    
        default:
            return state;
    }
}

export default productsReducer;