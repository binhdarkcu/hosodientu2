import {
    AUTH,
    ADMIN_REGISTER
} from '../types'

import { createAction } from 'redux-actions'
import 'whatwg-fetch';
import _ from 'lodash';
import baseUrl from './base-url'

// API URLs
const authUrl = `${baseUrl}/api/User/Login`;
const userApiUrl = `${baseUrl}/api/Users`;

// Actions
export const authenticate = createAction(AUTH);
export const adminRegister = createAction(ADMIN_REGISTER);

// Handlers
export const execAuthenticate = data => dispatch => {
    const obj = {
        'grant_type': 'password',
        'username': data.username,
        'password': data.password
    }
    // const searchParams = Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    //     .join('&');
    const parameters = {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    dispatch(authenticate());
    return new Promise((resolve, reject) => {
        fetch(authUrl, parameters).then(response => {
            console.log(response);
            response.json().then(json => ({
                status: response.status,
                loading: 'loading',
                json
            }))
                .then(({ status, json }) => {
                    const dataResponse = {
                        status,
                        loading: status === 200 ? 'done' : 'fail',
                        data: json
                    };

                    if (status === 403 || status === 401) {
                        sessionStorage.removeItem('isActived');
                        sessionStorage.removeItem('authToken');
                    } else {
                        sessionStorage.setItem('isActived', true);
                        sessionStorage.setItem('authToken', _.get(dataResponse, 'data.data.token', ''));
                        // sessionStorage.setItem('password', base64.encode(data.rq_Password));
                    }
                    dispatch(authenticate(dataResponse));
                    return resolve('done');
                }, error => {
                    const dataResponse = {
                        status: 0,
                        data: { detail: error.message }
                    };

                    dispatch(authenticate(dataResponse));
                    return reject(error);
                });
        }).catch(exception => {
          reject(exception);
        });
    });
};


export const execAdminRegister = data => dispatch => {

  const parameters = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  console.log('sending...');
}
