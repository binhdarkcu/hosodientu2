import React from 'react';
import Link from 'redux-first-router-link'

const SidebarMenu = () => {
  return(
    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
      <div className="menu_section">
        <h3>General</h3>
        <ul className="nav side-menu">
          <li><a><i className="fa fa-home"></i> Home <span className="fa fa-chevron-down"></span></a>
            <ul className="nav child_menu">
              <li><Link to="/do-loang-xuong/09423"><i className="fa fa-edit"></i>Đo loãng xương</Link></li>
              <li><Link to="/sieu-am/0312590"><i className="fa fa-desktop"></i>Siêu âm</Link></li>
              <li><Link to="/ket-qua-ecg/083273"><i className="fa fa-table"></i>Kêt quả ECG</Link></li>
              <li><Link to="/dang-ky"><i className="fa fa-bar-chart-o"></i>Đăng ký</Link></li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default SidebarMenu;
