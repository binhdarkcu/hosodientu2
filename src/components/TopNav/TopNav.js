import React from 'react';

class TopNav extends React.Component {

  handleClick = (e) => {
    e.preventDefault();
  }

  handleChangeAvatar = e => {
    e.preventDefault();
    if(this.props.changeAvatar)
        this.props.changeAvatar();
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.logOut();
  }

  getAvatarUrl = (user) => {
    if(user.avatar) return 'data:image/jpeg;base64,' + user.avatar
    return 'data:image/png;base64,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';
  }

  render(){

    const { user } = this.props;

    return(
      <div className="top_nav">
        <div className="nav_menu">
          <nav>
            <div className="nav toggle">
              <a id="menu_toggle"><i className="fa fa-bars"></i></a>
            </div>

            <ul className="nav navbar-nav navbar-right">
              <li className="">
                <a href="javascript:;" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  <img src={this.getAvatarUrl(user)} alt=""/> {user.email}
                  <span className=" fa fa-angle-down"></span>
                </a>
                <ul className="dropdown-menu dropdown-usermenu pull-right">
                  <li><a href="/" onClick={this.handleClick}>Trang cá nhân</a></li>
                  <li><a href="/" onClick={this.handleChangeAvatar}>Đổi ảnh đại diện</a></li>
                  <li><a href="/doi-mat-khau" onClick={this.handleClick}>Đổi mật khẩu</a></li>
                  <li><a href="/" onClick={this.handleLogout}><i className="fa fa-sign-out pull-right"></i> Thoát</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
export default TopNav;
