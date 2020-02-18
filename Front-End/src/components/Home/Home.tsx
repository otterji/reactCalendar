import React, { Component } from 'react'
import axios from 'axios'
//
import ChannelList from './ChannelList'
import main_page_image_001 from '../common/images/main_page_image_001.jpg'
import main_page_image_002 from '../common/images/main_page_image_002.jpg'
import main_page_image_003 from '../common/images/main_page_image_003.jpg'
//style
import styled from 'styled-components'
import { Zoom, Slide, Avatar, } from '@material-ui/core'


class Home extends Component<any> {
  setStateAsync(state: object) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  render() {
    return (
      <>
        <StChannelListCont>
          <Slide in={true} direction="right" timeout={1000}>
            <div className='label'>추천 채널</div>
          </Slide>
          <div className='channelListCont'>
            <ChannelList className="recom" isLogin={this.props.isLogin} isChannel={this.props.isChannel} />
          </div>

          <Slide in={true} direction="right" timeout={1000}>
            <div className='label'>인기 채널</div>
          </Slide>
          <div className='channelListCont'>
            <ChannelList className="popular" isLogin={this.props.isLogin} isChannel={this.props.isChannel} />
          </div>
        </StChannelListCont>

        <Slide in={true} direction="up" timeout={2500}>
          <StIntroCont>
            <div className="intro1">
              <p>
                STEP 1. 회원가입 후 관심사를 설정하세요
            </p>
              {/* <span>
              그림
            </span> */}

            </div>
            <div className="intro2">
              <p>
                STEP 2. 실시간 인기 채널을 추천받으세요
            </p>
              {/* <span>
              그림
            </span> */}
            </div>
            <div className="intro3">
              <p>
                STEP 3. 관심있는 일정을 구독하여 한눈에 받아보세요
            </p>
              {/* <span>
              그림
            </span> */}
            </div>
          </StIntroCont>
        </Slide>

        {/* <Slide in={true} direction="up" timeout={3000}>
          
            
          
        </Slide > */}
      </>
    )
  }
}

export default Home;


// const StBannerCont = styled.div`
//   /* position: absolute; */
//   box-sizing: border-box;
//   /* display: inline-block; */
//   width: 100%;
//   height: 35vw;
//   /* margin: 2rem 0 2rem 0; */
// `;

// const StBanner = styled.div<any>`
//   width: 100%;
//   height: 35vw;
//   background: url(${props => (props.imgUrl)});
//   background-position: center center;
//   background-repeat: no-repeat;
//   background-size: cover;
// `;

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
    
    p{
      color: white;
      font-size: 30px;
      margin: 0 1rem 0 1rem;
      /* width: 200px; */
      height: 100px;
      background: rgba(76, 175, 80, 0);
      line-height: 100px;
    }
  }

  div:nth-child(1){
    background-image: 
    linear-gradient(rgba(0, 0, 0, 0.5), 
    rgba(0, 0, 0, 0.5)), 
    url(${main_page_image_001});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  div:nth-child(2){
    background-image: 
    linear-gradient(rgba(0, 0, 0, 0.5), 
    rgba(0, 0, 0, 0.5)), 
    url(${main_page_image_002});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  div:nth-child(3){
    background-image: 
    linear-gradient(rgba(0, 0, 0, 0.5), 
    rgba(0, 0, 0, 0.5)), 
    url(${main_page_image_003});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  
`

