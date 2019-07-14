import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
// import { createAction } from 'redux-actions';
import { redirect } from 'redux-first-router';

// components
import SidebarProfile from '../components/SidebarProfile';
import SidebarMenu from '../components/SidebarMenu';
import SidebarFooter from '../components/SidebarFooter';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import SiteLogo from '../components/SiteLogo';
import AvatarSelector from '../components/AvatarSelector';
import Spinner from '../components/Spinner';

// containers
import AdminRegister from './AdminRegister';
import FormChangePassword from './FormChangePassword';
import ChiTietUser from './ChiTietUser';
import ChiTietCongTy from './ChiTietCongTy';
import ChiTietKhamBenh from './ChiTietKhamBenh';
import KiemTraUser from './KiemTraUser';
import DsUser from './DsUser';
import DsKhamBenh from './DsKhamBenh';
import DsCongTy from './DsCongTy';
import DangKyCongTy from './DangKyCongTy';
import TuVan from './TuVan'

import { PULSE } from '../constants/Loaders';
import { GOLDEN_HEALTH_ORANGE } from '../constants/Colors';
import * as MSG from '../constants/Messages';
// import { SET_USER_INFO } from '../actions/types';
import { execLogout, saveUserInfo } from '../actions/services/user.js';
import { execUpdateAvatar, execChangePassword } from '../actions/services/api-user';

const mapStateToProps = ({ location, services }) => ({
  pageType: location.type,
  itemId: location.payload.id,
  userInfo: services.user.userInfo
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(execLogout()),
  updateAvatar: (data) => dispatch(execUpdateAvatar(data)),
  saveUserInfo: (user) => dispatch(saveUserInfo(user)),
  goToChangePasswordPage: () => dispatch(redirect({type: 'RTE_CHANGE_PASSWORD'})),
  changePassword: data => dispatch(execChangePassword(data))
});

// mapping pages
const pages = {
  //pages
  'RTE_DASHBOARD': DsKhamBenh,
  'RTE_ADMIN_REGISTER': AdminRegister,
  'RTE_CHANGE_PASSWORD': FormChangePassword,
  'RTE_USER_UPDATE': AdminRegister,
  'RTE_DANG_KY_CONG_TY': DangKyCongTy,
  'RTE_TU_VAN': TuVan,

  // list
  'RTE_DANH_SACH_USER': DsUser,
  'RTE_DANH_SACH_KHAM_BENH': DsKhamBenh,
  'RTE_DANH_SACH_CONG_TY': DsCongTy,

  //details
  'RTE_CHI_TIET_USER': ChiTietUser,
  'RTE_CHI_TIET_KHAM_BENH': ChiTietKhamBenh,
  'RTE_CHI_TIET_CONG_TY': ChiTietCongTy,
  'RTE_KIEM_TRA_USER': KiemTraUser,
  'RTE_CAP_NHAT_USER_COMPANY': DangKyCongTy

};

class Dashboard extends Component {

  state = {
    showChangeAvatarPopup: false,
    loading: false
  };

  componentDidMount(){
    document.body.className = "nav-md";
    if (window.initializeDashboard) window.initializeDashboard();
  }

  handleShowAvatarSelector = () =>{
    this.setState((prevState) => {
      return {showChangeAvatarPopup: !prevState.showChangeAvatarPopup};
    });
  };

  handleUpdateAvatar = (avatar) => {
    this.setState({loading: true});
    const { userInfo } = this.props;
    const data = {
      UserId: userInfo.userId,
      Avatar: avatar
    };

    this.props.updateAvatar(data).then((userInfo) => {
      this.props.saveUserInfo(userInfo);
      toast.success(MSG.UPDATE_AVATAR_SUCCESS);
      this.setState({showChangeAvatarPopup: false, loading: false});
    }).catch(err => {
      toast.error(MSG.UPDATE_AVATAR_FAILED);
    })
  };

  handleLogoClick = () => {

  };

  render() {

    const { pageType, userInfo } = this.props;
    const { showChangeAvatarPopup, loading } = this.state;
    const CurrentView = pages[pageType];

    return (
      <div className="container body">
        <Spinner type={PULSE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading}/>
        <div className="main_container">
          <div className="col-md-3 left_col" style={{ position: "fixed" }}>
            <div className="left_col scroll-view">

              <SiteLogo onClick={this.handleLogoClick}/>

              <div className="clearfix"></div>

              <SidebarProfile user={userInfo}/>

              <br />

              <SidebarMenu user={userInfo} />
              {/*<SidebarFooter />*/}
            </div>
          </div>

          <TopNav user={userInfo} logOut={this.props.logOut} changeAvatar={this.handleShowAvatarSelector} redirectToChangePaswordPage={this.props.goToChangePasswordPage}/>
          {showChangeAvatarPopup && <AvatarSelector handleClose={this.handleShowAvatarSelector} updateAvatar={this.handleUpdateAvatar}/>}

          <div className="right_col" role="main">
            <div className="row">
              <CurrentView key={pageType}/>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

Dashboard.defaultProps = {
  userInfo: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
