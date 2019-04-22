import {combineReducers} from 'redux'
import auth from './auth';
import page from './page';
import {routerReducer as location} from "../router"

export default combineReducers({
    auth,
    page,
    location
});
