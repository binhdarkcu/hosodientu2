import React from 'react';
import mainLogo from '../../assets/images/logo.png';
const Logo = ({size}) => {
  return(
    <div className="Logo">
        <img  src={mainLogo}  width={size} alt="Golden Clinic"/>
    </div>
  )
}
Logo.defaultProps = {size: 50}

export default Logo;
