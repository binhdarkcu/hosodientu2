class ActivateCompanyPostModel {
  constructor(data = {}) {
    this.maYte = data.maYte || "";
    this.donViCongTacId = data.donViCongTacId || "";
    this.diaChi = data.diaChi || "";
    this.phone = data.phone || "";
    this.email = data.email || "";
    this.ten = data.ten || "";
  }

  save(){
    console.log('save');
  }

  delete(){
    console.log('delete');
  }
}

export default ActivateCompanyPostModel;
