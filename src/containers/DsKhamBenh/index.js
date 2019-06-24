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
import Collapse from '@material-ui/core/Collapse';
import { toast } from 'react-toastify';
import _ from 'lodash';
//custom import
import * as MSG from '../../constants/Messages';
import { GET_REPORT_LIST } from '../../actions/types';
import { execGetReportList } from '../../actions/services/api-report';
import { execGetCompanyReportList } from '../../actions/services/api-company';
import { createAction } from 'redux-actions';
import Spinner from '../../components/Spinner';
import {GOLDEN_HEALTH_ORANGE} from '../../constants/Colors';
import {HASH} from '../../constants/Loaders';
import './style.scss';

const getReports = createAction(GET_REPORT_LIST);
const mapDispatchToProps = dispatch => ({
  execGetReportList: data => dispatch(execGetReportList(data)),
  execGetCompanyReportList: companyId => dispatch(execGetCompanyReportList(companyId)),
  getReports: data => dispatch(getReports(data)),
  getReportDetails: paramStr => dispatch({type: 'RTE_CHI_TIET_KHAM_BENH', payload:{ paramStr }}),
});

const mapStateToProps = ({ services, location }) => ({
  user: services.user.userInfo,
  reports: services.report.reportList,
  location: location,
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
    cursor: 'default'
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
      loading: true,
      reports: [],
      visibility: [true]
  };

  componentDidMount() {
    this.initializeScreen().finally(() => this.setState({loading: false}));
  }

  initializeScreen = async () => {
    try{
      const { user } = this.props;
      let result = user.phanQuyen === 3 ? await this.getCompanyReports(user) : await this.getPersonalReports(user);
      if(result && result.status === 200){
        this.props.getReports(result.json);
        const list = this.groupDataList(result.json);
        this.setState({reports: [...list]});
      }

    }catch(err){
      this.handleError({detail: err, message: MSG.ERROR_OCCURED});
    };
  }

  getPersonalReports = async (user) => {
    if(!user.maYte) return this.handleError({detail: null, message: MSG.USER_NO_MEDICAL_CODE});
    return this.props.execGetReportList(user.maYte);
  }

  getCompanyReports = async (user) => {
    if(!user.donViCongTacId) return this.handleError({detail: null, message: MSG.USER_NO_COMPANY_ID});
    return this.props.execGetCompanyReportList(user.donViCongTacId);
  }


  handleError = err => {
    toast.error(err.message);
    console.error(err.detail);
  }

  groupDataList = (data) => {

    if(Array.isArray(data)){
      let parents = [];
      let childs = [];
      data.forEach((item) => {
        if(item.parentGroupId){
          childs[item.parentGroupId] ? childs[item.parentGroupId].push(item) : childs[item.parentGroupId] = [item];
        }else{
          parents.push(item);
        }
      });

      parents.forEach((parent, index) => {
        if(childs[parent.groupId]){
          parents[index].children = [..._.orderBy(childs[parent.groupId], ['name'], ['asc'])];
        }
      });

      return parents;
    }
    return [];
  };

  handleShowInfo = (paramStr) => {
    if (paramStr)
      this.props.getReportDetails(encodeURIComponent(paramStr));
  }

  toggleList = (index) => {
    this.setState((prevState)=>{
      let visibility = [...prevState.visibility];
      visibility[index] = !visibility[index];
      return {visibility}
    })
  };

  render() {

    const { classes } = this.props;
    const { loading, reports, visibility } = this.state;

    return (
      <Paper className={`LichSuKhamBenh ${classes.root}`}>
        <Spinner type={HASH} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading}/>
        <Table className={classes.table}>
          <TableBody>
            {reports.length === 0 && <TableRow className={`${classes.row}`}>
                                        <TableCell className={classes.header} align="center">Không có dữ liệu!</TableCell>
                                      </TableRow>}

            {reports.map((parent, index) => {
              const { children } = parent;
              return(
                <React.Fragment key={`parent-${index}`}>
                  <TableRow
                    onClick={() => this.toggleList(index)}
                    className={`${classes.row}`}>
                    <TableCell component="td" scope="row" colSpan={12}>
                      <div className="ParentGroup">
                        { !!visibility[index] ? <span className="fa fa-chevron-up ParentGroupIcon"/> : <span className="fa fa-chevron-down ParentGroupIcon"/>}
                        {parent.name}
                      </div>
                      <Collapse in={!!visibility[index]}>
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
                            {
                              children ?
                                children.map((report, cIndex) => (
                                  <TableRow
                                    key={`child-${index}-${cIndex}`}
                                    onClick={() => this.handleShowInfo(report.paramStr)}
                                    className={`${!report.paramStr ? classes.disabled : classes.row}`}
                                    title={!report.paramStr ? MSG.NO_DETAIL_AVAILABLE : MSG.SHOW_DETAIL}>
                                    <TableCell component="th" scope="row">{report.id}</TableCell>
                                    <TableCell component="th" scope="row">{report.groupId}</TableCell>
                                    <TableCell align="left">{report.name}</TableCell>
                                    <TableCell align="left">{report.ngayThucHien}</TableCell>
                                    <TableCell align="left">{report.nam}</TableCell>
                                    <TableCell align="left">{report.isKetQua ? 'Đã khám' : 'Đang đợi'}</TableCell>
                                  </TableRow>
                                  )
                                )
                                :
                                <TableRow>
                                  <TableCell align="center" colSpan={12}>Không có dữ liệu</TableCell>
                                </TableRow>
                            }
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              )
            })}
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
