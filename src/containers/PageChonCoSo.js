import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
// custom imports
import 'whatwg-fetch';

import InputErrorDisplayer from '../components/InputErrorDisplayer';
import Spinner from '../components/Spinner';
import Logo from '../components/Logo';
import { GOLDEN_HEALTH_ORANGE } from '../constants/Colors';
import { PACMAN } from '../constants/Loaders';
import { redirect } from 'redux-first-router';
import Link from 'redux-first-router-link';

class PageChonCoSo extends Component{


  state = {
  }

  componentDidMount(){
      // return new Promise((resolve, reject) => {
      //     fetch(xmlData)
      //     .then((response) => {
      //
      //         response.text().then((resultText) => {
      //             const jsonDataFromXml = new XMLParser().parseFromString(resultText);
      //             const getLogos = jsonDataFromXml.getElementsByTagName('Logo');
      //             const coso1 = getLogos[0].value;
      //             const coso2 = getLogos[1].value;
      //             this.setState({ coso1, coso2 });
      //         })
      //     })
      //       .catch(jsonError => reject(jsonError));
      // });
  }

  componentWillUnmount(){

  }

  handeClick(apiLink){
      const portReport = '9000';
      const portBackEnd = '9001';
      localStorage.setItem('backendAPI', apiLink)
      localStorage.setItem('portReport', portReport)
      localStorage.setItem('portBackEnd', portBackEnd)
      this.props.goToPage({type: 'RTE_LOGIN'})
  }

  render(){
      const {coso1, coso2} = this.state
    return (
        <div className="page-choncoso" >
            <div className="row rowTop">
                <div className="column-middle">
                </div>
              <div className="column">
                  <a href="javascript:void(0)" onClick={() => this.handeClick("https://cs1.pkdksghosoonline.com")}>
                      <Logo size={130} align="center"/>
                      <h3>CƠ SỞ 1</h3>
                      <p>3A35 Trần Văn Giàu, Phạm Văn Hai, Bình Chánh - TP.HCM</p>
                  </a>
              </div>
              <div className="column-middle">
              </div>
              <div className="column" >
                  <a href="javascript:void(0)" onClick={() => this.handeClick("https://cs2.pkdksghosoonline.com")}>
                      <Logo size={130} align="center"/>
                      <h3>CƠ SỞ 2</h3>
                      <p>132 - 134 Lý Thái Tổ, Phường 2, Quận 3 - TP.HCM</p>
                  </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(PageChonCoSo);
