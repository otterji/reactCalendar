import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//
import logo_full from '../common/images/logo_full.png';
import Search from '../common/Search/Search';
//style
import * as Styled from './StyledNavbar';
import {
  AccountCircleRounded,
  // SettingsRounded,
  EditRounded,
  ExitToApp,
  DateRangeRounded,
  ChatRounded,
  HomeRounded,
  AssignmentOutlined
} from '@material-ui/icons';
import {
  ListItemIcon,
  ListItemText,
  Tooltip
  // Grid,
  // Box
} from '@material-ui/core';

interface State {
  anchorEl: any;
  isLogin: boolean;
}

class Navbar extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null,
      isLogin: this.isLogin()
    };
  }
  componentDidMount() {
    // console.log('did mount NAV', sessionStorage.getItem('mode'))
    this.setState({});
  }
  componentDidUpdate() {
    // console.log('did update NAV', sessionStorage.getItem('mode'))
  }

  changeMode = (e: any) => {
    const _name = e.currentTarget.name;
    // console.log(_name);
    this.props.changeMode(_name);
  };
  initMode = () => {
    sessionStorage.setItem('mode', 'home');
  };

  isLogin = (): boolean => {
    const _id = window.sessionStorage.getItem('id');
    const _jwt = window.sessionStorage.getItem('jwt');
    if (_id && _jwt) {
      return true;
    }
    sessionStorage.clear();
    return false;
  };
  onLogout = () => {
    let _confirm = window.confirm('로그아웃 하시겠습니까?');
    if (_confirm) {
      sessionStorage.clear();
      window.location.href = '/mainPage';
    }
  };

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (this.state.anchorEl === null) {
      this.setState({ anchorEl: event.currentTarget });
    } else {
      this.setState({ anchorEl: null });
    }
  };

  render() {
    return (
      <Styled.NavBar>
        {this.state.isLogin ? (
          <>
            {/* 로그인 되어있을 때 */}
            <Styled.StLeftCont>
              {/* <Link to="/mainPage" style={{ margin: "5px 1rem 0rem 0rem" }} onClick={this.initMode}> */}
              <a
                href="/mainPage"
                style={{ margin: '5px 1rem 0rem 0rem' }}
                onClick={this.initMode}
              >
                <img src={logo_full} alt="images/logo_full.png" width="150px" />
              </a>
              {/* </Link> */}
              <Styled.StBtnCont mode={this.props.currentMode}>
                <Tooltip title="홈">
                  <Styled.StIconBtn
                    aria-label="홈"
                    className="home"
                    name="home"
                    onClick={this.changeMode}
                  >
                    <HomeRounded />
                  </Styled.StIconBtn>
                </Tooltip>
                <Tooltip title="일정보기">
                  <Styled.StIconBtn
                    aria-label="일정보기"
                    className="calendar"
                    name="calendar"
                    onClick={this.changeMode}
                  >
                    <DateRangeRounded />
                  </Styled.StIconBtn>
                </Tooltip>
                <Tooltip title="피드보기">
                  <Styled.StIconBtn
                    aria-label="피드보기"
                    className="feed"
                    name="feed"
                    onClick={this.changeMode}
                  >
                    <ChatRounded />
                  </Styled.StIconBtn>
                </Tooltip>
              </Styled.StBtnCont>
            </Styled.StLeftCont>
            <Styled.StRightCont>
              <Styled.StBtnCont>
                <Search />
                <Tooltip title="My">
                  <Styled.StIconBtn aria-label="My" onClick={this.handleClick}>
                    {this.state.anchorEl === null ? (
                      <AccountCircleRounded />
                    ) : (
                      <AccountCircleRounded style={{ color: '#b2dfdb' }} />
                    )}
                  </Styled.StIconBtn>
                </Tooltip>

                <Styled.StyledMenu
                  // id="customized-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClick}
                  disableScrollLock={true} //이거 안하면 메뉴 열었을 때 스크롤바 없어져서 너비가 바뀜
                >
                  <Link
                    to="/updateUserInfo"
                    style={{
                      fontWeight: 300,
                      textDecoration: 'none',
                      color: 'black'
                    }}
                  >
                    <Styled.StyledMenuItem>
                      <ListItemIcon>
                        <EditRounded fontSize="small" />
                      </ListItemIcon>
                        <ListItemText primary="정보 수정" />
                    </Styled.StyledMenuItem>
                  </Link>

                  <Link
                    to="/ServicePage"
                    style={{
                      fontWeight: 300,
                      textDecoration: 'none',
                      color: 'black'
                    }}
                  >
                    <Styled.StyledMenuItem>
                      <ListItemIcon>
                        <AssignmentOutlined fontSize="small" />
                      </ListItemIcon>
                        <ListItemText primary="서비스 소개" />
                    </Styled.StyledMenuItem>
                  </Link>

                  <Styled.StyledMenuItem onClick={this.onLogout}>
                    <ListItemIcon>
                      <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                  </Styled.StyledMenuItem>
                </Styled.StyledMenu>
              </Styled.StBtnCont>
            </Styled.StRightCont>
          </>
        ) : (
          // 로그인 안되어있을 때
          <>
            <Styled.StLeftCont>
              <Link to="/mainPage" style={{ margin: '5px 1rem 0rem 0rem' }}>
                <img src={logo_full} alt="images/logo_full.png" width="150px" />
              </Link>
            </Styled.StLeftCont>
            <Styled.StRightCont>
              <Styled.StBtn>
                <Link
                  to="/loginPage"
                  style={{ color: 'gray', fontWeight: 300 }}
                >
                  로그인
                </Link>
              </Styled.StBtn>
              <Styled.StBtn>
                <Link
                  to="/signupPage"
                  style={{ color: 'gray', fontWeight: 300 }}
                >
                  회원가입
                </Link>
              </Styled.StBtn>
              <Styled.StBtn>
                <Link
                  to="/ServicePage"
                  style={{ color: 'gray', fontWeight: 300 }}
                >
                  서비스 소개
                </Link>
              </Styled.StBtn>
            </Styled.StRightCont>
          </>
        )}
      </Styled.NavBar>
    );
  }
}

export default Navbar;
