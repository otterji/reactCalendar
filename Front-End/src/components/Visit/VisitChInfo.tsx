import React, { Component } from 'react'
import axios from 'axios'
//
import { url } from '../../url'
import { visitStorage } from './VisitCh'
import ModeBar from './ModeBar'
//style
import styled from 'styled-components'
import { Button, Avatar, Slide, Zoom } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'

class VisitChInfo extends Component<any>{


  render() {
    return (<><visitStorage.Consumer>{store => {
      // console.log(store.chInfo)
      const cate = store.chInfo.interests?.map((cate:any) => {
        return(
          <div className="cate" key={cate}>
            {cate}
          </div>
        )
      })

      return (<>
        <Slide in={true} direction="down">
          <StVChInfoCont>
            <StLeftCont>
              <div className="avatarCont">
                <Avatar className="avatar" src={`${url}/${store.chInfo.img}`} />
              </div>
              <StStringCont>
                <div className="cates">
                  {cate}
                </div>
                <div className="nickname">
                  <div>
                    {store.chInfo.nickname}
                  </div>
                  <CheckCircle className="icon" fontSize="small"/>
                </div>
                
                <div className="subs">
                  <div>
                    구독자 {store.subscribers}명
                  </div>
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
                <Zoom in={true} timeout={500}>
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
                </Zoom>
                </>
                :
                <Zoom in={false} timeout={500}>
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
                </Zoom>
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
      height: 5vw;
    }
  }
`;

const StMidCont = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: white;
  border: 2px solid #00e6b8;
  border-radius: 10px;
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
  .cates{
    display: flex;
    .cate{
    margin: 0 0.4vw 0 0.4vw;
    font-size: 90%;
    font-weight: 100;
    font-style: italic;
    color: gray;
  }

  } 
  .subs{

  }
`

const StRightCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StBtn = styled(Button)<any>`
  margin-right: 3vw;
  color: white;
  background-color: ${props => (props.issubscribe === "true" ? "#00e6b8" : "black")};  
  font-size: 1vw;
  
  &:hover{
    background-color: ${props => (props.issubscribe === "true" ? " red" : "#00e6b8")};
  }
`;