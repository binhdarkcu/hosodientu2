import React from 'react';
import Link from 'redux-first-router-link'

const SidebarMenu = ({user}) => {

  const admin = [1,2,3,4,5];
  const patient = [1];
  const company = [1];

  let accessPages = [];

  switch (user.phanQuyen) {
    case 1:
      accessPages = admin;
      break;
    case 3:
      accessPages = company;
      break;
    default:
      accessPages = patient;
      break;

  }

  const pages = [
    {id: 1, path: '/lich-su-kham-benh', className: 'fa fa-table', label: 'Danh sách khám bệnh'},
    {id: 2,path: '/danh-sach-nguoi-dung', className: 'fa fa-list-alt', label: 'Danh sách người dùng'},
    {id: 3,path: '/danh-sach-cong-ty', className: 'fa fa-list-alt', label: 'Danh sách công ty'},
    {id: 4,path: '/admin-dang-ky', className: 'fa fa-bar-chart-o', label: 'Đăng ký người dùng'},
    {id: 5,path: '/dang-ky-cong-ty', className: 'fa fa-bar-chart-o', label: 'Đăng ký công ty'},
  ];

  return (
    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
      <div className="menu_section">
        <h3>General</h3>
        <ul className="nav side-menu">
          {pages.map((page, i) => {
            return  accessPages.indexOf(page.id) > -1 ? <li key={i}><Link to={`${page.path}`}><i className={`${page.className}`}></i>{page.label}</Link></li> : null;
          })}
        </ul>
      </div>

    </div>
  );
}

export default SidebarMenu;
