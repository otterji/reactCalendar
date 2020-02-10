import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
//style
import styled, { css, } from 'styled-components';
import { Button, } from '@material-ui/core/';

interface State{
  mode:string;

}

class SocialLogin extends Component<any, State> {
  constructor(props:any){
    super(props);
    this.state = {
      mode: ''
    }    
  }
  
  componentDidMount(){
    if(this.props.login){
      this.setState({ mode: '로그인' })
    }
    else if(this.props.signup){
      this.setState({ mode: '회원가입' })
    }
  }

  googleLogin = (res:any) => {
    console.log(res)
  }

  onLoginKakao = (res:any) => {
    console.log(res.data)
  }
  loginFail = (err:any) => {
    console.log(err)
  }

  render(){
    return(
      <>        
        <div>다른 계정으로 {this.state.mode}</div>   
                   
        <a href="http://70.12.246.48:8080/oauth2/authorization/google" style={{textDecoration:"none"}}>
          <SocialBtn provider="google">Google</SocialBtn>
        </a>
        <a href="http://ec2-52-79-117-94.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/naver" style={{textDecoration:"none"}}>
          <SocialBtn provider="naver">Naver</SocialBtn>
        </a>
        <a href="https://kauth.kakao.com/oauth/authorize?client_id=335deeb2f9ffe02f4dd501098e8674e2&redirect_uri=http://70.12.246.61:8080/member/callbackKakao&response_type=code" style={{textDecoration:"none"}}>
          <SocialBtn provider="kakao">Kakao</SocialBtn>
        </a>
        
      </>
    )
  }
}
export default withRouter(SocialLogin);


const SocialBtn = styled(Button)<any>`
  background-color: ${props => (props.disabled ? 'gray' : 'black')};
  color: white;
  width: 100px;
  font-size: 70%;
  margin: 0.5rem;

  ${props => props.provider==="google" && css`
      &:hover{
        background-color: blue;        
        font-weight: 600;
      }
    `
  }
  ${props => props.provider==="naver" && css`
      &:hover{
        background-color: #33cc33;
        font-weight: 600;
      }
    `
  }
  ${props => props.provider==="kakao" && css`
      &:hover{
        color: #4d2600;
        background-color: yellow;
        font-weight: 600;
      }
    `
  }
`