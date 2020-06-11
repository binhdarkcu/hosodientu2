import React from 'react';
import mainLogo from '../../assets/images/PHONGKHAMSG-01.png';
import PropTypes from 'prop-types';
import './Logo.scss';
const Logo = ({size, onClick, align}) => {
  return(
    <div className={`Logo ${align}`} onClick={onClick}>
        <img  src={mainLogo}  width={size} alt="Golden Clinic"/>
        <div className="LogoProtector" style={{width: size}}/>
    </div>
  )
}

Logo.propTypes = {size: PropTypes.number, onClick: PropTypes.func, align: PropTypes.oneOf(['left', 'center'])};
Logo.defaultProps = {size: 50, align: 'left'};

export default Logo;
