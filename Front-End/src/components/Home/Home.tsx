import React, { Component } from 'react'
//
import ChannelList from './ChannelList'
import main_page_image_001 from '../common/images/main_page_image_001.jpg'
import main_page_image_002 from '../common/images/main_page_image_002.jpg'
import main_page_image_003 from '../common/images/main_page_image_003.jpg'
//style
import styled from 'styled-components'
import { Zoom, Slide } from '@material-ui/core'

class Home extends Component<any> {
  componentDidMount(){
    // console.log('home did mount')
  }
  componentDidUpdate(){
    // console.log('home did update')
  }

  render(){
    // console.log('render home', this.props.isLogin)
    return(
      <>
        <StBannerCont>
          <Zoom in={true}>
            <img className="logo" src={"images/logo_full.png"} alt=""/>
          </Zoom>
        </StBannerCont>

        <StChannelListCont>
          <Slide in={true} direction="right" timeout={250}>
            <div className='label'>추천 채널</div>
          </Slide> 
          <div className='channelListCont'>
            <ChannelList className="recom" isLogin={this.props.isLogin} isChannel={this.props.isChannel}/>
          </div>

          <Slide in={true} direction="right" timeout={250}>
            <div className='label'>인기 채널</div> 
          </Slide>
          <div className='channelListCont'>
            <ChannelList className="popular" isLogin={this.props.isLogin} isChannel={this.props.isChannel}/>
          </div>

        </StChannelListCont>
        
        <StIntroCont>
          <div className="intro1">
            <span>
              관심있는 일정을 구독하여 한번에 받아보세요
            </span>
            <span>
              그림
            </span>

          </div>
          <div className="intro2">
            <span>
              관심있는 일정을 구독하여 한번에 받아보세요
            </span>
            <span>
              그림
            </span>
          </div>
          <div className="intro3">
            <span>
              관심있는 일정을 구독하여 한번에 받아보세요
            </span>
            <span>
              그림
            </span>
          </div>
        </StIntroCont>

        <StIntroMemberCont>
          <div>개발팀 소개</div>
        </StIntroMemberCont>
      </>
    )
  }
}

export default Home;


const StBannerCont = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 2rem 0 2rem 0;
  .logo{
    width:80%;
    margin: 1rem;
  }
`

const StChannelListCont = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  .label {
    margin: 1rem 0 0 0.5rem;
    font-size: 200%;
  }
  .channelListCont{
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0.5rem 0 2rem 0;
    box-sizing: border-box;
    overflow: hidden;
  }
`

const StIntroCont = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0rem 0 2rem 0;
  padding: 2rem;

  div[class^="intro"]{
    display: flex;
    justify-content: space-evenly;
    padding: 6rem;
    margin: 1rem 0 1rem 0;
    
    span{
      margin: 0 1rem 0 1rem;
      background-color: white;
      width: 200px;
      height: 100px;
    }
  }

  div:nth-child(1){
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${main_page_image_001});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  div:nth-child(2){
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${main_page_image_002});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  div:nth-child(3){
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${main_page_image_003});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  
`

const StIntroMemberCont = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  div{
    width:100%;
    height: 200px;
    background-color: gray;
  }
`