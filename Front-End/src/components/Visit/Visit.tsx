import React, { Component } from 'react'
//
import { contextStorage } from '../../App';
import Navbar from '../Navbar/Navbar';
// import UserDetail from '../UserInfo/UserDetail/UserDetail';
import VisitCh from './VisitCh'
// import { Container } from '../Calendar/Container';
// import FeedList from '../Feed/FeedList';
import Footer from '../Footer/Footer';
//style
import styled from 'styled-components';
import { Grid, } from '@material-ui/core';

interface State{
  mode: string;
  winWidth: number;
  winHeight: number;
  _yymm: string;
  subscribeChannelSch: Array<Array<Object>>;
}

class Visit extends Component<any, State> {
  constructor(props:any){
    super(props)
    this.state = {
      mode: 'calendar',
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
      _yymm: `${new Date().getFullYear()}-0${new Date().getMonth() + 1}`,
      subscribeChannelSch: [[{}]]
    }
  }
  componentDidMount(){
    window.addEventListener('resize', this.changeSize);
  } 
  componentWillUnmount(){
    window.removeEventListener('resize', this.changeSize);
  }
  changeSize = () => {
    this.setState({ winWidth: window.innerWidth });
    this.setState({ winHeight: window.innerHeight });
  };

  changeMode = (_mode: string) => {
    sessionStorage.setItem('mode', _mode);
    this.props.history.push('/mainPage');
  };
  changeSubscribeChannelSch = (list: Array<Array<Object>>) => {
    this.setState({
      subscribeChannelSch: list
    });
  };


  render(){
    return (<>
        <contextStorage.Consumer>
          {store => {
            return (<>
                {/* 네이게이션바 */}
                <Navbar                    
                  isLogin={store.isLogin}
                  changeMode={(comm: string) => {
                    this.changeMode(comm);
                  }}
                  // currentMode={this.state.mode}
                />

                <StyledMainContainer
                  className="Visit"
                  // mode={this.state.mode}
                  width={this.state.winWidth}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={2} sm={2} lg={2}>
                      {
                        store.isLogin ? 
                        <div>로그인 되어있음</div>
                        :
                        <div>로그인 안되어있음</div>
                      }
                    </Grid>
                    <Grid item xs={10} sm={10} lg={10}>
                      <VisitCh 
                        chName={this.props.match.params.chName}
                        isLogin={store.isLogin}
                        isChannel={store.isChannel}
                      />
                    </Grid>
                  </Grid>

                </StyledMainContainer>
            </>)
          }}
        </contextStorage.Consumer>
        
        {/* footer */}
        <Footer />
     
    </>)
  }
}

export default Visit;

const StyledMainContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  /* margin-top: ${props => (props.mode === 'home' ? 20 : props.navHeight)}px; */
  margin-top: 59px;
  width: ${props => (props.width < 1380 ? props.width - 100 : 1380)}px;
`;

const StyledModeContainer = styled.div<any>`
  position: relative;
  margin-top: 20px;
`;
