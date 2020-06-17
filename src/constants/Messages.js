// Fields
export const INVALID_EMAIL = 'Email không hợp lệ!';
export const REQUIRED_FIELD = 'Trường này là bắt buộc!';
export const INVALID_PHONE_NUMBER = 'Số điện thoại không hợp lệ!';
export const INVALID_PATIENT_ID = 'ID bệnh nhân không hợp lệ!';
export const USERNAME_REQUIRED = 'Vui lòng nhập tài khoản!';
export const PASSWORD_REQUIRED = 'Vui lòng nhập mật khẩu!';
export const PASSWORD_MISMATCH = 'Mật khẩu và nhập lại mật khẩu không trùng nhau!';
export const INVALID_LOGIN = 'Tài khoản hoặc mật khẩu không đúng!';
export const EMAIL_REQUIRED = 'Vui lòng nhập email!';
export const TRY_AGAIN_AFTER = 'Vui lòng thử lại sau {x} giây!';
export const REDIRECT_AFTER = 'Bạn sẽ được chuyển về {x} sau {y} giây!';
export const RESET_PASSWORD_SUCCESS = 'Mail reset password đã được gửi, hãy kiểm tra trong hộp thư đến!';
export const RESET_PASSWORD_FAILED ='Hiện không thể reset password, hãy thử lại sau';
// actions
export const LOGIN_FAILED = 'Đăng nhập thất bại!';
export const GET_USER_INFO_FAILED = 'Không thể truy vấn thông tin user';
export const USER_CREATED = 'Tạo user mới thành công';
export const SESSION_EXPIRED = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!';
export const LOGIN_REQUIRED = 'Vui lòng đăng nhập';
export const CHANGE_PASSWORD = 'Mật khẩu đã được thay đổi thành công';
export const USER_UPDATED = 'Cập nhật user thành công';
export const USER_DELETEED ='Xóa user thành công';
export const USER_RETRIEVE_DATA_FAILED = 'Không thể lấy thông tin người dùng';
export const USER_UPDATE_FAILED = 'Không thể cập nhật thông tin user';
export const UPDATE_AVATAR_FAILED = 'Không thể cập nhật ảnh đại diện';
export const UPDATE_AVATAR_SUCCESS = 'Cập nhật ảnh đại diện thành công';
export const WRONG_INFO ='Thông tin không chính xác';
export const USER_APPROVE = 'User đã được active';
export const INVALID_QR_CODE = 'QR code không hợp lệ';
export const GET_COMPANY_LIST_FAILED = 'Không thể lấy danh sách công ty';
export const GET_COMPANY_DETAILS_FAILED = 'Không thể lấy thông tin công ty';
export const ACTIVATE_COMPANY_FAILED = 'Không thể đăng ký công ty';
export const ACTIVATE_COMPANY_SUCCESS = 'Đăng ký công ty thành công';
export const ADMIN_APPROVE_USER_PENDING = 'Quản trị viên đã duyệt, chờ người dùng kích hoạt!';
export const USER_NO_MEDICAL_CODE = 'Không có mã y tế';
export const USER_NO_PATIENT_ID = 'Không có mã bệnh nhân';
export const USER_NO_COMPANY_ID = 'Không có mã công ty';
export const USER_ACTIVATED = 'Đã kích hoạt thành công!';
export const ACTIVATE_CODE_NOT_FOUND = 'Mã kích hoạt không tồn tại';
export const EMAIL_DOES_NOT_MATCH = 'Email không khớp';

// general
export const ERROR_OCCURED = 'Đã xảy ra lỗi, vui lòng thử lại sau!';
export const SERVER_ERROR = 'Kết nối đến máy chủ thất bại, vui lòng thử lại sau!';
export const SHOW_DETAIL = 'Xem chi tiết';
export const NO_DETAIL_AVAILABLE = 'Không thể xem';
export const INVALID_FILE_TYPE = 'File không hợp lệ';
export const LOGIN_URL_DOESNOT_MATCH = 'Có vẻ tài khoản của bạn không dùng để đăng nhập website này, vui lòng kiểm tra lại tài khoản và URL đăng nhập';

//TODO: Migrate to tree structure
export const USER = {
  UPDATE: {
    FAILED: "Cập nhật thông tin user thất bại",
    SUCCESS: "Cập nhật thông tin user thành công"
  },
  GET_DATA:{
    FAILED: "Không thể lấy thông tin user",
    SUCCESS: "Lấy thông tin user thành công"
  },
  DELETE: {
    FAILED: "Xóa user thất bại",
    SUCCESS: "Đã xóa user thành công"
  },
  ACTIVATE: {
    FAILED: "Kích hoạt user thành công",
    SUCCESS: "Không thể kích hoạt user"
  }
};
