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

class TuVan extends React.Component {

  state = {
    loading: true,
  };

  componentDidMount() {
    this.setState({loading: false})
  }


  render() {

    const { classes, companies } = this.props;
    const { loading } = this.state;

    return (
      <Paper className={classes.root}>
        <Spinner type={BOUNCE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading} />
        <iframe style={{width: '100%', height: '100vh'}} src={"https://goldenhealthcarevn.com/dwqa-ask-question/"} frameBorder="0"></iframe>
      </Paper>
    );
  }
}

TuVan.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TuVan));
