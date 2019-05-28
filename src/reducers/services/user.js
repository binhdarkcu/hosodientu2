import { handleActions } from 'redux-actions'
import {
  SET_USER_INFO,
  GET_USER_LIST
} from '../../actions/types'
import { combineReducers } from 'redux'

const userDefault = {};
const userListDefault = [];

const userInfo = handleActions({
  [SET_USER_INFO]: {
    next(state, action) {
      return action.payload ? action.payload : state;
    }
  }
}, userDefault)

const userList = handleActions({
  [GET_USER_LIST]: {
    next(state, action) {
      return action.payload ? action.payload : state;
    }
  }
}, userListDefault)

export default combineReducers({ userInfo, userList })
