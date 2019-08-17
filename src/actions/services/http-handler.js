import 'whatwg-fetch';
import * as MSG from '../../constants/Messages';
import { toast } from 'react-toastify';


export const sendHttpRequest = (url, params) => {

  const authToken = sessionStorage.getItem('authToken');

  if(!!authToken){
    params = {...params, headers: {...params.headers, Authorization: `Bearer ${authToken}`}};
  }

  // const dispatchAction = action => dispatch => {
  //   dispatch(action);
  // }

  return new Promise((resolve, reject) => {
      fetch(url, params)
        .then(response => {
            response.json().then(json => ({
                status: response.status,
                loading: 'loading',
                json
            }))
              .then(({ status, json }) => {
                // unauthorized request (maybe session expired or user is not logged in)
                if(status === 401){
                  sessionStorage.clear();
                  // dispatchAction({type: 'SHOW_QUICK_LOGIN'});
                  toast.info(MSG.LOGIN_REQUIRED, {autoClose: 8000});
                }
                return resolve({ status, json });
              })
              .catch(err => reject(err));

      })
        .catch(jsonError => reject(jsonError));
  });
}
