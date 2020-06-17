import { handleActions } from 'redux-actions'
import {
    AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR
} from '../../actions/types'
import { combineReducers } from 'redux'

const authDefault = { authenticated: false }

const authencation = handleActions({
  [AUTHENTICATED]: {
    next(state, action) {
      return {...state, authenticated: true}
    }
  },
  [UNAUTHENTICATED]: {
    next(state, action) {
      return {...state, authenticated: false}
    }
  },
  [AUTHENTICATION_ERROR]: {
    next(state, action) {
      return {...state, error: action.payload}
    }
  }
}, authDefault);

export default combineReducers({ authencation })
