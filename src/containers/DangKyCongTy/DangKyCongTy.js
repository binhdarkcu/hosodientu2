import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DatePicker from 'react-date-picker';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

//custom import
import FormLayoutVertical from '../../components/FormLayoutVertical';
import FormFooter from '../../components/FormFooter';
import Logo from '../../components/Logo';
import { toast } from 'react-toastify';
import * as MSG from '../../constants/Messages.js';
import * as RULE from '../../constants/Rules.js';
import { execActivateCompany } from '../../actions/services/api-company';
import Spinner from '../../components/Spinner';
import { GOLDEN_HEALTH_ORANGE } from '../../constants/Colors';
import { BOUNCE } from '../../constants/Loaders';
import ActivateCompanyPostModel from '../../models/activateCompanyPostModel';

const mapDispatchToProps = dispatch => ({
  register: (data) => dispatch(execActivateCompany(data)),
  goToDashboard: () => dispatch({ type: 'RTE_DASHBOARD' }),
});

const mapStateToProps = ({ location }) => ({
  location: location,
});

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  customControl: {
    margin: 8
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: '#2698D6',
    color: '#fff',
  },
});

class DangKyCongTy extends React.Component {

  state = {
    data: new ActivateCompanyPostModel(),
    loading: false,
  };

  componentDidMount() {

  }


  handleChange = name => event => {
    let data = { ...this.state.data };
    data[name] = event.target.value;
    this.setState({ data: data });

  };

  handleChangeDate = ngaySinh => {
    let data = { ...this.state.data };
    data['ngaySinh'] = ngaySinh;
    this.setState({ data: data });
  }

  handleSubmit = () => {
    const { data } = this.state;
    this.props.register(data).then(rs => {
      if(rs.status === 200){
        rs.json.isSuccess ? toast.success(MSG.ACTIVATE_COMPANY_SUCCESS) : toast.error(rs.json.errorMessage);
      }else{
        toast.error(MSG.ACTIVATE_COMPANY_FAILED);
      }
    }).catch(err => {
      toast.error(MSG.ACTIVATE_COMPANY_FAILED);
    });
  }

  goToDashboard = () => {
    this.props.goToDashboard();
  }

  render() {

    const { classes } = this.props;
    const { loading, data } = this.state;

    return (
      <FormLayoutVertical>
        <Spinner type={BOUNCE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading} />
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Logo onClick={this.goToDashboard} size={150} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography component="h1" variant="h4" align="center">
                  Đăng ký
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={24}>

            <Grid item xs={12} sm={3}>
              <TextValidator
                label="Bệnh nhân ID"
                className={classes.textField}
                value={data.benhNhanId}
                onChange={this.handleChange('benhNhanId')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextValidator
                label="Mã Y Tế"
                className={classes.textField}
                value={data.maYte}
                onChange={this.handleChange('maYte')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextValidator
                label="ID đơn vị cộng tác"
                className={classes.textField}
                value={data.donViCongTacId}
                onChange={this.handleChange('donViCongTacId')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextValidator
                label="Phone"
                className={classes.textField}
                value={data.phone}
                onChange={this.handleChange('phone')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextValidator
                label="Email"
                className={classes.textField}
                value={data.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextValidator
                label="Họ"
                className={classes.textField}
                value={data.ho}
                onChange={this.handleChange('ho')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Tên"
                className={classes.textField}
                value={data.ten}
                onChange={this.handleChange('ten')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <div className={classes.customControl}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel>Giới tính</FormLabel>
                  <RadioGroup
                    row
                    aria-label="Giới tính"
                    name="gender1"
                    className={classes.group}
                    onChange={this.handleChange('gioiTinh')}
                    value={data.gioiTinh}
                  >
                    <FormControlLabel value="T" control={<Radio />} label="Nam" />
                    <FormControlLabel value="G" control={<Radio />} label="Nữ" />
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} sm={3}>
              <div className={classes.customControl}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel>Ngày sinh</FormLabel>
                  <DatePicker
                    name="datepicker"
                    locale="vi"
                    disabled={false}
                    value={data.ngaySinh}
                    onChange={this.handleChangeDate}
                  />
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" className={classes.button}>
                  Đăng ký
              </Button>
            </Grid>
            <FormFooter />
          </Grid>
        </ValidatorForm>

      </FormLayoutVertical>
    );
  }
}

DangKyCongTy.propTypes = {
  classes: PropTypes.object.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DangKyCongTy));
