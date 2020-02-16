import React, { Component } from 'react';
//
import { loginState } from './App';
import Navbar from './components/Navbar/Navbar';
import UserDetail from './components/UserInfo/UserDetail/UserDetail';
import { Container } from './components/Calendar/Container';
import FeedList from './components/Feed/FeedList';

import RecomList from './components/Feed/RecomList';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
//style
import styled from 'styled-components';
import {
  Box,
  Grid,
  // Zoom,
  Slide
} from '@material-ui/core';

interface State {
  isLogin: boolean;
  mode: string;
  winWidth: number;
  winHeight: number;
  navHeight: number;
  _yymm: string;
  subscribeChannelSch: Array<Array<Object>>;
}

class Main extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: false,
      mode: 'home',
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
      navHeight: 0,
      _yymm: `${new Date().getFullYear()}-0${new Date().getMonth() + 1}`,
      subscribeChannelSch: [[{}]]
    };
  }
  componentDidMount() {
    // console.log('main did mount')
    window.addEventListener('resize', this.changeSize);
    const _height = document.getElementsByTagName('nav')[0].offsetHeight;
    this.setState({ navHeight: _height });
    const _mode = sessionStorage.getItem('mainMode');
    if (_mode) {
      this.setState({ mode: _mode });
    }
    else {
      this.setState({ mode: 'home' })
    }
  }
  componentDidUpdate() {
    // console.log('main did update')
    sessionStorage.setItem('mainMode', this.state.mode);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.changeSize);
  }

  changeSize = () => {
    this.setState({ winWidth: window.innerWidth });
    this.setState({ winHeight: window.innerHeight });
  };

  changeMode = (command: string) => {
    this.setState({ mode: command });
  };

  changeSubscribeChannelSch = (list: Array<Array<Object>>) => {
    this.setState({
      subscribeChannelSch: list
    });
  };

  changeYYMM = (yymm: string) => {
    const addZero = (n: string) => {
      return n.length === 6 ? n[0] + n[1] + n[2] + n[3] + n[4] + '0' + n[5] : n;
    };
    const mm = addZero(`${yymm}`);
    this.setState({ _yymm: mm })
  };


  renderByMode = () => {
    if (this.state.mode === 'calendar') {
      return <Container
        changeYYMM={this.changeYYMM}
        subscribeSch={this.state.subscribeChannelSch}
      />;
    } else if (this.state.mode === 'feed') {
      return <FeedList winHeight={this.state.winHeight} />;
    }
  };

  render() {
    return (
      <>
        <loginState.Consumer>
          {store => {
            return (
              <>
                <Slide in={true} direction="down">
                  <Navbar
                    isLogin={store.isLogin}
                    onLogout={store.actions?.onLogout}
                    changeMode={(comm: string) => {
                      this.changeMode(comm);
                    }}
                    currentMode={this.state.mode}
                  />
                </Slide>

                <StyledMainContainer
                  className="Main"
                  width={this.state.winWidth}
                  navHeight={this.state.navHeight}
                >
                  {/* <Grid item xs={12} sm={12} lg={12}> */}
                  {store.isLogin ? (
                    <>
                      {this.state.mode === 'home' ? (
                        <Home isLogin={store.isLogin} isChannel={store.isChannel} />
                      ) : (
                          <Grid container spacing={1}>
                            {/* user */}
                            <Grid item xs={3} sm={3} lg={3}>
                              <Box
                                border={2}
                                borderColor="white"
                                textAlign="center"
                              >
                                <UserDetail
                                  yymm={this.state._yymm}
                                  changeSubscribeChannelSch={
                                    this.changeSubscribeChannelSch
                                  }
                                />
                              </Box>
                            </Grid>

                            {/* calendar or feed */}
                            {this.state.mode === 'calendar' ? (
                              <Grid item xs={9} sm={9} lg={9}>
                                <StyledModeContainer>
                                  {this.renderByMode()}
                                </StyledModeContainer>
                              </Grid>
                            ) : (
                                <>
                                  <Grid item xs={7} sm={7} lg={7}>
                                    <StyledModeContainer>
                                      {this.renderByMode()}
                                    </StyledModeContainer>
                                  </Grid>
                                  <Grid item xs={2} sm={2} lg={2}>
                                    <StChannelListCont>
                                      <RecomList height={this.state.winHeight}
                                        isLogin={store.isLogin}
                                        isChannel={store.isChannel}
                                      />
                                    </StChannelListCont>
                                  </Grid>


                                </>
                              )}
                          </Grid>
                        )}
                    </>)
                    :
                    <Home isLogin={store.isLogin} isChannel={store.isChannel} />
                  }

                  {/* </Grid> */}
                </StyledMainContainer>
              </>
            )
          }}

        </loginState.Consumer>

        <Footer />
      </>
    );
  }
}
export default Main;


const StyledMainContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.navHeight * 1.5}px;
  width: ${props => (props.width < 1380 ? props.width - 100 : 1380)}px;
`;

const StyledModeContainer = styled.div<any>`
  position: relative;
  margin-top: 20px;
`;

const StChannelListCont = styled.div<any>`
  position: relative;
  margin-top: 20px;

  /* border-radius: 10px; */
  /* background-color: #ccffcc; */
`;
