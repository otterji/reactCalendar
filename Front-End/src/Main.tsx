import React, { Component } from "react";
import queryString from "query-string";
//
import { loginState } from "./App";
import Navbar from "./components/Navbar/Navbar";
import { Container } from "./components/Calendar/Container";
import UserDetail from "./components/UserInfo/UserDetail/UserDetail";
import FeedList from "./components/Feed/FeedList";
import Footer from "./components/Footer/Footer";
//style
import styled from "styled-components";
import { Box, Grid, Zoom, Slide } from "@material-ui/core";

interface State {
  isLogin: boolean;
  mode: string;
  winWidth: number;
  winHeight: number;
}

class Main extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: false,
      mode: "feed",
      winWidth: window.innerWidth,
      winHeight: window.innerHeight
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.changeSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeSize);
  }

  changeSize = () => {
    this.setState({ winWidth: window.innerWidth });
    this.setState({ winHeight: window.innerHeight });
  };

  changeMode = (command: string) => {
    this.setState({ mode: command });
  };

  renderByMode = () => {
    if (this.state.mode === "init") {
      return <div>init Component</div>;
    } else if (this.state.mode === "calendar") {
      return <Container />;
    } else if (this.state.mode === "feed") {
      return <FeedList winHeight={this.state.winHeight} />;
    }
  };

  render() {
    console.log(this.props.match);
    return (
      <StyledMainContainer className="Main" width={this.state.winWidth}>
        <Grid container spacing={1} direction="column">
          <loginState.Consumer>
            {store => {
              return (
                <Navbar
                  isLogin={store.isLogin}
                  onLogout={store.actions?.onLogout}
                  changeMode={(comm: string) => {
                    this.changeMode(comm);
                  }}
                />
              );
            }}
          </loginState.Consumer>
          <Grid item xs={12} sm={12} lg={12}>
            <Grid container spacing={1}>
              {/* user */}
              <Grid item xs={3} sm={3} lg={3}>
                <Box border={2} borderColor="white" textAlign="center">
                  <UserDetail />
                </Box>
              </Grid>

              {/* calendar or feed */}
              <Grid item xs={9} sm={9} lg={9}>
                <StyledModeContainer>{this.renderByMode()}</StyledModeContainer>
              </Grid>
            </Grid>
          </Grid>

          <Footer />
        </Grid>
      </StyledMainContainer>
    );
  }
}

export default Main;

const StyledModeContainer = styled.div<any>`
  position: relative;
`;

const StyledMainContainer = styled.div<any>`
  width: ${props => (props.width < 1380 ? props.width - 100 : 1380)}px;
`;
