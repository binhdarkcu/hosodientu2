// import {createBrowserHistory as createHistory} from 'history'
import { AUTHENTICATED, SET_USER_INFO, UNAUTHENTICATED } from '../actions/types';
import { connectRoutes, redirect, NOT_FOUND } from 'redux-first-router';
import { toast } from 'react-toastify';
import * as MSG from '../constants/Messages';
// import queryString from 'query-string'
//import sleep from 'sleep-promise'

export const defaultThunk = (dispatch, getState) => {
    doDefaultRedirect(dispatch, getState().services.auth.authencation)
}

function doDefaultRedirect(dispatch, loggedInUser) {
    const isLoggedin = loggedInUser.authenticated ? 'yes': 'no';
    if(isLoggedin === 'no') {
        dispatch(redirect({type: 'RTE_LOGIN'}));
        return;
    }else if(Date.now() >= sessionStorage.getItem('expAt')*1){
      sessionStorage.clear();
      toast.info(MSG.SESSION_EXPIRED, {autoClose: 8000});
      dispatch({type: UNAUTHENTICATED});
      dispatch(redirect({type: 'RTE_LOGIN'}));
    }
}

function checkLoginStatus(dispatch, getState) {
  const state = getState();
  const { type, payload } = state.location.prev;
  const token = sessionStorage.getItem('authToken');
  const userInfo = sessionStorage.getItem('userInfo');
  if(token && userInfo){
    dispatch({type: AUTHENTICATED});
    dispatch({type: SET_USER_INFO, payload: JSON.parse(userInfo)});
    dispatch(redirect({type: type ? type : 'RTE_DASHBOARD', payload: {...payload}}));
  }
}

function freePass(dispatch, getState){
  console.log('freePass');
}
// const history = createHistory()
const routesMap = {
    RTE_DASHBOARD: {
      path: '/',
      thunk: defaultThunk
    },
    [NOT_FOUND]: {
      path: '/not-found',
      thunk: defaultThunk
    },
    RTE_LIST_DO_LOANG_XUONG: {
      path: '/do-loang-xuong',
      thunk: defaultThunk
    },
    RTE_DO_LOANG_XUONG: {
      path: '/do-loang-xuong/:id',
      thunk: defaultThunk
    },
    RTE_LIST_KET_QUA_ECG: {
      path: '/ket-qua-ecg',
      thunk: defaultThunk
    },
    RTE_KET_QUA_ECG: {
      path: '/ket-qua-ecg/:id',
      thunk: defaultThunk
    },
    RTE_LIST_SIEU_AM: {
      path: '/sieu-am',
      thunk: defaultThunk
    },
    RTE_SIEU_AM: {
      path: '/sieu-am/:id',
      thunk: defaultThunk
    },
    RTE_LOGIN: {
      path: '/login',
      thunk: checkLoginStatus
    },
    RTE_ADMIN_REGISTER: {
      path: '/admin-dang-ky',
      thunk: defaultThunk
    },
    RTE_USER_REGISTER: {
      path: '/nguoi-dung-dang-ky',
      thunk: freePass
    },
    RTE_ACTIVATE: {
      path: '/kich-hoat/:code',
      thunk: freePass
    },
    RTE_DANH_SACH_USER: {
      path: '/danh-sach',
      thunk: defaultThunk
    },
    RTE_CHI_TIET_USER: {
      path: '/chi-tiet/:id',
      thunk: defaultThunk
    },
    RTE_DOI_MAT_KHAU: {
      path: '/doi-mat-khau/:id',
      thunk: defaultThunk
    },
    RTE_CHANGE_PASSWORD: {
      path: '/doi-mat-khau',
      thunk: defaultThunk
    },
    RTE_LIST_KHAM_BENH: {
      path: '/lich-su-kham-benh',
      thunk: defaultThunk
    },
    RTE_CHI_TIET_KHAM_BENH: {
      path: '/chi-tiet-kham-benh/:paramStr',
      thunk: defaultThunk
    },
    RTE_USER_UPDATE: {
      path: '/cap-nhat-user/:id',
      thunk: defaultThunk
    },
}

export function createDefaultRedirector(dispatch) {
    return type => {
        if (routesMap[type].thunk === defaultThunk) {
            dispatch(defaultThunk);
        }
    }
}

const { reducer, middleware, enhancer } = connectRoutes(routesMap);
export const routerMiddleware = middleware;
export const routerReducer = reducer;
export const routerEnhancer = enhancer;
