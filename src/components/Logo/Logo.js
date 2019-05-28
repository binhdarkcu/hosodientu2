import React from 'react';
import mainLogo from '../../assets/images/logo.png';
import PropTypes from 'prop-types';
import './Logo.scss';
const Logo = ({size, onClick}) => {
  return(
    <div className="Logo" onClick={onClick}>
        <img  src={mainLogo}  width={size} alt="Golden Clinic"/>
        <div className="LogoProtector" style={{width: size}}/>
    </div>
  )
}

Logo.propTypes = {size: PropTypes.number, onClick: PropTypes.func}
Logo.defaultProps = {size: 50}

export default Logo;
