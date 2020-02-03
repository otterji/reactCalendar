import React, { Component, ChangeEvent } from "react";
import { Link } from 'react-router-dom';
import * as Styled from "../Styled";
import { Grid, InputAdornment } from "@material-ui/core";
import { Email, Lock, CheckCircle, EnhancedEncryption } from '@material-ui/icons';
import Logo from "../../common/logo_full.png";
import axios from "axios";

const regExp = {
  email: /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  pw: /^[A-Za-z0-9]{6,15}$/,
}

interface State{
  email: string,
  pw: string,
  pwCheck: string,
  validEmail: string,
  labelEmail: string,
  validPw: string,
  labelPw: string,
  validPwCheck: string,
  labelPwCheck: string,
  browserWidth: number,
  browserHeight: number,
}

class SignupPage extends Component<any, State> {
  constructor(props:any){
    super(props);    
    this.state = {
      email: '',
      pw: '',
      pwCheck: '',
      validEmail: 'init',
      labelEmail: '이메일',
      validPw: 'init',
      labelPw: '비밀번호',
      validPwCheck: 'init',
      labelPwCheck: '비밀번호 확인',
      browserWidth: window.innerWidth,
      browserHeight: window.innerHeight,
    }
  }

  setStateAsync(state:object) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
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

  checkValid = async (e: ChangeEvent<HTMLInputElement>) => {
    const _mode = e.target.name;
    if(_mode === 'email'){
      await this.setStateAsync({email: e.target.value});
      if(this.state.email === ''){
        this.setState({validEmail: 'init', labelEmail: '이메일'});
      }
      else{
        if(regExp.email.test(this.state.email)){
          this.setState({validEmail: 'valid', labelEmail: '이메일'});
        }
        else{          
          this.setState({validEmail: 'invalid', labelEmail: '이메일 양식을 맞춰 주세요'});
        }
      }
    }
    else if(_mode === 'pw'){
      await this.setStateAsync({pw: e.target.value});
      if(this.state.pw === ''){
        this.setState({validPw: 'init', labelPw: '비밀번호'});
      }
      else{
        if(regExp.pw.test(this.state.pw)){
          this.setState({validPw: 'valid', labelPw: '비밀번호'});
        }
        else{
          this.setState({validPw: 'invalid', labelPw: '영문, 숫자 조합 6~15자',});
        }
      }
    }
    else if(_mode === 'pwCheck'){
      await this.setStateAsync({pwCheck: e.target.value});
      if(this.state.pwCheck === ''){
        this.setState({validPwCheck: 'init', labelPwCheck: '비밀번호 확인'});
      }
      else{
        if(this.state.pw === this.state.pwCheck){
          this.setState({validPwCheck: 'valid', labelPwCheck: '비밀번호 확인'});
        }
        else{
          this.setState({validPwCheck: 'invalid', labelPwCheck: '비밀번호가 일치하지 않습니다',});
        }
      }
    }
  }

  login = () => {
    const {email, pw} = this.state;
    window.sessionStorage.setItem('id', email);
    window.sessionStorage.setItem('pw', pw);
    this.props.history.push('/')
  }

  isValid = ():boolean => {
    return (this.state.validEmail === 'valid' && this.state.validPw === 'valid') ? false : true;
  }

  submit = async () => {
    const _id = this.state.email;
    const _pw = this.state.pw;
    try{
      const res = await axios({
        method:'post',
        // url: 'http://ec2-52-79-117-94.ap-northeast-2.compute.amazonaws.com:8080/member/signup',
        url: 'http://52.79.117.94:8080/member/login',
        data:{
          id: _id,
          pw: _pw,
        },
      });
      alert(JSON.stringify(res.data, null, 2));
      if(res.data.state === 'SUCCESS') {
        window.sessionStorage.setItem('id', _id);
        window.sessionStorage.setItem('pw', _pw);
        this.props.history.push('/');
      }
    }
    catch(err){
      alert(err);
    }
  };

  render() {
    return (
      <>
        <Styled.div browserWidth={this.state.browserWidth} browserHeight={this.state.browserHeight}>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={12}>
              <Link to="/"><Styled.logo src={Logo}/></Link>
            </Grid>

            <Grid item xs={12}>
              <div style={{fontSize:"30px"}}>회원가입 페이지 입니당</div>
              <Styled.form autoComplete="on">
                <Styled.textfield
                  name="email"
                  validate={this.state.validEmail}
                  label={this.state.labelEmail}
                  onChange={this.checkValid}
                  // onChange={(e:ChangeEvent<HTMLInputElement>) => {this.setState({email: e.target.value})}}
                  // onBlur={() => {this.checkValid('email')}}
                  variant="outlined"
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {
                          this.state.validEmail==='valid' ? <CheckCircle/> : <Email/> 
                        }
                      </InputAdornment>
                    ),
                  }}/>
                <Styled.textfield
                  name="pw"
                  type="password"
                  validate={this.state.validPw}   
                  label={this.state.labelPw}
                  onChange = {this.checkValid}
                  variant="outlined"
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {
                          this.state.validPw==='valid' ? <CheckCircle/> : <Lock/> 
                        }
                      </InputAdornment>
                    ),
                  }}/>
                <Styled.textfield
                  name="pwCheck"
                  type="password"
                  validate={this.state.validPwCheck}   
                  label={this.state.labelPwCheck}
                  onChange = {this.checkValid}
                  variant="outlined"
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {
                          this.state.validPwCheck==='valid' ? <CheckCircle/> : <EnhancedEncryption/> 
                        }
                      </InputAdornment>
                    ),
                  }}/>

                <Styled.btn 
                  mode="login"
                  disabled={this.isValid()}
                  onClick={this.submit}
                  onKeyPress={this.submit}
                  >
                  회원가입
                </Styled.btn>

              </Styled.form>
            </Grid>

            <Grid item xs={12}>
              <div>다른 계정으로 가입</div>              
              <a href="http://ec2-52-79-117-94.ap-northeast-2.compute.amazonaws.com:8080/login/oauth2/code/google" style={{textDecoration:"none"}}>
              {/* <a href="http://52.79.117.94:8080/oauth2/authorization/google" style={{textDecoration:"none"}}> */}
                <Styled.btn mode="google">Google</Styled.btn>
              </a>
              <a href="http://ec2-52-79-117-94.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/naver" style={{textDecoration:"none"}}>
                <Styled.btn mode="naver">Naver</Styled.btn>
              </a>
              <a href="http://ec2-52-79-117-94.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao" style={{textDecoration:"none"}}>
                <Styled.btn mode="kakao">Kakao</Styled.btn>
              </a>
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