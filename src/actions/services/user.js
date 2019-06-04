import {
    UNAUTHENTICATED,
    SET_USER_INFO
} from '../types';
import { redirect } from 'redux-first-router';
import { createAction } from 'redux-actions';

// actions
const setUserInfo = createAction(SET_USER_INFO);
// Logout
export const execLogout = () => dispatch => {
  sessionStorage.clear();
  dispatch({type: UNAUTHENTICATED});
  dispatch(redirect({type: 'RTE_LOGIN'}));
}

export const saveUserInfo = (user) => dispatch =>{
  sessionStorage.removeItem('userInfo');
  sessionStorage.setItem('userInfo', JSON.stringify(user));
  dispatch(setUserInfo(user))
}
