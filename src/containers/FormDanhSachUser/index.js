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
//custom import
import { GET_USER_LIST, GET_USER_DETAIL } from '../../actions/types';
import { execGetUserList } from '../../actions/services/api-user';
import { createAction } from 'redux-actions';

const getUsers = createAction(GET_USER_LIST);
const getUsersDetail = createAction(GET_USER_DETAIL);
const mapDispatchToProps = dispatch => ({
  getUserList: () => dispatch(execGetUserList()),
  getUsers: data => dispatch(getUsers(data)),
  getUsersDetail: id => dispatch(getUsersDetail(id)),
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
    color: 'red',
    fontSize: 20,
  },
  buttonActive: {
    backgroundColor: '#2196f3',
    color: '#fff',
  }
});

class FormDanhSachUser extends React.Component {

  componentWillMount() {
    this.props.getUserList().then((data) => {
      this.props.getUsers(data);
    }).catch(err => {
      console.log('errr:', err);
    });
  }

  handleShowInfo = (id) => {
    if (id) {
      const url = `/chi-tiet/${id}`;
      console.log(url)
      this.getUsersDetail(id);
    }
  }

  render() {
    const { classes, users, location } = this.props;
    console.log('location: ', location)
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>Tên user</TableCell>
              <TableCell className={classes.header} align="center">Email</TableCell>
              <TableCell className={classes.header} align="center">Số điện thoại</TableCell>
              <TableCell className={classes.header} align="center">Active User</TableCell>
              <TableCell className={classes.header} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.userId} onClick={() => this.handleShowInfo(user.userId)}>
                <TableCell component="th" scope="row">
                  {user.ten}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                {
                  user.trangThai === 1 ? <TableCell align="center">Actived</TableCell> :
                    <TableCell align="center">
                      <Button variant="contained" className={classes.buttonActive}>Active</Button>
                    </TableCell>
                }
                <TableCell align="center" className={classes.deleteIcon}><i className="fa fa-times" /></TableCell>
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