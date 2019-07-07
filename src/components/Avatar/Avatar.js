import React from 'react';
import PropTypes from 'prop-types';

// custom imports
import NoUserImage from '../../assets/images/user.png';

class Avatar extends React.Component {

  getAvatarUrl = (user) => {
    if(user.avatar) return 'data:image/jpeg;base64,' + user.avatar
    return NoUserImage;
  };

  render(){

    const { user, height } = this.props;
    return(
      <div className="Avatar">
        <img src={this.getAvatarUrl(user)} alt="Ảnh đại diện" height={height}/>
      </div>
    )
  }
}

Avatar.defaultProps = {
  height: 50,
  user: {}
};

Avatar.propTypes = {
  user: PropTypes.object.isRequired
};

export default Avatar;
