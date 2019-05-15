// import {createBrowserHistory as createHistory} from 'history'
import { AUTHENTICATED, SET_USER_INFO, UNAUTHENTICATED } from '../actions/types';
import { connectRoutes, redirect, NOT_FOUND } from 'redux-first-router'
// import queryString from 'query-string'
//import sleep from 'sleep-promise'

export const defaultThunk = (dispatch, getState) => {
    console.log('--state', getState().services);
    doDefaultRedirect(dispatch, getState().services.auth.authencation)
}

function doDefaultRedirect(dispatch, loggedInUser) {
    const isLoggedin = loggedInUser.authenticated ? 'yes': 'no';
    if(isLoggedin === 'no') {
        console.log('Not an employee, redirecting to login')
        dispatch(redirect({type: 'RTE_LOGIN'}));
        return;
    }else if(Date.now() >= sessionStorage.getItem('expAt')*1){
      sessionStorage.clear();
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
    RTE_DO_LOANG_XUONG: {
      path: '/do-loang-xuong/:id',
      thunk: defaultThunk
    },
    RTE_KET_QUA_ECG: {
      path: '/ket-qua-ecg/:id',
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
    RTE_REGISTER: {
      path: '/dang-ky',
      thunk: defaultThunk
    }
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
