import 'whatwg-fetch';
// import _ from 'lodash';
import baseUrl from './base-url';
import { sendHttpRequest } from './http-handler';
const portRP = localStorage.getItem('portReport');
let backendReportAPI = localStorage.getItem('backendAPI') + ':' + 9001;
let backendReportDetailAPI = localStorage.getItem('backendAPI') + ':' + 9000;

const getReportListUrl = `${backendReportAPI}/api/Reports`;

let getReportDetailsUrl = `${backendReportDetailAPI}/api/Report`;
//const getReportListUrl = `${baseUrl}/api/Reports`;
//const getReportDetailsUrl = `https://apidientu.goldenhealthcarevn.com:4001/api/Report`;

export const execGetReportList = code => dispatch => {
  const parameters = {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };
  //medicalCode=20000002
  return new Promise((resolve, reject) => {
      sendHttpRequest(getReportListUrl + `?patientId=${code}`, parameters)
        .then(data =>  resolve(data))
        .catch( err => reject(err));
  });
};

// data requires property: paramStr
export const execGetReportDetails = data => dispatch => {
  const queryParams = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
  console.log(queryParams)
  const parameters = {
      method: 'POST',
      body: queryParams,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
  };

  return new Promise((resolve, reject) => {
      sendHttpRequest(getReportDetailsUrl, parameters)
        .then(data => resolve(data))
        .catch( err => reject(err));
  });
};
