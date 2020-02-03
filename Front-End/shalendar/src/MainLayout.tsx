import React, { Component } from 'react'
import { Box, Grid, } from '@material-ui/core';
import { Calendar } from './components/Calendar';
import Navbar from './components/Navbar/Navbar';

interface State {
  brand: {
    name: string,
    to: string,
  }
  isLogin: boolean,
}


class MainLayout extends Component<any, State> {
  constructor(props:any){
    super(props);
    this.state = {
      brand: {
        name: 'Shalendar',
        to: '/',
      },
      isLogin: false,
    }
  }

  componentDidMount(){
    if(window.sessionStorage.getItem('id')){
      this.setState({isLogin: true});
    }
    else{
      this.setState({isLogin: false});
    }
  }

  render(){
    return(
      <div className="App">             
          <Grid container spacing={1} direction="column">
  
            <Navbar brand={this.state.brand} isLogin={this.state.isLogin}/>
            
            <Grid item xs={12} sm={12} lg={12}>
              <Grid container spacing={1}>
                
                <Grid item xs={3} sm={3} lg={3}>
                  <Box border={2} borderColor="violet" textAlign="center"
                    height="100%" style={{boxSizing: "border-box"}}>
                    User
                  </Box>
                </Grid>    

                <Grid item xs={9} sm={9} lg={9}>
                  <Box border={2} borderColor="violet" textAlign="center">
                    <Calendar/>
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
    )
  }
}

export default MainLayout;