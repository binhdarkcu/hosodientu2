
import {combineReducers} from 'redux'
import ui from './ui'
import services from './services';
import page from './page'
import {routerReducer as location} from "../router"

export default combineReducers({
    services,
    ui,
    page,
    location
});
