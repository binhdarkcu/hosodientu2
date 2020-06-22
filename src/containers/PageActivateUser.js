import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Logo from '../components/Logo';
import Grid from '@material-ui/core/Grid';
import FormLayoutVertical from '../components/FormLayoutVertical';
import FormFooter from '../components/FormFooter';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import { redirect } from 'redux-first-router';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import * as MSG from '../constants/Messages.js';
import * as RULE from '../constants/Rules.js';
import { connect } from 'react-redux';
import {execActivateUser} from '../actions/services/api-user.js';
import Spinner from '../components/Spinner';
import {GOLDEN_HEALTH_ORANGE} from '../constants/Colors';
import Checkbox from '@material-ui/core/Checkbox';

const mapDispatchToProps = dispatch => ({
  activate: data => dispatch(execActivateUser(data)),
  gotoHomepage: () => dispatch(redirect({type: 'RTE_DASHBOARD'}))
});

const mapStateToProps = ({location}) => ({
  activateCode: location.payload.code
});

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  paper: {
    maxHeight: 500,
    overflow: 'auto',
    padding: 10
  },
  eng: {
    color: '#2050b3',
    fontStyle: 'italic'
  }
});

class PageActivateUser extends React.Component {

  state = {
    password: '',
    repeatPassword: '',
    isChecked: false,
    loading: false,
    isRead: false
  };

  handleChange = name => event => {
    let state = {...this.state};
    state[name] = event.target.value;
    this.setState(state);
  };

  handleCheck= name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleScroll = (e) => {
    if(this.state.isRead) return;
    const reachedBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if(reachedBottom) this.setState({isRead: true});
  };

  handleSubmit = async () => {
    try{
      const { password } = this.state;
      const { activateCode } = this.props;
      const result = await this.props.activate({code: activateCode, password});
      switch (result.status) {
        case 200:
          this.handleSuccess(MSG.USER_ACTIVATED);
          break;
        case 404:
          this.handleError({detail: result, message: MSG.ACTIVATE_CODE_NOT_FOUND});
          break;
        default:
          throw(result);
      }
    }catch(err){
      this.handleError({detail: err, message: MSG.ERROR_OCCURED});
    }
  };

  handleSuccess = (message) => {
    this.setState({loading: false});
    toast.success(message);
    this.props.gotoHomepage();
  };

  handleError = (error) => {
    this.setState({loading: false});
    toast.error(error.message);
    console.error(error.detail);
  };

  componentDidMount(){
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
          return false;
      }
      return true;
    });
  }

  render() {

    const { classes, gotoHomepage } = this.props;
    const { loading, password, repeatPassword, isChecked } = this.state;
    return (
      <FormLayoutVertical>
        <Spinner type="PacmanLoader" size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading}/>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
        >
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Logo size={150} onClick={gotoHomepage}/>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography component="h1" variant="h4" align="center">
                KÍCH HOẠT TÀI KHOẢN
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Mật khẩu"
                name="password"
                type="password"
                className={classes.textField}
                value={password}
                onChange={this.handleChange('password')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Nhập lại mật khẩu"
                name="repeatPassword"
                type="password"
                className={classes.textField}
                value={repeatPassword}
                onChange={this.handleChange('repeatPassword')}
                margin="normal"
                validators={['isPasswordMatch', RULE.IS_REQUIRED]}
                errorMessages={[MSG.PASSWORD_MISMATCH, MSG.REQUIRED_FIELD]}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper className={classes.paper} elevation={5} onScroll={this.handleScroll}>
                <Typography component="h3" variant="h4" align="center">Điều khoản sử dụng</Typography>
                <Typography component="span" display="block" align="left">
                Bạn sử dụng website <strong><i>pkdksghosoonline.com</i></strong>  "được gọi là ứng dụng", bạn đồng ý rằng bạn đã đọc, đã hiểu và đã chấp nhập và đồng ý Điều Khoản sử dụng. Điều Khoản sử dụng này cấu thành một thoản thuận giữa bạn và Phòng khám Đa Khoa Sài Gòn, áp dụng cho việc truy cập, sử dụng dữ liệu, dịch vụ trên ứng dụng.
                Để sử dụng ứng dụng Đa Khoa Sài Gòn bạn phải đồng ý các điều khoản dưới đây. Điều khoản này do Phòng khám Đa Khoa Sài Gòn đưa ra cho việc truy cập, sử dụng dữ liệu, dịch vụ.
                Qua việc truy cập, sử dụng dữ liệu, dịch vụ  trên nền tảng công nghệ của chúng tôi, bạn đồng ý chịu sự ràng buộc bởi tất cả điều khoản này, nếu bạn không đồng ý với tất cả điều khoản, đề nghị không sử dụng ứng dụng của chúng tôi.
                </Typography>
                <br/>
                <Typography component="h3" variant="h4" align="center">Các điều khoản:</Typography>

                <Typography component="span" display="block" align="left">
                 1. Ứng dụng là phần mềm được sử dụng nhưng là một tiện ích trang cứu thông tin lịch sử khám bệnh tại Đa Khoa Sài Gòn, tìm kiếm dịch vụ, các loại hình dịch vụ: Đăng ký khám bệnh, các dịch vụ khác mà chúng tôi có thể cung cấp được cấp phép của cơ quan Nhà Nước.
                 <br/>
                 2. Ứng dụng cho phép bạn gửi nội dung yêu cầu về một loại hình Dịch Vụ đến nhà cung cấp cấp Dịch Vụ. <br/>
                 3. Các vấn đề sai soát dữ liệu bạn phải thông báo đến Phòng khám Đa Khoa Sài Gòn để khắc phục.<br/>
                 4. Không lan truyền thông tin sự cố làm ảnh hưởng đến qui tính của chúng tôi. <br/>
                 5. Phòng khám Đa Khoa Sài Gòn sẽ không chịu trách nhiệm về việc khách hàng sử dụng sai mục đích dữ liệu được cung cấp từ phần mềm ứng dụng.<br/>
                 6. Phòng khám Đa Khoa Sài Gòn sẽ không chịu trách nhiệm về việc để lộ thông tin khách hàng do khách hàng cung cấp, bị hack cho bên thứ 3.
                </Typography>

                <br/>

                <br/>

                <Typography component="span" display="block" align="left">TÀI KHOẢN</Typography>
                <br/>

                <Typography component="span" display="block" align="left">
                  Để sử dụng Ứng dụng bạn phải được chúng tôi cấp tài khoản , bạn phải cung cấp thông tin , kiểm tra xác nhận thông tin chính xác về bạn.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.isChecked}
                    onChange={this.handleCheck('isChecked')}
                    value="Agree"
                    color="primary"
                  />
                }
                label="Tôi đã đọc và đồng ý với những điều khoản trên"
              />
              <br/>
              <Button disabled={!isChecked} type="submit" variant="contained" color="primary" className={classes.button}>
                Kích hoạt
              </Button>
            </Grid>
            <FormFooter/>
          </Grid>
        </ValidatorForm>

      </FormLayoutVertical>
    );
  }
}

PageActivateUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PageActivateUser));
