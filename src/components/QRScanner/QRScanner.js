import QrReader from 'react-qr-reader';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PortalModal from '../PortalModal';
import FormLayoutVertical from '../FormLayoutVertical';
import LoadingImage from '../../assets/images/loading.gif';
import './style.scss';

class QRScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      legacyMode: false,
      result: '',
      facingMode: 'user',
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleImgSubmit = this.handleImgSubmit.bind(this);
  }

  componentDidMount(){
    document.body.style.position = "fixed";
  }

  componentWillUnmount(){
    document.body.style.position = "";
  }

  handleScan(result) {
    if(result && !this.state.result && typeof this.props.onScan == "function"){
      this.setState({ result });
      this.props.onScan(result);
    }
  }

  handleError(err) {
    console.error(err)
    this.setState({ legacyMode: true })
  }

  handleLoad() {
    this.setState({ loading: false });
  }

  handleImgSubmit(){
    this.refs.reader.openImageDialog()
  }

  handleClose = e => {
    e.preventDefault();
    if(this.props.onClose) this.props.onClose();
  }

  render() {
    const centerContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 100,
    }
      return (
        <PortalModal className="QRScanner">
          <div className="Wrapper">
            <FormLayoutVertical>
              <button type="button" className="btn btn-primary close-popup" title="Đóng" onClick={this.handleClose}>
                <span className="docs-tooltip" title="Đóng">
                  <span className="fa fa-remove"></span>
                </span>
              </button>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  {this.state.loading && (
                    <div style={centerContainerStyle}>
                      <img src={LoadingImage} alt="Loading components"/>
                    </div>
                  )}
                  <div className="Container" style={{display: this.state.loading ? 'none' : 'block'}}>
                    {this.state.legacyMode &&
                      <div className="Heading">
                        <h3>Webcam không hỗ trợ</h3>
                        <button type="button" className="btn btn-primary" onClick={this.handleImgSubmit}>Chọn ảnh QR code có sẵn</button>
                      </div>
                    }
                    <div className="Scanner">
                      <div className="Tip">
                        <i>*Tip: Giữ camera vuông góc với bề mặt chứa QR code, điều chỉnh khoảng cách để có chất lượng hình ảnh tốt nhất</i>
                      </div>
                      <QrReader
                        onScan={this.handleScan}
                        onError={this.handleError}
                        onLoad={this.handleLoad}
                        facingMode={"environment"}
                        delay={500}
                        legacyMode={this.state.legacyMode}
                        ref="reader"
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </FormLayoutVertical>
          </div>
          <div className="OverLay"/>
        </PortalModal>
      );
  }
}

export default QRScanner;
