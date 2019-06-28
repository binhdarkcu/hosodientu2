import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import moment from 'moment';

import FormLayoutHorizontal from '../../components/FormLayoutHorizontal';
import { sendHttpRequest } from "../../actions/services/http-handler";
import baseUrl from '../../actions/services/base-url';


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#2698D6",
    color: "#fff",
  },
});

class TestPage extends React.Component{

  state = {
    method: 'POST',
    body: '',
    url: '',
    contentType: 'application/x-www-form-urlencoded',
    loading: false
  };

  componentDidMount(){
    console.clear();  
  }

  handleChange = name => event => {
    let request = {...this.state};
    request[name] = _.trim(event.target.value);
    this.setState(request);
  };

  sendRequest = async () => {
    const x = new moment();
    try{
      this.setState({loading: true});
      const { state } = this;
      console.log('Đang gửi yêu cầu...', state);
      let parameters;
      if(state.method === 'GET'){
         parameters = {
          method: state.method,
          headers: { 'Content-Type': state.contentType }
        };
      }else{
        parameters = {
          method: state.method,
          body: state.body,
          headers: { 'Content-Type': state.contentType }
        };
      }
      const result = await sendHttpRequest(state.url, parameters);
      console.log('Dữ liệu trả về ==>', result);
    }catch (e) {
      console.error('Đã xảy ra lỗi ==>', e);
    }
    const y = new moment();
    const duration = moment.duration(y.diff(x));
    console.log(`Thời gian phản hồi: ${duration.as('seconds')} giây`);
    console.log('<--------------------------------------------------------------------->');
    this.setState({loading: false});
  };

  render() {

    const { classes } = this.props;
    const { method, contentType, loading } = this.state;

    return(
      <FormLayoutHorizontal>
        <Typography component="h1" variant="h4" align="center">TEST API</Typography>
        <Typography component="h1" variant="body1" align="right">{baseUrl}/api</Typography>
        <TextField className={classes.textField} type="text" label="API URL" onChange={this.handleChange('url')} />
        <br/>
        <br/>
        <TextField className={classes.textField} label="JSON data" multiline={true} rows={5} rowsMax={20} onChange={this.handleChange('body')}/>
        <br/>
        <br/>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel>METHOD</FormLabel>
          <RadioGroup
            row
            aria-label="METHOD"
            className={classes.group}
            onChange={this.handleChange('method')}
            value={method}
          >
            <FormControlLabel value="POST" control={<Radio />} label="POST" />
            <FormControlLabel value="GET" control={<Radio />} label="GET" />
            <FormControlLabel value="PUT" control={<Radio />} label="PUT" />
            <FormControlLabel value="DELETE" control={<Radio />} label="DELETE" />
          </RadioGroup>
        </FormControl>
        <br/>
        <br/>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel>CONTENT TYPE</FormLabel>
          <RadioGroup
            row
            aria-label="CONTENT TYPE"
            className={classes.group}
            onChange={this.handleChange('contentType')}
            value={contentType}
          >
            <FormControlLabel value="application/x-www-form-urlencoded" control={<Radio />} label="application/x-www-form-urlencoded" />
            <FormControlLabel value="application/json" control={<Radio />} label="application/json" />
          </RadioGroup>
        </FormControl>
        <br/>
        <br/>
        <Button type="button" variant="contained" className={classes.button} onClick={this.sendRequest}>
          SEND
        </Button>
        <br/>
        <br/>
        <Typography component="h1" variant="h4" align="center" color="error">
          {loading ? 'Đang chờ phản hồi từ server...' : 'Ready!'}
        </Typography>
      </FormLayoutHorizontal>
    )
  }
};

export default withStyles(styles)(TestPage);
