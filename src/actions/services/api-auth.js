import {
    AUTHENTICATED,
    AUTHENTICATION_ERROR,
    ADMIN_REGISTER
} from '../types'

import { createAction } from 'redux-actions'
import 'whatwg-fetch';
import _ from 'lodash';
import baseUrl from './base-url'

// API URLs
const authUrl = `${baseUrl}/api/User/Login`;
// const userApiUrl = `${baseUrl}/api/Users`;

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

    // dispatch(authenticate());
    return new Promise((resolve, reject) => {
        fetch(authUrl, parameters).then(response => {
            response.json().then(json => ({
                status: response.status,
                loading: 'loading',
                json
            }))
                .then(({ status, json }) => {

                    if (status !== 200) {
                        sessionStorage.removeItem('isActived');
                        sessionStorage.removeItem('authToken');
                        return reject(Error(JSON.stringify(json)));
                    } else {
                        sessionStorage.setItem('isActived', true);
                        sessionStorage.setItem('authToken', _.get(json, 'access_token', ''));
                        // sessionStorage.setItem('password', base64.encode(data.rq_Password));
                    }

                    dispatch({type: AUTHENTICATED});
                    return resolve('done');
                }, error => {
                    dispatch({type: AUTHENTICATION_ERROR});
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
