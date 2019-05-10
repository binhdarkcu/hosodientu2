import { handleActions } from 'redux-actions'
import {
    AUTH
} from '../../actions/types'
import { combineReducers } from 'redux'

const authDefault = { result: null }

const authencation = handleActions({
  [AUTH]: {
    next(state, action) {
      return (action.payload) ? action.payload : state;
    },
    throw(state, action) {
        console.log(`Error fetching goal list: ${action.error}`)
        return { loading: false, failed: true, list: state.data }
    }
  }
}, authDefault)

export default combineReducers({ authencation })
