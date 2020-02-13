import React, { Component } from 'react'
//style
import styled from 'styled-components'
import { GridListTile, } from '@material-ui/core'


interface State {
  isLogin: boolean;
  info: any;
}

class Channel extends Component<any, State>{
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
        <div>채널이름{this.props.info.ch_no}</div>
        {
          this.props.isLogin ? 
          <>
          {/* <div>구독 버튼</div> */}
          {
            this.state.info.subscribe ?
            <div>구독 취소 버튼</div>
            :
            <div>구독 버튼</div>
          }
          </>
          :
          null
        }
        
      </StCh>
    </StChTile>
    </>)
  }
}

export default Channel;


const StChTile = styled(GridListTile)`
  margin: 3px;
  border: 5px solid gray;
  border-radius: 10px;
`
const StCh = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 300px;
  text-align: center;

`