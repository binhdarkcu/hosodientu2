import React from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import { debounce } from 'lodash'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Frame from 'react-frame-component';
import ReactHtmlParser from 'react-html-parser';

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
    overflow: 'hidden'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ChiTietKhamBenh extends React.Component {

  state = {
    html: null,
    loaded: false,
    hasError: false
  }

  resizeIframe = () => {

    const { loaded } = this.state;

    // Only register mutation event once!
    if(this.iframe && !loaded){

      let iframe = this.iframe.node;

      const observeDOM = (() => {
        let MutationObserver = iframe.contentWindow.MutationObserver || iframe.contentWindow.WebKitMutationObserver;

        return ( obj, callback ) => {
          if( !obj || !obj.nodeType === 1 ) return; // validation

          if( MutationObserver ){
            // define a new observer
            let obs = new MutationObserver((mutations, observer) => {
                callback(mutations);
            })
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
          }

          else if( iframe.contentWindow.addEventListener ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
          }
        }
      })();

      observeDOM( iframe.contentWindow.document, (m) => {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
        iframe.contentWindow.document.body.style.visibility = 'visible';
      });

    }
  }

  componentDidMount(){
    const { paramStr } = this.props.location.payload;
    this.props.getReportDetails({paramStr: decodeURIComponent(paramStr)})
    .then(({status, json}) => {
      status === 200 ? this.setState({html: json, loaded: true}) : this.setState({hasError: true, loaded: true});
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
  }

  render() {
    const { classes } = this.props;
    const { html, hasError } = this.state;
    return (
      <FormLayoutHorizontal>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.row + ' hasLoader'}>
            <Frame  ref={(ref) => {this.iframe = ref}}
                    initialContent='<!DOCTYPE html><html><head></head><body class="iframe-body"><div></div></body></html>'
                    head={
                      <style type="text/css">
                      {`.iframe-body{visibility:hidden; display: flex; flex-direction: column; justify-content: center; align-items: center;}`}
                      </style>
                    }
                    className={classes.iframe}
                    frameBorder="0"
                    scrolling="no"
                    onLoad={this.resizeIframe}>
                  { hasError ? this.renderErrorNotice() : ReactHtmlParser(html) }
            </Frame>
          </Grid>
        </Grid>
      </FormLayoutHorizontal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChiTietKhamBenh));
