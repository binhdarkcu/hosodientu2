import React, { Component } from 'react';
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles';
import { toast } from 'react-toastify';
// custom imports
import PropTypes from 'prop-types';
import Spinner from '../components/Spinner';
import { SPINNER_LIGHT_GREEN } from '../constants/Colors';
import * as MSG from '../constants/Messages.js';
import * as RULE from '../constants/Rules.js';
import Grid from '@material-ui/core/Grid';
import FormLayoutVertical from '../components/FormLayoutVertical';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {execChangePassword} from '../actions/services/api-user.js';
import {execLogout} from '../actions/services/user.js';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 430,
  },
  paper: {
    maxHeight: 500,
    overflow: 'auto',
    padding: 10
  }
});
class PageDoiMatKhau extends Component {

  state = {
    password: '',
    repeatPassword: '',
    loading: false
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyboardEvent);
  }

  handleChange = name => event => {
    let state = { ...this.state };
    state[name] = event.target.value
    this.setState(state);
  };

  handleKeyboardEvent = (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }
  handleSubmit = () => {
    console.log(this.state);
    const data = {
      id: 4,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.password,
    }
    const _self = this;
    _self.setState({loading: true});
    this.props.changePassword(data).then((done)=>{
      toast.success(MSG.CHANGE_PASSWORD);
      _self.setState({loading: false});
      setTimeout(() => { this.props.getUsersList() }, 2000);
    }).catch((err)=>{
      console.log('err', err);
      toast.error(MSG.ERROR_OCCURED);
      _self.setState({loading: false});
    });
  }
  

  showError = (msg, err) => {
    console.log(err);
    toast.error(msg);
    this.setState({ loading: false });
  }

  render() {

    const { password, repeatPassword, loading } = this.state;
    const { classes } = this.props;
    return (
      <FormLayoutVertical>
        <Spinner type="PacmanLoader" size={50} color={SPINNER_LIGHT_GREEN} loading={loading} />
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Nhập mật khẩu cũ"
                name="oldPassword"
                type="password"
                className={classes.textField}
                onChange={this.handleChange('oldPassword')}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Mật khẩu mới"
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
          </Grid>

          <Grid container spacing={24}>
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
          </Grid>

          <Button type="submit" variant="contained" color="primary" className={classes.button}>Thay Đổi</Button>
        </ValidatorForm>

      </FormLayoutVertical>
    );
  }
}

PageDoiMatKhau.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  changePassword: data => dispatch(execChangePassword(data)),
  getUsersList: () => {
    dispatch({type: 'RTE_DANH_SACH_USER'})
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PageDoiMatKhau));