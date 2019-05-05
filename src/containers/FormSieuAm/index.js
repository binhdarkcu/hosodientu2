import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Logo from '../../components/Logo';
import Grid from '@material-ui/core/Grid';
import MaYTe from '../../components/MaYTe';
import FormLayoutVertical from '../../components/FormLayoutVertical';
import FormFooter from '../../components/FormFooter';
class FormSieuAm extends React.Component {

  render() {

    return (
      <FormLayoutVertical>
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <Logo size={150}/>
          </Grid>
          <Grid item xs={4}>
            <Typography component="h1" variant="h4" align="center">
              Siêu Âm
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <MaYTe soPhieu="18.205.000001" sTT="" maYTe="20000002" barCode=""/>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={5}>
            <div>Bệnh nhân (Fullname): </div>
            <div>Bác sĩ chỉ định (Doctor): </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div>Ngày sinh (Date of birth):</div>
            <div>Ngày chỉ định (Date):</div>
          </Grid>
          <Grid item xs={12} sm={3}>
            <div>Giới tính (Gender): </div>
          </Grid>
          <Grid item xs={12}>
            <div>Địa chỉ (Adress): </div>
            <div>Chẩn đoán chỉ định (Diagnosis): </div>
            <div>Nội dung (Contents): </div>
            <div>Mô tả hình ảnh (Desrcibe the image): </div>
            <Typography variant="h6" color="inherit" align="center">
                KẾT QUẢ SIÊU ÂM BỤNG TỔNG QUÁT:
            </Typography>
            <div>+ Gan:</div>
            <div>+ Mật:</div>
            <div>+ Tủy:</div>
            <div>+ Lách:</div>
            <div>+ Thận, bàng quang, tuyến tiền liệt:</div>
            <div>+ Dịch ổ bụng:</div>
            <div>+ Dịch màn phổi:</div>
            <div>+ ĐM chủ bụng:</div>
            <div>
              <strong>Kết luận (Conclusion): </strong>
            </div>
            <div>
              <strong>Đề nghị (Recommendation): </strong>
            </div>
          </Grid>
          <FormFooter/>
        </Grid>
      </FormLayoutVertical>
    );
  }
}

export default FormSieuAm;
