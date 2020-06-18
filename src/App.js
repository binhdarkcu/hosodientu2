import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'

import './assets/styles/all.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
// custom imports
import * as pages from './containers';
import { createDefaultRedirector } from './router';

//***************************************************************************
//                        APPLICATION CONFIGURATIONS                        *
//***************************************************************************

// Config momentJs
moment.updateLocale(moment.locale(), { invalidDate: "Ngày không hợp lệ!" });

// config console
// const console = function(oldCons){
//
//   process.env.NODE_ENV !== 'development' && oldCons.log('console sẽ bị vô hiệu hóa trong môi trường production!');
//
//   return {
//     log: () => {},
//     info: () => {},
//     warn: () => {},
//     error: () => {}
//   }
// }(window.console);

//Then redefine the old console
if(process.env.NODE_ENV !== 'development'){
  // window.console = console;
}

// config toast notifications
toast.configure({
  autoClose: 5000,
  draggablePercent: 60,
  pauseOnFocusLoss: true,
  delay: 150
});

const App = ({page, location}) => {
  let CurrentPage = pages[page];
  console.log(page)
  const backendAPI = localStorage.getItem('backendAPI');
  if(backendAPI === null) {
    CurrentPage = pages['ChonCoSo'];
    console.log(1)
  }
  else if(!sessionStorage.authToken && location.type !== 'RTE_CHON_CO_SO' && location.type !== 'RTE_RESET_PASSWORD' && location.type !== 'RTE_ACTIVATE' && location.type !== 'RTE_USER_REGISTER' && location.type !== 'RTE_TEST') {
    console.log(2)
    CurrentPage = pages['Login'];
  }

  return <CurrentPage />
}

App.propTypes = {
    defaultRedirector: PropTypes.func.isRequired
}

const mapStateToProps = ({page, location}) => ({page, location});

const mapDispatchToProps = (dispatch) => ({
    defaultRedirector: createDefaultRedirector(dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null, { forwardRef: true }
)(App);
