import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { BOUNCE } from '../../constants/Loaders';
import { USER } from '../../constants/User';
import Spinner from '../../components/Spinner';
import { GOLDEN_HEALTH_ORANGE } from '../../constants/Colors';
//custom import
import { GET_USER_LIST } from '../../actions/types';
import { execGetUserList, execDeleteUser, execAdminApprove } from '../../actions/services/api-user';
import { createAction } from 'redux-actions';
import * as MSG from '../../constants/Messages.js';
import ActivatePatientPostModel from "../../models/activatePatientPostModel";

import MaterialTable from 'material-table';

const getUsers = createAction(GET_USER_LIST);
const mapDispatchToProps = dispatch => ({
  getUserList: () => dispatch(execGetUserList()),
  saveUserListToStore: data => dispatch(getUsers(data)),
  gotoUserDetailsPage: id => dispatch({ type: 'RTE_CHI_TIET_USER', payload: { id } }),
  gotoUpdateRegularUserPage: id => dispatch({ type: 'RTE_USER_UPDATE', payload: { id } }),
  gotoUpdateCompanyUserPage: id => dispatch({type: 'RTE_CAP_NHAT_USER_COMPANY', payload: { id }}),
  gotoReviewUserPage: id => dispatch({ type: 'RTE_KIEM_TRA_USER', payload: { id } }),
  deleteUser: id => dispatch(execDeleteUser(id)),
  adminApprove: id => dispatch(execAdminApprove(id)),
});

const mapStateToProps = ({ services, location }) => ({
  users: services.user.userList,
  currentUser: services.user.userInfo,
  location: location,
});

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  header: {
    fontSize: 16,
  },
  deleteIcon: {
    fontSize: 20,
  },
  buttonActive: {
    backgroundColor: "#2698D6",
    color: "#fff",
  }
});

const vietnamese = {
  pagination: {
    labelDisplayedRows: '{from}-{to} trong tổng số {count} mục',
    labelRowsSelect: 'mục',
    labelRowsPerPage: 'mục/trang',
    firstAriaLabel: 'Trang đầu',
    firstTooltip: 'Trang đầu',
    previousAriaLabel: 'Trang trước',
    previousTooltip: 'Trang trước',
    nextAriaLabel: 'Trang tiếp',
    nextTooltip: 'Trang tiếp',
    lastAriaLabel: 'Trang cuối',
    lastTooltip: 'Trang cuối'

  },
  toolbar: {
    nRowsSelected: '{0} mục được chọn',
    searchPlaceholder: 'Tìm',
    searchTooltip: 'Tìm kiếm'
  },
  body: {
    emptyDataSourceMessage: 'Không có kết quả',
    filterRow: {
        filterTooltip: 'Lọc'
    }
  }
}

class FormDanhSachUser extends React.Component {

  state = {
    loading: true,
  };

  componentDidMount() {
    this.fetchUserList();
  }

  fetchUserList = async () => {
    try{
      const result = await this.props.getUserList();
      console.log(result);
      if(result.status === 200) this.props.saveUserListToStore(_.map(result.json, user => new ActivatePatientPostModel(user)));
      this.setState({loading: false});
    }catch (e) {
      this.handleError({detail: e, message: MSG.ERROR_OCCURED});
    }
  };

  handleAction = async (user, action) => {
    if(!user && !user.userId) return;
    this.setState({loading: true});
    switch (action) {
      case USER.ACTION.DETAIL:
        this.props.gotoUserDetailsPage(user.userId);
        break;
      case USER.ACTION.UPDATE:
        user.phanQuyen === USER.ROLE.COMPANY ? this.props.gotoUpdateCompanyUserPage(user.userId) : this.props.gotoUpdateRegularUserPage(user.userId);
        break;
      case USER.ACTION.ACTIVATE:
        this.props.gotoReviewUserPage(user.userId);
        break;
      case USER.ACTION.DELETE:
        this.handleDeleteUser(user.userId);
        break;
      default:
        this.setState({loading: false});
    }
  };

  handleDeleteUser = async (id) => {
    try{
      const result = await this.props.deleteUser(id);
      if(result.status === 200){
        this.handleSuccess(MSG.USER.DELETE.SUCCESS);
        this.fetchUserList();
        return;
      }

      this.handleError({detail: result, message: MSG.USER.DELETE.FAILED});
    }catch (e) {
      this.handleError({detail: e, message: MSG.USER.DELETE.FAILED});
    }
  };

  handleSuccess = message => {
    this.setState({loading: false});
    toast.success(message);
  };

  handleError = error => {
    this.setState({loading: false});
    toast.error(error.message);
    console.error(error.detail);
  };


  render() {
    const { classes, users, currentUser } = this.props;
    const { loading } = this.state;
    const columns = [
      { title: 'Tên user', field: 'fullname', render: user =>  user.ho +' '+user.ten },
      { title: 'Mã y tế', field: 'maYte' },
      { title: 'Ngày sinh', field: 'birthday', render: user =>  user.getFormattedBirthday()},
      { title: 'Email', field: 'email'},
      { title: 'Số điện thoại', field: 'phone'},
      { title: 'Trạng thái', field: 'userStatus', render: user =>  user.getStatusName()},
      { title: 'Quyền', field: 'userRole', render: user =>  user.getRoleName()},
      { title: 'Ngày đăng ký', field: 'registryDate', render: user =>  user.getFormattedRegistryDate()},
      { title: 'Active User', field: 'activeUser', render: user => {
        return user.trangThai === USER.STATUS.ACTIVE.CODE ? <div className={classes.deleteIcon}>
          <i className="fa fa-info-circle" style={{ paddingRight: 10, color: '#2698D6' }} onClick={() => this.handleAction(user, USER.ACTION.DETAIL)} />
          <i className="fa fa-pencil-square-o" style={{ paddingRight: 10, color: 'green' }} onClick={() => this.handleAction(user, USER.ACTION.UPDATE)} />
        </div> :
          <div>
            {
              currentUser.userId === user.userId ?
                null : <Button variant="contained" className={classes.buttonActive} disabled={user.trangThai !== USER.STATUS.PENDING_ADMIN.CODE} onClick={() => this.handleAction(user, USER.ACTION.ACTIVATE)}>Duyệt</Button>
            }
          </div>
      }},
      { title: 'Xóa', field: 'delete', render: user => {
        return <div> {currentUser.userId === user.userId ?
          null : <i className="fa fa-times-circle" style={{ paddingRight: 10, color: 'red', fontSize: 21 }} onClick={() => this.handleAction(user, USER.ACTION.DELETE)} />
        }</div>
      }},
    ]
    return (
      <Paper className={classes.root}>
        <Spinner type={BOUNCE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading} />
        <MaterialTable
          localization={vietnamese}
          columns={columns}
          data={users}
          options= {{
            pageSize: 10,
            pageSizeOptions: [10, 20, 50, 100],
            debounceInterval: 200,
            showTitle: false,
            emptyRowsWhenPaging: false,
          }}
        />
      </Paper>
    );
  }
}

FormDanhSachUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormDanhSachUser));
