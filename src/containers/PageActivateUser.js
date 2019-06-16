import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Logo from '../components/Logo';
import Grid from '@material-ui/core/Grid';
import FormLayoutVertical from '../components/FormLayoutVertical';
import FormFooter from '../components/FormFooter';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
// import { toast } from 'react-toastify';
import * as MSG from '../constants/Messages.js';
import * as RULE from '../constants/Rules.js';
import { connect } from 'react-redux';
import {execActivateUser} from '../actions/services/api-user.js';
import Spinner from '../components/Spinner';
import {GOLDEN_HEALTH_ORANGE} from '../constants/Colors';
import Checkbox from '@material-ui/core/Checkbox';

const mapDispatchToProps = dispatch => ({
  activate: data => dispatch(execActivateUser(data))
});

const mapStateToProps = ({location}) => ({
  activateCode: location.payload.code
})

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  paper: {
    maxHeight: 500,
    overflow: 'auto',
    padding: 10
  }
});

class PageActivateUser extends React.Component {

  state = {
    password: '',
    repeatPassword: '',
    isChecked: false,
    loading: false,
    isRead: false
  };

  handleChange = name => event => {
    let state = {...this.state};
    state[name] = event.target.value
    this.setState(state);
  };

  handleCheck= name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleScroll = (e) => {
    if(this.state.isRead) return;
    const reachedBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if(reachedBottom) this.setState({isRead: true});
  }

  handleSubmit = () => {
    // const _self = this;
    // _self.setState({loading: true});
    // this.props.activate({...this.state.user}).then((done)=>{
    //   console.log('done');
    // }).catch((err)=>{
    //   console.log('err', err);
    //   _self.setState({loading: false});
    // });
  }

  componentDidMount(){
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
          return false;
      }
      return true;
    });
  }

  render() {

    const { classes } = this.props;
    const { loading, password, repeatPassword, isChecked, isRead } = this.state;
    return (
      <FormLayoutVertical>
        <Spinner type="PacmanLoader" size={50} color={GOLDEN_HEALTH_ORANGE} loading={loading}/>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
        >
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Logo size={150}/>
            </Grid>

            <Grid item xs={6}>
              <Typography component="h1" variant="h4" align="center">
                KÍCH HOẠT TÀI KHOẢN
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={24}>

            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Mật khẩu"
                name="password"
                type="password"
                className={classes.textField}
                value={password}
                onChange={this.handleChange('password')}
                margin="normal"
                validators={[RULE.IS_REQUIRED]}
                errorMessages={[MSG.REQUIRED_FIELD]}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Nhập lại mật khẩu"
                name="repeatPassword"
                type="password"
                className={classes.textField}
                value={repeatPassword}
                onChange={this.handleChange('repeatPassword')}
                margin="normal"
                validators={['isPasswordMatch', RULE.IS_REQUIRED]}
                errorMessages={[MSG.PASSWORD_MISMATCH, MSG.REQUIRED_FIELD]}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper className={classes.paper} elevation={5} onScroll={this.handleScroll}>
                <Typography component="h3" variant="h4" align="center">Terms and Conditions</Typography>
                <Typography component="span" align="left">
                PLEASE READ CAREFULLY THE FOLLOWING TERMS AND CONDITIONS RELATING TO YOUR USE OF OUR WEBSITE.
                <br/>
                Date Effective: June, 2018 <br/>

                General<br/>

                This website (the “Site”) is owned and operated by xxx (“COMPANY” “we” or “us”). By using the Site, you agree to be bound by these Terms of Service and to use the Site in accordance with these Terms of Service, our Privacy Policy, our Shipping Policy, our Return Policy and any additional terms and conditions that may apply to specific sections of the Site or to products and services available through the Site or from COMPANY. Accessing the Site, in any manner, whether automated or otherwise, constitutes use of the Site and your agreement to be bound by these Terms of Service.

                We reserve the right to change these Terms of Service or to impose new conditions on use of the Site, from time to time, in which case we will post the revised Terms of Service on this website. By continuing to use the Site after we post any such changes, you accept the Terms of Service, as modified.


                <br/>
                Intellectual Property Rights<br/>

                Our Limited License to You. This Site and all the materials available on the Site are the property of us and/or our affiliates or licensors, and are protected by copyright, trademark, and other intellectual property laws. The Site is provided solely for your personal noncommercial use. You may not use the Site or the materials available on the Site in a manner that constitutes an infringement of our rights or that has not been authorized by us. More specifically, unless explicitly authorized in these Terms of Service or by the owner of the materials, you may not modify, copy, reproduce, republish, upload, post, transmit, translate, sell, create derivative works, exploit, or distribute in any manner or medium (including by email or other electronic means) any material from the Site. You may, however, from time to time, download and/or print one copy of individual pages of the Site for your personal, non-commercial use, provided that you keep intact all copyright and other proprietary notices.

                Your License to Us. By posting or submitting any material (including, without limitation, comments, blog entries, Facebook postings, photos and videos) to us via the Site, internet groups, social media venues, or to any of our staff via email, text or otherwise, you are representing: (i) that you are the owner of the material, or are making your posting or submission with the express consent of the owner of the material; and (ii) that you are thirteen years of age or older. In addition, when you submit, email, text or deliver or post any material, you are granting us, and anyone authorized by us, a royalty-free, perpetual, irrevocable, non-exclusive, unrestricted, worldwide license to use, copy, modify, transmit, sell, exploit, create derivative works from, distribute, and/or publicly perform or display such material, in whole or in part, in any manner or medium, now known or hereafter developed, for any purpose. The foregoing grant shall include the right to exploit any proprietary rights in such posting or submission, including, but not limited to, rights under copyright, trademark, service mark or patent laws under any relevant jurisdiction. Also, in connection with the exercise of such rights, you grant us, and anyone authorized by us, the right to identify you as the author of any of your postings or submissions by name, email address or screen name, as we deem appropriate.

                You acknowledge and agree that any contributions originally created by you for  us shall be deemed a “work made for hire” when the work performed is within the scope of the definition of a work made for hire in Section 101 of the United States Copyright Law, as amended.  As such, the copyrights in those works shall belong to COMPANY from their creation.  Thus, COMPANY shall be deemed the author and exclusive owner thereof and shall have the right to exploit any or all of the results and proceeds in any and all media, now known or hereafter devised, throughout the universe, in perpetuity, in all languages, as COMPANY determines.  In the event that any of the results and proceeds of your submissions hereunder are not deemed a “work made for hire” under Section 101 of the Copyright Act, as amended, you hereby, without additional compensation, irrevocably assign, convey and transfer to COMPANY all proprietary rights, including without limitation, all copyrights and trademarks throughout the universe, in perpetuity in every medium, whether now known or hereafter devised, to such material and any and all right, title and interest in and to all such proprietary rights in every medium, whether now known or hereafter devised, throughout the universe, in perpetuity. Any posted material which are reproductions of prior works by you shall be co-owned by us.

                You acknowledge that COMPANY has the right but not the obligation to use and display any postings or contributions of any kind and that COMPANY may elect to cease the use and display of any such materials (or any portion thereof), at any time for any reason whatsoever.

                Limitations on Linking and Framing. You may establish a hypertext link to the Site so long as the link does not state or imply any sponsorship of your site by us or by the Site. However, you may not, without our prior written permission, frame or inline link any of the content of the Site, or incorporate into another website or other service any of our material, content or intellectual property.


                <br/>
                Disclaimers<br/>

                Throughout the Site, we may provide links and pointers to Internet sites maintained by third parties. Our linking to such third-party sites does not imply an endorsement or sponsorship of such sites, or the information, products or services offered on or through the sites. In addition, neither we nor affiliates operate or control in any respect any information, products or services that third parties may provide on or through the Site or on websites linked to by us on the Site.

                If applicable, any opinions, advice, statements, services, offers, or other information or content expressed or made available by third parties, including information providers, are those of the respective authors or distributors, and not COMPANY. Neither COMPANY nor any third-party provider of information guarantees the accuracy, completeness, or usefulness of any content. Furthermore, COMPANY neither endorses nor is responsible for the accuracy and reliability of any opinion, advice, or statement made on any of the Sites by anyone other than an authorized COMPANY representative while acting in his/her official capacity.

                THE INFORMATION, PRODUCTS AND SERVICES OFFERED ON OR THROUGH THE SITE AND BY COMPANY AND ANY THIRD-PARTY SITES ARE PROVIDED “AS IS” AND WITHOUT WARRANTIES OF ANY KIND EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. WE DO NOT WARRANT THAT THE SITE OR ANY OF ITS FUNCTIONS WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT ANY PART OF THIS SITE, INCLUDING BULLETIN BOARDS, OR THE SERVERS THAT MAKE IT AVAILABLE, ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.

                WE DO NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OR THE RESULTS OF THE USE OF THE SITE OR MATERIALS ON THIS SITE OR ON THIRD-PARTY SITES IN TERMS OF THEIR CORRECTNESS, ACCURACY, TIMELINESS, RELIABILITY OR OTHERWISE.

                You agree at all times to defend, indemnify and hold harmless COMPANY its affiliates, their successors, transferees, assignees and licensees and their respective parent and subsidiary companies, agents, associates, officers, directors, shareholders and employees of each from and against any and all claims, causes of action, damages, liabilities, costs and expenses, including legal fees and expenses, arising out of or related to your breach of any obligation, warranty, representation or covenant  set forth herein.


                <br/>
                Online Commerce<br/>

                Certain sections of the Site may allow you to purchase many different types of products and services online that are provided by third parties. We are not responsible for the quality, accuracy, timeliness, reliability or any other aspect of these products and services. If you make a purchase from a merchant on the Site or on a site linked to by the Site, the information obtained during your visit to that merchant’s online store or site, and the information that you give as part of the transaction, such as your credit card number and contact information, may be collected by both the merchant and us. A merchant may have privacy and data collection practices that are different from ours. We have no responsibility or liability for these independent policies. In addition, when you purchase products or services on or through the Site, you may be subject to additional terms and conditions that specifically apply to your purchase or use of such products or services. For more information regarding a merchant, its online store, its privacy policies, and/or any additional terms and conditions that may apply, visit that merchant’s website and click on its information links or contact the merchant directly. You release us and our affiliates from any damages that you incur, and agree not to assert any claims against us or them, arising from your purchase or use of any products or services made available by third parties through the Site.

                Your participation, correspondence or business dealings with any third party found on or through our Site, regarding payment and delivery of specific goods and services, and any other terms, conditions, representations or warranties associated with such dealings, are solely between you and such third party. You agree that COMPANY shall not be responsible or liable for any loss, damage, or other matters of any sort incurred as the result of such dealings.

                You agree to be financially responsible for all purchases made by you or someone acting on your behalf through the Site. You agree to use the Site and to purchase services or products through the Site for legitimate, non-commercial purposes only. You also agree not to make any purchases for speculative, false or fraudulent purposes or for the purpose of anticipating demand for a particular product or service. You agree to only purchase goods or services for yourself or for another person for whom you are legally permitted to do so. When making a purchase for a third party that requires you to submit the third party’s personal information to us or a merchant, you represent that you have obtained the express consent of such third party to provide such third party’s personal information.


                <br/>
                Interactive Features<br/>

                This Site may include a variety of features, such as bulletin boards, web logs, chat rooms, and email services, which allow feedback to us and real-time interaction between users, and other features which allow users to communicate with others. Responsibility for what is posted on bulletin boards, web logs, chat rooms, and other public posting areas on the Site, or sent via any email services on the Site, lies with each user – you alone are responsible for the material you post or send. We do not control the messages, information or files that you or others may provide through the Site. It is a condition of your use of the Site that you do not:

                Restrict or inhibit any other user from using and enjoying the Site.
                Use the Site to impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.
                Interfere with or disrupt any servers or networks used to provide the Site or its features, or disobey any requirements, procedures, policies or regulations of the networks we use to provide the Site.
                Use the Site to instigate or encourage others to commit illegal activities or cause injury or property damage to any person.
                Gain unauthorized access to the Site, or any account, computer system, or network connected to this Site, by means such as hacking, password mining or other illicit means.
                Obtain or attempt to obtain any materials or information through any means not intentionally made available through this Site.
                Use the Site to post or transmit any unlawful, threatening, abusive, libelous, defamatory, obscene, vulgar, pornographic, profane or indecent information of any kind, including without limitation any transmissions constituting or encouraging conduct that would constitute a criminal offense, give rise to civil liability or otherwise violate any local, state, national or international law.
                Use the Site to post or transmit any information, software or other material that violates or infringes upon the rights of others, including material that is an invasion of privacy or publicity rights or that is protected by copyright, trademark or other proprietary right, or derivative works with respect thereto, without first obtaining permission from the owner or rights holder.
                Use the Site to post or transmit any information, software or other material that contains a virus or other harmful component.
                Use the Site to post, transmit or in any way exploit any information, software or other material for commercial purposes, or that contains advertising.
                Use the Site to advertise or solicit to anyone to buy or sell products or services, or to make donations of any kind, without our express written approval.
                Gather for marketing purposes any email addresses or other personal information that has been posted by other users of the Site.
                COMPANY may host message boards, chats and other private/public forums on its Sites and on other platforms. Any user failing to comply with the terms and conditions of this Agreement may be expelled from and refused continued access to, the message boards, groups, chats or other such forums in the future. COMPANY or its designated agents may remove or alter any user-created content at any time for any reason. Message boards, chats and other public forums are intended to serve as discussion centers for users and subscribers. Information and content posted within these public forums may be provided by COMPANY staff, COMPANY’s outside contributors, or by users not connected with COMPANY, some of whom may employ anonymous user names. COMPANY expressly disclaims all responsibility and endorsement and makes no representation as to the validity of any opinion, advice, information or statement made or displayed in these forums by third parties, nor are we responsible for any errors or omissions in such postings, or for hyperlinks embedded in any messages. Under no circumstances will we, our affiliates, suppliers or agents be liable for any loss or damage caused by your reliance on information obtained through these forums. The opinions expressed in these forums are solely the opinions of the participants, and do not reflect the opinions of COMPANY or any of its subsidiaries or affiliates.

                COMPANY has no obligation whatsoever to monitor any of the content or postings on the message boards, chat rooms or other public forums on the Sites. However, you acknowledge and agree that we have the absolute right to monitor the same at our sole discretion. In addition, we reserve the right to alter, edit, refuse to post or remove any postings or content, in whole or in part, for any reason and to disclose such materials and the circumstances surrounding their transmission to any third party in order to satisfy any applicable law, regulation, legal process or governmental request and to protect ourselves, our clients, sponsors, users and visitors.


                <br/>
                Registration<br/>

                To access certain features of the Site, we may ask you to provide certain demographic information including your gender, year of birth, zip code and country. In addition, if you elect to sign-up for a particular feature of the Site, such as chat rooms, web logs, or bulletin boards, you may also be asked to register with us on the form provided and such registration may require you to provide personally identifiable information such as your name and email address. You agree to provide true, accurate, current and complete information about yourself as prompted by the Site’s registration form. If we have reasonable grounds to suspect that such information is untrue, inaccurate, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof). Our use of any personally identifiable information you provide to us as part of the registration process is governed by the terms of our  Privacy Policy.


                <br/>
                Passwords<br/>

                To use certain features of the Site, you will need a username and password, which you will receive through the Site’s registration process. You are responsible for maintaining the confidentiality of the password and account, and are responsible for all activities (whether by you or by others) that occur under your password or account. You agree to notify us immediately of any unauthorized use of your password or account or any other breach of security, and to ensure that you exit from your account at the end of each session. We cannot and will not be liable for any loss or damage arising from your failure to protect your password or account information.


                <br/>
                Limitation of Liability<br/>

                UNDER NO CIRCUMSTANCES, INCLUDING, BUT NOT LIMITED TO, NEGLIGENCE, SHALL WE, OUR SUBSIDIARY AND PARENT COMPANIES OR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES THAT RESULT FROM THE USE OF, OR THE INABILITY TO USE, THE SITE, INCLUDING OUR MESSAGING, BLOGS, COMMENTS OF OTHERS, BOOKS, EMAILS, PRODUCTS, OR SERVICES, OR THIRD-PARTY MATERIALS, PRODUCTS, OR SERVICES MADE AVAILABLE THROUGH THE SITE OR BY US IN ANY WAY, EVEN IF WE ARE ADVISED BEFOREHAND OF THE POSSIBILITY OF SUCH DAMAGES. (BECAUSE SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN CATEGORIES OF DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IN SUCH STATES, OUR LIABILITY AND THE LIABILITY OF OUR SUBSIDIARY AND PARENT COMPANIES OR AFFILIATES IS LIMITED TO THE FULLEST EXTENT PERMITTED BY SUCH STATE LAW.) YOU SPECIFICALLY ACKNOWLEDGE AND AGREE THAT WE ARE NOT LIABLE FOR ANY DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF ANY USER. IF YOU ARE DISSATISFIED WITH THE SITE, ANY MATERIALS, PRODUCTS, OR SERVICES ON THE SITE, OR WITH ANY OF THE SITE’S TERMS AND CONDITIONS, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE AND THE PRODUCTS, SERVICES AND/OR MATERIALS.
                <br/>
                THIS SITE IS CONTINUALLY UNDER DEVELOPMENT AND COMPANY MAKES NO WARRANTY OF ANY KIND, IMPLIED OR EXPRESS, AS TO ITS ACCURACY, COMPLETENESS OR APPROPRIATENESS FOR ANY PURPOSE.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={!isRead}
                    checked={this.state.isChecked}
                    onChange={this.handleCheck('isChecked')}
                    value="Agree"
                    color="primary"
                  />
                }
                label="Tôi đã đọc và đồng ý với những điều khoản trên"
              />
              <br/>
              <Button disabled={!isChecked} type="submit" variant="contained" color="primary" className={classes.button}>
                Kích hoạt
              </Button>
            </Grid>
            <FormFooter/>
          </Grid>
        </ValidatorForm>

      </FormLayoutVertical>
    );
  }
}

PageActivateUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PageActivateUser));
