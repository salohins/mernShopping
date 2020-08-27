import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

const allReducers  = combineReducers({
    item: itemReducer,
    auth: authReducer,
    error: errorReducer
});

export default allReducers;

