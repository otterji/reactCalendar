import React, { Component } from 'react';
import './App.css';
import {Box, Grid, } from '@material-ui/core';
import Calendar from './components/Calendar/CalendarDetail/Calendar';
import Navigation from './components/Navigator/Navigation';
import Login from './components/Accounts/Login/Login';

interface Props{
  
}

interface State{
  mode: string;
}

class App extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
      mode:'loginPage',
    }
  }

  render(){
    if(this.state.mode === 'mainPage'){
      return (
        <div className="App">             
          <Grid container spacing={1} direction="column">
  
            <Grid item xs={12} sm={12} lg={12}>
              <Grid container spacing={1}>
                <Navigation/>
              </Grid>      
            </Grid>
  
            <Grid item xs={12} sm={12} lg={12}>
              <Grid container spacing={1}>
  
                <Grid item xs={9} sm={9} lg={9}>
                  <Grid container spacing={0} direction="column">
                    <Box border={2} borderColor="violet" textAlign="center">
                      User Info
                    </Box>
                    <Box border={2} borderColor="violet" textAlign="center">
                      Calender          
                      <Calendar/>
                    </Box>
                  </Grid>  
                </Grid>
                  
                <Grid item xs={3} sm={3} lg={3}>
                    <Box border={2} borderColor="violet" textAlign="center"
                      height="100%">
                      Feed
                    </Box>
                </Grid>    
  
              </Grid>
            </Grid>
  
  
            {/* footer */}
            <Grid item xs={12} sm={12} lg={12}>
              <Box border={2} borderColor="violet" textAlign="center">
                Footer
              </Box>
            </Grid>
  
          </Grid>
  
        </div>
      );
    }    
    else if(this.state.mode === 'loginPage'){
      return (
        <div className="App">
          <Login/>
        </div>
      )
    }
    else{
      
    }

    
  }
}

export default App;
