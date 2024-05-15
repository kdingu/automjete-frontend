export const getCategories = state => state.application.data.categories || [];
export const getCurrentCategory = state => state.application.data.currentCategory || {};
export const getCurrentCategoryId = state => getCurrentCategory(state).id || '';