import React from 'react';
import PropTypes from 'prop-types';

const SidebarProfile = ({user}) => {

  const getAvatarUrl = (user) => {
    if(user.avatar) return 'data:image/jpeg;base64,' + user.avatar
    return '';
  }

  return(
    <div className="profile clearfix">
      <div className="profile_pic">
        <img src={getAvatarUrl(user)} alt="..." className="img-circle profile_img"/>
      </div>
      <div className="profile_info">
        <span>Welcome,</span>
        <h2>{user.email}</h2>
      </div>
    </div>
  );
}

SidebarProfile.propTypes = {
  user: PropTypes.object.isRequired
}

export default SidebarProfile;
