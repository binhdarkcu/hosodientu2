import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DatePicker from 'react-date-picker';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

//custom import
import FormLayoutVertical from '../../components/FormLayoutVertical';
import FormFooter from '../../components/FormFooter';
import Logo from '../../components/Logo';
import { toast } from 'react-toastify';
import * as MSG from '../../constants/Messages.js';
import * as RULE from '../../constants/Rules.js';
import { execRegister, execGetUserInfoByPatientCode, execUpdate, execGetPatientByQrCode, execGetUserDetail, execAdminApprove } from '../../actions/services/api-user';
import Spinner from '../../components/Spinner';
import { GOLDEN_HEALTH_ORANGE } from '../../constants/Colors';
import { BOUNCE } from '../../constants/Loaders';
import ActivatePatientPostModel from '../../models/activatePatientPostModel';

const mapDispatchToProps = dispatch => ({
  register: (data, type) => dispatch(execRegister(data, type)),
  goToDashboard: () => dispatch({ type: 'RTE_DASHBOARD' }),
  loadUserByPatientCode: (data) => dispatch(execGetUserInfoByPatientCode(data)),
  getUserDetail: (id) => dispatch(execGetUserDetail(id)),
  updateUser: (data) => dispatch(execUpdate(data)),
  goToUserList: () => dispatch({ type: 'RTE_DANH_SACH_USER' }),
  getUserByQrCode: (code) => dispatch(execGetPatientByQrCode({ code })),
  adminApprove: (dataId) => dispatch(execAdminApprove(dataId)),
});

const mapStateToProps = ({ location }) => ({
  location: location,
});

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(1)}px)`,
  },

  group: {
    margin: `${theme.spacing(1)}px 0`,
  },
  customControl: {
    margin: 8
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#2698D6',
    color: '#fff',
  },
});

class KiemTraUser extends React.Component {

  state = {
    userFromId: new ActivatePatientPostModel(),
    userFromPatientCode: new ActivatePatientPostModel(),
    loading: true,
  };

  componentDidMount() {
    this.initializeScreen();
  }

  initializeScreen = async () => {
      try{

        const { id } = this.props.location.payload;

        const userFromIdResponse = await this.props.getUserDetail(id);

        if(userFromIdResponse.status !== 200) throw(userFromIdResponse);

        const userFromPatientCodeResponse =  await this.props.loadUserByPatientCode({code: userFromIdResponse.json.maYte});

        const userFromId = new ActivatePatientPostModel(userFromIdResponse.json);

        const userFromPatientCode = userFromPatientCodeResponse.status === 200 ? new ActivatePatientPostModel(userFromPatientCodeResponse.json) : new ActivatePatientPostModel();

        this.setState({userFromId, userFromPatientCode, loading: false});

      }catch(err){
        this.handleError({detail: err, message: MSG.USER_RETRIEVE_DATA_FAILED});
      }
  }

  handleUpdateUser = async () => {
    try{
      const userFromId = {...this.state.userFromId};
      const { id } = this.props.location.payload;
      //TODO: need UserUpdateModel to handle this case
      const result = await this.props.updateUser({...userFromId, userId: id});
      if(result.status !== 200) throw(result);
      this.handleSuccess(MSG.USER_UPDATED);
    }catch(err){
      this.handleError({detail: err, message: MSG.USER_UPDATE_FAILED});
    }
  }

  handleSuccess = (message) => {
    toast.success(message);
  }

  handleError = (err) => {
    toast.error(err.message);
    this.setState({loading: false});
    console.error(err.detail);
  }

  handleChange = name => event => {
    let userFromId = { ...this.state.userFromId };
    userFromId[name] = event.target.value;
    this.setState({ userFromId: userFromId });

  };

  handleChangeDate = ngaySinh => {
    let userFromId = { ...this.state.userFromId };
    userFromId['ngaySinh'] = ngaySinh;
    this.setState({ userFromId: userFromId });
  }

  handleSubmit = async () => {
    try{
      const { id } = this.props.location.payload;
      const result = await this.props.adminApprove({ 'userId': id });
      if(result.status !== 200) throw(result);
      this.handleSuccess(MSG.ADMIN_APPROVE_USER_PENDING);
    }catch(err){
      this.handleError({detail: err, message: MSG.ERROR_OCCURED});
    }
  }

  goToDashboard = () => {
    this.props.goToDashboard();
  }

  render() {
    const { classes } = this.props;
    const { loading, userFromId, userFromPatientCode } = this.state;
    return (
      <FormLayoutVertical>
        <Spinner type={BOUNCE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading} />
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Logo onClick={this.goToDashboard} size={150} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography component="h1" variant="h4" align="center">
                  Kích hoạt
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h4" variant="body1" align="center" color="error">
                  Thông tin người dùng nhập
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Mã Y Tế"
                className={classes.textField}
                value={userFromId.maYte}
                onChange={this.handleChange('maYte')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Phone"
                className={classes.textField}
                value={userFromId.phone}
                onChange={this.handleChange('phone')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Địa chỉ"
                className={classes.textField}
                value={userFromId.diaChi}
                onChange={this.handleChange('diaChi')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Email"
                className={classes.textField}
                value={userFromId.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Họ"
                className={classes.textField}
                value={userFromId.ho}
                onChange={this.handleChange('ho')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Tên"
                className={classes.textField}
                value={userFromId.ten}
                onChange={this.handleChange('ten')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={classes.customControl}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel>Giới tính</FormLabel>
                  <RadioGroup
                    row
                    aria-label="Giới tính"
                    name="gender1"
                    className={classes.group}
                    onChange={this.handleChange('gioiTinh')}
                    value={userFromId.gioiTinh}
                  >
                    <FormControlLabel value="T" control={<Radio />} label="Nam" />
                    <FormControlLabel value="G" control={<Radio />} label="Nữ" />
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={classes.customControl}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel>Ngày sinh</FormLabel>
                  <DatePicker
                    name="datepicker1"
                    locale="vi"
                    onChange={this.handleChangeDate}
                    value={userFromId.ngaySinh}
                  />
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Năm sinh"
                className={classes.textField}
                value={userFromId.namSinh}
                onChange={this.handleChange('namSinh')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="button" variant="contained" className={classes.button} onClick={this.handleUpdateUser}>
                    Cập nhật thông tin
              </Button>
            </Grid>

          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h4" variant="body1" align="center" color="error">
                  Thông tin user lấy từ mã y tế của người dùng
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Mã Y Tế"
                className={classes.textField}
                value={userFromPatientCode.maYte}
                margin="normal"
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Phone"
                className={classes.textField}
                value={userFromPatientCode.phone}
                margin="normal"
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Địa chỉ"
                className={classes.textField}
                value={userFromPatientCode.diaChi}
                margin="normal"
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Email"
                className={classes.textField}
                value={userFromPatientCode.email}
                margin="normal"
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Họ"
                className={classes.textField}
                value={userFromPatientCode.ho}
                margin="normal"
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Tên"
                className={classes.textField}
                value={userFromPatientCode.ten}
                margin="normal"
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={classes.customControl}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel>Giới tính</FormLabel>
                  <RadioGroup
                    row
                    aria-label="Giới tính"
                    name="gender2"
                    className={classes.group}
                    value={userFromPatientCode.gioiTinh}
                  >
                    <FormControlLabel value="T" control={<Radio />} label="Nam" disabled/>
                    <FormControlLabel value="G" control={<Radio />} label="Nữ" disabled/>
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={classes.customControl}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel>Ngày sinh</FormLabel>
                  <DatePicker
                    name="datepicker2"
                    locale="vi"
                    disabled={true}
                    value={userFromPatientCode.ngaySinh}
                  />
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Năm sinh"
                className={classes.textField}
                value={userFromPatientCode.namSinh}
                margin="normal"
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" className={classes.button}>
                    Kích hoạt
              </Button>
            </Grid>
            <FormFooter />
          </Grid>
        </ValidatorForm>

      </FormLayoutVertical>
    );
  }
}

KiemTraUser.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['admin', 'user'])
};

KiemTraUser.defaultProps = { type: 'admin' }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(KiemTraUser));
