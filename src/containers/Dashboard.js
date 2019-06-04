import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { createAction } from 'redux-actions';

// Custom imports
import SidebarProfile from '../components/SidebarProfile';
import SidebarMenu from '../components/SidebarMenu';
import SidebarFooter from '../components/SidebarFooter';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import SiteLogo from '../components/SiteLogo';
import FormSieuAm from './FormSieuAm';
import FormDoLoangXuong from './FormDoLoangXuong';
import FormKetQuaECG from './FormKetQuaECG';
import FormDanhSachUser from './FormDanhSachUser';
import AdminRegister from './AdminRegister';
import FormChangePassword from './FormChangePassword';
import FormUser from './FormUser';
import ListDoLoangXuong from './ListDoLoangXuong';
import ListKetQuaECG from './ListKetQuaECG';
import ListSieuAm from './ListSieuAm';
import DanhSachKhamBenh from './LichSuKhamBenh';
import ChiTietKhamBenh from './ChiTietKhamBenh';
import AvatarSelector from '../components/AvatarSelector';

import * as MSG from '../constants/Messages';
import { SET_USER_INFO } from '../actions/types';
import { execLogout } from '../actions/services/user.js';
import { execUpdateAvatar } from '../actions/services/api-user';
import { saveUserInfo } from '../actions/services/user';


const mapStateToProps = ({ location, services }) => ({
  pageType: location.type,
  itemId: location.payload.id,
  userInfo: services.user.userInfo
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(execLogout()),
  updateAvatar: (data) => dispatch(execUpdateAvatar(data)),
  saveUserInfo: (user) => dispatch(saveUserInfo(user))
});

// mapping pages
const pages = {
  'RTE_DASHBOARD': 'div',
  'RTE_ADMIN_REGISTER': AdminRegister,
  'RTE_SIEU_AM': FormSieuAm,
  'RTE_KET_QUA_ECG': FormKetQuaECG,
  'RTE_DO_LOANG_XUONG': FormDoLoangXuong,
  'RTE_DANH_SACH_USER': FormDanhSachUser,
  'RTE_CHI_TIET_USER': FormUser,
  'RTE_CHANGE_PASSWORD': FormChangePassword,
  'RTE_LIST_DO_LOANG_XUONG': ListDoLoangXuong,
  'RTE_LIST_SIEU_AM': ListSieuAm,
  'RTE_LIST_KET_QUA_ECG': ListKetQuaECG,
  'RTE_LIST_KHAM_BENH': DanhSachKhamBenh,
  'RTE_CHI_TIET_KHAM_BENH': ChiTietKhamBenh,
  'RTE_USER_UPDATE': AdminRegister,
};

class Dashboard extends Component {

  state = {
    showChangeAvatarPopup: false
  }

  componentDidMount(){
    document.body.className = "nav-md";
    if(window.initializeDashboard) window.initializeDashboard();
  }

  handleShowAvatarSelector = () =>{
    this.setState((prevState) => {
      return {showChangeAvatarPopup: !prevState.showChangeAvatarPopup};
    });
  }

  handleUpdateAvatar = (avatar) => {
    const { userInfo } = this.props;
    const data = {
      UserId: userInfo.userId,
      Avatar: avatar
    };

    this.props.updateAvatar(data).then((userInfo) => {
      this.props.saveUserInfo(userInfo);
      toast.success(MSG.UPDATE_AVATAR_SUCCESS);
      this.setState({showChangeAvatarPopup: false});
    }).catch(err => {
      toast.error(MSG.UPDATE_AVATAR_FAILED);
    })
  }

  render() {

    const { pageType, itemId, userInfo } = this.props;
    const { showChangeAvatarPopup } = this.state;
    const CurrentView = pages[pageType];

    return (
      <div className="container body">
        <div className="main_container">
          <div className="col-md-3 left_col">
            <div className="left_col scroll-view">

              <SiteLogo />

              <div className="clearfix"></div>

              <SidebarProfile user={userInfo}/>

              <br />

              <SidebarMenu />
              <SidebarFooter />
            </div>
          </div>

          <TopNav user={userInfo} logOut={this.props.logOut} changeAvatar={this.handleShowAvatarSelector}/>
          {showChangeAvatarPopup && <AvatarSelector handleClose={this.handleShowAvatarSelector} updateAvatar={this.handleUpdateAvatar}/>}

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

Dashboard.defaultProps = {
  userInfo: {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
