
import {combineReducers} from 'redux'
import services from './services';
import page from './page'
import {routerReducer as location} from "../router"

export default combineReducers({
    services,
    page,
    location
});
