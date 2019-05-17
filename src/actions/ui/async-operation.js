import {START_ASYNC_OP, END_ASYNC_OP} from '../types'
import {createAction} from 'redux-actions'

export const startAsync = createAction(START_ASYNC_OP)

export const endAsync = createAction(END_ASYNC_OP)