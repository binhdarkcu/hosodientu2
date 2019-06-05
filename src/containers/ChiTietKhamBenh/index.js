import React from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

// import { debounce } from 'lodash'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Frame from 'react-frame-component';
import ReactHtmlParser from 'react-html-parser';

import { execGetReportDetails } from '../../actions/services/api-report';
import FormLayoutHorizontal from '../../components/FormLayoutHorizontal';
import * as MSG from '../../constants/Messages';

const mapDispatchToProps = dispatch => ({
  getReportDetails: (paramStr) => dispatch(execGetReportDetails(paramStr)),
});

const mapStateToProps = ({services, location }) => ({
  location: location,
});

const styles = theme => ({
  paper: {
    margin: 'auto',
    maxWidth: 500,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
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
    loaded: false
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
  // resizeIframe =  debounce(
  //   () => {
  //     if(this.iframe) {
  //       let obj = this.iframe.node;
  //       obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  //       obj.contentWindow.document.body.style.visibility = 'visible';
  //       console.log(obj.contentWindow);
  //     }
  //   },
  //   2000);

  componentDidMount(){
    const { paramStr } = this.props.location.payload;
    this.props.getReportDetails({paramStr: decodeURIComponent(paramStr)})
    .then(rs => this.setState({html: rs, loaded: true}))
    .catch(err => {
      this.setState({html: MSG.SERVER_ERROR, loaded: true});
      console.error(err);
    });
  }

  render() {
    const { classes } = this.props;
    const { html } = this.state;
    return (
      <FormLayoutHorizontal>
        <Grid container spacing={24}>
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
                  {ReactHtmlParser(html)}
            </Frame>
          </Grid>
        </Grid>
      </FormLayoutHorizontal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChiTietKhamBenh));
