import React from 'react';
import Link from 'redux-first-router-link';
import { USER } from '../../constants/User';

const SidebarMenu = ({user}) => {

  const admin = [1,2,3,4,5,6];
  const patient = [1,6];
  const company = [1,6];

  let accessPages = [];

  switch (user.phanQuyen) {
    case USER.ROLE.ADMIN.CODE:
      accessPages = admin;
      break;
    case USER.ROLE.COMPANY.CODE:
      accessPages = company;
      break;
    default:
      accessPages = patient;
      break;

  }

  const pages = [
    {id: 1, path: '/lich-su-kham-benh', className: 'fa fa-table', label: 'Danh sách khám bệnh'},
    {id: 2,path: '/danh-sach-nguoi-dung', className: 'fa fa-list-ul', label: 'Danh sách người dùng'},
    {id: 3,path: '/danh-sach-cong-ty', className: 'fa fa-list-ul', label: 'Danh sách công ty'},
    {id: 4,path: '/admin-dang-ky', className: 'fa fa-user-plus', label: 'Đăng ký người dùng'},
    {id: 5,path: '/dang-ky-user-cong-ty', className: 'fa fa-user-plus', label: 'Tạo user công ty'},
    {id: 6,path: '/tu-van', className: 'fa fa-question-circle', label: 'Tư vấn'},
  ];

  return (
    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
      <div className="menu_section">
        <ul className="nav side-menu">
          {pages.map((page, i) => {
            return  accessPages.indexOf(page.id) > -1 ? <li key={i}><Link to={`${page.path}`}><i className={`${page.className}`}/>{page.label}</Link></li> : null;
          })}
        </ul>
      </div>

    </div>
  );
};

export default SidebarMenu;
