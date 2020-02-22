import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { url as _url } from "../../url";
import axios from "axios";

class GgSignUp extends Component<any> {
  responseGoogle = async (res: any) => {
    const _id = res.profileObj.email;
    const _pw = '2222';
    try {
      const ress = await axios({
        method: "get",
        url: `${_url}/member/isExist/${_id}`,
        responseType: "json"
      });
      // alert(JSON.stringify(res.data, null, 2));
      if (ress.data.state === "SUCCESS") {
        sessionStorage.setItem("id", _id);
        sessionStorage.setItem("pw", _pw);
        // sessionStorage.setItem('socialToken', res.accessToken);
        this.props.history.push("/moreInfoPage");
      } else if (ress.data.state === "FAIL") {
        sessionStorage.clear();
        alert("이미 존재하는 계정 입니다");
      }
    } catch (err) {
      sessionStorage.clear()
      alert(err);
    }
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
export default withRouter(GgSignUp);