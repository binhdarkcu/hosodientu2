import React, { Component } from 'react';
import { connect } from 'react-redux';

import SidebarProfile from '../components/SidebarProfile';
import SidebarMenu from '../components/SidebarMenu';
import SidebarFooter from '../components/SidebarFooter';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import SiteLogo from '../components/SiteLogo';
import FormSieuAm from './FormSieuAm';
import FormDoLoangXuong from './FormDoLoangXuong';
import FormKetQuaECG from './FormKetQuaECG';
import AdminRegister from './AdminRegister';
import {execLogout} from '../actions/services/api-auth.js';

const mapStateToProps = ({ location }) => ({
  pageType: location.type,
  itemId: location.payload.id
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(execLogout())
});

// mapping pages
const pages = {
  'RTE_DASHBOARD': 'div',
  'RTE_REGISTER': AdminRegister,
  'RTE_SIEU_AM': FormSieuAm,
  'RTE_KET_QUA_ECG': FormKetQuaECG,
  'RTE_DO_LOANG_XUONG': FormDoLoangXuong
};

class Dashboard extends Component {

  render() {

    const {pageType, itemId} = this.props;
    const CurrentView = pages[pageType];

    return (
      <div className="container body">
        <div className="main_container">
          <div className="col-md-3 left_col">
            <div className="left_col scroll-view">

              <SiteLogo />

              <div className="clearfix"></div>

              <SidebarProfile user={{name: "John Doe"}}/>

              <br />

              <SidebarMenu />
              <SidebarFooter />
            </div>
          </div>

          <TopNav user={{name: 'John Doe'}} logOut={this.props.logOut}/>

          <div className="right_col" role="main">
            <div className="row">
              <CurrentView />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
