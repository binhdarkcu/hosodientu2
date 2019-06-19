import moment from 'moment';

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
    this.ngaySinh = ActivateCompanyPostModel.formatNgaySinh(data.ngaySinh);
  }

  save(){
    console.log('save');
  }

  delete(){
    console.log('delete');
  }
}

ActivateCompanyPostModel.formatNgaySinh = (data) => {
  const date = moment(data);
  if(date.isValid && (new moment()).diff(date, 'days') > 0)
    return date.format('YYYY-MM-DD');
  return '';

};
export default ActivateCompanyPostModel;
