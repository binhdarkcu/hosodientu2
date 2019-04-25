import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormFooter from '../FormFooter';

function FormContent() {
  return (
    <React.Fragment>
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

          <FormFooter/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default FormContent;
