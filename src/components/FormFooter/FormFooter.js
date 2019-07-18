import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import './style.scss';
import QRCode from '../../assets/images/GHC_Website.png';

class FormFooter extends React.Component{
  state = {
    showBigImage: false
  }

  handleMouseEnter = (e) => {
    e.preventDefault();
    this.setState({showBigImage: true});
  }

  handleMouseLeave = (e) => {
    e.preventDefault();
    this.setState({showBigImage: false});
  }

  render(){
    const { showBigImage } = this.state;
    return(
      <Grid className="FormFooter" container spacing={8}>

        <Grid item xs={12} className="FormGroup">
          <div className="ImageContainer">
            <img src={QRCode} width={50} alt="QR code" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}/>
            {
              showBigImage && <img src={QRCode} className="BigImage" width={150} alt="QR code enlarged"/>
            }
          </div>
          <div className="Address">
            <Divider/>
            <div>Số 37 Hoàng Hoa Thám, Phường 13, Quận Tân Bình, Tp. Hồ Chí Minh</div>
            <div>ĐT:0369031818 - Email: info@goldenhealthcarevn.com</div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default FormFooter;
