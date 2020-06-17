import 'whatwg-fetch';
// import _ from 'lodash';
import baseUrl from './base-url';
import { sendHttpRequest } from './http-handler';
const portRP = localStorage.getItem('portReport');
let backendReportAPI = localStorage.getItem('backendAPI') + ':' + 9001;

const getReportListUrl = `${backendReportAPI}/api/Reports`;

let getReportDetailsUrl = `${backendReportAPI}/api/Report`;

export const execGetReportList = code => dispatch => {
  //const token = sessionStorage.getItem('authToken');
  const parameters = {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };
  //medicalCode=20000002
  console.log(getReportListUrl)

  return new Promise((resolve, reject) => {
      sendHttpRequest(getReportListUrl + `?patientId=${code}`, parameters)
        .then(data =>  resolve(data))
        .catch( err => reject(err));
  });
};

// data requires property: paramStr
export const execGetReportDetails = data => dispatch => {
  const queryParams = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
  const parameters = {
      method: 'POST',
      body: queryParams,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  return new Promise((resolve, reject) => {
      sendHttpRequest(getReportDetailsUrl, parameters)
        .then(data => resolve(data))
        .catch( err => reject(err));
  });
};
