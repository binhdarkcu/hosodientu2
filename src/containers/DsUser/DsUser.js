import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
    return (
      <Paper className={classes.root}>
        <Spinner type={BOUNCE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading} />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>Tên user</TableCell>
              <TableCell className={classes.header} align="center">Mã y tế</TableCell>
              <TableCell className={classes.header} align="center">Ngày sinh</TableCell>
              <TableCell className={classes.header} align="center">Email</TableCell>
              <TableCell className={classes.header} align="center">Số điện thoại</TableCell>
              <TableCell className={classes.header} align="center">Trạng thái</TableCell>
              <TableCell className={classes.header} align="center">Quyền</TableCell>
              <TableCell className={classes.header} align="center">Active User</TableCell>
              <TableCell className={classes.header} align="center">Xóa</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.userId}>
                <TableCell component="th" scope="row">{user.ho} {user.ten}</TableCell>
                <TableCell align="center">{user.maYte}</TableCell>
                <TableCell align="center">{user.getFormattedBirthday()}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">{user.getStatusName()}</TableCell>
                <TableCell align="center">{user.getRoleName()}</TableCell>
                {
                  user.trangThai === USER.STATUS.ACTIVE ? <TableCell align="center" className={classes.deleteIcon}>
                    <i className="fa fa-info-circle" style={{ paddingRight: 10, color: '#2698D6' }} onClick={() => this.handleAction(user, USER.ACTION.DETAIL)} />
                    <i className="fa fa-pencil-square-o" style={{ paddingRight: 10, color: 'green' }} onClick={() => this.handleAction(user, USER.ACTION.UPDATE)} />
                  </TableCell> :
                    <TableCell align="center">
                      {
                        currentUser.userId === user.userId ?
                          null : <Button variant="contained" className={classes.buttonActive} disabled={user.trangThai !== USER.STATUS.PENDING_ADMIN} onClick={() => this.handleAction(user, USER.ACTION.ACTIVATE)}>Duyệt</Button>
                      }
                    </TableCell>
                }
                <TableCell align="left">
                  {
                    currentUser.userId === user.userId ?
                      null : <i className="fa fa-times-circle" style={{ paddingRight: 10, color: 'red', fontSize: 21 }} onClick={() => this.handleAction(user, USER.ACTION.DELETE)} />
                  }

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

FormDanhSachUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormDanhSachUser));
