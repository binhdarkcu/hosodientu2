import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
// custom imports
import { execAuthenticate } from '../actions/services/api-auth.js';
import { execGetUserInfo } from '../actions/services/api-user.js';
import { saveUserInfo } from '../actions/services/user';


import InputErrorDisplayer from '../components/InputErrorDisplayer';
import Spinner from '../components/Spinner';
import Logo from '../components/Logo';
import { GOLDEN_HEALTH_ORANGE } from '../constants/Colors';
import { FADE } from '../constants/Loaders';
import { USERNAME_REQUIRED, PASSWORD_REQUIRED, LOGIN_FAILED, GET_USER_INFO_FAILED, INVALID_LOGIN } from '../constants/Messages';
import { redirect } from 'redux-first-router';
import Link from 'redux-first-router-link';

class PageLogin extends Component{
  username = null;
  password = null;

  state = {
    username_error: false,
    password_error: false,
    loading: false,
    username: process.env.NODE_ENV === 'development' ? 'admin@gmail.com' : '',
    password: process.env.NODE_ENV === 'development' ? 'webapp' : ''
  };

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
  };

  handleLogin = (e) => {
    e.preventDefault();

    const {username, password } = this.state;

    this.setState({username_error: !!!username, password_error: !!!password});

    if(!username || !password) return;

    // block screen and start calling api
    this.setState({loading: true});
    this.props.authenticate({username: username, password: password}).then(() => {
      this.props.getUserInfo(username).then(data => {
        if(data.errorMessage){
          return this.showError(data.errorMessage, data);
        }
        this.props.saveUserInfo(data);
        const { type, payload } = this.props.location.prev;
        this.props.goToPage({type: type && type !=='RTE_LOGIN' ? type : 'RTE_DASHBOARD', payload: {...payload}});
      }).catch(err => {
        this.showError(GET_USER_INFO_FAILED, err)
      });
    }).catch(err => {
      err.status === 404 ? this.showError(INVALID_LOGIN, err) : this.showError(LOGIN_FAILED, err);
    });
  };

  showError = (msg, err) => {
    toast.error(msg);
    this.setState({loading: false});
  };

  handleChange = name => e => {
    let state = {...this.state};
    state[name] = e.target.value;
    this.setState(state);
  };

  goChonCoSo = () => {
    localStorage.clear();
    this.props.goToPage({type: 'RTE_CHON_CO_SO'})
  }

  render(){

    const { password_error, username_error, loading, username, password } = this.state;

    return (
      <div>
        <div className="login_wrapper">
          <div className="animate form login_form">
            <Spinner type={FADE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading}/>
            <div>
              <Logo size={150} align="center" onClick={this.goChonCoSo}/>
            </div>
            <section className="login_content">
              <form>
                <h1>Đăng nhập</h1>
                <div className="form-login">
                  <input value={ username} type="text" className="form-control" placeholder="Email" autoComplete={"true"} onChange={this.handleChange('username')} required />
                  {username_error && <InputErrorDisplayer message={USERNAME_REQUIRED}/>}
                </div>
                <div className="form-login">
                  <input value={password} type="password" className="form-control" placeholder="Mật khẩu" autoComplete={"true"} onChange={this.handleChange('password')} required />
                  {password_error && <InputErrorDisplayer message={PASSWORD_REQUIRED}/>}
                </div>
                <div>
                  <a href="index.html" className="btn btn-default submit" onClick={this.handleLogin}>Đăng nhập</a>
                  <a href="https://goldenhealthcarevn.com/huong-dan-dang-ky-ho-so-dien-tu/" className="reset_pass" target="_blank" rel="noopener noreferrer">Hướng dẫn</a>
                </div>

                <div className="clearfix"/>

                <div className="separator">
                <p className="change_link">Chưa có tài khoản?
                  <Link to="/nguoi-dung-dang-ky" className="to_register">Đăng ký ngay</Link>
                </p>
                <p className="change_link">
                  <Link to="/reset-password" className="to_register">Reset Password</Link>
                </p>
                <div className="clearfix"/>
                <br />
                </div>
                <div className="Browser"><i>Trải nghiệm tốt nhất trên trình duyệt<a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">Google Chrome</a>!</i></div>
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ location }) => {
  return { location };
};

const mapDispatchToProps = dispatch => ({
  goToPage: (destination) => dispatch(redirect(destination)),
  saveUserInfo: data => dispatch(saveUserInfo(data)),
  getUserInfo: username => dispatch(execGetUserInfo(username)),
  authenticate: data => dispatch(execAuthenticate(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLogin);
