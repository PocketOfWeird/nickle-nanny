import { combineReducers } from 'redux';
import user from './user';

const createRootReducer = router => combineReducers({
    router,
    user,
});

export default createRootReducer;
