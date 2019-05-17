import {
    UNAUTHENTICATED,
} from '../types'
import { redirect } from 'redux-first-router';
// Logout
export const execLogout = () => dispatch => {
  sessionStorage.clear();
  dispatch({type: UNAUTHENTICATED});
  dispatch(redirect({type: 'RTE_LOGIN'}));
}
