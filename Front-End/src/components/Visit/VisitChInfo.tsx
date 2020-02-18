import React, { Component } from 'react'
//
import { url } from '../../url'
import { visitStorage } from './VisitCh'
import ModeBar from './ModeBar'
//style
import styled from 'styled-components'
import { Button, Avatar, Slide } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'

class VisitChInfo extends Component<any>{

  render() {
    return (<><visitStorage.Consumer>{store => {
      return (<>

        <Slide in={true} direction="down">
          <StVChInfoCont>
            <StLeftCont>
              <div className="avatarCont">
                <Avatar className="avatar" src={`${url}/${store.chInfo.img}`} />
              </div>
              <StStringCont>
                <div className="nickname">
                  <div>
                    {store.chInfo.nickname}
                  </div>
                  <CheckCircle className="icon" fontSize="small"/>
                </div>
                {/* <div>{this.props.chInfo.interests}</div> */}
              </StStringCont>
            </StLeftCont>

            <StMidCont>
            <ModeBar changeMode={this.props.changeMode}/>
            </StMidCont>

            <StRightCont>
              {store.isLogin && !store.isChannel ?
                <>
                  {store.isSubscribe ?
                    <StBtn
                      issubscribe="true"
                      onClick={this.props.unSubscribe}
                    >
                      구독 취소
                  </StBtn>
                    :
                    <StBtn
                      issubscribe="false"
                      onClick={this.props.onSubscribe}
                    >
                      구독
                  </StBtn>
                  }
                </>
                :
                null
              }
            </StRightCont>
          </StVChInfoCont>
        </Slide>
      </>)
    }}</visitStorage.Consumer></>)
  }
}

export default VisitChInfo;

const StVChInfoCont = styled.div`
  display: flex;
  justify-content: space-between;
  /* justify-content: start; */
  align-items: center;

  /* border: 2px solid gray; */
`;

const StLeftCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .avatarCont{
    .avatar{
      margin: 10px;
      width: 5vw;
      height: auto;
    }
  }
`;

const StMidCont = styled.div`
  display: flex;
  justify-content: flex-start;
`

const StStringCont = styled.div`
  display: flex;
  flex-direction: column;

  .nickname {
    display: flex;
    align-items: baseline;
    font-size: 150%;
    
    .icon {
      margin-left: 10px;
      color: #00e6b8;
    }
  }  
`

const StRightCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StBtn = styled(Button)<any>`
  margin-right: 10px;
  color: white;
  background-color: ${props => (props.issubscribe ? "#00e6b8" : "black")};  
  font-size: 1vw;
  
  &:hover{
    background-color: ${props => (props.issubscribe ? " red" : "#00e6b8")};
  }
`;