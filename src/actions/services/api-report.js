import 'whatwg-fetch';
import _ from 'lodash';
import baseUrl from './base-url';
import { sendHttpRequest } from './http-handler';

const getReportListUrl = `${baseUrl}/api/Reports`;
const getReportDetailsUrl = `http://115.79.197.84:83/api/Report`;

export const execGetReportList= data => dispatch => {
  const parameters = {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  return new Promise((resolve, reject) => {
      sendHttpRequest(getReportListUrl + '?medicalCode=20000002', parameters)
        .then(({status, json}) => {
          return resolve(json);
        })
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
        .then(({status, json}) => {
          return resolve(json);
        })
        .catch( err => reject(err));
  });
};
