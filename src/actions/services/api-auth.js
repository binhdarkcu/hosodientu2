import {
    AUTHENTICATED,
    // UNAUTHENTICATED
} from '../types'
// import { createAction } from 'redux-actions';
import { sendHttpRequest } from './http-handler';
import _ from 'lodash';
const portBE = localStorage.getItem('portBackEnd');
let backendAPI = localStorage.getItem('backendAPI') + ':' + portBE;
console.log(backendAPI)
// API URLs
const authUrl = `${backendAPI}/api/User/Login`;

// Handlers
export const execAuthenticate = data => dispatch => {
    const obj = {
        grant_type:'password',
        username: data.username,
        password: data.password
    };
    const searchParams = Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
    const parameters = {
        method: 'POST',
        body: searchParams,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    return new Promise((resolve, reject) => {
        sendHttpRequest(authUrl, parameters)
          .then(({status, json}) => {
            if (status !== 200) return reject(json);
            sessionStorage.setItem('isActived', true);
            sessionStorage.setItem('authToken', _.get(json, 'access_token', ''));
            sessionStorage.setItem('expAt', Date.now() + _.get(json, 'expires_in', 0)*1000);
            dispatch({type: AUTHENTICATED});
            return resolve(json);
          })
          .catch(err => {
            return reject(err);
          });
    });

};
