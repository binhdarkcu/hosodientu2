import React, { Component } from 'react';
import { connect } from 'react-redux';

import SidebarProfile from '../components/SidebarProfile';
import SidebarMenu from '../components/SidebarMenu';
import SidebarFooter from '../components/SidebarFooter';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import SiteLogo from '../components/SiteLogo';
//import FormSieuAm from './FormSieuAm';
//import FormDoLoangXuong from './FormDoLoangXuong';
import FormKetQuaECG from './FormKetQuaECG';

const mapStateToProps = state => {
  return {}
}

class Dashboard extends Component {
  render() {
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

          <TopNav user={{name: 'John Doe'}}/>

          <div className="right_col" role="main">
            <div className="row">
              <FormKetQuaECG />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
