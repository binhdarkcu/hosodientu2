import 'whatwg-fetch';
import baseUrl from './base-url';
import { sendHttpRequest } from './http-handler';

// URLs


// Get company list
export const execGetCompanyList = () => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const companyListUrl = `${backendAPI}/api/Companies`;
    const parameters = {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    return new Promise((resolve, reject) => {
        sendHttpRequest(companyListUrl, parameters)
          .then(data => resolve(data))
          .catch( err => reject(err));
    });
};

// Get company details
export const execGetCompanyDetails = (dvCongTacId) => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const companyDetailsUrl = `${backendAPI}/api/Company?id=`;
    const parameters = {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    return new Promise((resolve, reject) => {
        sendHttpRequest(companyDetailsUrl + dvCongTacId, parameters)
          .then(data => resolve(data))
          .catch( err => reject(err));
    });
};

// Activate company
export const execActivateCompany = (data) => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const activateCompanyUrl = `${backendAPI}/api/User/AdminActiveCompany`;
    const parameters = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    };

    return new Promise((resolve, reject) => {
        sendHttpRequest(activateCompanyUrl, parameters)
          .then(data => resolve(data))
          .catch( err => reject(err));
    });
};

export const execGetCompanyReportList = companyId => dispatch => {
    let backendAPI = localStorage.getItem('backendAPI') + ':' + 9001;
    const companyReportsUrl = `${backendAPI}/api/companyReports`;
  const parameters = {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  return new Promise((resolve, reject) => {
      sendHttpRequest(companyReportsUrl + `?companyId=${companyId}`, parameters)
        .then(data => resolve(data))
        .catch( err => reject(err));
  });
};
