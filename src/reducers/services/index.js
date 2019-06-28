import {combineReducers} from 'redux';
import auth from './auth';
import user from './user';
import report from './report';
import company from './company';

export default combineReducers({ auth, user, report, company })
