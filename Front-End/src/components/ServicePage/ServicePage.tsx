import React, { Component } from 'react';
import { contextStorage } from '../../App';
import Navbar from '../../components/Navbar/Navbar';
import './NameCard.scss'
import Footer from '../../components/Footer/Footer';
import styled from 'styled-components';
import { NameCard } from './NameCard';
import {
  Box,
  Grid,
  Slide,
  Fade,
  Grow,
  Avatar
} from '@material-ui/core';


interface State {
  isLogin: boolean;
  mode: string;
  winWidth: number;
  winHeight: number;
  navHeight: number;
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
    };
  }

  changeMode = (_mode: string) => {
    sessionStorage.setItem('mode', _mode);
    this.setState({ mode: _mode });
  };

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
                  currentMode={this.state.mode}
                />
              </Slide>
              {
                <>
                  <StBannerCont>
                    <Grow in={true}>
                      <h1 style={{ color: "white" }}>Shalendar 서비스 안내</h1>
                    </Grow>
                    <Grow
                      in={true}
                      style={{ transformOrigin: '0 0 0' }}
                      {...(true ? { timeout: 1800 } : {})}
                    ><p style={{ color: "darkgrey" }}>Shalendar의 다양하고 차별화된 기능과 편리한 관리시스템을 소개합니다.</p>
                    </Grow>
                  </StBannerCont>

                  <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(true ? { timeout: 2800 } : {})}
                  >
                    <Discription>
                      <p style={{ color: "darkgrey" }}>STEP 1</p>
                    </Discription>
                  </Grow>

                  <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(true ? { timeout: 3800 } : {})}
                  >
                    <Discription>
                      <p style={{ color: "darkgrey" }}>STEP 2</p>
                    </Discription>
                  </Grow>

                  <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(true ? { timeout: 4800 } : {})}
                  >
                    <Discription>
                      <p style={{ color: "darkgrey" }}>STEP 3</p>
                    </Discription>
                  </Grow>

                  <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(true ? { timeout: 5800 } : {})}
                  >
                    <Discription>
                      <p style={{ color: "darkgrey" }}>STEP 4</p>
                    </Discription>
                  </Grow>

                  <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(true ? { timeout: 6800 } : {})}
                  >
                    <Discription>
                      <p style={{ color: "darkgrey" }}>STEP 5</p>
                    </Discription>
                  </Grow>


                </>
              }
              <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 7500 } : {})}
              >
                <p style={{ color: "darkgrey" }}>개발자 소개</p>
              </Grow>
              <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 7500 } : {})}
              >
              <NameCard></NameCard>
              </Grow>
              <StyledMainContainer
                className="Main"
                mode={this.state.mode}
                width={this.state.winWidth}
                navHeight={this.state.navHeight}
              >
              </StyledMainContainer>

            </>)
          }}
        </contextStorage.Consumer>

        <Footer />
      </>
    );
  }
}
export default ServicePage;


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


const StBannerCont = styled.div<any>`
  /* position: relative; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 200px;
  background-color: black;
  margin-top: 59px;
  overflow: hidden;
`;

const Discription = styled.div<any>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 200px;
  background-color: black;
  margin-top: 59px;
  overflow: hidden;
`

const StIntroMemberCont = styled.div`
  margin-left: 50px;
  margin-right: 50px;
`