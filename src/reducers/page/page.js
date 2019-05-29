import { NOT_FOUND } from 'redux-first-router'

const components = {
  //Sub-pages in dashboard
  RTE_DASHBOARD: 'Dashboard',
  RTE_DO_LOANG_XUONG: 'Dashboard',
  RTE_SIEU_AM: 'Dashboard',
  RTE_KET_QUA_ECG: 'Dashboard',
  RTE_CHANGE_PASSWORD: 'Dashboard',
  RTE_ADMIN_REGISTER: 'Dashboard',
  RTE_LIST_SIEU_AM: 'Dashboard',
  RTE_LIST_KET_QUA_ECG: 'Dashboard',
  RTE_LIST_DO_LOANG_XUONG: 'Dashboard',
  RTE_DANH_SACH_USER: 'Dashboard',
  RTE_CHI_TIET_USER: 'Dashboard',

  // Separate pages
  RTE_LOGIN: 'Login',
  RTE_USER_REGISTER: 'UserRegister',
  RTE_DOI_MAT_KHAU: 'DoiMatKhau',
  RTE_ACTIVATE: 'ActivateUser',
  [NOT_FOUND]: 'NotFound'
}

export default (state = 'Dashboard', action = {}) => components[action.type] || state
