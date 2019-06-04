import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Logo from '../../components/Logo';
import Grid from '@material-ui/core/Grid';
import FormLayoutVertical from '../../components/FormLayoutVertical';
import FormFooter from '../../components/FormFooter';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DatePicker from 'react-date-picker';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import * as MSG from '../../constants/Messages.js';
import * as RULE from '../../constants/Rules.js';
import { connect } from 'react-redux';
import { execRegister, execGetUserInfoByPatientCode, execUpdate } from '../../actions/services/api-user.js';
import Spinner from '../../components/Spinner';
import { SPINNER_LIGHT_GREEN } from '../../constants/Colors';
import { BOUNCE } from '../../constants/Loaders';
import { debounce } from 'lodash';
import ActivatePatientPostModel from '../../models/activatePatientPostModel';
//custom import
import { execGetUserDetail } from '../../actions/services/api-user';


const mapDispatchToProps = dispatch => ({
  register: (data, type) => dispatch(execRegister(data, type)),
  goToDashboard: () => dispatch({ type: 'RTE_DASHBOARD' }),
  loadUserByPatientCode: (data) => dispatch(execGetUserInfoByPatientCode(data)),
  getUserDetail: (id) => dispatch(execGetUserDetail(id)),
  updateUser: (data) => dispatch(execUpdate(data)),
  goToUserList: () => dispatch({ type: 'RTE_DANH_SACH_USER' }),
});

const mapStateToProps = ({ id, location }) => ({
  id: id,
  location: location,
});

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  customControl: {
    margin: 8
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class FormRegister extends React.Component {

  state = {
    user: {
      ho: '',
      ten: '',
      benhNhanId: '',
      phone: '',
      email: '',
      maYte: '',
      ngaySinh: null,
      diaChi: '',
      gioiTinh: '0',
    },
    loading: false,
    isUpdateUser: '',
  };

  componentDidMount() {
    const pathname = this.props.location.pathname;
    const isUpdateUser = pathname.split('/');
    const idUser = isUpdateUser[2];
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
    }
  }

  formatDataResponse = data => {
    const user = {
      ho: data.ho ? data.ho : '',
      ten: data.ten ? data.ten : '',
      benhNhanId: data.benhNhanId ? data.benhNhanId : '',
      phone: data.phone ? data.phone : '',
      email: data.email ? data.email : '',
      maYte: data.maYte ? data.maYte : '',
      ngaySinh: data.ngaySinh ? this.formatYToD(data.ngaySinh) : null,
      gioiTinh: data.gioiTinh ? data.gioiTinh : '',
      diaChi: data.diaChi ? data.diaChi : '',
    }
    return user;
  }

  formatYToD = (strDate) => {
    if (strDate && strDate !== '') {
      const arr = strDate.split('-');
      return `${arr[2].slice(0, 2)}/${arr[1]}/${arr[0]}`;
    }
    return null;
  };

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
    user.ngaySinh = `${user.ngaySinh.getFullYear()}-${user.ngaySinh.getMonth() + 1}-${user.ngaySinh.getDate()}`;
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
        if(!result.json.isSuccess) {
          toast.error(MSG.WRONG_INFO);
        }else {
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

  render() {
    const { classes, type } = this.props;
    const { loading, user, isUpdateUser } = this.state;
    return (
      <FormLayoutVertical>
        <Spinner type={BOUNCE} size={50} color={SPINNER_LIGHT_GREEN} loading={loading} />
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <Logo onClick={this.goToDashboard} size={150} />
            </Grid>

            <Grid item xs={4}>
              <Typography component="h1" variant="h4" align="center">
                {
                  isUpdateUser ? 'Cập Nhật' : 'Đăng ký'
                }
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={24}>
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
                disabled={type !== 'user' && !isUpdateUser}
                className={classes.textField}
                value={user.phone}
                onChange={this.handleChange('phone')}
                margin="normal"
                validators={[RULE.IS_REQUIRED, RULE.IS_PHONE_NUMBER]}
                errorMessages={[MSG.REQUIRED_FIELD, MSG.INVALID_PHONE_NUMBER]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-address"
                label="Địa chỉ"
                disabled={type !== 'user' && !isUpdateUser}
                className={classes.textField}
                value={user.diaChi}
                onChange={this.handleChange('diaChi')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-email"
                label="Email"
                disabled={type !== 'user' && !isUpdateUser}
                className={classes.textField}
                value={user.email}
                onChange={this.handleChange('email')}
                validators={[RULE.IS_REQUIRED, RULE.IS_EMAIL]}
                errorMessages={[MSG.REQUIRED_FIELD, MSG.INVALID_EMAIL]}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Họ"
                className={classes.textField}
                value={user.ho}
                disabled={type !== 'user' && !isUpdateUser}
                onChange={this.handleChange('ho')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Tên"
                className={classes.textField}
                value={user.ten}
                disabled={type !== 'user' && !isUpdateUser}
                onChange={this.handleChange('ten')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
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
                    <FormControlLabel value="0" control={<Radio disabled={type !== 'user' && !isUpdateUser} />} label="Nam" />
                    <FormControlLabel value="1" control={<Radio disabled={type !== 'user' && !isUpdateUser} />} label="Nữ" />
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
                    onChange={this.handleChangeDate}
                    value={user.ngaySinh}
                    required
                  />
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12}>
              {
                isUpdateUser ? <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Lưu thay đổi
              </Button> : <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={!user.maYte}>
                    Đăng ký
              </Button>
              }
            </Grid>
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
