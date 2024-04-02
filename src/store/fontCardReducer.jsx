const defaultState = {
    selectFontCard: localStorage.getItem('selectFontCard') || null,
};

const SELECT_FONT_CARD = 'SELECT_FONT_CARD';
const CACHE_RESPONSE = 'CACHE_RESPONSE';

export const fontCardReducer = (state = defaultState, action) => {

    switch (action.type) {
        case SELECT_FONT_CARD:
            return { ...state, selectFontCard: action.payload };
        case CACHE_RESPONSE:
            return {
                ...state,
                cachedResponses: {
                    ...state.cachedResponses,
                    [action.payload.endpoint]: action.payload.data,
                },
            };
        default:
            return state;
    }
};

export const selectFontCardAction = (payload) => ({ type: SELECT_FONT_CARD, payload });
export const cacheResponseAction = (endpoint, data) => ({
    type: CACHE_RESPONSE,
    payload: {
        endpoint,
        data,
    },
});