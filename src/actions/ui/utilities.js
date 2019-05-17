import uuid from 'uuid'
import clone from 'clone'
import {startAsync, endAsync} from './async-operation'

export const wrapAsyncThunk = (wrapped, {needsShade = true, name = 'unspecified'}) => dispatch => {
    const opId = uuid.v1()

    dispatch(startAsync({id: opId, needsShade}))
    return dispatch(wrapped)
        .then(result => {
            dispatch(endAsync({id: opId}))
            return result
        })
        .catch(error => {
            let easError = error;

            if(!easError.easAsyncErrorReported) {
                console.warn(`Action (${name}) Error: ${error.message}`)
                console.trace(easError)
                dispatch(endAsync({id: opId, errorMessage: easError.message}))
                easError = clone(error)
                easError.easAsyncErrorReported = true
            }
            return Promise.reject(easError)
        })
}
