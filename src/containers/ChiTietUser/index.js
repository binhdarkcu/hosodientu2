import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import FormLayoutHorizontal from '../../components/FormLayoutHorizontal';
import Logo from '../../components/Logo';
import FormFooter from '../../components/FormFooter';
import { toast } from 'react-toastify';
import * as MSG from '../../constants/Messages.js';
import { BOUNCE } from '../../constants/Loaders';
import Spinner from '../../components/Spinner';
import { GOLDEN_HEALTH_ORANGE } from '../../constants/Colors';
//custom import
import UserModel from '../../models/userModel';
import Avatar from '../../components/Avatar';
import Button from '@material-ui/core/Button';
import { RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS } from "../../constants/Messages";
import { execGetUserDetail, execResetPassword } from '../../actions/services/api-user';

const mapDispatchToProps = dispatch => ({
  execGetUserDetail: id => dispatch(execGetUserDetail(id)),
  execResetPassword: data => dispatch(execResetPassword(data))
});

const mapStateToProps = ({ services, location }) => ({
  currentUser: services.user.userInfo,
  location: location,
});

const styles = theme => ({
  item: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: '14px'
  },
  inActive: {
    color: 'red'
  },
  activated: {
    color: '#00f'
  },
  buttonActive: {
    backgroundColor: '#2698D6',
    color: '#fff',
  }
});

class ChiTietUser extends React.Component {

  state = {
    user: new UserModel(),
    loading: true
  };

  componentWillMount() {
    const { id } = this.props.location.payload;
    this.props.execGetUserDetail(id)
      .then(({status, json}) => status === 200 ? this.handleSuccess(json) : this.handleError(json))
      .catch(err => this.handleError(err))
  }

  handleSuccess = user => {
    console.log(user);
    this.setState({user: new UserModel(user), loading: false});
  };

  handleError = (err) => {
    this.setState({loading: false});
    toast.error(MSG.GET_COMPANY_DETAILS_FAILED);
  };

  sendResetPwd = async () => {
    try{
      this.setState({loading: true});
      const { user } = this.state;
      if(!user.email) return;
      const result = this.props.execResetPassword({email: user.email});
      if(result.status === 200){
        this.setState({loading: false});
        toast.success(RESET_PASSWORD_SUCCESS);
        return;
      }
      throw (result);
    }catch (e) {
      this.setState({loading: false});
      toast.error(RESET_PASSWORD_FAILED);
    }
  };

  render() {

    const { classes, currentUser } = this.props;
    const { user, loading } = this.state;
    return (
      <FormLayoutHorizontal>

        <Spinner type={BOUNCE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading} />

        <Grid container spacing={2}>

          <Grid item xs={12} sm={3}>
            <Logo size={150} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography component="h1" variant="h4" align="center">
              Thông tin người dùng
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <div className={classes.item}>
              <Avatar user={user} height={70}/>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.item}><b>Họ tên:</b> <i>{user.ten}</i></div>
            <div className={classes.item}><b>Ngày sinh:</b> <i>{user.ngaySinh && moment(user.ngaySinh).format('DD/MM/YYYY h:mm:ss')}</i></div>
            <div className={classes.item}><b>Giới tính:</b> <i>{user.getGenderName()}</i></div>
            <div className={classes.item}><b>Điện thoại:</b> <i>{user.phone}</i></div>
            <div className={classes.item}><b>Địa chỉ:</b> <i>{user.diaChi}</i></div>
            <div className={classes.item}><b>Email:</b> <i>{user.email}</i></div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={classes.item}><b>Mã y tế:</b> <i>{user.maYte}</i></div>
            <div className={classes.item}><b>Loại user:</b> <i>{user.getRoleName()}</i></div>
            <div className={classes.item}><b>Ngày tạo:</b> <i>{user.ngayTao && moment(user.ngayTao).format('DD/MM/YYYY h:mm:ss')}</i></div>
            <div className={classes.item}><b>Ngày cập nhật:</b> <i>{user.ngayCapNhat && moment(user.ngayCapNhat).format('DD/MM/YYYY h:mm:ss')}</i></div>
            <div className={classes.item}><b>Trạng thái kích hoạt:</b> <i><b className={classes.activated}>{user.getStatusName()}</b></i></div>
          </Grid>

          <Grid item xs={12}>
            {user.userId && currentUser.userId !== user.userId && <Button variant="contained" className={classes.buttonActive} onClick={this.sendResetPwd}>Gửi email reset password</Button>}
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

ChiTietUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChiTietUser));
