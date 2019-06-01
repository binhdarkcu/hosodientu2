import 'whatwg-fetch';
import _ from 'lodash';
import baseUrl from './base-url';
import { sendHttpRequest } from './http-handler';
import { SET_USER_INFO } from '../../actions/types';

const adminRegisterApiUrl = `${baseUrl}/api/User/AdminRegister`;
const userRegisterApiUrl = `${baseUrl}/api/User/UserRegister`;
const activateUrl = `${baseUrl}/api/User/Activate`;
const userListUrl = `${baseUrl}/api/Users`;
const userDetailUrl = `${baseUrl}/api/User?id=`;
const changePasswordUrl = `${baseUrl}/api/User/ChangePassword?id=`;
const getUserByPatientCodeUrl = `${baseUrl}/api/PatientByCode?code=`;
const userUpdate = `${baseUrl}/api/User/AdminUpdate`;

// Actions
// export const adminRegister = createAction(ADMIN_REGISTER);

// Get user info
export const execGetUserInfo = username => dispatch => {
    const parameters = {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    const userInfoUrl = `${baseUrl}/api/UserByEmail?email=${username}`;
    return new Promise((resolve, reject) => {
        sendHttpRequest(userInfoUrl, parameters)
          .then(({status, json}) => {
            const safeJson = _.omit(json, ['password']);
            dispatch({type: SET_USER_INFO, payload: {...safeJson}});
            sessionStorage.setItem('userInfo', JSON.stringify(safeJson));
            return resolve(safeJson);
          })
          .catch( err => reject(err));
    });
};

// Activate user
export const execActivateUser = data => dispatch => {
  const searchParams = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
  const parameters = {
      method: 'POST',
      body: searchParams,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  return new Promise((resolve, reject) => {
      sendHttpRequest(activateUrl, parameters)
        .then(({ status, user }) => {
          return resolve(user);
        })
        .catch(err => reject(err));
  });
}

// User register
export const execRegister = (data, type) => dispatch => {
  const parameters = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
  };

  const url = 'user' === type ? userRegisterApiUrl : adminRegisterApiUrl;

  return new Promise((resolve, reject) => {
      sendHttpRequest(url, parameters)
        .then(({ status, userInfo }) => {
          return resolve(userInfo);
        })
        .catch( err => reject(err));
  });
}

// Get user list
export const execGetUserList = () => dispatch => {
  const parameters = {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  return new Promise((resolve, reject) => {
      sendHttpRequest(userListUrl, parameters)
        .then(({status, json}) => {
          return resolve(json);
        }).catch( err => reject(err));
  });
};

// Get user detail
export const execGetUserDetail = (id) => dispatch => {
  const parameters = {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  return new Promise((resolve, reject) => {
      sendHttpRequest(userDetailUrl + id, parameters)
        .then(({status, json}) => {
          return resolve(json);
        }).catch( err => reject(err));
  });
};

//Change password
export const execChangePassword = data => dispatch => {
  const parameters = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
  };

  return new Promise((resolve, reject) => {
      sendHttpRequest(changePasswordUrl + data.id, parameters)
        .then(({ status }) => {
          return resolve(status);
        })
        .catch( err => reject(err));
  });
}

// Get user by patient keyCode
export const execGetUserInfoByPatientCode = data => dispatch => {
  const parameters = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }
  return new Promise((resolve, reject) => {
    sendHttpRequest(getUserByPatientCodeUrl + data.code, parameters)
      .then(({status, json}) => {
        return resolve({status, json})
      })
      .catch(err => reject(err));
  });
}

// User register
export const execUpdate = (data) => dispatch => {
  const parameters = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
  };

  return new Promise((resolve, reject) => {
      sendHttpRequest(userUpdate, parameters)
        .then(({ status, userInfo }) => {
          return resolve(userInfo);
        })
        .catch( err => reject(err));
  });
}
