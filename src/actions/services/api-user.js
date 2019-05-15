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


// Actions
// export const adminRegister = createAction(ADMIN_REGISTER);

// Handlers
export const execGetUserInfo = username => dispatch => {
    const parameters = {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    const userInfoUrl = `${baseUrl}/api/UserByEmail?email=${username}`;
    return new Promise((resolve, reject) => {
        fetch(userInfoUrl, parameters).then(response => {
            response.json().then(json => ({
                status: response.status,
                loading: 'loading',
                json
            }))
                .then(({ status, json }) => {
                    const safeJson = _.omit(json, ['password']);
                    sessionStorage.setItem('userInfo', JSON.stringify(safeJson));
                    return resolve(safeJson);
                }, error => {
                    return reject(error);
                })
        }).catch(jsonError => {
          reject(jsonError);
        });
    });
};
