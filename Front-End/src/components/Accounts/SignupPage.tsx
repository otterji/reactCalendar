import React, { Component, } from "react";
import { Link } from 'react-router-dom';
//mycomp
// import { loginState } from "../../../App"
import AccountsForm from "./AccountsForm"
import SocialLogin from "./SocialLogin";
//styles
import * as Styled from "./StyledAccounts";
import { Grid, Slide } from "@material-ui/core";

interface State{
  mode:string,
}

class SignupPage extends Component<any, State> {
  constructor(props:any){
    super(props);    
    this.state = {
      mode:'signup',
    }
  }

  render() {
    return (
      <>
      <Slide direction="left" in={true}>
        <Styled.div>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={12}>
              <Link to="/mainPage"><Styled.logo src={"images/logo_full.png"}/></Link>
            </Grid>

            <Grid item xs={12}>
              <div style={{fontSize:"30px"}}>회원가입</div>
              <AccountsForm signup mode={this.state.mode}/>
            </Grid>

            <Grid item xs={12}>
              <SocialLogin signup/>
            </Grid>
            
            <Grid item xs={12}>
              <a href="/">아이디</a>
              <span> / </span>
              <a href="/">비밀번호</a>
              <span> 찾기</span>
            </Grid>
            
            <Grid item xs={12}>
              <Link to="/loginPage">로그인</Link>
            </Grid>
            
          </Grid>

        </Styled.div>
        </Slide>
      </>
    );
  }
}

export default SignupPage;