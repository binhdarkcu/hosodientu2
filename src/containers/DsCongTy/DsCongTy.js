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
import { SET_COMPANY_LIST } from '../../actions/types';

import { execGetCompanyList, execActivateCompany } from '../../actions/services/api-company';
import { execGetListUserCompany } from "../../actions/services/api-user";
import { createAction } from 'redux-actions';
import * as MSG from '../../constants/Messages.js';

const setCompanyList = createAction(SET_COMPANY_LIST);

const mapDispatchToProps = dispatch => ({
  getCompanyList: () => dispatch(execGetCompanyList()),
  saveToStore: data => dispatch(setCompanyList(data)),
  getCompanyUser: () => dispatch(execGetListUserCompany()),
  gotoCompanyDetails: (id) => {
    dispatch({ type: 'RTE_CHI_TIET_CONG_TY', payload: { id } })
  },
  activateCompany: (id) => dispatch(execActivateCompany(id)),
});

const mapStateToProps = ({ id, services, location }) => ({
  companies: services.company.companyList
});

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  header: {
    fontSize: 16,
  },
  buttonActive: {
    backgroundColor: '#2698D6',
    color: '#fff',
  }
});

class DsCongTy extends React.Component {

  state = {
    loading: true,
  };

  componentWillMount() {
    this.initScreen();

  }

  initScreen = async () => {
    try{
      let users, companies = [];
      const usersRes = await this.props.getCompanyUser();
      const companiesRes = await this.props.getCompanyList();

      if(usersRes.status === 200){
        users = usersRes.json;
      }

      if(companiesRes.status === 200){
        companies = companiesRes.json;
      }else{
        this.handleError(companiesRes);
      }

      if(users.length > 0){
        const ids = users.map(x => x.donViCongTacId);
        let list = companies.filter(y => ids.includes(y.donViCongTacId));
        this.handleSuccess(list);
      }
    }catch(e){
      this.handleError(e);
    }
  };

  handleSuccess = (companyList) => {
    this.props.saveToStore(companyList);
    this.setState({loading: false})
  };

  handleError = (err) => {
    console.error(err);
    this.setState({loading: false});
    toast.error(MSG.GET_COMPANY_LIST_FAILED);
  };

  gotoDetails(id){
    this.props.gotoCompanyDetails(id);
  }

  render() {

    const { classes, companies } = this.props;
    const { loading } = this.state;

    return (
      <Paper className={classes.root}>
        <Spinner type={BOUNCE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading} />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>Tên công ty</TableCell>
              <TableCell className={classes.header}align="center">Điện thoại</TableCell>
              <TableCell className={classes.header} align="center">Email</TableCell>
              <TableCell className={classes.header} align="center">Địa chỉ</TableCell>
              <TableCell className={classes.header} align="center">Chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map(company => (
              <TableRow key={company.donViCongTacId}>
                <TableCell component="th" scope="row">{company.tenDonViCongTac}</TableCell>
                <TableCell align="center">{company.dienThoai}</TableCell>
                <TableCell align="center">{company.email}</TableCell>
                <TableCell align="center">{company.diaChi}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" className={classes.buttonActive} onClick={this.gotoDetails.bind(this, company.donViCongTacId)}>Xem chi tiết</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

DsCongTy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DsCongTy));
