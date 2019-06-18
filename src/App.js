import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './assets/styles/all.scss';
// custom imports
import * as pages from './containers';
import { createDefaultRedirector } from './router';

// OVERWRITE CONSOLE
let console = function(oldCons){

  const DEVELOP_MODE = process.env.NODE_ENV === 'development';

  return {
    log: function(){
      DEVELOP_MODE && oldCons.log.apply(console, arguments);
    },
    info: function(){
      DEVELOP_MODE && oldCons.info.apply(console, arguments);
    },
    warn: function(){
      DEVELOP_MODE && oldCons.warn.apply(console, arguments);
    },
    error: function(){
      DEVELOP_MODE && oldCons.error.apply(console, arguments);
    }
  }
}(window.console);

//Then redefine the old console
window.console = console;

// config toast notifications
toast.configure({
  autoClose: 5000,
  draggablePercent: 60,
  pauseOnFocusLoss: true,
  delay: 150
});

const App = ({page, location}) => {
  let CurrentPage = pages[page];
  if(!sessionStorage.authToken && location.type !== 'RTE_ACTIVATE' && location.type !== 'RTE_USER_REGISTER') {
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
