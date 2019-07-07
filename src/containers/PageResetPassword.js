import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
// custom imports
import InputErrorDisplayer from '../components/InputErrorDisplayer';
import Spinner from '../components/Spinner';
import Logo from '../components/Logo';
import { GOLDEN_HEALTH_ORANGE } from '../constants/Colors';
import { PACMAN } from '../constants/Loaders';
import { INVALID_EMAIL, REDIRECT_AFTER } from '../constants/Messages';
import { emailRegex } from '../constants/Regex';
import { redirect } from 'redux-first-router';

const initState = () => {
  return   {
      loading: false,
      email_error: '',
      email: '',
      countDown: -1
    }
}
class PageResetPassword extends Component{

  timer = null;
  state = initState();

  componentDidMount(){
    document.body.className = "login";
    document.addEventListener('keydown', this.handleKeyboardEvent);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeyboardEvent);
    clearInterval(this.timer);
  }

  handleKeyboardEvent = (e) => {
    if(e.keyCode === 13 || e.key === 'Enter'){
      this.handleResetPassword(e);
    }
  };

  showError = (msg, err) => {
    toast.error(msg);
    this.setState({loading: false});
  };

  handleResetPassword = (e) => {
    e.preventDefault();
    const { email, countDown } = this.state;
    if(countDown > -1) return;
    if(!emailRegex.test(email)) return this.setState({email_error: INVALID_EMAIL});

    this.handleSuccess('ok ngon');
  };

  handleChange = name => e => {
    this.setState({email: e.target.value.trim()});
  };

  gotoDashboard = () => {
    this.props.goToPage({type: 'RTE_DASHBOARD'});
  }

  handleSuccess = message => {
    toast.success(message);
    const successState = {...initState(), countDown: 5}
    this.setState(successState);
    this.timer = setInterval(()=>{
      const { countDown } = this.state;
      if(countDown > 1) return this.setState({countDown: countDown-1});
      clearInterval(this.timer);
      this.gotoDashboard();
    }, 1000);
  }

  handleError = error => {
    console.error(error.detail);
    toast.error(error.message);
  }

  render(){

    const { userEmail, email_error, countDown, loading } = this.state;

    return (
      <div>
        <div className="login_wrapper">
          <div className="animate form login_form">
            <Spinner type={PACMAN} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading}/>
            <div>
              <Logo size={150} onClick={this.gotoDashboard} align="center"/>
            </div>
            <section className="login_content">
              <form>
                <h1>Quên mật khẩu</h1>
                <div className="form-login">
                  <input value={ userEmail} type="email" className="form-control" placeholder="Email" onChange={this.handleChange('email')} required />
                  {email_error && <InputErrorDisplayer message={email_error}/>}
                  {countDown > -1 && <InputErrorDisplayer message={REDIRECT_AFTER.replace('{x}', 'trang chủ').replace('{y}', countDown)}/>}
                </div>
                <div>
                  <a href="index.html" className="btn btn-default submit" onClick={this.handleResetPassword}>Reset mật khẩu</a>
                </div>

                <div className="clearfix"/>

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
});

export default connect(mapStateToProps, mapDispatchToProps)(PageResetPassword);
