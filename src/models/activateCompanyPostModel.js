import { formatBirthDay } from '../utilities';

class ActivateCompanyPostModel {
  constructor(data = {}) {
    this.benhNhanId = data.benhNhanId || "";
    this.maYte = data.soVaoVien || "";
    this.donViCongTacId = data.donViCongTacId || "";
    this.phone = data.diaChi || "";
    this.email = data.email || "";
    this.ho = data.ho || "";
    this.ten = data.ten || "";
    this.gioiTinh = data.gioiTinh || "";
    this.ngaySinh = formatBirthDay(data.ngaySinh) || "";
  }

  save(){
    console.log('save');
  }

  delete(){
    console.log('delete');
  }
}

export default ActivateCompanyPostModel;
