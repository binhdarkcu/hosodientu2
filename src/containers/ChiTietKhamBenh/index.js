import React from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import { debounce } from 'lodash'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Frame from 'react-frame-component';
//import { Document } from 'react-pdf/dist/esm/entry.webpack';

import PDFViewer from 'pdf-viewer-reactjs'
import { execGetReportDetails } from '../../actions/services/api-report';
import FormLayoutHorizontal from '../../components/FormLayoutHorizontal';

const mapDispatchToProps = dispatch => ({
  getReportDetails: (paramStr) => dispatch(execGetReportDetails(paramStr)),
});

const mapStateToProps = ({services, location }) => ({
  location: location,
});

const styles = theme => ({
  iframe: {
    width: '100%',
    border: 'none',
    height: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down(480 + theme.spacing(2) * 2)]: {
      position: 'absolute',
      transform: 'scale(0.4)',
      width: '250%'
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  }
});

const BASE64_MARKER = ';base64,';

class ChiTietKhamBenh extends React.Component {

  state = {
    pdfString: null,
    numPages: null,
    pageNumber: null,
    loaded: false,
    hasError: false
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }



   base64ToArrayBuffer(base64) {
      var binaryString = window.atob(base64);
      var binaryLen = binaryString.length;
      var bytes = new Uint8Array(binaryLen);
      for (var i = 0; i < binaryLen; i++) {
          var ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
      }
      return bytes;
  }

   b64toBlob(b64Data, contentType) {
        var byteCharacters = atob(b64Data)

        var byteArrays = []

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            var slice = byteCharacters.slice(offset, offset + 512),
                byteNumbers = new Array(slice.length)
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i)
            }
            var byteArray = new Uint8Array(byteNumbers)

            byteArrays.push(byteArray)
        }

        var blob = new Blob(byteArrays, { type: contentType })
        return blob
}

  componentDidMount(){
    const { paramStr } = this.props.location.payload;
    this.props.getReportDetails({paramStr: decodeURIComponent(paramStr)})
    .then(({status, json}) => {

        if(status === 200) {
            var result = String(json)
            //const urlPdf = URL.createObjectURL(this.b64toBlob(result, 'image/png'))
            //window.open(urlPdf);
            //const convertToB64 = this.b64toBlob(result, 'image/png')
            //const blobUrl = URL.createObjectURL(convertToB64);
            this.setState({pdfString: result})
        }
      //   if(this.iframe) {
      //     let iframe = this.iframe.node;
      //     const iframeHeight = iframe.contentWindow.document.body.scrollHeight + 20;
      //     iframe.style.height = iframeHeight + 'px';
      //     iframe.contentWindow.document.body.style.visibility = 'visible';
      //
      //     //Handle mobile issue!
      //     if(window.innerWidth < 512 && iframeHeight > 2000){
      //       this.container.style.height = iframeHeight*0.4 + 'px';
      //     }else{
      //       this.container.style.height = 'auto';
      //     }
      //   }
      // }) : this.setState({hasError: true, loaded: true});
    })
    .catch(err => {
      this.setState({hasError: true, loaded: true});
      console.error(err);
    });
  }

  renderErrorNotice = () => {

    return(
      <div style={{height: 500, textAlign: 'center'}}>
        <Typography component="h2" variant="h4" align="center">Không thể lấy dữ liệu từ máy chủ</Typography>
        <Typography component="span"  variant="h4" align="center">
          <i>*Thông tin bạn đang truy vấn có thể không đúng hoặc máy chủ gặp sự cố khi trả dữ liệu.</i>
        </Typography>
      </div>
    )
  };

  render() {
    const { classes } = this.props;
    const { html, hasError } = this.state;
    const { pageNumber, numPages, pdfString } = this.state;
    //<iframe src={pdfString} height="100%" width="100%"></iframe>
    return (
      <FormLayoutHorizontal>
        <Grid container spacing={2}>
          <Grid ref={(ref) => this.container = ref} item xs={12} className={classes.row + ' hasLoader'}>
            {
                pdfString && <PDFViewer
                    hideRotation={true}
                    hideZoom={true}
                    navbarOnTop={true}
                    pages={2}
                    scale={1.2}
                    document={{
                        base64: pdfString
                    }}
                    navigation={{
                        css: {
                            navbarWrapper: 'navigation-wrapper',
                            pageIndicator: 'page-indicator',
                            previousPageBtn: 'prev-button',
                            nextPageBtn: 'next-button'
                        }
                    }}
                />
        }
          </Grid>
        </Grid>
      </FormLayoutHorizontal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChiTietKhamBenh));
