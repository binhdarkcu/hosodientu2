import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
// custom imports
import {execAuthenticate} from '../actions/services/api-auth.js';
import {execGetUserInfo} from '../actions/services/api-user.js';
import {SET_USER_INFO} from '../actions/types';
import InputErrorDisplayer from '../components/InputErrorDisplayer';
import Spinner from '../components/Spinner';
import {SPINNER_LIGHT_GREEN} from '../constants/Colors';
import {USERNAME_REQUIRED, PASSWORD_REQUIRED, LOGIN_FAILED, GET_USER_INFO_FAILED} from '../constants/Messages'
import { redirect } from 'redux-first-router';
import { createAction } from 'redux-actions';
import Link from 'redux-first-router-link';

const setUserInfo = createAction(SET_USER_INFO);

class PageLogin extends Component{
  username = null;
  password = null;

  state = {
    username_error: false,
    password_error: false,
    loading: false
  }

  componentDidMount(){
    document.body.className = "login";
    document.addEventListener('keydown', this.handleKeyboardEvent);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeyboardEvent);
  }

  handleKeyboardEvent = (e) => {
    if(e.keyCode === 13 || e.key === 'Enter'){
      this.handleLogin(e);
    }
  }

  handleLogin = (e) => {
    e.preventDefault();

    const username = this.username.value;
    const password = this.password.value;

    this.setState({username_error: !!!username, password_error: !!!password});

    if(!username || !password) return;

    // block screen and start calling api
    this.setState({loading: true});
    this.props.authenticate({username: username, password: password}).then(() => {
      this.props.getUserInfo(username).then(data => {
        this.props.saveUserInfo(data);
        this.props.goToDashboard();
      }).catch(err => {
        this.showError(GET_USER_INFO_FAILED, err)
      });
    }).catch(err => {
      this.showError(LOGIN_FAILED, err);
    });
  }

  showError = (msg, err) => {
    console.log(err);
    toast.error(msg);
    this.setState({loading: false});
  }

  handleForgotPassword = (e) => {
    e.preventDefault();
    console.log('handle forgot password');
  }

  render(){

    const { goToRegisterPage } = this.props;
    const {password_error, username_error, loading} = this.state;

    return (
      <div>
        <div className="login_wrapper">
          <div className="animate form login_form">
            <Spinner type="PacmanLoader" size={50} color={SPINNER_LIGHT_GREEN} loading={loading}/>
            <section className="login_content">
              <form>
                <h1>Đăng nhập</h1>
                <div className="form-login">
                  <input ref={(node)=>{this.username = node;}} value={'admin@gmail.com'} type="text" className="form-control" placeholder="Username" required />
                  {username_error && <InputErrorDisplayer message={USERNAME_REQUIRED}/>}
                </div>
                <div className="form-login">
                  <input ref={(node)=>{this.password = node;}} value={'webapp'} type="password" className="form-control" placeholder="Password" required />
                  {password_error && <InputErrorDisplayer message={PASSWORD_REQUIRED}/>}
                </div>
                <div>
                  <a href="index.html" className="btn btn-default submit" onClick={this.handleLogin}>Đăng nhập</a>
                  <a href="index.html" className="reset_pass" onClick={this.handleForgotPassword}>Quên mật khẩu?</a>
                </div>

                <div className="clearfix"></div>

                <div className="separator">
                <p className="change_link">Chưa có tài khoản?
                  <Link to="/nguoi-dung-dang-ky" className="to_register">Đăng ký ngay</Link>
                </p>
                  <div className="clearfix"></div>
                  <br />
                  <div>
                    <h1><i className="fa fa-paw"></i> Gentelella Alela!</h1>
                    <p>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  goToDashboard: () => dispatch(redirect({type: 'RTE_DASHBOARD'})),
  saveUserInfo: data => dispatch(setUserInfo(data)),
  getUserInfo: username => dispatch(execGetUserInfo(username)),
  authenticate: data => dispatch(execAuthenticate(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLogin);
