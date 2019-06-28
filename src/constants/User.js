export const USER = {
  ROLE: {
    ADMIN: {
      CODE: 1,
      LABEL: 'Quản trị viên'
    },
    PATIENT: {
      CODE: 2,
      LABEL: 'Bệnh nhân'
    },
    COMPANY: {
      CODE: 3,
      LABEL: 'Công ty'
    },
    UNDEFINED:{
      LABEL: 'Không xác định'
    }
  },
  STATUS: {
    ACTIVE: {
      CODE: 1,
      LABEL: 'Đang hoạt động'
    },
    PENDING_USER: {
      CODE: 2,
      LABEL: 'Chờ user kích hoạt'
    },
    PENDING_ADMIN: {
      CODE: 3,
      LABEL: 'Chờ admin duyệt'
    },
    INACTIVE: {
      CODE: 4,
      LABEL: 'Vô hiệu'
    },
    UNDEFINED:{
      LABEL: 'Không xác định'
    }
  },
  ACTION: {
    DETAIL: 'DETAIL',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    ACTIVATE: 'ACTIVATE'
  }
};