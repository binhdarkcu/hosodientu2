import { handleActions } from 'redux-actions'
import {
    SET_USER_INFO
} from '../../actions/types'
import { combineReducers } from 'redux'

const userDefault = {}

const userInfo = handleActions({
  [SET_USER_INFO]: {
    next(state, action) {
      return action.payload ? action.payload : state;
    }
  }
}, userDefault)

export default combineReducers({ userInfo })
