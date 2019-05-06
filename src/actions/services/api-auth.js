import {
    AUTH
} from '../types'

import { createAction } from 'redux-actions'
import 'whatwg-fetch';
import _ from 'lodash';
import baseUrl from './base-url'

const authUrl = `${baseUrl}/login`;

export const authenticate = createAction(AUTH)

export const execAuthenticate = data => dispatch => {
    const obj = {
        'username': 'agent.tmtam@gmail.com',
        'password': 'password'
    }
    const searchParams = Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
    const parameters = {
        method: 'POST',
        body: searchParams,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    dispatch(authenticate());
    return new Promise(() => {
        fetch(authUrl, parameters).then(response => {

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
                    return true;
                }, error => {
                    const dataResponse = {
                        status: 0,
                        data: { detail: error.message }
                    };

                    dispatch(authenticate(dataResponse));
                });
        });
    });
};
