class ActivatePatientPostModel {
  constructor(data = {}) {
    this.benhNhanId = data.benhNhanId || "";
    this.maYte = data.maYte || "";
    this.phone = data.phone || "";
    this.diaChi = data.diaChi || "";
    this.email = data.email || "";
    this.ho = data.ho || "";
    this.ten = data.ten || "";
    this.gioiTinh = data.gioiTinh || "";
    this.ngaySinh = data.ngaySinh || "";
  }
}

export default ActivatePatientPostModel;
