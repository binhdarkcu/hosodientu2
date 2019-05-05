import React, {Component} from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {connect} from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Logo from '../../components/Logo';
import Grid from '@material-ui/core/Grid';
import MaYTe from '../../components/MaYTe';
import FormFooter from '../../components/FormFooter';
import FormLayoutHorizontal from '../../components/FormLayoutHorizontal';
import Divider from '@material-ui/core/Divider';


class FormKetQuaECG extends Component {

  render() {

    return (
      <FormLayoutHorizontal>

        <Grid container spacing={24}>

          <Grid item xs={3}>
            <Logo size={150}/>
          </Grid>

          <Grid item xs={3}>
            <Typography component="h1" variant="h4" align="center" color="error">
              ĐIỆN TIM
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <MaYTe soPhieu="18.205.000001" sTT="" maYTe="20000002" barCode=""/>
          </Grid>

        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Divider/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>ID No. (Fullname): </div>
            <div>Brith Date (Age): </div>
            <div>Sex:</div>
            <div>Height:</div>
            <div>Comments:</div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Name:</div>
            <div>Age:</div>
            <div>Height:</div>
            <div>Weight:</div>
          </Grid>

          <Grid item xs={12}>
            <Divider/>
          </Grid>

          <Grid item xs={12}>
            <div>
                main content
            </div>
          </Grid>

          <Grid item xs={8}>
            <div>
              <strong>Kết luận (Conclusion): </strong>
            </div>
            <div>
              <strong>Đề nghị (Recommendation): </strong>
            </div>
          </Grid>

          <Grid item xs={4}>
            <div>
              Ngày 15 tháng 3 năm 2019
            </div>
            <div>
              Bs
            </div>
          </Grid>
        </Grid>
        <FormFooter/>
      </FormLayoutHorizontal>
    );
  }
}


const mapStateToProps = state => {
    return {
        //numberRow: jobState.setRowSelected.numberRow
    }
};

const mapDispatchToProps = dispatch => ({
    goTo: (type, payload) => dispatch({type: type, payload: {payload}}),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormKetQuaECG);
