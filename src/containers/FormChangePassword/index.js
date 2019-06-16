import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

// custom imports
import Logo from '../../components/Logo';
import FormLayoutVertical from '../../components/FormLayoutVertical';
import * as MSG from '../../constants/Messages.js';
import * as RULE from '../../constants/Rules.js';
import FormFooter from '../../components/FormFooter';
import Spinner from '../../components/Spinner';
import {GOLDEN_HEALTH_ORANGE} from '../../constants/Colors';

import { execChangePassword } from '../../actions/services/api-user.js';
import { execLogout } from '../../actions/services/user.js';


const mapDispatchToProps = dispatch => ({
  goToDashboard: () => dispatch({type: 'RTE_DASHBOARD'}),
  logOut: () => dispatch(execLogout()),
  changePassword: data => dispatch(execChangePassword(data)),
});

const mapStateToProps = ({services}) => {
  return { userInfo: services.user.userInfo };
}

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class FormChangePassword extends React.Component {

  state = {
    newPassword: '',
    oldPassword: '',
    repeatPassword: '',
    loading: false
  };

  componentDidMount(){
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.newPassword) {
          return false;
      }
      return true;
    });
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleSubmit = () => {
    const { userInfo } = this.props;
    const { oldPassword, newPassword } = this.state;

    const data = {
      id: userInfo.userId,
      oldPassword,
      newPassword,
    }

    const _self = this;
    _self.setState({loading: true});
    this.props.changePassword(data).then(({status, json})=>{
      json.isSuccess ? toast.success(MSG.CHANGE_PASSWORD) : toast.error(json.errorMessage);
      this.props.logOut();
    }).catch((err)=>{
      toast.error(MSG.ERROR_OCCURED);
    }).finally(() => {
      _self.setState({loading: false});
    });
  }

  goToDashboard = () => {
    this.props.goToDashboard();
  }

  render() {
    const { classes } = this.props;
    const { loading, oldPassword, newPassword, repeatPassword } = this.state;
    return (
      <FormLayoutVertical>
        <Spinner type="PacmanLoader" size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading}/>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
        >
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Logo onClick={this.goToDashboard} size={150}/>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography component="h1" variant="h4" align="center">
                Đổi mật khẩu
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Mật khẩu cũ"
                name="old_password"
                type="password"
                className={classes.textField}
                value={oldPassword}
                onChange={this.handleChange('oldPassword')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Mật khẩu mới"
                name="new_password"
                type="password"
                className={classes.textField}
                value={newPassword}
                onChange={this.handleChange('newPassword')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Nhập lại mật khẩu mới"
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

            <Grid item xs={12}>

              <Typography component="h1" variant="h6" align="left">Chính sách đặt mật khẩu</Typography>
              <Typography component="span"  align="left"></Typography>
              <Typography component="span"  align="left">- Mật khẩu mới phải có ít nhất 9 ký tự</Typography>
              <Typography component="span"  align="left">- Mật khẩu mới không được chứa tên riêng, tên đệm hoặc họ</Typography>
              <Typography component="span"  align="left">- Không sử dụng lại mật khẩu đã từng sử dụng trước đây (tính từ 5 mật khẩu sử dụng gần đây nhất)</Typography>
              <Typography component="span"  align="left">- Mật khẩu mới phải có ÍT NHẤT:</Typography>
              <Typography component="span"  align="left">+ một (1) chữ thường: a-z</Typography>
              <Typography component="span"  align="left">+ một (1) chữ in hoa: A-Z</Typography>
              <Typography component="span"  align="left">+ một (1) ký tự đặc biệt:  ! @ $ % ^ * ( ) _ ~ + - = [ ] &#123; &#125; &#60; &#62;</Typography>
              <Typography component="span"  align="left">+ một (1) số (0-9)</Typography>
              <Divider/>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Đổi mật khẩu
              </Button>
            </Grid>
            <FormFooter/>
          </Grid>
        </ValidatorForm>

      </FormLayoutVertical>
    );
  }
}

FormChangePassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormChangePassword));
