import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// custom imports
import * as pages from './containers';
import {createDefaultRedirector} from './router';

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
