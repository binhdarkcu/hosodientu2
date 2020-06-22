import { handleActions, handleAction } from 'redux-actions'
import {
    STORE_STEPS
} from '../../actions/types'
import { combineReducers } from 'redux'
import uuid from 'uuid'
import clone from 'clone'

const stepsDefault = { values: {} }

const steps = handleActions({
    [STORE_STEPS]: {
        next(state, action) {

            if (action.payload) {
                const newState= clone(state.values)
                Object.assign(newState, {[action.payload.name]: action.payload.value})
                return {values: newState}
            }
            return stepsDefault

        },
        throw(state, action) {
            console.log(`Error set steps: ${action.error}`)
            return { list: null }
        }
    }
}, stepsDefault);

export default combineReducers({ steps })
