import { NOT_FOUND } from 'redux-first-router'

const components = {
  RTE_DASHBOARD: 'Dashboard',
  RTE_DO_LOANG_XUONG: 'Dashboard',
  RTE_SIEU_AM: 'Dashboard',
  RTE_KET_QUA_ECG: 'Dashboard',
  RTE_REGISTER: 'Dashboard',
  RTE_LOGIN: 'Login',
  [NOT_FOUND]: 'NotFound'
}

export default (state = 'RTE_DASHBOARD', action = {}) => components[action.type] || state
