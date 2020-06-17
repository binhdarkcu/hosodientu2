import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import MaterialTable from 'material-table';
import { createAction } from 'redux-actions';

//custom import
import vietnamese from '../../locales/vietnamese';
import { BOUNCE } from '../../constants/Loaders';
import Spinner from '../../components/Spinner';
import { GOLDEN_HEALTH_ORANGE } from '../../constants/Colors';
import { SET_COMPANY_LIST } from '../../actions/types';

import { execGetCompanyList, execActivateCompany } from '../../actions/services/api-company';
import { execGetListUserCompany } from "../../actions/services/api-user";


import * as MSG from '../../constants/Messages.js';

const setCompanyList = createAction(SET_COMPANY_LIST);

const mapDispatchToProps = dispatch => ({
  getCompanyList: () => dispatch(execGetCompanyList()),
  saveToStore: data => dispatch(setCompanyList(data)),
  gotoCompanyDetails: (id) => dispatch({ type: 'RTE_CHI_TIET_CONG_TY', payload: { id } }),
  getCompanyUser: () => dispatch(execGetListUserCompany()),
  activateCompany: (id) => dispatch(execActivateCompany(id)),
});

const mapStateToProps = ({ services }) => ({
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
    const columns = [
      { title: 'Tên công ty', field: 'tenDonViCongTac', render: company =>  company.tenDonViCongTac },
      { title: 'Điện thoại', field: 'dienThoai', render: company =>  company.dienThoai },
      { title: 'Email', field: 'email', render: company =>  company.email },
      { title: 'Địa chỉ', field: 'diaChi', render: company =>  company.diaChi },
      { title: 'Xem chi tiết', sorting: false, render: company =>  <Button variant="contained" className={classes.buttonActive} onClick={this.gotoDetails.bind(this, company.donViCongTacId)}>Chi tiết</Button> },
    ];
    return (
      <Paper className={classes.root}>
        <Spinner type={BOUNCE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading} />
        <MaterialTable
            localization={vietnamese}
            columns={columns}
            data={companies}
            options= {{
              pageSize: 20,
              pageSizeOptions: [10, 20, 50, 100],
              debounceInterval: 200,
              showTitle: false,
              emptyRowsWhenPaging: false,
              filtering: false,
            }}
        />
      </Paper>
    );
  }
}

DsCongTy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DsCongTy));
