// import {createBrowserHistory as createHistory} from 'history'
import { AUTHENTICATED } from '../actions/types';
import { connectRoutes, redirect, NOT_FOUND } from 'redux-first-router'
// import queryString from 'query-string'
//import sleep from 'sleep-promise'

export const defaultThunk = (dispatch, getState) => {
    console.log('stateeeee',getState().services.auth)
    doDefaultRedirect(dispatch, getState().services.auth.authencation)
}

function doDefaultRedirect(dispatch, loggedInUser) {
    const isLoggedin = loggedInUser.authenticated ? 'yes': 'no';

    console.log('isLoggedin',isLoggedin);
    // if(isLoggedin === 'yes') {
    //     console.log('Employee, redirecting to ADMIN')
    //     dispatch(redirect({type: 'RTE_DASHBOARD'}))
    if(isLoggedin === 'no') {
        console.log('Not an employee, redirecting to login')
        dispatch(redirect({type: 'RTE_LOGIN'}))
    }

}

function checkLoginStatus(dispatch, getState) {
  const token = sessionStorage.getItem('authToken');
  if(token){
    dispatch({type: AUTHENTICATED});
    dispatch(redirect({type: 'RTE_DASHBOARD'}));
  }
}

function reportToAnalytics(dispatch, getState) {
}


// const history = createHistory()
const routesMap = {
    RTE_DASHBOARD: {
      path: '/',
      thunk: defaultThunk
    },
    [NOT_FOUND]: {
      path: '/not-found',
      thunk: reportToAnalytics
    },
    RTE_DO_LOANG_XUONG: {
      path: '/do-loang-xuong/:id',
      thunk: reportToAnalytics
    },
    RTE_KET_QUA_ECG: {
      path: '/ket-qua-ecg/:id',
      thunk: reportToAnalytics
    },
    RTE_SIEU_AM: {
      path: '/sieu-am/:id',
      thunk: reportToAnalytics
    },
    RTE_LOGIN: {
      path: '/login',
      thunk: checkLoginStatus
    },
    RTE_REGISTER: {
      path: '/register',
      thunk: reportToAnalytics
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
