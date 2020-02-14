import React, { Component } from 'react'
import axios from 'axios'
//
import { url } from '../../url'
import Recom from './Recom'
//style
import styled, { css } from 'styled-components'
import { GridList, Fab, Zoom, Slide, } from '@material-ui/core'
import { KeyboardArrowUp, Autorenew } from "@material-ui/icons";

const templist = [
  {ch_no:0, subscribe:true}, 
  {ch_no:1, subscribe:false}, 
  {ch_no:2, subscribe:false}, 
  {ch_no:3, subscribe:true}, 
  {ch_no:4, subscribe:false}, 
  {ch_no:5, subscribe:true}, 
  {ch_no:6, subscribe:false}, 
  {ch_no:7, subscribe:true}, 
  {ch_no:8, subscribe:true}, 
  {ch_no:9, subscribe:true}, 
  {ch_no:0, subscribe:true}, 
  {ch_no:1, subscribe:false}, 
  {ch_no:2, subscribe:false}, 
  {ch_no:3, subscribe:true}, 
  {ch_no:4, subscribe:false}, 
  {ch_no:5, subscribe:true}, 
  {ch_no:6, subscribe:false}, 
  {ch_no:7, subscribe:true}, 
  {ch_no:8, subscribe:true}, 
  {ch_no:9, subscribe:true}, 
];

interface State {
  labelHeight: number;
  channels: any[];
  isTop: boolean;
  isBottom: boolean;
  lastCh: number;
  noCh: boolean;
}

class RecomList extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      labelHeight: 0,
      channels: [],
      isTop: true,
      isBottom: false,
      lastCh: 0,
      noCh: false,
    };
  }
  
  componentDidMount() {
    const _labelHeight = document.getElementsByClassName('label')[0].clientHeight;
    this.setState({
      labelHeight: _labelHeight,
    })
    // this.tempReq();
    this.axiosReq();
  }
  componentDidUpdate() {

  }
  setStateAsync(state: object) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  axiosReq = async () => {
    try {
      let _url;
      const _id = sessionStorage.getItem('id');      
      if(this.props.isLogin && !this.props.isChannel){
        _url = `${url}/channel/getRecommendedChannelsWithId/${_id}`;
      }
      else{
        _url = `${url}/channel/getRecommendedChannels/`;
      } 
      const res = await axios({
        method: 'get',
        url: `${_url}`,
      })
      const resData = res.data;
      // console.log(_url, JSON.stringify(resData, null, 2))
      if (resData.length === 0) {
        this.setState({ noCh: true })
      }
      else {
        await this.setStateAsync({
          channels: this.state.channels.concat(resData.map((ch: any) => (
            <Slide key={ch.ch_no} in={true} direction="left" timeout={500}>
              <Recom info={ch} isLogin={this.props.isLogin}/>
            </Slide>
          )))
        })
        .then(() => {
          this.setState({
            lastCh: resData[resData.length - 1].recomNo
          })
        })
        console.log(this.state.lastCh, this.state.channels);
      }
    }
    catch (err) {
      // alert(err);
    }
  }

  tempReq = async () => {
    await this.setStateAsync({
      channels: this.state.channels.concat(templist.map((temp: any) => (
        <Recom info={temp} isLogin={this.props.isLogin} isChannel={this.props.isChannel}/>
      )))
    })
  }

  onScroll = () => {
    if (!this.state.isBottom) {
      const _scrollHeight = document.getElementsByName("channelContainer")[0]
        .scrollHeight;
      const _scrollTop = document.getElementsByName("channelContainer")[0]
        .scrollTop;
      const _clientHeight = document.getElementsByName("channelContainer")[0]
        .clientHeight;

      if (this.state.isTop && _clientHeight <= _scrollTop) {
        this.setState({ isTop: false });
      } else if (!this.state.isTop && _clientHeight > _scrollTop) {
        this.setState({ isTop: true });
      }

      if (_scrollHeight - _scrollTop < _clientHeight + 1) {
        this.setState({ isBottom: true });
      }
    }
  };

  scrollToTop = () => {
    document.getElementsByName("channelContainer")[0].scrollTop = 0;
  };

  render() {
    return (<>
      <Slide in={true} direction="left" timeout={500}>
        <StLabel className="label">추천 채널</StLabel>
      </Slide> 

      <Slide in={true} direction="left" timeout={1000}>
        <StChListCont
        name="channelContainer"
        height={this.props.height}
        labelHeight={this.state.labelHeight}
        onScroll={this.onScroll}
        >
          {this.state.channels}
        </StChListCont>
      </Slide>
      
      {this.state.isTop ? (
        <Zoom in={false}>
          <StFab size="small">
            <KeyboardArrowUp />
          </StFab>
        </Zoom>
      ) : (
        <Zoom in={true}>
          <StFab size="small" onClick={this.scrollToTop}>
            <KeyboardArrowUp />
          </StFab>
        </Zoom>
      )}

    
    </>)
  }
}

export default RecomList;

const StLabel = styled.div`
  text-align: center;
  font-size: 120%;
  font-weight: bold;
`

const StChListCont = styled.div<any>`
  z-index: 1;
  border-radius: 10px;
  overflow: auto;
  height: ${props => (props.height - 150 - props.labelHeight)}px;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
`;

const StFab = styled(Fab)<any>`
  position: absolute;
  background-color: black;
  color: white;
  bottom: 10px;
  right: 5%;

  &:hover{
    background-color: #8cebd1;
  }
`;