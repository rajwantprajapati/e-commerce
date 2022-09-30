import { useEffect, useReducer } from "react";
import { createContext, useContext } from "react";
import {
    CLEAR_FILTERS,
    FILTER_PRODUCTS,
    LOAD_PRODUCTS, SET_GRIDVIEW, SET_LISTVIEW, SORT_PRODUCTS, UPDATE_FILTERS, UPDATE_SORT,
} from "../actions";
import filterReducer from "../reducers/filterReducer";
import { useProductsContext } from "./products_context";

const initialState = {
    filteredProducts: [],
    allProducts: [],
    gridView: true,
    sort: 'price-lowest',
    filters: {
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        minPrice: 0,
        maxPrice: 0,
        price: 0,
        shipping: false,
    }
}

const FilterContext = createContext({
    filteredProducts: [],
    allProducts: [],
    gridView: Boolean
});

export const FilterProvider = ({ children }) => {
    const { products } = useProductsContext();
    const [state, dispatch] = useReducer(filterReducer, initialState);

    useEffect(() => {
        dispatch({ type: LOAD_PRODUCTS, payload: products });
    }, [products]);

    useEffect(() => {
        dispatch({ type: FILTER_PRODUCTS });
        dispatch({ type: SORT_PRODUCTS });
    }, [products, state.sort, state.filters]);

    const setGridView = () => {
        dispatch({ type: SET_GRIDVIEW });
    };

    const setListView = () => {
        dispatch({ type: SET_LISTVIEW });
    };

    const updateSort = (e) => {
        dispatch({ type: UPDATE_SORT, payload: e.target.value });
    };

    const updateFilters = (e) => {
        let { name, value } = e.target;

        if (name === 'category') {
            value =  e.target.textContent;
        }

        if (name === 'color') {
            value = e.target.dataset.color;
        }

        if (name === 'price') {
            value = Number(value);
        }

        if (name === 'shipping') {
            value = e.target.checked;
        }

        dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
    };

    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS });
    };

    const value = {
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
    };

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export const useFilterContext = () => useContext(FilterContext);