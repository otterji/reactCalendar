import React, { Component } from 'react'
import axios from 'axios'
//
import { url } from '../../../url'
import Recom from './Same'
//style
import styled from 'styled-components'
import { Fab, Zoom, Slide, } from '@material-ui/core'
import { KeyboardArrowUp, } from "@material-ui/icons";

interface State {
  height: number;
  labelHeight: number;
  channels: any[];
  isTop: boolean;
  isBottom: boolean;
  lastCh: number;
  noCh: boolean;
}
class SameList extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      height: this.props.height,
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
    this.getRecoms();
  }

  setStateAsync(state: object) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }
  getRecoms = async () => {
    try {
      const _id = this.props.id;      
      const res = await axios({
        method: 'get',
        url: `${url}/channel/getRecommendedChannelsWithId/${_id}`,
      })
      const resData = res.data;
      if (resData.length === 0) {
        this.setState({ noCh: true })
      }
      else {
        await this.setStateAsync({
          channels: this.state.channels.concat(resData.map((ch: any) => (
            <Slide key={ch.ch_no} in={true} direction="left" timeout={500}>
              <Recom info={ch}/>
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
    this.setState({
      isTop: true,
      isBottom: false,
    })
  };

  render() {
    return (<>
      <Slide in={true} direction="left" timeout={500}>
        <StLabel className="label">관련 채널</StLabel>
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
export default SameList;


const StLabel = styled.div`
  text-align: center;
  font-size: 120%;
  font-weight: bold;
  color: #009689;
`
const StChListCont = styled.div<any>`
  z-index: 1;
  border-radius: 10px;
  overflow: auto;
  height: ${props => (props.height - 100 - props.labelHeight)}px;
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
    background-color: #8CEBD1;
  }
`;