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
import _ from 'lodash';
//custom import
import FormLayoutVertical from '../../components/FormLayoutVertical';
import FormFooter from '../../components/FormFooter';
import Logo from '../../components/Logo';
import { toast } from 'react-toastify';
import * as MSG from '../../constants/Messages.js';
import * as RULE from '../../constants/Rules.js';
import { execActivateCompany, execGetCompanyList } from '../../actions/services/api-company';
import Spinner from '../../components/Spinner';
import { GOLDEN_HEALTH_ORANGE } from '../../constants/Colors';
import { BOUNCE } from '../../constants/Loaders';
import ActivateCompanyPostModel from '../../models/activateCompanyPostModel';
import Dropdown from '../../components/DropdownList';

const mapDispatchToProps = dispatch => ({
  getCompanies: () => dispatch(execGetCompanyList()),
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 'calc(100% - 10px)'
  },
  group: {
    margin: `${theme.spacing(1)}px 0`,
  },
  customControl: {
    margin: 8
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#2698D6',
    color: '#fff',
  },
});

class DangKyCongTy extends React.Component {

  state = {
    companies: [],
    data: new ActivateCompanyPostModel(),
    loading: false,
    maxDay: new Date()
  };

  componentDidMount() {
    this.props.getCompanies().then(result => {
      if(result.status === 200){
        const options = this.createOptions(result.json);
        this.setState({companies: options});
      }
    }).catch(err => {
      console.log(err);
    });
  }

  createOptions = (companies) => {
    return _.map(companies, (company) => ({
      label: company.tenDonViCongTac,
      value: company.donViCongTacId,
    }));

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

  handleDropdownChange = (value) => {
    console.log(value);
  }

  handleSuccess = (data) => {
    console.log(data);
  }

  handleError = (err) => {
    console.log(err);
  }

  goToDashboard = () => {
    this.props.goToDashboard();
  }

  render() {

    const { classes } = this.props;
    const { loading, data, maxDay, companies } = this.state;

    return (
      <FormLayoutVertical>
        <Spinner type={BOUNCE} size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading} />
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Logo onClick={this.goToDashboard} size={150} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography component="h1" variant="h4" align="center">
                  Đăng ký
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Mã bệnh nhân"
                className={classes.textField}
                value={data.benhNhanId}
                onChange={this.handleChange('benhNhanId')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Mã Y Tế"
                className={classes.textField}
                value={data.maYte}
                onChange={this.handleChange('maYte')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Số điện thoại"
                className={classes.textField}
                value={data.phone}
                onChange={this.handleChange('phone')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Email"
                className={classes.textField}
                value={data.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />
            </Grid>



            <Grid item xs={12} sm={6}>
                <Dropdown options={companies} label='Công ty' placeholder='Đơn vị công tác' onChange={this.handleDropdownChange}/>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className={classes.customControl}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel>Ngày sinh</FormLabel>
                  <DatePicker
                    name="datepicker"
                    locale="vi"
                    disabled={false}
                    value={data.ngaySinh}
                    maxDate={maxDay}
                    onChange={this.handleChangeDate}
                  />
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
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
