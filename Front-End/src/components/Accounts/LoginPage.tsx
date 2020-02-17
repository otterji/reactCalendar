import React, { Component, } from "react";
import { Link, } from 'react-router-dom';
//mycomp
import { contextStorage } from "../../App"
import AccountsForm from "./AccountsForm"
import SocialLogin from "./SocialLogin";
//styles
import * as Styled from "./StyledAccounts";
import { Grid, Slide } from "@material-ui/core";
import KakaoLogin from "./KakaoLogin";
import GgLogin from "./GgLogin";
interface State {
  mode: string,
  // browserWidth: number,
  // browserHeight: number,
}

class LoginPage extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: 'login',
    }
  }

  render() {
    return (
        <>
          <Slide direction="left" in={true}>
            <Styled.div>
              <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12}>
                  <Link to="/mainPage"><Styled.logo src={"images/logo_full.png"} /></Link>
                </Grid>

                <Grid item xs={12}>
                  <div style={{ fontSize: "30px" }}>로그인</div>
                  <contextStorage.Consumer>
                    {
                      (store) => {
                        return (
                            <AccountsForm login mode={this.state.mode} onLogin={store.actions?.onLogin} />
                        )
                      }
                    }
                  </contextStorage.Consumer>
                </Grid>

                <Grid container spacing={2} justify="center" alignItems="center">
                  <Grid item xs={5}>
                    {/*<SocialLogin login/>*/}
                    <contextStorage.Consumer>
                      {
                        (store) => {
                          return (
                              <KakaoLogin login mode={this.state.mode} onLogin={store.actions?.onLogin} />
                          )
                        }
                      }
                    </contextStorage.Consumer>
                  </Grid>
                  <Grid item xs={5}>
                    {/*<SocialLogin login/>*/}
                    <contextStorage.Consumer>
                      {
                        (store) => {
                          return (
                              <GgLogin login mode={this.state.mode} onLogin={store.actions?.onLogin}  />
                          )
                        }
                      }
                    </contextStorage.Consumer>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <a href="/">아이디</a>
                  <span> / </span>
                  <a href="/">비밀번호</a>
                  <span> 찾기</span>
                </Grid>

                <Grid item xs={12}>
                  <Link to="/signupPage">회원 가입</Link>
                </Grid>

              </Grid>

            </Styled.div>
          </Slide>
        </>
    );
  }
}

export default LoginPage;