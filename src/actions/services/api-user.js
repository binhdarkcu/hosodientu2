import 'whatwg-fetch';
import _ from 'lodash';
import baseUrl from './base-url';
import { sendHttpRequest } from './http-handler';
// import { SET_USER_INFO } from '../../actions/types';

// URLs

//const adminRegisterApiUrl = `${backendAPI}/api/User/AdminRegister`;
//const userRegisterApiUrl = `${backendAPI}/api/User/UserRegister`;
//const activateUrl = `${backendAPI}/api/User/Active`;
//const userListUrl = `${backendAPI}/api/Users`;
//const userDetailUrl = `${backendAPI}/api/User?id=`;
//const changePasswordUrl = `${backendAPI}/api/User/ChangePassword`;
//const getUserByPatientCodeUrl = `${backendAPI}/api/PatientByCode?code=`;
//const userUpdate = `${backendAPI}/api/User/AdminUpdate`;
//const deleteUserUrl = `${backendAPI}/api/User?id=`;
//const updateAvatarUrl = `${backendAPI}/api/User/Avatar`;
//const adminApprove = `${backendAPI}/api/User/AdminApprove`;
//const patientByQrCodeUrl = `${backendAPI}/api/PatientByQRCode`;
//const userInfoByEmailUrl = `${backendAPI}/api/UserByEmail?email=`;
//const resetPasswordUrl = `${backendAPI}/api/User/ResetPassword`;
//const listCompanyUsersUrl = `${backendAPI}/api/users?status=1&role=3`;

// Actions
// export const adminRegister = createAction(ADMIN_REGISTER);

// Get user info
export const execGetUserInfo = username => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const userInfoByEmailUrl = `${backendAPI}/api/UserByEmail?email=`;
    const parameters = {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    const userInfoUrl = userInfoByEmailUrl + username;
    return new Promise((resolve, reject) => {
        sendHttpRequest(userInfoUrl, parameters)
          .then(({status, json}) => {
            const safeJson = _.omit(json, ['password']);
            return resolve(safeJson);
          })
          .catch( err => reject(err));
    });
};

// Activate user
export const execActivateUser = data => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const activateUrl = `${backendAPI}/api/User/Active`;
  const parameters = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  };

  return new Promise((resolve, reject) => {
    sendHttpRequest(activateUrl, parameters)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

// User register
export const execRegister = (data, type, isForce) => dispatch => {
  let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
  const adminRegisterApiUrl = `${backendAPI}/api/User/AdminRegister`;
  const userRegisterApiUrl = `${backendAPI}/api/User/UserRegister`;
  const parameters = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  };

  const url = 'user' === type ? `${userRegisterApiUrl}?isForce=${!!isForce}` : adminRegisterApiUrl;
  return new Promise((resolve, reject) => {
    sendHttpRequest(url, parameters)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

// Get user list
export const execGetUserList = () => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
  const userListUrl = `${backendAPI}/api/Users`;
  const parameters = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  return new Promise((resolve, reject) => {
    sendHttpRequest(userListUrl, parameters)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

// Get user detail
export const execGetUserDetail = (id) => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const userDetailUrl = `${backendAPI}/api/User?id=`;
  const parameters = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  return new Promise((resolve, reject) => {
    sendHttpRequest(userDetailUrl + id, parameters)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

//Change password
export const execChangePassword = data => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const changePasswordUrl = `${backendAPI}/api/User/ChangePassword`;
  const parameters = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  };

  return new Promise((resolve, reject) => {
    sendHttpRequest(changePasswordUrl, parameters)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

// Get user by patient keyCode
export const execGetUserInfoByPatientCode = data => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const getUserByPatientCodeUrl = `${backendAPI}/api/PatientByCode?code=`;
  const parameters = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };
  return new Promise((resolve, reject) => {
    sendHttpRequest(getUserByPatientCodeUrl + data.code, parameters)
      .then(data =>  resolve(data))
      .catch(err => reject(err));
  });
};

// User update

export const execUpdate = (data) => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const userUpdate = `${backendAPI}/api/User/AdminUpdate`;
  const parameters = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    sendHttpRequest(userUpdate, parameters)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};


// Delete user
export const execDeleteUser = (id) => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const deleteUserUrl = `${backendAPI}/api/User?id=`;
  const parameters = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  return new Promise((resolve, reject) => {
    sendHttpRequest(deleteUserUrl + id, parameters)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

// Update users avatar
export const execUpdateAvatar = (data) => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    let updateAvatarUrl = `${backendAPI}/api/User/Avatar`;
  const parameters = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  };

  return new Promise((resolve, reject) => {
      sendHttpRequest(updateAvatarUrl, parameters)
        .then(data => resolve(data))
        .catch( err => reject(err));
  });
};

// Update users avatar
export const execAdminApprove = (id) => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const adminApprove = `${backendAPI}/api/User/AdminApprove`;
  const parameters = {
    method: 'PUT',
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    sendHttpRequest(adminApprove, parameters)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

// Get patient info by QR code
export const execGetPatientByQrCode = data => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9000;
    const patientByQrCodeUrl = `${backendAPI}/api/PatientByQRCode`;
  const parameters = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  };

  return new Promise((resolve, reject) => {
    sendHttpRequest(patientByQrCodeUrl, parameters)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

// Reset password
export const execResetPassword = data => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const resetPasswordUrl = `${backendAPI}/api/User/ResetPassword`;
  const parameters = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  };

  return new Promise((resolve, reject) => {
    sendHttpRequest(resetPasswordUrl, parameters)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

// Get list user company
export const execGetListUserCompany = data => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const listCompanyUsersUrl = `${backendAPI}/api/users?status=1&role=3`;
  const parameters = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };
  return new Promise((resolve, reject) => {
    sendHttpRequest(listCompanyUsersUrl , parameters)
      .then(data =>  resolve(data))
      .catch(err => reject(err));
  });
};
