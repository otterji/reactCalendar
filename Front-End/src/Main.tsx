import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Container } from './components/Calendar/Container';
import Navbar from './components/Navbar/Navbar';
import UserDetail from './components/UserInfo/UserDetail/UserDetail';
import Footer from './components/Footer/Footer';

interface State {
  brand: {
    name: string;
    to: string;
  };
  isLogin: boolean;
}

class MainLayout extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      brand: {
        name: 'Shalendar',
        to: '/'
      },
      isLogin: false
    };
  }

  componentDidMount() {
    if (window.sessionStorage.getItem('id')) {
      this.setState({ isLogin: true });
    } else {
      this.setState({ isLogin: false });
    }
  }

  render() {
    return (
      <div className="App">
        {/* Navbar */}
        <Navbar isLogin={this.state.isLogin} />
        <Grid container spacing={1}>
          <Grid item container xs={4} sm={3} md={3} lg={3} justify="center">
            <UserDetail isLogin={this.state.isLogin} />
          </Grid>
          <Grid
            item
            xs={8}
            sm={9}
            md={9}
            lg={9}
            spacing={1}
            justify="center"
            style={{ backgroundColor: '#e0f2f1' }}
          >
            <Container />
          </Grid>
        </Grid>
        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default MainLayout;
