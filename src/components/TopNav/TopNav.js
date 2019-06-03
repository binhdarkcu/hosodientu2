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
                  <img src="images/img.jpg" alt=""/> {user.name}
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
