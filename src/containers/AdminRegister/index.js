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
import { debounce } from 'lodash';
import { connect } from 'react-redux';

//custom import
import QRScanner from '../../components/QRScanner';
import FormLayoutVertical from '../../components/FormLayoutVertical';
import FormFooter from '../../components/FormFooter';
import Logo from '../../components/Logo';
import { toast } from 'react-toastify';
import * as MSG from '../../constants/Messages.js';
import * as RULE from '../../constants/Rules.js';
import { execRegister, execGetUserInfoByPatientCode, execUpdate, execGetPatientByQrCode, execGetUserDetail } from '../../actions/services/api-user';
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
  getUserByQrCode: (code) => dispatch(execGetPatientByQrCode({ code }))
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

class FormRegister extends React.Component {

  state = {
    user: {
      userId: '',
      ho: '',
      ten: '',
      benhNhanId: '',
      phone: '',
      email: '',
      maYte: '',
      ngaySinh: null,
      namSinh: '',
      diaChi: '',
      gioiTinh: 'T',
    },
    loading: false,
    isUpdateUser: '',
    showQRScanner: false
  };

  componentDidMount() {
    const idUser = this.props.location.payload.id;
    if (idUser) {
      const _self = this;
      _self.setState({ loading: true });
      this.setState({
        isUpdateUser: idUser,
      });
      this.props.getUserDetail(idUser).then((data) => {
        this.setState({
          user: this.formatDataResponse(data),
        })
        _self.setState({ loading: false });
      }).catch((err) => {
        _self.setState({ loading: false });
        console.log('err: ', err);
      });
    } else {
      const patientUser = new ActivatePatientPostModel();
      this.setState({
        user: patientUser,
      })
    }
  }

  formatDataResponse = data => {

    const user = {
      userId: data.userId ? data.userId : '',
      ho: data.ho ? data.ho : '',
      ten: data.ten ? data.ten : '',
      benhNhanId: data.benhNhanId ? data.benhNhanId : '',
      phone: data.soDienThoai ? data.soDienThoai : '',
      email: data.email ? data.email : '',
      maYte: data.maYte ? data.maYte : '',
      ngaySinh: data.ngaySinh ? data.ngaySinh : null,
      namSinh: data.namSinh ? data.namSinh : '',
      gioiTinh: data.gioiTinh ? data.gioiTinh : '',
      diaChi: data.diaChi ? data.diaChi : '',
    }
    return user;
  }

  getUserInfo = debounce((code) => {
    this.props.loadUserByPatientCode({ code: code })
      .then(data => {
        const patient = data.status === 200 ? new ActivatePatientPostModel(data.json) : new ActivatePatientPostModel({ maYte: code });
        this.setState({ user: patient });
      })
      .catch(err => toast.error(MSG.ERROR_OCCURED))
  }, 1234)

  handleChange = name => event => {
    const { type } = this.props;
    let user = { ...this.state.user };
    user[name] = event.target.value;
    this.setState({ user: user });
    if ('admin' === type && 'maYte' === name)
      this.getUserInfo(event.target.value);

  };

  handleChangeDate = ngaySinh => {
    let user = { ...this.state.user };
    user['ngaySinh'] = ngaySinh;
    this.setState({ user: user });
  }

  handleSubmit = () => {
    const _self = this;
    _self.setState({ loading: true });
    let user = { ...this.state.user };
    user.ngaySinh = user.ngaySinh ? user.ngaySinh : null;
    if (this.state.isUpdateUser) {
      this.props.updateUser(user).then((done) => {
        toast.success(MSG.USER_UPDATED);
        _self.setState({ loading: false });
        this.props.goToUserList();
      }).catch((err) => {
        console.log('err', err);
        toast.error(MSG.ERROR_OCCURED);
        _self.setState({ loading: false });
      });
    } else {
      this.props.register(user, this.props.type).then((result) => {
        if (!result.json.isSuccess) {
          toast.error(MSG.WRONG_INFO);
        } else {
          toast.success(MSG.USER_CREATED);
        }
        _self.setState({ loading: false });
      }).catch((err) => {
        console.log('err', err);
        toast.error(MSG.ERROR_OCCURED);
        _self.setState({ loading: false });
      });
    }
  }

  goToDashboard = () => {
    this.props.goToDashboard();
  }

  openQRScanner = () => {
    this.setState((prevState) => {
      return { showQRScanner: !prevState.showQRScanner }
    })
  }

  handleScan = (code) => {
    this.setState({ showQRScanner: false, loading: true }, () => {
      this.props.getUserByQrCode(code).then((data) => {
        if (data.status === 200) {
          const patient = new ActivatePatientPostModel(data.json)
          this.setState({ user: patient });
          return;
        }
        toast.error(MSG.INVALID_QR_CODE);

      }).catch((err) => {
        toast.error(MSG.INVALID_QR_CODE);
      }).finally(() => {
        this.setState({ loading: false });
      })
    });
  }

  render() {
    const { classes, type } = this.props;
    const { loading, user, isUpdateUser, showQRScanner } = this.state;
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
                {
                  isUpdateUser ? 'Cập Nhật' : 'Đăng ký'
                }
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-mayte"
                label="Mã Y Tế"
                className={classes.textField}
                value={user.maYte}
                onChange={this.handleChange('maYte')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-phone"
                label="Phone"
                className={classes.textField}
                value={user.phone}
                onChange={this.handleChange('phone')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-address"
                label="Địa chỉ"
                className={classes.textField}
                value={user.diaChi}
                onChange={this.handleChange('diaChi')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-email"
                label="Email"
                className={classes.textField}
                value={user.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Họ"
                className={classes.textField}
                value={user.ho}
                onChange={this.handleChange('ho')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Tên"
                className={classes.textField}
                value={user.ten}
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
                    value={user.gioiTinh}
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
                    name="datepicker"
                    locale="vi"
                    disabled={type !== 'user' && !isUpdateUser}
                    value={user.ngaySinh}
                  />
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-namsinh"
                label="Năm sinh"
                className={classes.textField}
                value={user.namSinh}
                onChange={this.handleChange('namSinh')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              {
                isUpdateUser ? <Button type="submit" variant="contained" className={classes.button}>
                  Lưu thay đổi
              </Button> : <Button type="submit" variant="contained" className={classes.button} disabled={!user.maYte}>
                    Đăng ký
              </Button>
              }
            </Grid>
            <Grid item xs={12}>
              <Button type="button" variant="contained" className={classes.button} onClick={this.openQRScanner}>
                Quét mã QR
              </Button>
            </Grid>
            {showQRScanner && <QRScanner onScan={this.handleScan} onClose={this.openQRScanner} />}
            <FormFooter />
          </Grid>
        </ValidatorForm>

      </FormLayoutVertical>
    );
  }
}

FormRegister.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['admin', 'user'])
};

FormRegister.defaultProps = { type: 'admin' }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormRegister));
