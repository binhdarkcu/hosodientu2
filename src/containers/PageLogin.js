import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class PageLogin extends Component{

  componentWillMount(){
    // document.body.className = "login";
  }

  componentDidMount(){
    document.body.className = "login";
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
                  <a className="btn btn-default submit" href="index.html">Log in</a>
                  <a className="reset_pass" href="#">Lost your password?</a>
                </div>

                <div className="clearfix"></div>

                <div className="separator">
                  <p className="change_link">New to site?
                    <a href="#signup" className="to_register"> Create Account </a>
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

          <div id="register" className="animate form registration_form">
            <section className="login_content">
              <form>
                <h1>Create Account</h1>
                <div>
                  <input type="text" className="form-control" placeholder="Username" required="" />
                </div>
                <div>
                  <input type="email" className="form-control" placeholder="Email" required="" />
                </div>
                <div>
                  <input type="password" className="form-control" placeholder="Password" required="" />
                </div>
                <div>
                  <a className="btn btn-default submit" href="index.html">Submit</a>
                </div>

                <div className="clearfix"></div>

                <div className="separator">
                  <p className="change_link">Already a member ?
                    <a href="#signin" className="to_register"> Log in </a>
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

PageLogin.propTypes = {};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PageLogin);
