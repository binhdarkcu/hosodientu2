import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { BOUNCE } from '../../constants/Loaders';
import Spinner from '../../components/Spinner';
import { GOLDEN_HEALTH_ORANGE } from '../../constants/Colors';
//custom import

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  header: {
    fontSize: 16,
  },
  buttonActive: {
    backgroundColor: '#2698D6',
    color: '#fff',
  }
});

class TuVan extends React.Component {

  state = {
    loading: true,
  };


  handleLoadDone = () => {
    this.setState({loading: false});
  };
  render() {

    const { classes } = this.props;
    const { loading } = this.state;

    return (
      <Paper className={classes.root}>
        <Spinner type={BOUNCE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading} />
        <iframe title="Tư vấn" style={{width: '100%', height: '100vh'}} src={"https://phongkhamdakhoasaigon.com/"} frameBorder="0" onLoad={this.handleLoadDone}/>
      </Paper>
    );
  }
}

TuVan.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(TuVan));
