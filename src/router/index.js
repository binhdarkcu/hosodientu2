// import {createBrowserHistory as createHistory} from 'history'
import { AUTHENTICATED, SET_USER_INFO, UNAUTHENTICATED } from '../actions/types';
import { connectRoutes, redirect, NOT_FOUND } from 'redux-first-router';
import { toast } from 'react-toastify';
import * as MSG from '../constants/Messages';
import { HOSTNAME_COMPANY, HOSTNAME_PERSONAL} from "../constants/Host";
// import queryString from 'query-string'
//import sleep from 'sleep-promise'

export const defaultThunk = (dispatch, getState) => {
    const state = getState();
    console.log(32131)
    doDefaultRedirect(dispatch, state.services.auth.authencation, state.location);
};

function doDefaultRedirect(dispatch, loggedInUser, location) {
    const isLoggedin = loggedInUser.authenticated ? 'yes': 'no';

    const token = sessionStorage.getItem('authToken');
    const userInfo = sessionStorage.getItem('userInfo');
    // When URL does not match
    // Tạm thời tắt chức năng này
    // if('invalid' === checkLoginUrl(userInfo)){
    //     toast.info(MSG.LOGIN_URL_DOESNOT_MATCH, {autoClose: 10000});
    //     sessionStorage.clear();
    //     dispatch({type: UNAUTHENTICATED});
    //     return dispatch(redirect({type: 'RTE_LOGIN'}));
    // }
    // When refreshing browser

    if(token && userInfo && isLoggedin === 'no'){
      console.log(1)
      dispatch({type: AUTHENTICATED});
      dispatch({type: SET_USER_INFO, payload: JSON.parse(userInfo)});
      return;
    }
    const backendAPI = localStorage.getItem('backendAPI');
    if(isLoggedin === 'no') {
      console.log(2)
        return dispatch(redirect({type: 'RTE_LOGIN'}));
    } else if(Date.now() >= sessionStorage.getItem('expAt')*1){
      console.log(3)
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
    console.log(123132133)
    dispatch(redirect({type: type && type !=='RTE_LOGIN' ? type : 'RTE_DASHBOARD', payload: {...payload}}));
  }
}

function checkChonCoSo(dispatch, getState) {
  const backendAPI = localStorage.getItem('backendAPI');
  if(backendAPI === null) {
    dispatch(redirect({type: 'RTE_CHON_CO_SO'}));
  }
}

function checkLoginUrl(user) {
    if(!user || process.env.NODE_ENV === 'development') return 'do not check';
    const hostname = (window && window.location && window.location.hostname) || '';
    user = JSON.parse(user);
    switch (user.phanQuyen) {
        case 1:
        case 2:
            return hostname === HOSTNAME_PERSONAL ? '' : 'invalid';
        case 3:
            return hostname === HOSTNAME_COMPANY ? '' : 'invalid';
        default:
            return ''
    }
}

function noAuthentication(dispatch, getState){
  console.log('Free to go!');
}

// const history = createHistory()
const routesMap = {
    // separate pages
    RTE_DASHBOARD: {
      path: '/',
      thunk: defaultThunk
    },
    [NOT_FOUND]: {
      path: '/not-found',
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
    RTE_LOGIN: {
      path: '/login',
      thunk: checkLoginStatus
    },
    RTE_ADMIN_REGISTER: {
      path: '/admin-dang-ky',
      thunk: defaultThunk
    },

    // NO AUTHENTICATION
    RTE_DANG_KY_CONG_TY: {
      path: '/dang-ky-user-cong-ty',
      thunk: defaultThunk
    },
    RTE_USER_REGISTER: {
      path: '/nguoi-dung-dang-ky',
      thunk: noAuthentication
    },
    RTE_ACTIVATE: {
      path: '/kich-hoat/:code',
      thunk: noAuthentication
    },
    //LIST
    RTE_DANH_SACH_USER: {
      path: '/danh-sach-nguoi-dung',
      thunk: defaultThunk
    },
    RTE_DANH_SACH_CONG_TY: {
      path: '/danh-sach-cong-ty',
      thunk: defaultThunk
    },
    RTE_DANH_SACH_KHAM_BENH: {
      path: '/lich-su-kham-benh',
      thunk: defaultThunk
    },
    RTE_TU_VAN: {
      path: '/tu-van',
      thunk: defaultThunk
    },
    RTE_CHON_CO_SO: {
      path: '/chon-co-so',
      thunk: noAuthentication
    },
    // DETAIL
    RTE_CHI_TIET_USER: {
      path: '/chi-tiet/:id',
      thunk: defaultThunk
    },
    RTE_CHI_TIET_CONG_TY: {
      path: '/cong-ty/:id',
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
    RTE_KIEM_TRA_USER: {
      path: '/kiem-tra-user/:id',
      thunk: defaultThunk
    },
    RTE_CAP_NHAT_USER_COMPANY: {
      path: '/nguoi-dung-cong-ty/:id',
      thunk: defaultThunk
    },
    RTE_RESET_PASSWORD: {
      path: '/reset-password',
      thunk: noAuthentication
    },
    RTE_TEST: {
      path: '/test',
      thunk: noAuthentication
    }

};

export function createDefaultRedirector(dispatch) {
    return type => {
        if (routesMap[type].thunk === defaultThunk) {
            dispatch(defaultThunk);
        }
    };
}

const { reducer, middleware, enhancer } = connectRoutes(routesMap);
export const routerMiddleware = middleware;
export const routerReducer = reducer;
export const routerEnhancer = enhancer;
