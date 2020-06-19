import React from 'react';
import PropTypes from 'prop-types';
import NoUserImage from '../../assets/images/user.png';

const SidebarProfile = ({user}) => {

  const getAvatarUrl = (user) => {
    console.log(user)
    if(user.avatar) return 'data:image/jpeg;base64,' + user.avatar;
    return NoUserImage;
  }

  return(
    <div className="profile clearfix">
      <div className="profile_pic">
        <img src={getAvatarUrl(user)} alt="..." className="img-circle profile_img"/>
      </div>
      <div className="profile_info">
        <span>Xin chào,</span>
        <h2>{user.email}</h2>
      </div>
    </div>
  );
}

SidebarProfile.propTypes = {
  user: PropTypes.object.isRequired
};

export default SidebarProfile;
