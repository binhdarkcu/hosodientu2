import React from 'react';
import PropTypes from 'prop-types';

// custom imports
import {ERROR_OCCURED} from '../../constants/Messages';
import './style.scss';

const ErrorDisplayer = ({message}) => {
  return(
    <div className="InputErrorDisplayer">{message}</div>
  )
}

ErrorDisplayer.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorDisplayer;
