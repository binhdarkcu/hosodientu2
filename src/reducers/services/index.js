import {combineReducers} from 'redux'
import auth from './auth'
import user from './user'
import report from './report'

export default combineReducers({ auth, user, report })
