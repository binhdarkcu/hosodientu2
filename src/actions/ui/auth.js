import { wrapAsyncThunk } from './utilities'
import {
    execAuthenticate
} from '../services/api-auth'

export const execShadedAuthentication = () =>
    wrapAsyncThunk(execAuthenticate(), { name: 'shaded-authentication' })
