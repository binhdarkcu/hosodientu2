import React from 'react';
import PropTypes from 'prop-types';

const SidebarProfile = ({user}) => {
  return(
    <div className="profile clearfix">
      <div className="profile_pic">
        <img src="images/img.jpg" alt="..." className="img-circle profile_img"/>
      </div>
      <div className="profile_info">
        <span>Welcome,</span>
        <h2>{user.name}</h2>
      </div>
    </div>
  );
}

SidebarProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
}

export default SidebarProfile;
