export const addProductAction = (itemProductContent) => {
    return {
        type: 'ADD_PRODUCT',
        payload: {
            ...itemProductContent,
        }
    }
}

export const removeProductAction = (id) => {
    return {
        type: 'REMOVE_PRODUCT',
        payload: {
            id,
        }
    }
}

export const setLimitAction = (id, limit) => {
    return {
        type: 'SET_LIMIT',
        payload: {
            id,
            limit,
        }
    }
}

export const searchProduct = (text) => {
    return {
        type: 'SEARCH_PRODUCT',
        payload: {
            text
        }
    }
}

export const editProduct = (productContent) => {
    return {
        type: 'EDIT_PRODUCT',
        payload: {
            ...productContent,
        }
    }
}

export const transferId = (id) => {
    return {
        type: 'EDITED_ID_PRODUCT',
        payload: {
            id
        }
    }
}