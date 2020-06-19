import { NOT_FOUND } from 'redux-first-router';

const components = {
  //Sub-pages in dashboard
  RTE_DASHBOARD: 'Dashboard',
  RTE_CHANGE_PASSWORD: 'Dashboard',
  RTE_ADMIN_REGISTER: 'Dashboard',
  RTE_DANG_KY_CONG_TY: 'Dashboard',
  RTE_DANH_SACH_USER: 'Dashboard',
  RTE_DANH_SACH_CONG_TY: 'Dashboard',
  RTE_DANH_SACH_KHAM_BENH: 'Dashboard',
  RTE_TU_VAN: 'Dashboard',

  RTE_CHI_TIET_USER: 'Dashboard',
  RTE_CHI_TIET_CONG_TY: 'Dashboard',
  RTE_CHI_TIET_KHAM_BENH: 'Dashboard',

  // Separate pages
  RTE_CHON_CO_SO: 'PageChonCoSo',
  RTE_LOGIN: 'Login',
  RTE_USER_REGISTER: 'UserRegister',
  RTE_DOI_MAT_KHAU: 'DoiMatKhau',
  RTE_RESET_PASSWORD: 'ResetPassword',
  RTE_ACTIVATE: 'ActivateUser',
  [NOT_FOUND]: 'NotFound',
  RTE_TEST: 'TestPage'
};

export default (state = 'Dashboard', action = {}) => components[action.type] || state
