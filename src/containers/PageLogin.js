import React, { Component } from 'react';
import { connect } from 'react-redux'
import {execAuthenticate} from '../actions/services/api-auth.js';

class PageLogin extends Component{


  componentDidMount(){
    document.body.className = "login";
  }

  handleLogin = (e) => {
    e.preventDefault();
    console.log('handleLogin');
    this.props.authenticate({username: 'test@gmail.com', password: 'test'});
  }

  handleForgotPassword = (e) => {
    e.preventDefault();
    console.log('handle forgot password');
  }

  render(){
    return (
      <div>
        <a className="hiddenanchor" id="signup"></a>
        <a className="hiddenanchor" id="signin"></a>
        <div className="login_wrapper">
          <div className="animate form login_form">
            <section className="login_content">
              <form>
                <h1>Login Form</h1>
                <div>
                  <input type="text" className="form-control" placeholder="Username" required="" />
                </div>
                <div>
                  <input type="password" className="form-control" placeholder="Password" required="" />
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
