import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import DatePicker from "react-date-picker";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import { debounce } from "lodash";
import { connect } from "react-redux";

//custom import
import QRScanner from "../../components/QRScanner";
import FormLayoutVertical from "../../components/FormLayoutVertical";
import FormFooter from "../../components/FormFooter";
import Logo from "../../components/Logo";
import { toast } from "react-toastify";
import * as MSG from "../../constants/Messages.js";
import * as RULE from "../../constants/Rules.js";
import { execRegister, execGetUserInfoByPatientCode, execUpdate, execGetPatientByQrCode, execGetUserDetail } from "../../actions/services/api-user";
import Spinner from "../../components/Spinner";
import { GOLDEN_HEALTH_ORANGE } from "../../constants/Colors";
import { BOUNCE } from "../../constants/Loaders";
import ActivatePatientPostModel from "../../models/activatePatientPostModel";

const mapDispatchToProps = dispatch => ({
  register: (data, type, isForce) => dispatch(execRegister(data, type, isForce)),
  goToDashboard: () => dispatch({ type: "RTE_DASHBOARD" }),
  loadUserByPatientCode: (data) => dispatch(execGetUserInfoByPatientCode(data)),
  getUserDetail: (id) => dispatch(execGetUserDetail(id)),
  updateUser: (data) => dispatch(execUpdate(data)),
  goToUserList: () => dispatch({ type: "RTE_DANH_SACH_USER" }),
  getUserByQrCode: (code) => dispatch(execGetPatientByQrCode({ code }))
});

const mapStateToProps = ({ location }) => ({
  location: location,
});

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
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
    backgroundColor: "#2698D6",
    color: "#fff",
  },
});

const initialState = () => ({
  user: new ActivatePatientPostModel(),
  loading: false,
  showQRScanner: false,
  isUpdate: false,
  isForce: false, //Force to create record for admin approval
  dataFromQrCode: false,
  fail: 0,
  re_email: ""
});

class FormRegister extends React.Component {

  state = initialState();

  componentDidMount() {
    this.initializeScreen();
    ValidatorForm.addValidationRule('isEmailMatch', (value) => {
      if (value !== this.state.user.email) {
        return false;
      }
      return true;
    });
  }

  initializeScreen = async () => {
    try{
      const { id } = this.props.location.payload;
      if(id){
        this.setState({loading: true});
        const response = await this.props.getUserDetail(id);
        if(response.status === 200 && !response.errorMessage) this.setState({user: new ActivatePatientPostModel(response.json), loading: false, isUpdate: true})
      }
    }catch (e) {
      this.handleError({detail: e, message: MSG.ERROR_OCCURED});
    }
  };

  handleSuccess = message => {
    const { id } = this.props.location.payload;
    //Do not resetState if in update use screen
    id ? this.setState({loading: false}) : this.setState(initialState());
    toast.success(message);
  };

  handleError = error => {
    this.setState({loading: false});
    toast.error(error.message);
    console.error(error.detail);
  };

  getUserInfo = debounce((code) => {
    this.props.loadUserByPatientCode({ code: code })
      .then(data => {
        if(data.status === 200){
          // TODO: remove temporary fix for this issue
          let user =  new ActivatePatientPostModel(data.json);
          user.ten = user.getFullName();
          this.setState({ user });
        }
      })
      .catch(err => toast.error(MSG.ERROR_OCCURED))
  }, 1234);

  handleChange = name => event => {
    const { type } = this.props;
    let user = { ...this.state.user };

    if(typeof user[name] != "undefined"){
      user[name] = event.target.value;
      this.setState({ user: new ActivatePatientPostModel(user) });
    }else{
      let state = { ...this.state };
      state[name] = event.target.value;
      this.setState(state);
    }

    if ('admin' === type && 'maYte' === name)
      this.getUserInfo(event.target.value);

  };

  handleChangeDate = ngaySinh => {
    let user = { ...this.state.user };
    user['ngaySinh'] = ngaySinh;
    this.setState({ user: user });
  };

  handleSubmit = async () => {
    try{
      this.setState({loading: true});
      const { id } = this.props.location.payload;
      const { user, isForce, dataFromQrCode } = this.state;
      let { type } = this.props;

      if(id){
        const response = await this.props.updateUser({...user, userId: id, ho: ''});// We are no longer need 'ho' in user model
        response.status === 200 ? this.handleSuccess(MSG.USER.UPDATE.SUCCESS) : this.handleError({detail: response, message: MSG.USER.UPDATE.FAILED});
      }else{
        type = dataFromQrCode ? 'admin' : type;
        const response = await this.props.register(user, type, isForce);
        switch (response.status) {
          case 200:
            response.json.isSuccess ? this.handleSuccess(MSG.USER_CREATED) : this.handleCreateFailed(response);
            break;
          case 201:
            response.json.isSuccess ? this.handleSuccess(MSG.USER_CREATED) : this.handleError({detail: response, message: response.json.errorMessage});
            break;
          default:
            this.handleError({detail: response, message: MSG.ERROR_OCCURED});
            break;
        }

        isForce && this.goToDashboard();
      }
    }catch(e){
      this.handleError({detail: e, message: MSG.ERROR_OCCURED});
    }
  };

  handleCreateFailed = response => {
    let { type } = this.props;
    const { dataFromQrCode } = this.state;
    type = dataFromQrCode ? 'admin' : type;
    this.handleError({detail: response, message: response.json.errorMessage});
    // Do not count for admin user
    if(type === 'admin') return;
    this.setState((prevState) => {
      const failCount = prevState.fail + 1;
      const isForce = failCount === 3;
      return {
        fail: failCount,
        isForce
      }
    });
  };

  goToDashboard = () => {
    this.props.goToDashboard();
  };

  openQRScanner = () => {
    this.setState((prevState) => {
      return { showQRScanner: !prevState.showQRScanner }
    })
  };

  handleScan = (code) => {
    this.setState({ showQRScanner: false, loading: true }, () => {
      this.props.getUserByQrCode(code).then((data) => {
        if (data.status === 200) {
          const patient = new ActivatePatientPostModel(data.json);
          this.setState({ user: patient, fail: 0, dataFromQrCode: true, re_email: patient.email});
          return;
        }
        toast.error(MSG.INVALID_QR_CODE);

      }).catch((err) => {
        toast.error(MSG.INVALID_QR_CODE);
      }).finally(() => {
        this.setState({ loading: false });
      })
    });
  };

  render() {
    const { classes, type } = this.props;
    const { loading, user, isUpdate, showQRScanner, re_email } = this.state;
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
                  isUpdate ? 'Cập Nhật' : 'Đăng ký'
                }
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
          
            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Họ tên"
                className={classes.textField}
                value={user.ten}
                onChange={this.handleChange('ten')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
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
                label="Phone"
                className={classes.textField}
                value={user.phone}
                onChange={this.handleChange('phone')}
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Địa chỉ"
                className={classes.textField}
                value={user.diaChi}
                onChange={this.handleChange('diaChi')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Email"
                className={classes.textField}
                value={user.email}
                validators={[RULE.IS_REQUIRED, RULE.IS_EMAIL]}
                errorMessages={[MSG.REQUIRED_FIELD, MSG.INVALID_EMAIL]}
                onChange={this.handleChange('email')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                  label="Nhập lại Email"
                  className={classes.textField}
                  value={re_email}
                  validators={[RULE.IS_REQUIRED, "isEmailMatch", RULE.IS_EMAIL]}
                  errorMessages={[MSG.REQUIRED_FIELD, MSG.EMAIL_DOES_NOT_MATCH, MSG.INVALID_EMAIL]}
                  onChange={this.handleChange('re_email')}
                  margin="normal"
              />
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
                    disabled={type !== 'user' && !isUpdate}
                    onChange={this.handleChangeDate}
                    value={user.ngaySinh}
                  />
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12}>
              {
                isUpdate ? <Button type="submit" variant="contained" className={classes.button}>
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

FormRegister.defaultProps = { type: 'admin' };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormRegister));
