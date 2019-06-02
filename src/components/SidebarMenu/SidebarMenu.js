import React from 'react';
import Link from 'redux-first-router-link'

const SidebarMenu = () => {
  return (
    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
      <div className="menu_section">
        <h3>General</h3>
        <ul className="nav side-menu">
          {/*<li><Link to="/do-loang-xuong"><i className="fa fa-edit"></i>Đo loãng xương</Link></li>*/}
          {/*<li><Link to="/sieu-am"><i className="fa fa-desktop"></i>Siêu âm</Link></li>*/}
          {/*<li><Link to="/ket-qua-ecg"><i className="fa fa-table"></i>Kêt quả ECG</Link></li>*/}
          <li><Link to="/lich-su-kham-benh"><i className="fa fa-table"></i>Danh sách khám bệnh</Link></li>
          <li><Link to="/admin-dang-ky"><i className="fa fa-bar-chart-o"></i>Đăng ký</Link></li>
          <li><Link to="/danh-sach"><i className="fa fa-list-alt"></i>Danh sách user</Link></li>
        </ul>
      </div>

    </div>
  );
}

export default SidebarMenu;
