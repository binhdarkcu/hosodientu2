import React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Logo from '../../components/Logo';
import Grid from '@material-ui/core/Grid';
import MaYTe from '../../components/MaYTe';
import FormLayoutVertical from '../../components/FormLayoutVertical';
import FormFooter from '../../components/FormFooter';
import Divider from '@material-ui/core/Divider';

class FormDoLoangXuong extends React.Component {

  render() {

    return (
      <FormLayoutVertical>

        <Grid container spacing={24}>

          <Grid item xs={4}>
            <Logo size={150}/>
          </Grid>

          <Grid item xs={4}>
            <Typography component="h1" variant="h4" align="center">
              DO LOANG XUONG
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <MaYTe soPhieu="" sTT="" maYTe="20000002" barCode=""/>
          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Divider/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>ID No. (Fullname): </div>
            <div>Brith Date (Age): </div>
            <div>Sex:</div>
            <div>Height:</div>
            <div>Comments:</div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Name:</div>
            <div>Age:</div>
            <div>Height:</div>
            <div>Weight:</div>
          </Grid>

          <Grid item xs={12}>
            <Divider/>
          </Grid>

          <Grid item xs={12}>
            <div>
                main content
            </div>
          </Grid>

          <Grid item xs={8}>
            <div>
              <strong>Kết luận (Conclusion): </strong>
            </div>
            <div>
              <strong>Đề nghị (Recommendation): </strong>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              Ngày 15 tháng 3 năm 2019
            </div>
            <div>
              Bác sĩ Nguyễn Văn A
            </div>
          </Grid>
        </Grid>
        <FormFooter/>
      </FormLayoutVertical>
    );
  }
}


export default FormDoLoangXuong;
