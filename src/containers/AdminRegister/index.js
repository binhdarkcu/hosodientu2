import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Logo from '../../components/Logo';
import Grid from '@material-ui/core/Grid';
import FormLayoutVertical from '../../components/FormLayoutVertical';
import FormFooter from '../../components/FormFooter';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DatePicker from 'react-date-picker';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import * as MSG from '../../constants/Messages.js';
import * as RULE from '../../constants/Rules.js';
import { connect } from 'react-redux';
import {execAdminRegister} from '../../actions/services/api-auth.js';

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(execAdminRegister(data))
});

const mapStateToProps = ({}) => ({})

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
  },
});

class FormAdminRegister extends React.Component {

  state = {
    ho: '',
    ten: '',
    benhNhanId: '',
    phone: '',
    email: '',
    maYTe: '',
    ngaySinh: null,
    gioiTinh: 'M'
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeDate = ngaySinh => this.setState({ ngaySinh }, ()=>{
    console.log(this.state);
  })

  handleSubmit = () => this.props.register(this.state)

  render() {
    const { classes } = this.props;
    return (
      <FormLayoutVertical>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
        >
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <Logo size={150}/>
            </Grid>

            <Grid item xs={4}>
              <Typography component="h1" variant="h4" align="center">
                Đăng ký
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-benhnhanid"
                label="Bệnh nhân Id"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
                className={classes.textField}
                value={this.state.benhNhanId}
                onChange={this.handleChange('benhNhanId')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-mayte"
                label="Mã Y Tế"
                className={classes.textField}
                value={this.state.maYTe}
                onChange={this.handleChange('maYTe')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-phone"
                label="Phone"
                className={classes.textField}
                value={this.state.phone}
                onChange={this.handleChange('phone')}
                margin="normal"
                validators={[RULE.IS_REQUIRED, RULE.IS_PHONE_NUMBER]}
                errorMessages={[MSG.REQUIRED_FIELD, MSG.INVALID_PHONE_NUMBER]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange('email')}
                validators={[RULE.IS_REQUIRED, RULE.IS_EMAIL]}
                errorMessages={[MSG.REQUIRED_FIELD, MSG.INVALID_EMAIL]}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Họ"
                className={classes.textField}
                value={this.state.ho}
                onChange={this.handleChange('ho')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Tên"
                className={classes.textField}
                value={this.state.ten}
                onChange={this.handleChange('ten')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={classes.customControl}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel>Giới tính</FormLabel>
                  <RadioGroup
                    row
                    aria-label="Giới tính"
                    name="gender1"
                    className={classes.group}
                    value={this.state.gioiTinh}
                    onChange={this.handleChange('gioiTinh')}>
                    <FormControlLabel value="M" control={<Radio />} label="Nam" />
                    <FormControlLabel value="F" control={<Radio />} label="Nữ" />
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={classes.customControl}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel>Ngày sinh</FormLabel>
                  <DatePicker
                    name="datepicker"
                    locale="vi"
                    onChange={this.handleChangeDate}
                    value={this.state.ngaySinh}
                    required
                  />
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Đăng ký
              </Button>
            </Grid>
            <FormFooter/>
          </Grid>
        </ValidatorForm>

      </FormLayoutVertical>
    );
  }
}

FormAdminRegister.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormAdminRegister));
