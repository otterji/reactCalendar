import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Button, } from '@material-ui/core/';
import styled, { css, } from 'styled-components';

class SocialLogin extends Component {
  render(){
    return(
      <>
        <div>다른 계정으로 가입</div>              
        {/* <Link to="http://70.12.246.48:8080/oauth2/authorization/google" style={{textDecoration:"none"}}>
          <SocialBtn mode="google">Google</SocialBtn>
        </Link> */}
        <a href="http://70.12.246.48:8080/oauth2/authorization/google" style={{textDecoration:"none"}}>
          <SocialBtn mode="google">Google</SocialBtn>
        </a>
        <a href="http://ec2-52-79-117-94.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/naver" style={{textDecoration:"none"}}>
          <SocialBtn mode="naver">Naver</SocialBtn>
        </a>
        <a href="http://ec2-52-79-117-94.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao" style={{textDecoration:"none"}}>
          <SocialBtn mode="kakao">Kakao</SocialBtn>
        </a>
      </>
    )
  }
}
export default SocialLogin;


interface btnProps {
  mode: string,
}
const SocialBtn = styled(Button)<btnProps>`
  background-color: ${props => (props.disabled ? 'gray' : 'black')};
  color: white;
  width: 100px;
  font-size: 70%;
  margin: 0.5rem;

  ${props => props.mode==="google" && css`
      &:hover{
        background-color: blue;        
        font-weight: 600;
      }
    `
  }
  ${props => props.mode==="naver" && css`
      &:hover{
        background-color: #33cc33;
        font-weight: 600;
      }
    `
  }
  ${props => props.mode==="kakao" && css`
      &:hover{
        color: #4d2600;
        background-color: yellow;
        font-weight: 600;
      }
    `
  }
`