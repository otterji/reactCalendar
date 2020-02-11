import React, { Component } from 'react'
//
import { loginState } from '../../App';
import RecomList from './RecomList'
//style
import styled from 'styled-components'

class Home extends Component {
  render(){
    return(
      <>
        <StBannerCont>
          <img className="logo" src={"images/logo_full.png"} alt=""/>
        </StBannerCont>

        <StRecomListCont>
          <loginState.Consumer>
          {(store)=>{
            return (
              <RecomList isLogin={store.isLogin}/>
            )
          }}
          </loginState.Consumer>
        </StRecomListCont>
        
        <StIntroCont>
          서비스 설명
        </StIntroCont>
      </>
    )
  }
}

export default Home;


const StBannerCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  
  .logo{
    width:80%;
    margin: 1rem;
  }
`

const StRecomListCont = styled.div`
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
`

const StIntroCont = styled.div`

`