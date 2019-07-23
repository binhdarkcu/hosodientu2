import { USER } from "../constants/User";
import moment from 'moment';

// For displaying only
class UserModel {
  constructor(data = {}) {
    this.userId = data.userId || "";
    this.avatar = data.avatar || "";
    this.benhNhanId = data.benhNhanId || "";
    this.maYte = data.soVaoVien || data.maYte || "";
    this.phone = data.phone || data.soDienThoai || "";
    this.diaChi = data.diaChi || "";
    this.email = data.email || "";
    this.ho = data.ho || "";
    this.ten = data.ten || "";
    this.gioiTinh = data.gioiTinh || '';
    this.ngayDangKy = data.ngayDangKy || "";
    this.ngayKichHoat = data.ngayKichHoat || "";
    this.ngaySinh = data.ngaySinh || "";
    this.namSinh = data.namSinh || "";
    this.trangThai = data.trangThai || "";
    this.phanQuyen = data.phanQuyen || "";
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
    switch (this.trangThai) {
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

  getGenderName(){
    switch (this.gioiTinh) {
      case USER.GENDER.MALE.CODE:
        return USER.GENDER.MALE.LABEL;
      case USER.GENDER.FEMALE.CODE:
        return USER.GENDER.FEMALE.LABEL;
      default:
        return USER.GENDER.UNDEFINED.LABEL
    }
  }

  getFormattedBirthday(){
    return this.ngaySinh ? moment(this.ngaySinh).format('DD/MM/YYYY') : '';
  }

  getFullName(){
    return (this.ho.trim() + ' ' + this.ten.trim()).trim();
  }
}

export default UserModel;
