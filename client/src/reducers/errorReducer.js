const initialState = {
    msg: {},
    status: null,
    id: null
}

const errorReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_ERRORS':
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            }

        case 'CLEAR_ERRORS':
            return initialState
        
        default: 
            return state
    }
}

export default errorReducer

