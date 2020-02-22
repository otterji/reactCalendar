import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { url } from '../../url'
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

class GgLogin extends Component<any> {
  responseGoogle = async (res: any) => {
    // console.log(res);
    // sessionStorage.setItem('jwt', res.accessToken);
    try {
      const _id = res.profileObj.email;
      sessionStorage.setItem('id', _id);
      // sessionStorage.setItem('pw', '2222');
      await axios({
        method: 'get',
        url: `${url}/member/isExist/${_id}`
      }).then(async (res) => {
        const resData = res.data
        if (resData.state === 'FAIL') {
          this.props.onLogin();
          this.props.history.push('/mainPage');
        }
        else {
          try {
            await axios({
              method: 'get',
              url: `${url}/channel/isExist/${_id}`
            }).then((res) => {
              const resData = res.data
              if (resData.state === 'FAIL') {
                this.props.onLogin();
                this.props.history.push('/mainPage');
              }
              else{
                alert("계정이 존재하지 않습니다.")
                sessionStorage.clear();
                this.props.history.push('/SignupPage')
              }
            })
          }
          catch (err) {console.log(err)}
        }
      })
    }
    catch (err) {console.log(err)}
  }

  responseFail = (err: any) => {
    console.error(err);
  }

  render() {
    return (
      <StGgLogin>
        <GoogleLogin
          clientId="44884700400-kd6hmt2cbq7a2kg4274lpqfa375ms3e0.apps.googleusercontent.com"
          buttonText="Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseFail}
        />
      </StGgLogin>
    )
  }
}
const StGgLogin = styled.div`
    display: flex;
    flex-flow: column wrap;
    &:hover{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
`;
export default withRouter(GgLogin);