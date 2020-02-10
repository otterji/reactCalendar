import React, { Component } from 'react';
import queryString from 'query-string';
//
import { loginState } from './App';
import Navbar from './components/Navbar/Navbar';
import { Container } from './components/Calendar/Container';
import UserDetail from "./components/UserInfo/UserDetail/UserDetail";
import FeedList from './components/Feed/FeedList';
import Footer from './components/Footer/Footer';
//style
import styled from 'styled-components';
import { Box, Grid, Zoom, Slide } from '@material-ui/core';

interface State {
  isLogin: boolean;
  mode: string;
  winWidth: number;
  winHeight: number;
}

class Main extends Component<any, State> {
  constructor(props:any){
    super(props);
    this.state = {
      isLogin: false,
      mode:'calendar',
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    }
  }

  componentDidMount(){
    window.addEventListener("resize", this.changeSize);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.changeSize);
  }

  changeSize = () => {
    this.setState({winWidth: window.innerWidth});
    this.setState({winHeight: window.innerHeight});
  }

  changeMode = (command:string) => {
    this.setState({ mode:command })
  }

  renderByMode = () => {
    if(this.state.mode === 'init'){
      return (
        <div>init Component</div>
      )
    }
    else if(this.state.mode === 'calendar'){
      return (
        <Container/>
      )
    }
    else if(this.state.mode === 'feed'){
      return (
        <FeedList
        winHeight={this.state.winHeight}
        />
      )
    }
  }

  render(){
    console.log(this.props.match);
    return(
      <StyledMainContainer className="Main" width={this.state.winWidth}>             
          <Grid container spacing={1} direction="column">
            <loginState.Consumer>
              {(store)=>{
                return <Navbar isLogin={store.isLogin} onLogout={store.actions?.onLogout} changeMode={(comm:string)=>{this.changeMode(comm)}}/>
              }}
            </loginState.Consumer>
            <Grid item xs={12} sm={12} lg={12}>
              <Grid container spacing={1}>
                
                {/* user */}
                <Grid item xs={4} sm={4} lg={4}>
                  <Box border={2} borderColor="violet" textAlign="center">
                    <UserDetail/>
                  </Box>
                </Grid>    

                {/* calendar or feed */}
                <Grid item xs={8} sm={8} lg={8}>
                  <StyledModeContainer>
                  {
                    this.renderByMode()
                  }
                  </StyledModeContainer>
                </Grid>
                  
              </Grid>
            </Grid>
  
            {/* footer */}
            {/* <Grid item xs={12} sm={12} lg={12}>
              <Box border={2} borderColor="violet" textAlign="center">
                Footer
              </Box>
            </Grid> */}
            <Footer/>
  
          </Grid>
  
        </StyledMainContainer>
    )
  }
}

export default Main;

const StyledModeContainer = styled.div<any>` 
  position: relative;
`

const StyledMainContainer = styled.div<any>` 
  width: ${props => (props.width < 1180 ?  props.width - 100 : 1080)}px;
`