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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import * as MSG from '../../constants/Messages.js';
import * as RULE from '../../constants/Rules.js';
import { connect } from 'react-redux';
import { execRegister } from '../../actions/services/api-user.js';
import Spinner from '../../components/Spinner';
import { SPINNER_LIGHT_GREEN } from '../../constants/Colors';

const mapDispatchToProps = dispatch => ({
  register: (data, type) => dispatch(execRegister(data, type)),
  goToDashboard: () => dispatch({ type: 'RTE_DASHBOARD' })
});

const mapStateToProps = ({ id }) => ({
  id: id
})

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

class FormRegister extends React.Component {

  state = {
    user: {
      Ho: '',
      Ten: '',
      // BenhNhanId: '',
      Phone: '',
      Email: '',
      MaYTe: '',
      NgaySinh: null,
      GioiTinh: 'M',
    },
    loading: false
  };

  handleChange = name => event => {
    let user = { ...this.state.user };
    user[name] = event.target.value
    this.setState({ user: user });

    const {type} = this.props;
    console.log(type);
    if('admin' === type){
      console.log('call API');
    }

  };

  handleChangeDate = NgaySinh => {
    let user = { ...this.state.user };
    user['NgaySinh'] = NgaySinh;
    this.setState({ user: user });
  }

  handleSubmit = () => {
    const _self = this;
    _self.setState({ loading: true });
    let user = { ...this.state.user };
    user.NgaySinh = `${user.NgaySinh.getFullYear()}-${user.NgaySinh.getMonth() + 1}-${user.NgaySinh.getDate()}`;
    this.props.register(user, this.props.type).then((done) => {
      console.log('done');
      toast.success(MSG.USER_CREATED);
      _self.setState({ loading: false });
    }).catch((err) => {
      console.log('err', err);
      toast.error(MSG.ERROR_OCCURED);
      _self.setState({ loading: false });
    });
  }

  goToDashboard = () => {
    this.props.goToDashboard();
  }

  render() {
    const { classes, type } = this.props;
    const { loading, user } = this.state;
    return (
      <FormLayoutVertical>
        <Spinner type="PacmanLoader" size={50} color={SPINNER_LIGHT_GREEN} loading={loading} />
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <Logo onClick={this.goToDashboard} size={150} />
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
                id="ar-mayte"
                label="Mã Y Tế"
                className={classes.textField}
                value={user.MaYTe}
                onChange={this.handleChange('MaYTe')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-phone"
                label="Phone"
                disabled={type !== 'user'}
                className={classes.textField}
                value={user.Phone}
                onChange={this.handleChange('Phone')}
                margin="normal"
                validators={[RULE.IS_REQUIRED, RULE.IS_PHONE_NUMBER]}
                errorMessages={[MSG.REQUIRED_FIELD, MSG.INVALID_PHONE_NUMBER]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>

            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                id="ar-email"
                label="Email"
                disabled={type !== 'user'}
                className={classes.textField}
                value={user.Email}
                onChange={this.handleChange('Email')}
                validators={[RULE.IS_REQUIRED, RULE.IS_EMAIL]}
                errorMessages={[MSG.REQUIRED_FIELD, MSG.INVALID_EMAIL]}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Họ"
                className={classes.textField}
                value={user.Ho}
                disabled={type !== 'user'}
                onChange={this.handleChange('Ho')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                label="Tên"
                className={classes.textField}
                value={user.Ten}
                disabled={type !== 'user'}
                onChange={this.handleChange('Ten')}
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
                    value={user.GioiTinh}
                    onChange={this.handleChange('GioiTinh')}>
                    <FormControlLabel value="M" control={<Radio disabled={type !== 'user'}/>} label="Nam" />
                    <FormControlLabel value="F" control={<Radio disabled={type !== 'user'}/>} label="Nữ" />
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
                    disabled={type !== 'user'}
                    onChange={this.handleChangeDate}
                    value={user.NgaySinh}
                    required
                  />
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={!user.MaYTe}>
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

FormRegister.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['admin', 'user'])
};

FormRegister.defaultProps = {type: 'admin'}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormRegister));
