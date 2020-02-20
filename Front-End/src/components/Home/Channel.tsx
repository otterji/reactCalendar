import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
//
import { url } from '../../url'
//style
import styled from 'styled-components'
import { GridListTile, Button, Avatar, Zoom } from '@material-ui/core'
import './Channel.scss';

interface State {
  isLogin: boolean;
  info: any;
  subscribe: boolean;
  hover: boolean;
}

class Channel extends Component<any, State>{
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: this.props.isLogin,
      info: this.props.info,
      subscribe: this.props.info.subscribe,
      hover: false,
    }
  }
  onMouseOver = () => {
    this.setState({
      hover: true,
    })
  }
  onMouseLeave = () => {
    this.setState({
      hover: false,
    })
  }

  onSubscribe = async () => {
    const _id = sessionStorage.getItem('id');
    try {
      const res = await axios({
        method: 'post',
        url: `${url}/member/subscribe`,
        data: {
          fromId: _id,
          toChannel: this.state.info.id,
        }
      })
      // console.log(JSON.stringify(res.data, null, 2))
      if (res.data.state === 'SUCCESS') {
        this.setState({
          subscribe: true,
        })
      }
    }
    catch (err) {
      alert(err)
    }
  }
  unSubscribe = async () => {
    let _confirm = window.confirm('구독을 취소하시겠습니까?');
    if (_confirm) {
      const _id = sessionStorage.getItem('id');
      try {
        const res = await axios({
          method: 'delete',
          url: `${url}/member/unSubscribe`,
          data: {
            fromId: _id,
            toChannel: this.state.info.id,
          }
        })
        // console.log(JSON.stringify(res.data, null, 2))
        if (res.data.state === 'SUCCESS') {
          this.setState({
            subscribe: false,
          })
        }
      }
      catch (err) {
        alert(err)
      }
    }
  }

  countUp = async () => {
    try {
      console.log('asdfas', this.state.info.id)
      await axios({
        method: 'put',
        url: `${url}/channel/updateSearchFrequency/${this.state.info.id}`
      }).then(() => {
        sessionStorage.setItem('isVisit', 'true');
      })
    }
    catch (err) {
      alert(err);
    }

  }

  render() {
    return (<>
      <StChTile imgurl={`${url}/${this.state.info.poster}`}>
        <div className="card" onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
          <div className="content">
            {
              this.state.hover ?
                <Zoom in={true}>
                  <Avatar src={`${url}/${this.state.info.img}`} />
                </Zoom>
                :
                null
            }
            {
              this.state.info.id === sessionStorage.getItem('id') ? 
              <u className="title" style={{color: "white"}}>{this.state.info.nickname}</u>
              :
              <StLink to={`/visitPage/${this.state.info.nickname}`} className="title"
                onClick={this.countUp}>{this.state.info.nickname}</StLink>
            }
            {
              (this.props.isLogin && !this.props.isChannel && this.state.hover) ?
                <>
                  {
                    this.state.subscribe ?
                      <Zoom in={true} timeout={500}>
                        <StBtn
                          subscribe={true}
                          size="small"
                          onClick={this.unSubscribe}>구독 취소</StBtn>
                      </Zoom>
                      :
                      <>
                        <Zoom in={true} timeout={500}>
                          <StBtn
                            subscribe={false}
                            size="small"
                            onClick={this.onSubscribe}>구독</StBtn>
                        </Zoom>
                      </>
                  }
                </>
                :
                null
            }
          </div>
        </div>
      </StChTile>

    </>)
  }
}

export default Channel;
const StChTile = styled(GridListTile) <any>`
  overflow: hidden;
  margin: 8px;
  /* border: 1px solid gray; */
  border-radius: 10px;
  background-image: url(${props => (props.imgurl)});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  .content{
    width: 200px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
`
const StLink = styled(Link)`
  color: white;
`

const StBtn = styled(Button) <any>`
  color: white;
  background-color: ${props => (props.subscribe ? "#00e6b8" : "black")};
  font-size: 80%;
  
  &:hover{
    background-color: ${props => (props.subscribe ? " red" : "#00e6b8")};
  }
`;

