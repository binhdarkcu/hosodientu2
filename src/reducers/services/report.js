import { handleActions } from 'redux-actions'
import {
  GET_REPORT_LIST
} from '../../actions/types'
import { combineReducers } from 'redux'

const reportListDefault = [];

const reportList = handleActions({
  [GET_REPORT_LIST]: {
    next(state, action) {
      return action.payload ? action.payload : state;
    }
  }
}, reportListDefault)

export default combineReducers({ reportList })
