export const formatPrice = (price) => {
    const formattedPrice = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price / 100);

    return formattedPrice;
};

export const getUniqueValues = (data, key) => {
    let values = data.map(item => item[key]);

    if (key === 'colors') {
        values = values.flat();
    }

    return ['all', ...new Set(values)];
};