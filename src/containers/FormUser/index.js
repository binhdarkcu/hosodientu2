import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormLayoutHorizontal from '../../components/FormLayoutHorizontal';
import FormFooter from '../../components/FormFooter';
import mainLogo from '../../assets/images/logo.png';
import Divider from '@material-ui/core/Divider';
//custom import
import { execGetUserDetail } from '../../actions/services/api-user';

const mapDispatchToProps = dispatch => ({
  getUserDetail: (id) => dispatch(execGetUserDetail(id)),
});

const mapStateToProps = ({ id, services, location }) => ({
  id: id,
  users: services.user.userList,
  location: location,
});

const styles = theme => ({
  paper: {
    margin: 'auto',
    maxWidth: 500,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  content: {
    paddingTop: 20,
  },
  container: {
    padding: 10,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  buttonChangePass: {
    cursor: 'pointer',
    width: 130,
    height: 35,
    display: 'inline-block',
    backgroundColor: '#2196f3',
    border: '1px solid #5A738E',
    borderRadius: 4,
    color: '#fff',
    textTransform: 'uppercase',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 17,
    paddingRight: 17,
    marginTop: 10,
  },
});

class FormUser extends React.Component {

  state = {
    user: {},
    ngaySinh: '',
    ngayDangKy: '',
  }

  componentDidMount() {
    const id = this.props.location.pathname.match(/chi-tiet\/(\d+)/)[1];
    this.props.getUserDetail(id).then((data) => {
      const ngaySinh = this.formatYToD(data.ngaySinh);
      const ngayDangKy = this.formatYToD(data.ngayDangKy);
      this.setState({
        user: data,
        ngaySinh,
        ngayDangKy,
      })

    }).catch((err) => {
      console.log('err: ', err);
    });
  }

  formatYToD = (strDate) => {
    if (strDate && strDate !== '') {
      const arr = strDate.split('-');
      return `${arr[2].slice(0, 2)}/${arr[1]}/${arr[0]}`;
    }
    return null;
  };

  render() {
    const { classes } = this.props;
    const { user, ngaySinh, ngayDangKy } = this.state;
    return (
      <FormLayoutHorizontal>

        <Grid container spacing={24}>

          <Grid item xs={3}>
            <img className={classes.img} alt="complex" src={mainLogo} />
          </Grid>

          <Grid item xs={3}>
            <Typography component="h1" variant="h4" align="center" color="error">
              {user.ho} {user.ten}
            </Typography>
          </Grid>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={3}>
          <a href={`/doi-mat-khau/${user.userId}`} className={classes.buttonChangePass}> Đổi mật khẩu</a>
          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Ngày sinh: {ngaySinh}</div>
            <div>Giới tính: {user.gioiTinh === 'M' ? 'Nam' : 'Nữ'}</div>
            <div>Địa chỉ: {user.diaChi}</div>
            <div>Số điện thoại: {user.phone}</div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Mã Y tế: {user.maYte}</div>
            <div>Ngày đăng ký: {ngayDangKy}</div>
            <div>Trạng thái: {user.trangThai === 1 ? 'Actived' : user.trangThai === 2 ? 'User đang chờ active' : user.trangThai === 3 ? 'User đang chờ admin phê duyệt' : ''}</div>
          </Grid>
          <Divider />
        </Grid>

        <br></br>
        <br></br>
        <FormFooter />
      </FormLayoutHorizontal>
    );
  }
}

FormUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormUser));