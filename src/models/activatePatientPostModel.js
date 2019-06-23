import {USER} from "../constants/User";
import moment from 'moment';

class ActivatePatientPostModel {
  constructor(data = {}) {
    this.benhNhanId = data.benhNhanId || "";
    this.maYte = data.maYte || data.soVaoVien || "";
    this.phone = data.phone || data.soDienThoai || "";
    this.diaChi = data.diaChi || "";
    this.email = data.email || "";
    this.ho = data.ho || "";
    this.ten = data.ten || "";
    this.gioiTinh = data.gioiTinh || '';
    this.ngaySinh = data.ngaySinh || "";
    this.namSinh = data.namSinh || "";
    this.trangThai = data.trangThai || "";
    this.phanQuyen = data.phanQuyen || "";
    // If no userId means create new user, otherwise, update user
    if(data.userId){
      this.userId = data.userId;
    }
  }

  getRoleName(){
    switch (this.phanQuyen) {
      case USER.ROLE.ADMIN.CODE:
        return USER.ROLE.ADMIN.LABEL;
      case USER.ROLE.PATIENT.CODE:
        return USER.ROLE.PATIENT.LABEL;
      case USER.ROLE.COMPANY.CODE:
        return USER.ROLE.COMPANY.LABEL;
      default:
        return USER.ROLE.UNDEFINED.LABEL
    }
  }

  getStatusName(){
    switch (this.phanQuyen) {
      case USER.STATUS.ACTIVE.CODE:
        return USER.STATUS.ACTIVE.LABEL;
      case USER.STATUS.INACTIVE.CODE:
        return USER.ROLE.INACTIVE.LABEL;
      case USER.STATUS.PENDING_ADMIN.CODE:
        return USER.STATUS.PENDING_ADMIN.LABEL;
      case USER.STATUS.PENDING_USER.CODE:
        return USER.STATUS.PENDING_USER.LABEL;
      default:
        return USER.STATUS.UNDEFINED.LABEL
    }
  }

  getFormattedBirthday(){
    return this.ngaySinh ? moment(this.ngaySinh).format('DD/MM/YYYY') : '';
  }
}

export default ActivatePatientPostModel;
