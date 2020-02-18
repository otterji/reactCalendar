import React, { Component } from 'react'
//
import { visitStorage } from './VisitCh'
//style
import styled from 'styled-components'
import { Tooltip, IconButton } from '@material-ui/core'
import { DateRangeRounded, ChatRounded } from '@material-ui/icons'


class ModeBar extends Component<any> {

  changeMode = (e:any) => {
    const _mode = e.currentTarget.name
    this.props.changeMode(_mode)
  }

  render() {
    return (<><visitStorage.Consumer>{store => {
      return (<>
        <StModeBarCont mode={store.mode}>
          <Tooltip title="채널 일정">
            <StIconBtn
              // aria-label="일정보기"
              className="calendar"
              name="calendar"
              onClick={this.changeMode}
            >
              <DateRangeRounded fontSize="small"/>
            </StIconBtn>
          </Tooltip>
          <Tooltip title="채널 피드">
            <StIconBtn
              // aria-label="피드보기"
              className="feed"
              name="feed"
              onClick={this.changeMode}
            >
              <ChatRounded fontSize="small"/>
            </StIconBtn>
          </Tooltip>
        </StModeBarCont>
      </>)
    }}</visitStorage.Consumer></>)
  }
}

export default ModeBar;

const StModeBarCont = styled.div<any>`
  margin-top: 5px;
  
  margin-bottom: 5px;

  display: flex;
  justify-content: center;
  align-items:center;

  button{
    color: black;
    &:hover {
      background-color: inherit;
      color: #8cebd1;
    }

    &[class$=${props => (props.mode)}]{
      color: #8cebd1;
    }
  }
`;

const StIconBtn = styled(IconButton)`
  /* padding-top: 0;
  padding-bottom: 0; */
  padding: 0 0.7vw 0 0.7vw;
  background-color: inherit;
`;