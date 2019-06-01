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
//custom import
import * as MSG from '../../constants/Messages';
import { GET_REPORT_LIST } from '../../actions/types';
import { execGetReportList } from '../../actions/services/api-report';
import { createAction } from 'redux-actions';
import Spinner from '../../components/Spinner';
import {SPINNER_LIGHT_GREEN} from '../../constants/Colors';
import {HASH} from '../../constants/Loaders';

const getReports = createAction(GET_REPORT_LIST);
const mapDispatchToProps = dispatch => ({
  execGetReportList: (data) => dispatch(execGetReportList(data)),
  getReports: data => dispatch(getReports(data)),
  getReportDetails: (paramStr) => {
    dispatch({type: 'RTE_CHI_TIET_KHAM_BENH', payload:{ paramStr }})
  },
});

const mapStateToProps = ({ id, services, location }) => ({
  id: id,
  reports: services.report.reportList,
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
  disabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  row: {
    cursor: 'pointer'
  }
});

class LichSuKhamBenh extends React.Component {

  state = {
      loading: true
  }

  componentWillMount() {
    this.props.execGetReportList({medicalCode: 20000002}).then((data) => {
      this.props.getReports(data);
    }).catch(err => {
      console.log('errr:', err);
    }).finally(() => {
      this.setState({loading: false});
    });
  }

  handleShowInfo = (paramStr) => {
    if (paramStr)
      this.props.getReportDetails(encodeURIComponent(paramStr));
  }

  render() {
    const { classes, reports } = this.props;
    const { loading } = this.state;
    return (
      <Paper className={classes.root}>
        <Spinner type={HASH} size={50} color={SPINNER_LIGHT_GREEN} loading={loading}/>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>ID</TableCell>
              <TableCell className={classes.header} align="left">Hình thức</TableCell>
              <TableCell className={classes.header} align="left">Mã nhóm</TableCell>
              <TableCell className={classes.header} align="left">Ngày thực hiện</TableCell>
              <TableCell className={classes.header} align="left">Năm</TableCell>
              <TableCell className={classes.header} align="left">Kết quả</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report, index) => (
                <TableRow
                  key={index}
                  onClick={() => this.handleShowInfo(report.paramStr)}
                  className={`${!report.paramStr ? classes.disabled : classes.row}`}
                  title={!report.paramStr ? MSG.NO_DETAIL_AVAILABLE : MSG.SHOW_DETAIL}>
                    <TableCell component="th" scope="row">{report.id}</TableCell>
                    <TableCell component="th" scope="row">{report.groupId}</TableCell>
                    <TableCell align="left">{report.name}</TableCell>
                    <TableCell align="left">{report.ngayThucHien}</TableCell>
                    <TableCell align="left">{report.nam}</TableCell>

                    <TableCell align="left">{report.isKetQua ? 'true' : 'false'}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

LichSuKhamBenh.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LichSuKhamBenh));
