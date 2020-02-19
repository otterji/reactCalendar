import React, { Component } from 'react'
import axios from 'axios'
//
import { url } from '../../url'
import Channel from './Channel'
//style
import styled, { css } from 'styled-components'
import { GridList, Fab, Zoom, Slide, } from '@material-ui/core'
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons'

// const templist = [
//   {ch_no:0, subscribe:true}, 
//   {ch_no:1, subscribe:false}, 
//   {ch_no:2, subscribe:false}, 
//   {ch_no:3, subscribe:true}, 
//   {ch_no:4, subscribe:false}, 
//   {ch_no:5, subscribe:true}, 
//   {ch_no:6, subscribe:false}, 
//   {ch_no:7, subscribe:true}, 
//   {ch_no:8, subscribe:true}, 
//   {ch_no:9, subscribe:true}, 
// ];

interface State {
  isLeftEnd: boolean;
  isRightEnd: boolean;
  height: number;
  channels: any;
  lastCh: number;
  noCh: boolean;
}

class ChannelList extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLeftEnd: true,
      isRightEnd: false,
      height: 0,
      channels: [],
      lastCh: 0,
      noCh: false,
    }
  }
  
  componentDidMount() {
    // this.tempReq();
    this.getChannels()
  }
  setStateAsync(state: object) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  getChannels = async () => {
    try {
      let _url;
      const _id = sessionStorage.getItem('id');      
      if(this.props.className === 'recom'){
        if(this.props.isLogin && !this.props.isChannel){
          _url = `${url}/channel/getRecommendedChannelsWithId/${_id}`;
        }
        else{
          _url = `${url}/channel/getRecommendedChannels/`;
        }  
      }
      else if(this.props.className === 'popular'){
        if(this.props.isLogin){
          _url = `${url}/channel/getPopularChannelsWithId/${_id}`;
        }
        else{
          _url = `${url}/channel/getPopularChannels/`;
        }
      }
      
      const res = await axios({
        method: 'get',
        url: `${_url}`,
      })
      const resData = res.data;
      // console.log(JSON.stringify(resData, null, 2))
      
      if (resData.length === 0) {
        this.setState({ noCh: true })
      }
      else {
        await this.setStateAsync({
          channels: this.state.channels.concat(resData.map((ch: any) => (
            <Slide key={ch.ch_no} in={true} direction="left" timeout={500}>
              <Channel info={ch} isLogin={this.props.isLogin} isChannel={this.props.isChannel}/>
            </Slide>
          )))
        })
        .then(() => {
          this.setState({
            lastCh: resData[resData.length - 1].recomNo
          })
        })
        // console.log(this.state.lastCh, this.state.channels);
      }
    }
    catch (err) {
      // alert(err);
    }
  }

  // tempReq = async () => {
  //   await this.setStateAsync({
  //     channels: this.state.channels.concat(templist.map((temp: any) => (
  //       <Slide key={temp.ch_no} in={true} direction="left" timeout={500}>
  //         <Channel info={temp} isLogin={this.props.isLogin}/>
  //       </Slide>
  //     )))
  //   })
  // }

  scrollLeft = () => {
    document.getElementsByClassName(`${this.props.className}`)[0].scrollLeft -= 400;
    const _scrollLeft = document.getElementsByClassName(`${this.props.className}`)[0].scrollLeft

    if (_scrollLeft === 0) {
      this.setState({ isLeftEnd: true })
    }
    else {
      this.setState({ isRightEnd: false })
    }
  }
  scrollRight = () => {
    document.getElementsByClassName(`${this.props.className}`)[0].scrollLeft += 400;
    const _scrollLeft = document.getElementsByClassName(`${this.props.className}`)[0].scrollLeft
    const _scrollWidth = document.getElementsByClassName(`${this.props.className}`)[0].scrollWidth;
    const _clientWidth = document.getElementsByClassName(`${this.props.className}`)[0].clientWidth;
    if (_scrollWidth - _clientWidth < _scrollLeft + 1) {
      this.setState({ isRightEnd: true })
    }
    else {
      this.setState({ isLeftEnd: false })
    }
  }

  render() {
    return (<>

      <Stchannels className={this.props.className} cols={2.5}>
        {
          this.state.channels
        }
      </Stchannels>
      
      <Zoom in={!this.state.isLeftEnd}>
        <StFab
          left="true"
          height={this.state.height}
          onClick={this.scrollLeft}
          size="small">
          <KeyboardArrowLeft />
        </StFab>
      </Zoom>

      <Zoom in={!this.state.isRightEnd}>
        <StFab
          right="true"
          height={this.state.height}
          onClick={this.scrollRight}
          size="small" >
          <KeyboardArrowRight />
        </StFab>
      </Zoom>

    </>)
  }
}

export default ChannelList;

const Stchannels = styled(GridList)`
  flex-wrap: nowrap;
  transform: translateZ(0);
  -ms-overflow-style: none;
  &::-webkit-scrollbar { 
    display: none
  }
  scroll-behavior: smooth;
`;

const StFab = styled(Fab)<any>`
  position: absolute;
  background-color: black;
  color: white;
  
  ${(props) => (props.left && css`
    left: 10px;
  `)}
  ${(props) => (props.right && css`
    right: 10px;
  `)}
  top: 45%;

  &:hover{
    background-color: #8cebd1;
  }
`;