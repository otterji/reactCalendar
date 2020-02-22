import React, { Component } from 'react';
import { contextStorage } from '../../App';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styled, { css } from 'styled-components';
import { NameCard } from './NameCard';
import {
  Box,
  Grid,
  Slide,
  Fade,
  Grow,
  Avatar
} from '@material-ui/core';

import channel1 from '../common/images/1.jpg'
import channel2 from '../common/images/2.jpg'
import channel3 from '../common/images/3.jpg'
import channel4 from '../common/images/4.jpg'
import pers1 from '../common/images/11.jpg'
import pers2 from '../common/images/22.jpg'
import pers3 from '../common/images/33.jpg'
import pers4 from '../common/images/44.jpg'

interface State {
  isLogin: boolean;
  mode: string;
  winWidth: number;
  winHeight: number;
  navHeight: number;
  isCh: boolean;
  isDev: boolean;
}

class ServicePage extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: false,
      mode: 'home',
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
      navHeight: 0,
      isCh: true,
      isDev: false,
    };
  }

  // changeMode = (_mode: string) => {
  //   sessionStorage.setItem('mode', _mode);
  //   this.setState({ mode: _mode });
  // };
  changeMode = (_mode: string) => {
    sessionStorage.setItem('mode', _mode);
    this.props.history.push('/mainPage');
  };

  isChannel = (rec: boolean) => {
    this.setState({ isCh: rec })
    if (this.state.isDev) {
      this.setState({ isDev: false })
    }
  }

  isDeveloper = (tog: boolean) => {
    this.setState({ isDev: tog })
  }

  render() {
    window.scrollTo(0, 0)
    return (
      <>
        <contextStorage.Consumer>
          {store => {
            return (<>
              {/* 네이게이션바 */}
              <Slide in={true} direction="down">
                <Navbar
                  isLogin={store.isLogin}
                  changeMode={(comm: string) => {
                    this.changeMode(comm);
                  }}
                // currentMode={this.state.mode}
                />
              </Slide>
              
              <StCont>
              {
                this.state.isDev
                  ? <>
                    <p style={{ color: "darkgrey" }}>Shalendar의 다양하고 차별화된 기능과 편리한 관리시스템을 소개합니다.</p>
                    {/* </StBannerCont> */}
                    <StMiniNav>
                      <StyledSpan onClick={() => this.isChannel(true)} >채널 사용자</StyledSpan>
                      <StyledSpan onClick={() => this.isChannel(false)} >개인 사용자</StyledSpan>
                      <StyledSpan onClick={() => this.isDeveloper(true)}>개발자 소개</StyledSpan>
                    </StMiniNav>
                    <NameCard></NameCard>
                    {/* // 상엽오빠꺼 여기 컴포넌트 들어가면 됨 */}
                  </>
                  :
                  <>


                    {this.state.isCh ?
                      <>
                        <p style={{ color: "darkgrey" }}>Shalendar의 다양하고 차별화된 기능과 편리한 관리시스템을 소개합니다.</p>
                        <StMiniNav>
                          <StyledSpan onClick={() => this.isChannel(true)} >채널 사용자</StyledSpan>
                          <StyledSpan onClick={() => this.isChannel(false)} >개인 사용자</StyledSpan>
                          <StyledSpan onClick={() => this.isDeveloper(true)}>개발자 소개</StyledSpan>
                        </StMiniNav>
                        <Grow
                          in={true}
                          style={{ transformOrigin: '0 0 0' }}
                          {...(true ? { timeout: 2800 } : {})}
                        >
                          <img
                            src={channel1}
                            alt="images/channel1.jpg"
                            width="80%"
                          />
                        </Grow>

                        <Grow
                          in={true}
                          style={{ transformOrigin: '0 0 0' }}
                          {...(true ? { timeout: 3800 } : {})}
                        >
                          <img
                            src={channel2}
                            alt="images/channel2.jpg"
                            width="80%"
                          />
                        </Grow>

                        <Grow
                          in={true}
                          style={{ transformOrigin: '0 0 0' }}
                          {...(true ? { timeout: 4800 } : {})}
                        >
                          <img
                            src={channel3}
                            alt="images/channel3.jpg"
                            width="80%"
                          />
                        </Grow>

                        <Grow
                          in={true}
                          style={{ transformOrigin: '0 0 0' }}
                          {...(true ? { timeout: 5800 } : {})}
                        >
                          <img
                            src={channel4}
                            alt="images/channel4.jpg"
                            width="80%"
                          />
                        </Grow>

                      </>
                      :

                      <>
                        <p style={{ color: "darkgrey" }}>Shalendar의 다양하고 차별화된 기능과 편리한 관리시스템을 소개합니다.</p>
                        <StMiniNav>
                          <StyledSpan onClick={() => this.isChannel(true)} >채널 사용자</StyledSpan>
                          <StyledSpan onClick={() => this.isChannel(false)} >개인 사용자</StyledSpan>
                          <StyledSpan onClick={() => this.isDeveloper(true)}>개발자 소개</StyledSpan>
                        </StMiniNav>
                        <Grow
                          in={true}
                          style={{ transformOrigin: '0 0 0' }}
                          {...(true ? { timeout: 2800 } : {})}
                        >
                          <img
                            src={pers1}
                            alt="images/pers1.jpg"
                            width="80%"
                          />
                        </Grow>

                        <Grow
                          in={true}
                          style={{ transformOrigin: '0 0 0' }}
                          {...(true ? { timeout: 3800 } : {})}
                        >
                          <img
                            src={pers2}
                            alt="images/pers2.jpg"
                            width="80%"
                          />
                        </Grow>

                        <Grow
                          in={true}
                          style={{ transformOrigin: '0 0 0' }}
                          {...(true ? { timeout: 4800 } : {})}
                        >
                          <img
                            src={pers3}
                            alt="images/pers3.jpg"
                            width="80%"
                          />
                        </Grow>

                        <Grow
                          in={true}
                          style={{ transformOrigin: '0 0 0' }}
                          {...(true ? { timeout: 5800 } : {})}
                        >
                          <img
                            src={pers4}
                            alt="images/pers4.jpg"
                            width="80%"
                          />
                        </Grow>

                      </>
                    }

                  </>
              }
              <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 7500 } : {})}
              >
                <br></br>
              </Grow>
              <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 7500 } : {})}
              >
                <br></br>
              </Grow>
              <StyledMainContainer
                className="Main"
                mode={this.state.mode}
                width={this.state.winWidth}
                navHeight={this.state.navHeight}
              >
              </StyledMainContainer>
            </StCont>
            </>)
          }}
        </contextStorage.Consumer>

        <Footer />
      </>
    );
  }
}
export default ServicePage;


const StCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
`

const StyledMainContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  margin-top: ${props => (props.mode === 'home' ? 20 : props.navHeight)}px;
  width: ${props => (props.width < 1380 ? props.width - 100 : 1380)}px;
  .feedClass{
    margin-right: 20px;
    margin-left: 20px;
  }
`;

const StyledSpan = styled.span`
  width: 40%;
  margin: 20px;
  text-align: center;
  cursor: pointer;
`

const StMiniNav = styled.span`
  display: flex;
`