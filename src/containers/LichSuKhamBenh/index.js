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
import * as MSG from '../../constants/Messages';
import { GET_REPORT_LIST } from '../../actions/types';
import { execGetReportList } from '../../actions/services/api-report';
import { createAction } from 'redux-actions';

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

  componentWillMount() {
    this.props.execGetReportList({medicalCode: 20000002}).then((data) => {
      this.props.getReports(data);
    }).catch(err => {
      console.log('errr:', err);
    });
  }

  handleShowInfo = (paramStr) => {
    if (paramStr)
      this.props.getReportDetails(encodeURIComponent(paramStr));
  }

  render() {
    const { classes, reports } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>ID</TableCell>
              <TableCell className={classes.header} align="left">Tên hồ sơ</TableCell>
              <TableCell className={classes.header} align="left">Ngày thực hiện</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow
                key={index}
                onClick={() => this.handleShowInfo(report.paramStr)}
                className={`${!report.paramStr ? classes.disabled : classes.row}`}
                title={!report.paramStr ? MSG.NO_DETAIL_AVAILABEL : MSG.SHOW_DETAIL}>
                  <TableCell component="th" scope="row">{report.id}</TableCell>
                  <TableCell align="left">{report.name}</TableCell>
                  <TableCell align="left">{report.ngayThucHien}</TableCell>
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
