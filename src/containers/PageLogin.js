import React, { Component } from 'react';
import { connect } from 'react-redux'

// custom imports
import {execAuthenticate} from '../actions/services/api-auth.js';
import InputErrorDisplayer from '../components/InputErrorDisplayer';
import Spinner from '../components/Spinner';
import {SPINNER_LIGHT_GREEN} from '../constants/Colors';
import {USERNAME_REQUIRED, PASSWORD_REQUIRED} from '../constants/Messages'

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
  }

  handleLogin = (e) => {
    e.preventDefault();

    const username = this.username.value;
    const password = this.password.value;

    this.setState({username_error: !!!username, password_error: !!!password});

    if(!username || !password) return;

    // block screen and start call api
    this.setState({loading: true});
    const _self = this;
    this.props.authenticate({username: username, password: password}).finally(() => {
        _self.setState({loading: false});
    });
  }

  handleForgotPassword = (e) => {
    e.preventDefault();
    console.log('handle forgot password');
  }

  render(){

    const {password_error, username_error, loading} = this.state;

    return (
      <div>
        <div className="login_wrapper">
          <div className="animate form login_form">
            <Spinner type="PacmanLoader" size={50} color={SPINNER_LIGHT_GREEN} loading={loading}/>
            <section className="login_content">
              <form>
                <h1>Login Form</h1>
                <div className="form-login">
                  <input ref={(node)=>{this.username = node;}} type="text" className="form-control" placeholder="Username" required />
                  {username_error && <InputErrorDisplayer message={USERNAME_REQUIRED}/>}
                </div>
                <div className="form-login">
                  <input ref={(node)=>{this.password = node;}} type="password" className="form-control" placeholder="Password" required />
                  {password_error && <InputErrorDisplayer message={PASSWORD_REQUIRED}/>}
                </div>
                <div>
                  <a href="index.html" className="btn btn-default submit" onClick={this.handleLogin}>Log in</a>
                  <a href="index.html" className="reset_pass" onClick={this.handleForgotPassword}>Lost your password?</a>
                </div>

                <div className="clearfix"></div>

                <div className="separator">
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
  authenticate: data => dispatch(execAuthenticate(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLogin);
