import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import FormLayoutHorizontal from '../../components/FormLayoutHorizontal';
import Logo from '../../components/Logo';
import FormFooter from '../../components/FormFooter';
import { toast } from 'react-toastify';
import * as MSG from '../../constants/Messages.js';
import { BOUNCE } from '../../constants/Loaders';
import Spinner from '../../components/Spinner';
import { GOLDEN_HEALTH_ORANGE } from '../../constants/Colors';
//custom import
import { execGetCompanyDetails } from '../../actions/services/api-company';

const mapDispatchToProps = dispatch => ({
  execGetCompanyDetails: (id) => dispatch(execGetCompanyDetails(id)),
});

const mapStateToProps = ({ location }) => ({
  location: location,
});

const styles = theme => ({
  item: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: '14px'
  },
  inActive: {
    color: 'red'
  },
  activated: {
    color: '#00f'
  }
});

class ChiTietCongTy extends React.Component {

  state = {
    company: {},
    loading: true
  }

  componentWillMount() {
    const { id } = this.props.location.payload;
    this.props.execGetCompanyDetails(id)
      .then(({status, json}) => status === 200 ? this.handleSuccess(json) : this.handleError())
      .catch(err => this.handleError(err))
  }

  handleSuccess = (company) => {
    console.log(company);
    this.setState({company: {...company}, loading: false});
  }

  handleError = (err) => {
    console.error(err);
    this.setState({loading: false});
    toast.error(MSG.GET_COMPANY_DETAILS_FAILED);
  }

  render() {

    const { classes } = this.props;
    const { company, loading } = this.state;

    return (
      <FormLayoutHorizontal>

        <Spinner type={BOUNCE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading} />

        <Grid container spacing={2}>

          <Grid item xs={12} sm={3}>
            <Logo size={150} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography component="h1" variant="h4" align="center">
              Thông tin công ty
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={classes.item}><b>Tên đơn vị công tác:</b> <i>{company.tenDonViCongTac}</i></div>
            <div className={classes.item}><b>Tên đơn vị công tác (Không dấu):</b> <i>{company.tenKhongDau}</i></div>
            <div className={classes.item}><b>Địa chỉ:</b> <i>{company.diaChi}</i></div>
            <div className={classes.item}><b>Điện thoại:</b> <i>{company.dienThoai}</i></div>
            <div className={classes.item}><b>Email:</b> <i>{company.email}</i></div>
            <div className={classes.item}><b>Số nhà:</b> <i>{company.soNha}</i></div>
            <div className={classes.item}><b>Mã quốc gia:</b> <i>{company.quocGiaId}</i></div>
            <div className={classes.item}><b>Mã Quận/Huyện:</b> <i>{company.quanHuyenId}</i></div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={classes.item}><b>Phạm vi:</b> <i>{company.phamVi}</i></div>
            <div className={classes.item}><b>Mã số thuế:</b> <i>{company.maSoThue}</i></div>
            <div className={classes.item}><b>Mã đơn vị công tác:</b> <i>{company.maDonViCongTac}</i></div>
            <div className={classes.item}><b>Ghi chú hợp đồng:</b> <i>{company.ghiChuHopDong}</i></div>
            <div className={classes.item}><b>Ghi chú lịch khám:</b> <i>{company.ghiChuLichKham}</i></div>
            <div className={classes.item}><b>Ngày tạo:</b> <i>{company.ngayTao && moment(company.ngayTao).format('DD/MM/YYYY h:mm:ss')}</i></div>
            <div className={classes.item}><b>Ngày cập nhật:</b> <i>{company.ngayUpdate && moment(company.ngayUpdate).format('DD/MM/YYYY h:mm:ss')}</i></div>
            <div className={classes.item}><b>Trạng thái kích hoạt:</b> <i><b className={classes.activated}>Không xác định</b></i></div>
          </Grid>
          <Divider />
        </Grid>

        <br></br>
        <br></br>
        <FormFooter />
      </FormLayoutHorizontal>
    );
  }
}

ChiTietCongTy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChiTietCongTy));
