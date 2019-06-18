import 'whatwg-fetch';
import baseUrl from './base-url';
import { sendHttpRequest } from './http-handler';

// URLs
const companyListUrl = `${baseUrl}/api/Companies`;
const companyDetailsUrl = `${baseUrl}/api/Company?id=`;
const companyReportsUrl = `${baseUrl}/api/companyReports`;
const activateCompanyUrl = `${baseUrl}/api/User/AdminActiveCompany`;

// Get company list
export const execGetCompanyList = () => dispatch => {
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
