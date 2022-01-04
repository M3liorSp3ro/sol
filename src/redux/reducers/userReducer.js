const SET_AUTH = 'SET_AUTH'

const initialState = {
    auth: false,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_AUTH:
            return {
                ...state, auth: action.payload
            }

        default:
            return state

    }
}

export const actionAuth = (payload) => ({
    type: SET_AUTH,
    payload
})
