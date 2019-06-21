import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import _ from 'lodash';
import uuidv1 from 'uuid/v1';
//custom import
import FormLayoutVertical from '../../components/FormLayoutVertical';
import FormFooter from '../../components/FormFooter';
import Logo from '../../components/Logo';
import { toast } from 'react-toastify';
import * as MSG from '../../constants/Messages.js';
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


const  initialState = () => ({
  companies: [],
  data: new ActivateCompanyPostModel(),
  loading: false,
  dropdownKey: uuidv1()
});

class DangKyCongTy extends React.Component {

  state = initialState();

  componentDidMount() {
    this.props.getCompanies().then(result => {
      if(result.status === 200){
        const options = this.createOptions(result.json);
        this.setState({companies: options});
      }
    }).catch(err => {
      console.error(err);
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

  handleSubmit = async () => {
    try{
      const { data } = this.state;
      this.setState({loading: true});
      let result = await this.props.register(data);
      if(result.status === 200 || result.status === 201)
        return result.json.isSuccess ? this.handleSuccess() : this.handleError({detail: result, message: result.json.errorMessage});
      throw(result);
    }catch(err){
      this.handleError({detail: err, message: MSG.ACTIVATE_COMPANY_FAILED})
    }
  }

  handleDropdownChange = (company) => {
    const { data } = this.state;
    const donViCongTacId = company.value
    this.setState({data: {...data, donViCongTacId}});
  }

  handleSuccess = () => {
    toast.success(MSG.ACTIVATE_COMPANY_SUCCESS);
    const { state } = this;
    const newState = initialState();
    newState.companies = [...state.companies];
    newState.dropdownKey = uuidv1();
    this.setState({...newState});
  }

  handleError = (err) => {
    toast.error(err.message);
    this.setState({loading: false});
    console.error(err.detail);
  }

  render() {

    const { classes, goToDashboard } = this.props;
    const { loading, data, companies, dropdownKey } = this.state;

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
              <Logo onClick={goToDashboard} size={150} />
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
                label="Tên công ty"
                className={classes.textField}
                value={data.ten}
                onChange={this.handleChange('ten')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Mã công ty"
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
              <TextValidator
                label="Địa chỉ"
                className={classes.textField}
                value={data.diaChi}
                onChange={this.handleChange('diaChi')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Dropdown key={dropdownKey} options={companies} label='Công ty' placeholder='Đơn vị công tác' onChange={this.handleDropdownChange}/>
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
