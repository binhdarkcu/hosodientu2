import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import QRCode from '../../assets/images/QRCode.PNG';

const FormFooter = () => {
  return(
    <Grid container spacing={8}>
      <Grid item xs={1}>
        <img src={QRCode} width={50} alt="QR code"/>
      </Grid>
      <Grid item xs={11}>
        <Divider/>
        <div>Số 37 Hoàng Hoa Thám, Phường 13, Quận Tân Bình, Tp. Hồ Chí Minh</div>
        <div>ĐT:0903478236 - Email: info@goldenhealthcarevn.com</div>
      </Grid>
    </Grid>
  )
}

export default FormFooter;
