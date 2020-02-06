import React, { Component, } from "react";
import { Link } from 'react-router-dom';
//mycomp
// import { loginState } from "../../../App"
import AccountsForm from "../AccountsForm"
import SocialLogin from "../SocialLogin/SocialLogin";
//styles
import * as Styled from "../AccountsStyled";
import { Grid } from "@material-ui/core";

interface State{
  mode:string,
  browserWidth: number,
  browserHeight: number,
}

class SignupPage extends Component<any, State> {
  constructor(props:any){
    super(props);    
    this.state = {
      mode:'signup',
      browserWidth: window.innerWidth,
      browserHeight: window.innerHeight,
    }
  }

  currentSize = () => {
    this.setState({browserWidth: window.innerWidth});
    this.setState({browserHeight: window.innerHeight});
  }
  componentDidMount(){
    window.addEventListener("resize", this.currentSize);
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.currentSize)
  }

  render() {
    return (
      <>
        <Styled.div 
          browserWidth={this.state.browserWidth} 
          browserHeight={this.state.browserHeight}
        >
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={12}>
              <Link to="/"><Styled.logo src={"images/logo_full.png"}/></Link>
            </Grid>

            <Grid item xs={12}>
              <div style={{fontSize:"30px"}}>회원 가입</div>
              <AccountsForm signup mode={this.state.mode}/>
            </Grid>

            <Grid item xs={12}>
              <SocialLogin/>
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
      </>
    );
  }
}

export default SignupPage;