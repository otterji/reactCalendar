import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//
import { url } from '../../url'
//style
import styled from 'styled-components'
import { Button, } from '@material-ui/core'
import axios from 'axios'


interface State {
  isLogin: boolean;
  info: any;
  subscribe: boolean;
}
class Recom extends Component<any, State>{
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: this.props.isLogin,
      info: this.props.info,
      subscribe: this.props.info.subscribe
    }
  }

  unSubscribe = async () => {
    let _confirm = window.confirm('구독을 취소하시겠습니까?');
    if(_confirm){
      const _id = sessionStorage.getItem('id');
      try{
        const res = await axios({
          method: 'delete',
          url: `${url}/member/unSubscribe`,
          data: {
            fromId: _id,
            toChannel: this.state.info.id,
          }
        })
        // console.log(JSON.stringify(res.data, null, 2))
        if(res.data.state === 'SUCCESS'){
          this.setState({
            subscribe: false,
          })
        }
      }
      catch(err){
        alert(err)
      }
    }
  }

  onSubscribe = async () => {
    const _id = sessionStorage.getItem('id');

    try{
      const res = await axios({
        method: 'post',
        url: `${url}/member/subscribe`,
        data: {
          fromId: _id,
          toChannel: this.state.info.id,
        }
      })
      // console.log(JSON.stringify(res.data, null, 2))
      if(res.data.state === 'SUCCESS'){
        this.setState({
          subscribe: true,
        })
      }
    }
    catch(err){
      alert(err)
    }
  }

  render() {
    return (<>
      <StChTile>
        <div className="recomCard">
          <StCh className="stch top">
            {/* <div>채널이름{this.props.info.ch_no}</div> */}
            <Stprofile src={`${url}/${this.state.info.img}`} />
            <div className="contents">
              <StLink to={`/visitPage/${this.state.info.nickname}`} >{this.state.info.nickname}</StLink>
              <StCategory>{this.state.info.category}</StCategory>
            </div>
          </StCh>
          <StBtnHo className="bottom">
            {
              (this.props.isLogin && !this.props.isChannel) ?
                <>
                  {
                    this.state.subscribe ?
                      <StBtn onClick={this.unSubscribe}>구독 취소</StBtn>
                      :
                      <StBtn onClick={this.onSubscribe}>구독</StBtn>
                  }
                </>
                :
                null
            }
          </StBtnHo>
        </div>
      </StChTile>
    </>)
  }
}
export default Recom;
const StChTile = styled.div<any>`
  margin: 10px 10px 20px 10px;
  z-index: 222;
  height: 50px;
  .recomCard{
    potision: fixed;
  }
  .bottom{
    width:100%;
    height:49px;
  }
  .contents{
    width:100%;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    margin-right: 10px;
    border-bottom: 1px dotted grey;
  }
  &:hover{
    .contents{
      display: none;
    }
    div{
      display: flex;
    }
  }
`
const StCh = styled.div`
  display: flex;
`
const StLink = styled(Link)`
  text-decoration: none;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 18px;
  color: black;
`
const StCategory = styled.div`
  margin-left: 10px;
  font-size: 14px;
`;
const Stprofile = styled.img`
  border-radius : 6px;
  width: 50px;
  height: 50px;
`;
const StBtnHo = styled.div`
  display: none;
  border-radius: 10px;
  background: #F2F2F2;
  width: 100%;
  height: 100%;
`;
const StBtn = styled(Button)`
  color: #009689;
  font-size: 100%;
  width: 100%;
`;
