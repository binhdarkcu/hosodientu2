import React, {Component} from 'react';
import { connect } from 'react-redux'

import RegisterForm from '../AdminRegister';

class UserRegister extends Component{

  handleClick = () => {
    console.log("Going to dashboard");
    this.props.onClick('Go');
  }

  render(){
    return(
      <div className="container body">
        <div className="main_container">
          <div className="col-md-12">
            <RegisterForm type={'user'} />
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
  onClick: data => dispatch({ type: 'RTE_DASHBOARD', payload: { data } })
});
export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
