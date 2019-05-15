import {
    AUTHENTICATED,
    AUTHENTICATION_ERROR,
    UNAUTHENTICATED,
    ADMIN_REGISTER
} from '../types'
import { redirect } from 'redux-first-router';
import { createAction } from 'redux-actions';
import 'whatwg-fetch';
import _ from 'lodash';
import baseUrl from './base-url';

// API URLs
const authUrl = `${baseUrl}/api/User/Login`;
const userApiUrl = `${baseUrl}/api/User/AdminRegister`;

// Actions
export const adminRegister = createAction(ADMIN_REGISTER);

// Handlers
export const execAuthenticate = data => dispatch => {
    const obj = {
        grant_type:'password',
        username: data.username,
        password: data.password
    }
    const searchParams = Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
    const parameters = {
        method: 'POST',
        body: searchParams,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    return new Promise((resolve, reject) => {
        fetch(authUrl, parameters).then(response => {
            response.json().then(json => ({
                status: response.status,
                loading: 'loading',
                json
            }))
                .then(({ status, json }) => {
                    if (status !== 200) {
                      dispatch({type: UNAUTHENTICATED});
                        return reject(Error(JSON.stringify(json)));
                    } else {
                        sessionStorage.setItem('isActived', true);
                        sessionStorage.setItem('authToken', _.get(json, 'access_token', ''));
                        sessionStorage.setItem('expAt', Date.now() + _.get(json, 'expires_in', 0)*1000);
                    }
                    dispatch({type: AUTHENTICATED});
                    return resolve('done');
                }, error => {
                    dispatch({type: AUTHENTICATION_ERROR, payload: error});
                    return reject(error);
                });
        }).catch(jsonError => {
          reject(jsonError);
        });
    });
};


export const execAdminRegister = data => dispatch => {

  console.log('data', data);
  data.NgaySinh = '1988-05-20';// tạm hardcode để test
  const searchParams = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');

  const parameters = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
  };

  return new Promise((resolve, reject) => {
      fetch(userApiUrl, parameters).then(response => {
          response.json().then(json => ({
              status: response.status,
              loading: 'loading',
              json
          }))
              .then(({ status, json }) => {
                  console.log('ok', json);
                  return resolve('done');
              }, error => {
                  console.log('err', error);
                  return reject(error);
              });
      }).catch(jsonError => {
        reject(jsonError);
      });
  });
}

export const execLogout = () => dispatch => {
  sessionStorage.clear();
  dispatch({type: UNAUTHENTICATED});
  dispatch(redirect({type: 'RTE_LOGIN'}));
}
