import {handleActions} from 'redux-actions'
import {NETWORK_SUCCESS, NETWORK_FAILURE} from '../actions/types';


const network = handleActions({[NETWORK_FAILURE]: () => ({online: 'no'}), [NETWORK_SUCCESS]: () => ({online: 'yes'})}, { online: 'unknown'});

export default network
