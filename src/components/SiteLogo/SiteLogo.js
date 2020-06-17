import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import  './style.scss';

const SiteLogo = ({onClick}) => {

  return(
    <div className="navbar nav_title" style={{border: 0}}>
      <div className="SiteLogo">
        <Logo onClick={onClick} size={175}/>
      </div>
    </div>
  )
};

SiteLogo.propTypes = {
  onClick: PropTypes.func.isRequired
};
export default SiteLogo;
