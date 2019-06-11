import QrReader from 'react-qr-reader';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
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
      result: 'No result',
      error: false,
      facingMode: 'user',
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleFacingModeChange = this.handleFacingModeChange.bind(this);
    this.handleImgSubmit = this.handleImgSubmit.bind(this);
  }
  handleScan(result) {
    if(result){
      this.setState({ result });
    }
  }
  handleError(err) {
    console.error(err)
    this.setState({ legacyMode: true })
  }
  handleLoad() {
    this.setState({ loading: false });
  }
  handleFacingModeChange(e) {
    this.setState({ facingMode: e.target.value });
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
    const hozContainerStyle = {
      margin: "10px",
      display: "flex",
      justifyContent: "space-between",
    };

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
                      <img src={LoadingImage} alt="Loading Image"/>
                    </div>
                  )}
                  <div style={{display: this.state.loading ? 'none' : 'block'}}>
                    {!this.state.legacyMode ? (
                      <div style={hozContainerStyle}>
                        <select
                          value={this.state.facingMode}
                          onChange={this.handleFacingModeChange}
                          >
                          <option value="user">User Camera</option>
                          <option value="environment">Environment Camera</option>
                        </select>
                      </div>
                    ) : (
                      <div style={hozContainerStyle}>
                        <h3>Webcam not supported</h3>
                        <button type="button" className="btn btn-primary" onClick={this.handleImgSubmit}>Submit an Image</button>
                      </div>
                    )}
                    <div style={{ width: '100%', maxWidth: '500px' }}>
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
                    <h3>Decoded QR-Code: {this.state.result}</h3>
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
