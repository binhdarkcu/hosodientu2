import React from 'react';
import Link from 'redux-first-router-link'

const SidebarMenu = () => {
  return (
    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
      <div className="menu_section">
        <h3>General</h3>
        <ul className="nav side-menu">
          <li><Link to="/lich-su-kham-benh"><i className="fa fa-table"></i>Danh sách khám bệnh</Link></li>
          <li><Link to="/danh-sach-nguoi-dung"><i className="fa fa-list-alt"></i>Danh sách người dùng</Link></li>
          <li><Link to="/danh-sach-cong-ty"><i className="fa fa-list-alt"></i>Danh sách công ty</Link></li>
          <li><Link to="/admin-dang-ky"><i className="fa fa-bar-chart-o"></i>Đăng ký người dùng</Link></li>
          <li><Link to="/dang-ky-cong-ty"><i className="fa fa-bar-chart-o"></i>Đăng ký công ty</Link></li>
        </ul>
      </div>

    </div>
  );
}

export default SidebarMenu;
