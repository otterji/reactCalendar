import React, { Component } from 'react';
import { Avatar, } from '@material-ui/core';
import { EmojiEmotionsOutlined, } from '@material-ui/icons'
import * as Styled from './StyledUserDetail';
import styled from 'styled-components'
import logo from '../../common/images/logo.png'

class VisitNoLogin extends Component {

  render() {
    return (
      <>
        <Styled.StUDCont>
          <div className="avatarCont">
            <Avatar
              className="avatar"
              src={logo}
              alt="SHALENDAR"
            />
          </div>

          <StNoLoginMsg>
            <hr style={{width: "90%"}}/>
            <br/>
            <div className="msg">
              안녕하세요 <br/>
              Shalendar 입니다.<br/>
              로그인 후 <br/>
              저희의 서비스를 이용해보세요.<br/><br/>
            </div>
          </StNoLoginMsg>
          <EmojiEmotionsOutlined/>
        
      </Styled.StUDCont>
    </>);
  }
}

export default VisitNoLogin;

const StNoLoginMsg = styled.div`
  margin-top: 5vh;
  .msg{
    display: flex;    
    justify-content: center;
    text-align: center;
  }
`