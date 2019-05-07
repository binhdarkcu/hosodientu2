// import {createBrowserHistory as createHistory} from 'history'
import { connectRoutes, redirect, NOT_FOUND } from 'redux-first-router'
// import queryString from 'query-string'
//import sleep from 'sleep-promise'

export const defaultThunk = (dispatch, getState) => {
    console.log(getState().services.auth.authencation.result)
    doDefaultRedirect(dispatch, getState().services.auth.authencation)
}

function doDefaultRedirect(dispatch, loggedInUser) {
    const isLoggedin = loggedInUser.result ? 'yes': 'no';
    // if(isLoggedin === 'yes') {
    //     console.log('Employee, redirecting to ADMIN')
    //     dispatch(redirect({type: 'RTE_DASHBOARD'}))
    // } else if(isLoggedin === 'no') {
    //     console.log('Not an employee, redirecting to login')
    //     dispatch(redirect({type: 'RTE_LOGIN'}))
    // }

}

function reportToAnalytics(dispatch, getState) {
  console.log(`report to Analytics`);
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
      thunk: reportToAnalytics
    },
    RTE_REGISTER: {
      path: '/register',
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
