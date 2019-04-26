import React from 'react';
import mainLogo from '../../assets/images/logo.png';
import PropTypes from 'prop-types';
import './Logo.scss';
const Logo = ({size}) => {
  return(
    <div className="Logo">
        <img  src={mainLogo}  width={size} alt="Golden Clinic"/>
        <div className="LogoProtector" style={{width: size}}/>
    </div>
  )
}

Logo.propTypes = {size: PropTypes.number}
Logo.defaultProps = {size: 50}

export default Logo;
