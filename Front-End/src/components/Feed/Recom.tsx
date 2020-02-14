import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//
import { url } from '../../url'
//style
import styled from 'styled-components'
import { Button, Avatar } from '@material-ui/core'


interface State {
  isLogin: boolean;
  info: any;
}

class Recom extends Component<any, State>{
  constructor(props:any){
    super(props);
    this.state = {
      isLogin: this.props.isLogin,
      info: this.props.info,
    }
  }

  render(){
    return(<>
    <StChTile>
      <StCh>
        {/* <div>채널이름{this.props.info.ch_no}</div> */}
        <LeftImg src={`${url}/${this.state.info.img}`}></LeftImg>
        <StLink to="/" >채널이름 No.{this.state.info.ch_no}</StLink>
        {
          (this.props.isLogin && !this.props.isChannel) ? 
          <>
          {/*{*/}
          {/*  this.state.info.subscribe ?*/}
          {/*  <StBtn size="small">구독 취소</StBtn>*/}
          {/*  :*/}
          {/*  <StBtn size="small">구독</StBtn>*/}
          {/*}*/}
          </>
          :
          null
        }
        
      </StCh>
    </StChTile>
    </>)
  }
}

export default Recom;


const StChTile = styled.div<any>`
  /* background-color: white; */
  background: url(${props => (props.imgUrl)});
  height: 50px;
  margin: 10px;
  border: 5px solid gray;
  border-radius: 10px;
  &:hover{
    background-color: gray; 
  }
`
const StCh = styled.div`
  /* width: 100%;
  height: 100px; */
  
  display: flex;

`

const StLink = styled(Link)`
  text-decoration: none;
`

const StBtn = styled(Button)`
  background-color: gray;  
  color: white;
  font-size: 100%;
  
  &:hover{
    background-color: #8cebd1;
  }
`;

const LeftImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 7px;
`;
