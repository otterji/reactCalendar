import React, { Component } from 'react';
//
import { contextStorage } from './App';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Home/Banner'
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
  Slide,
  Fade,
} from '@material-ui/core';


interface State {
  isLogin: boolean;
  mode: string;
  winWidth: number;
  winHeight: number;
  navHeight: number;
  _yymm: string;
  subscribeChannelSch: Array<Array<Object>>;
  toggle: boolean;
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
      subscribeChannelSch: [[{}]],
      toggle: false
    };
  }
  componentDidMount() {
    // console.log('did mount MAIN', this.props.match.params.nickname)

    window.addEventListener('resize', this.changeSize);
    this.setState({ navHeight: 59 });

    const _mode = sessionStorage.getItem('mode');
    if (_mode) {
      this.setState({ mode: _mode });
    }
  }
  componentDidUpdate() {
    // console.log('did update MAIN', this.props.match.params.nickname)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.changeSize);
  }
  
  changeSize = () => {
    this.setState({ winWidth: window.innerWidth });
    this.setState({ winHeight: window.innerHeight });
  };

  changeMode = (_mode: string) => {
    sessionStorage.setItem('mode', _mode);
    this.setState({ mode: _mode });
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
    // console.log(this.state._yymm)
    if (this.state.mode === 'calendar') {
      // console.log('YYMM', this.state._yymm)
      return <Container
        changeYYMM = {this.changeYYMM}
        subscribeSch = {this.state.subscribeChannelSch}
      />;
    } else if (this.state.mode === 'feed') {
      return <FeedList winHeight={this.state.winHeight} toggleRender={this.toggleRender}/>;
    }
  };

  toggleRender = () => {
    console.log('toggle setState 됨')
    this.setState({toggle: !this.state.toggle})
  }

  render() {
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
                  this.state.mode === 'home' ? 
                  <Banner navHeight={this.state.navHeight}/>
                  :
                  null
                }
                
                <StyledMainContainer
                  className="Main"
                  mode={this.state.mode}
                  width={this.state.winWidth}
                  navHeight={this.state.navHeight}
                >
                  {/* <Grid item xs={12} sm={12} lg={12}> */}
                  {store.isLogin ? (
                    <>
                      {this.state.mode === 'home' ? (
                        //로그인 된 상태의 홈
                        <Home isLogin={store.isLogin} isChannel={store.isChannel} />
                      ) : (
                        //로그인 된 상태일 때 유저정보
                          <Grid container spacing={1}>
                            {/* user */}
                            <Grid item xs={2} sm={2} lg={2}>
                              <Box
                                border={2}
                                borderColor="white"
                                textAlign="center"
                              >
                                <Slide in={true} direction="right" timeout={1000}>
                                <UserDetail
                                  yymm={this.state._yymm}
                                  changeSubscribeChannelSch={
                                    this.changeSubscribeChannelSch
                                  }
                                  />
                                </Slide>
                              </Box>
                            </Grid>

                            {/* 달력과 피드 */}
                            {/* calendar or feed */}
                            {this.state.mode === 'calendar' ? (
                              //달력
                              <Grid item xs={10} sm={10} lg={10}>
                                <StyledModeContainer>
                                  {this.renderByMode()}
                                </StyledModeContainer>
                              </Grid>
                            ) : (
                              //피드
                                <>
                                  <Grid item xs={8} sm={8} lg={8}>
                                    <StyledModeContainer className="feedClass">
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
                    //로그인 안된 상태의 홈
                    <Home isLogin={store.isLogin} isChannel={store.isChannel} />
                  }

                  {/* </Grid> */}
                </StyledMainContainer>
              


            </>)
          }}

        </contextStorage.Consumer>
        
        {/* footer */}
        <Footer />
      </>
    );
  }
}
export default Main;


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

const StyledModeContainer = styled.div<any>`
  position: relative;
  margin-top: 20px;
`;

const StChannelListCont = styled.div<any>`
  position: relative;
  margin-top: 20px;
`;