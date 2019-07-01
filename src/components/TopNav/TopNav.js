import React from 'react';
import PropTypes from 'prop-types';

// custom imports
import NoUserImage from '../../assets/images/user.png';

class TopNav extends React.Component {

  handleClick = (e) => {
    e.preventDefault();
  };

  handleChangeAvatar = e => {
    e.preventDefault();
    if(this.props.changeAvatar)
        this.props.changeAvatar();
  };

  handleLogout = (e) => {
    e.preventDefault();
    this.props.logOut();
  };

  getAvatarUrl = (user) => {
    if(user.avatar) return 'data:image/jpeg;base64,' + user.avatar
    return NoUserImage;
  };

  goToChangePasswordPage = (e) => {
    e.preventDefault();
    if(this.props.redirectToChangePaswordPage) this.props.redirectToChangePaswordPage();
  };

  render(){

    const { user } = this.props;

    return(
      <div className="top_nav">
        <div className="nav_menu">
          <nav>
            <div className="nav toggle">
              <a id="menu_toggle" href="index.html" onClick={this.handleClick}><i className="fa fa-bars"></i></a>
            </div>

            <ul className="nav navbar-nav navbar-right">
              <li className="">
                <a href="index.html" onClick={this.handleClick} className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  <img src={this.getAvatarUrl(user)} alt=""/> {user.email}
                  <span className=" fa fa-angle-down"></span>
                </a>
                <ul className="dropdown-menu dropdown-usermenu pull-right">
                  {/*<li><a href="/trang-ca-nhan" onClick={this.handleClick}>Trang cá nhân</a></li>*/}
                  <li><a href="/doi-avatar" onClick={this.handleChangeAvatar}>Đổi ảnh đại diện</a></li>
                  <li><a href="/doi-mat-khau" onClick={this.goToChangePasswordPage}>Đổi mật khẩu</a></li>
                  <li><a href="/logout" onClick={this.handleLogout}><i className="fa fa-sign-out pull-right"></i> Thoát</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

TopNav.propTypes = {
  logOut: PropTypes.func.isRequired,
  changeAvatar: PropTypes.func.isRequired,
  redirectToChangePaswordPage: PropTypes.func.isRequired
};

export default TopNav;
