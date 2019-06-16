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
import { BOUNCE } from '../../constants/Loaders';
import Spinner from '../../components/Spinner';
import { GOLDEN_HEALTH_ORANGE } from '../../constants/Colors';
//custom import
import { GET_USER_LIST } from '../../actions/types';
import { execGetUserList, execDeleteUser, execAdminApprove } from '../../actions/services/api-user';
import { createAction } from 'redux-actions';
import * as MSG from '../../constants/Messages.js';

const getUsers = createAction(GET_USER_LIST);
const mapDispatchToProps = dispatch => ({
  getUserList: () => dispatch(execGetUserList()),
  getUsers: data => dispatch(getUsers(data)),
  getUsersDetail: (id) => {
    dispatch({ type: 'RTE_CHI_TIET_USER', payload: { id } })
  },
  upateUser: (id) => {
    dispatch({ type: 'RTE_USER_UPDATE', payload: { id } })
  },
  deleteUser: (id) => dispatch(execDeleteUser(id)),
  adminApprove: (id) => dispatch(execAdminApprove(id)),
});

const mapStateToProps = ({ id, services, location }) => ({
  id: id,
  users: services.user.userList,
  location: location,
});

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
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
    backgroundColor: '#2196f3',
    color: '#fff',
  }
});

class FormDanhSachUser extends React.Component {

  state = {
    loading: false,
  };

  componentWillMount() {
    const _self = this;
    this.getUserDataTable(_self);
  }

  getUserDataTable(_self) {
    _self.setState({ loading: true });
    this.props.getUserList().then((data) => {
      _self.setState({ loading: false });
      this.props.getUsers(data);
    }).catch(err => {
      toast.success(MSG.ERROR_OCCURED);
      _self.setState({ loading: false });
      console.log('errr:', err);
    });
  }

  handleAction = (id, type) => {
    if (id) {
      const _self = this;
      _self.setState({ loading: true });
      if (type === 'detail') {
        this.props.getUsersDetail(id);
      } else if (type === 'edit') {
        this.props.upateUser(id);
      } else if (type === 'active') {
        this.props.adminApprove({ 'userId': id }).then((data) => {
          data.json.errorMessage ? toast.error(data.json.errorMessage) : toast.success(MSG.USER_APPROVE);
          _self.setState({ loading: false });
          this.getUserDataTable(_self);
        }).catch((err) => {
          toast.error(MSG.ERROR_OCCURED);
          _self.setState({ loading: false });
        });
      } else {
        this.props.deleteUser(id).then(() => {
          toast.success(MSG.USER_DELETEED);
          _self.setState({ loading: false });
          this.getUserDataTable(_self);
        }).catch((err) => {
          toast.error(MSG.ERROR_OCCURED);
          _self.setState({ loading: false });
        });
      }
    }
  }

  convertToDate = (data) => {
    if(!data) return null;
    const date = new Date(data);
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return `${d > 9 ? d : "0"+d}/${m > 9 ? m : "0"+m}/${y}`;
  }

  render() {
    const { classes, users } = this.props;
    const { loading } = this.state;
    return (
      <Paper className={classes.root}>
        <Spinner type={BOUNCE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading} />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>Tên user</TableCell>
              <TableCell className={classes.header}align="center">Mã y tế</TableCell>
              <TableCell className={classes.header} align="center">Ngày sinh</TableCell>
              <TableCell className={classes.header} align="center">Email</TableCell>
              <TableCell className={classes.header} align="center">Số điện thoại</TableCell>
              <TableCell className={classes.header} align="center">Active User</TableCell>
              <TableCell className={classes.header} align="center"></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.userId}>
                <TableCell component="th" scope="row">{user.ho} {user.ten}</TableCell>
                <TableCell align="center">{user.maYte}</TableCell>
                <TableCell align="center">{this.convertToDate(user.ngaySinh)}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                {
                  user.trangThai === 1 ? <TableCell align="center" className={classes.deleteIcon}>
                    <i className="fa fa-info-circle" style={{ paddingRight: 10, color: '#2196f3' }} onClick={() => this.handleAction(user.userId, 'detail')} />
                    <i className="fa fa-pencil-square-o" style={{ paddingRight: 10, color: 'green' }} onClick={() => this.handleAction(user.userId, 'edit')} />
                  </TableCell> :
                    <TableCell align="center">
                      <Button variant="contained" className={classes.buttonActive} onClick={() => this.handleAction(user.userId, 'active')}>Active</Button>
                    </TableCell>
                }
                <TableCell align="left">
                  <i className="fa fa-times-circle" style={{ paddingRight: 10, color: 'red', fontSize: 21 }} onClick={() => this.handleAction(user.userId, 'delete')} />
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