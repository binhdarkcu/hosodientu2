import {combineReducers} from 'redux'
import auth from './auth';
import {routerReducer as location} from "../router"

export default combineReducers({
    auth,
    location
});
