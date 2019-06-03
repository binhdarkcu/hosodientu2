import React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Logo from '../../components/Logo';
import Grid from '@material-ui/core/Grid';
import MaYTe from '../../components/MaYTe';
import FormLayoutVertical from '../../components/FormLayoutVertical';
import FormFooter from '../../components/FormFooter';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Frame from 'react-frame-component';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

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
  }
});

class ChiTietKhamBenh extends React.Component {

  state = {
    html: null
  }

  resizeIframe = () => {
    let obj = this.iframe.node;
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  }

  componentDidMount(){
    const { paramStr } = this.props.location.payload;
    this.props.getReportDetails({paramStr: decodeURIComponent(paramStr)}).then(rs => this.setState({html: rs})).catch(err => console.log(err));
  }
  render() {
    const { classes } = this.props;
    const { html } = this.state;
    console.log('html: ', html)
    return (
      <FormLayoutVertical>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Frame ref={(ref) => {this.iframe = ref}} className={classes.iframe} frameborder="0" scrolling="no" onLoad={this.resizeIframe}>
              {ReactHtmlParser(html)}
            </Frame>
          </Grid>
        </Grid>
      </FormLayoutVertical>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChiTietKhamBenh));
