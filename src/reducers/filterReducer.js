import {
    CLEAR_FILTERS,
    FILTER_PRODUCTS,
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    UPDATE_SORT,
} from "../actions";

const filterReducer = (state, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            const priceList = action.payload.map(product => product.price);
            const maxPrice = Math.max(...priceList);

            return {
                ...state,
                allProducts: [...action.payload],
                filteredProducts: [...action.payload],
                filters: {
                    ...state.filters,
                    maxPrice,
                    price: maxPrice,
                },
            }

        case SET_GRIDVIEW:
            return {
                ...state,
                gridView: true
            }
        case SET_LISTVIEW:
            return {
                ...state,
                gridView: false
            }

        case UPDATE_SORT:
            return {
                ...state,
                sort: action.payload,
            }
        case SORT_PRODUCTS:
            const { sort, filteredProducts } = state;
            let tempProducts = [...filteredProducts];

            if (sort === 'price-lowest') {
                tempProducts.sort((a, b) => a.price - b.price);
            }
            if (sort === 'price-highest') {
                tempProducts.sort((a, b) => b.price - a.price);
            }
            if (sort === 'name-a') {
                tempProducts.sort((a, b) => a.name.localeCompare(b.name));
            }
            if (sort === 'name-z') {
                tempProducts.sort((a, b) => b.name.localeCompare(a.name));
            }

            return {
                ...state,
                filteredProducts: tempProducts,
            }

        case UPDATE_FILTERS:
            const { name, value } = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                },
            };
        case FILTER_PRODUCTS:
            const { allProducts } = state;
            const {
                text,
                category,
                company,
                color,
                price,
                shipping,
            } = state.filters;
            let tempFilteredProducts = [...allProducts];

            // text filter
            if(text) {
                tempFilteredProducts = tempFilteredProducts.filter(product => product.name.toLowerCase().startsWith(text.toLowerCase()));
            }

            // category filter
            if (category !== 'all') {
                tempFilteredProducts = tempFilteredProducts.filter(product => product.category === category);
            }

            // company filter
            if (company !== 'all') {
                tempFilteredProducts = tempFilteredProducts.filter(product => product.company === company);
            }

            // color filter
            if (color !== 'all') {
                tempFilteredProducts = tempFilteredProducts.filter(product => product.colors.find(c => c === color));
            }

            // price filter
            tempFilteredProducts = tempFilteredProducts.filter(product => product.price <= price);

            // shipping filter
            if (shipping) {
                tempFilteredProducts = tempFilteredProducts.filter(product => product.shipping);
            }

            return {
                ...state,
                filteredProducts: tempFilteredProducts,
            };
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: '',
                    company: 'all',
                    category: 'all',
                    color: 'all',
                    price: state.filters.maxPrice,
                    shipping: false,
                }
            }
    
        default:
            return state;
    }
};

export default filterReducer;