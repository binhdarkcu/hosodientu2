class ActivatePatientPostModel {
  constructor(data = {}) {
    this.benhNhanId = data.benhNhanId || "";
    this.maYte = data.soVaoVien || "";
    this.phone = data.soDienThoai || "";
    this.diaChi = data.diaChi || "";
    this.email = data.email || "";
    this.ho = data.ho || "";
    this.ten = data.ten || "";
    this.gioiTinh = data.gioiTinh || "";
    this.ngaySinh = data.ngaySinh || "";
    this.namSinh = data.namSinh || "";
  }
}

export default ActivatePatientPostModel;
