import { NOT_FOUND } from 'redux-first-router'

const components = {
  RTE_DASHBOARD: 'Dashboard',
  RTE_LOGIN: 'Login',
  [NOT_FOUND]: 'NotFound'
}

export default (state = 'RTE_DASHBOARD', action = {}) => components[action.type] || state
