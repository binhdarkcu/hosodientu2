import React from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormLayoutHorizontal from '../../components/FormLayoutHorizontal';
import Spinner from '../../components/Spinner';
import { debounce } from 'lodash'

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Frame from 'react-frame-component';
import { SPINNER_LIGHT_GREEN } from '../../constants/Colors';
import { PULSE } from '../../constants/Loaders';
import ReactHtmlParser from 'react-html-parser';

import { execGetReportDetails } from '../../actions/services/api-report';

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
    height: '100%'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center'
  }
});

class ChiTietKhamBenh extends React.Component {

  state = {
    html: null,
    loading: true
  }

  resizeIframe =  debounce(
    () => {
      if(this.iframe) {
        let obj = this.iframe.node;
        obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
        obj.contentWindow.document.body.style.display = 'flex';
        obj.contentWindow.document.body.style.flexDirection = 'column';
        obj.contentWindow.document.body.style.alignItems = 'center';
        obj.contentWindow.document.body.style.justifyContent = 'center';
      }
    },
    2000);


  componentDidMount(){
    const { paramStr } = this.props.location.payload;
    this.props.getReportDetails({paramStr: decodeURIComponent(paramStr)}).then(rs => this.setState({html: rs})).catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { html, loading } = this.state;
    return (
      <FormLayoutHorizontal>
        <Grid container spacing={24}>
          <Grid item xs={12} className={classes.row + ' hasLoader'}>
            <Frame ref={(ref) => {this.iframe = ref}} className={classes.iframe} frameBorder="0" scrolling="no" onLoad={this.resizeIframe}>
              {ReactHtmlParser(html)}
            </Frame>
          </Grid>
        </Grid>
      </FormLayoutHorizontal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChiTietKhamBenh));
