import { handleActions } from 'redux-actions';
import {
  SET_COMPANY_LIST
} from '../../actions/types'
import { combineReducers } from 'redux'

const companyListDefault = [];

const companyList = handleActions({
  [SET_COMPANY_LIST]: {
    next(state, action) {
      return action.payload ? action.payload : state;
    }
  }
}, companyListDefault)

export default combineReducers({ companyList })
