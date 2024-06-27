export const getSearchFormData = (state) => {
    return {
        manufacturers: state.application.manufacturers,
        searchParameters: state.search.parameters,
        prices: state.application.prices,
        bodyTypes: state.application.bodyTypes,
    };
};
