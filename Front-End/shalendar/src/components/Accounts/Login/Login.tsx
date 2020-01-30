import React, { Component } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { AccountCircle, Lock } from '@material-ui/icons';
// import { Alert, AlertTitle } from '@material-ui/lab';
import "./Login.scss";

interface Props{

}

interface State{
  iconColor: string[];
}


class Login extends Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      iconColor: ['black', 'black'],
    }
  }
  
  handleChangeIconColor = (command:string) => {
    if(command === "onId"){
      this.setState({
        iconColor: ['#8cebd1', 'black'],
      })  
    }
    else if(command === "leaveId"){}
    this.setState({
      iconColor: ['black', 'black'],
    })  
  }

  handleSubmit = () => {
    // this.setState({
    //   alertMode: 'success',
    // })
    alert("Welcome !!!");
  };

  render() {
    return (
      <React.Fragment>
        <div className="LoginPage">
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={12}>
              <h1 className="title">Shalendar</h1>
              <p className="subtitle">Share Your Calendar</p>
            </Grid>

            <Grid item xs={12}>
              <form className="form" onSubmit={this.handleSubmit} autoComplete="off">
                <div className="input">                    
                  <div className="email">
                    <AccountCircle style={{color:this.state.iconColor[0]}} fontSize="large"/>
                    <TextField id="input-with-icon-grid" label="E-mail" 
                    onFocus={() => this.handleChangeIconColor("onId")}
                    // onBlur={this.handleChangeIconColor("leaveId")}
                    />
                  </div>
                  <div className="password">
                    <Lock fontSize="large"/>
                    <TextField id="input-with-icon-grid" label="Password" />
                  </div>
                </div>

                <Button className="btn" type="submit" 
                size="small" variant="contained" >
                  Log In
                </Button>
              </form>
            </Grid>

            <Grid item xs={12}>
              <div>다른 계정으로 로그인</div>
              <div className="login-g">
                <Button className="btn">구글</Button>
              </div>
              <div className="login-n">
                <Button className="btn">네이버</Button>
              </div>
            </Grid>
            
            <Grid item xs={12}>
              <a href="">아이디</a>
              <span>/</span>
              <a href="">비밀번호</a>
              <span> 찾기</span>
            </Grid>
            
            <Grid item xs={12}>
              <div><a href="">회원 가입</a></div>
            </Grid>
            
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
