import React, { Component, } from "react";
import { Link } from 'react-router-dom';
//mycomp
import { loginState } from "../../../App"
import AccountsForm from "../AccountsForm"
//styles
import * as Styled from "../AccountsStyled";
import { Grid } from "@material-ui/core";

interface State{
  mode:string,
  browserWidth: number,
  browserHeight: number,
}

class MoreInfo extends Component<any, State> {
  constructor(props:any){
    super(props);    
    this.state = {
      mode:'moreInfo',
      browserWidth: window.innerWidth,
      browserHeight: window.innerHeight,
    }
  }

  currentSize = () => {
    this.setState({browserWidth: window.innerWidth});
    this.setState({browserHeight: window.innerHeight});
  }
  componentDidMount(){
    window.addEventListener("resize", this.currentSize);
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.currentSize)
  }

  render() {
    return (
      <>
        <Styled.div 
          browserWidth={this.state.browserWidth} 
          browserHeight={this.state.browserHeight}
        >
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={12}>
              <Link to="/"><Styled.logo src={"images/logo_full.png"}/></Link>
            </Grid>

            <Grid item xs={12}>
              <div style={{fontSize:"30px"}}>회원님에 대해 더 알려주세요!</div>
              <loginState.Consumer>
              {
                (store)=>{
                  return(
                    <AccountsForm moreInfo mode={this.state.mode} onLogin={store.actions?.onLogin}/>
                  )
                }
              }
              </loginState.Consumer>
            </Grid>
            
          </Grid>

        </Styled.div>
      </>
    );
  }
}

export default MoreInfo;