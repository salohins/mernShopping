const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            }
        case 'AUTH_ERROR': 
        case 'LOGIN_FAIL':
        case 'LOGOUT_SUCCESS':
        case 'REGISTER_FAIL':
            localStorage.removeItem('token')
            return {
                ...initialState,
                token: null
            }
        default:
            return state
    }
}

export default authReducer

