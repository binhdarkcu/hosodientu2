import { NOT_FOUND } from 'redux-first-router'

const components = {
  RTE_DASHBOARD: 'Dashboard',
  RTE_DO_LOANG_XUONG: 'Dashboard',
  RTE_SIEU_AM: 'Dashboard',
  RTE_KET_QUA_ECG: 'Dashboard',
  RTE_CHANGE_PASSWORD: 'Dashboard',
  RTE_ADMIN_REGISTER: 'Dashboard',
  RTE_USER_REGISTER: 'UserRegister',
  RTE_DANH_SACH_USER: 'Dashboard',
  RTE_LOGIN: 'Login',
  RTE_ACTIVATE: 'ActivateUser',
  [NOT_FOUND]: 'NotFound'
}

export default (state = 'Dashboard', action = {}) => components[action.type] || state
