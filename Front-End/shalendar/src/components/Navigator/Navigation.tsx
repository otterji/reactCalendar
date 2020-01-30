import React, { Component } from 'react';
import {Grid, Box} from '@material-ui/core';

interface Props {

}
interface State {
}

class Navigation extends Component<Props, State> {
    render(){
      return (
        <React.Fragment>
          
          <Grid item xs={9} sm={9} lg={9}>
            <Box border={2} borderColor="violet" textAlign="center">
                Menu
                <Box display="flex" >
                  <Box justifyContent="flex-start"
                  border={2} borderColor="purple" textAlign="center">Logo</Box>
                  
                  <Box flexGrow={1}
                  border={2} borderColor="purple" textAlign="center">menu1</Box>
                  <Box flexGrow={1}
                  border={2} borderColor="purple" textAlign="center">menu2</Box>
                  <Box flexGrow={1}
                  border={2} borderColor="purple" textAlign="center">menu3</Box>
                  <Box flexGrow={1}></Box>
                </Box>            
            </Box>   
          </Grid>
  
          <Grid item xs={3} sm={3} lg={3}>
            <Box border={2} borderColor="violet" textAlign="center" >
              User
            </Box>

            <Box border={2} borderColor="violet" textAlign="center" >
              Sign In
            </Box>            
          </Grid>

        </React.Fragment>
      )
    }
  }

  export default Navigation;