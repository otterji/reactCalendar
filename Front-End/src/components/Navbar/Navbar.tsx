import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../common/Search/Search';
import * as Styled from './StyledNavbar';
import {
  NotificationsRounded,
  AccountCircleRounded,
  SettingsRounded,
  EditRounded,
  ExitToApp,
  DateRangeRounded,
  ChatRounded
} from '@material-ui/icons';
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box
} from '@material-ui/core';

interface State {
  anchorEl: any;
}

class Navbar extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (this.state.anchorEl === null) {
      this.setState({ anchorEl: event.currentTarget });
    } else {
      this.setState({ anchorEl: null });
    }
  };

  render() {
    return (
      <div>
        <Styled.NavBar>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            p={1}
            m={1}
          >
            {/* logo */}
            <Link to="/" style={{ margin: '1rem 1rem' }}>
              <img
                src="images/logo_full.png"
                alt="logo img"
                width="200px"
                height="auto"
              />
            </Link>
            {/* 일정보기, 피드보기 버튼 */}
            {this.props.isLogin ? (
              <Box>
                <Box p={1}>
                  <Tooltip title="일정보기">
                    <IconButton aria-label="일정보기">
                      <Link to="/schedule">
                        <DateRangeRounded fontSize="large" />
                      </Link>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box p={1}>
                  <Tooltip title="피드보기">
                    <IconButton aria-label="피드보기">
                      <Link to="/feed">
                        <ChatRounded fontSize="large" />
                      </Link>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ) : null}
          </Box>
          {/* 메뉴 버튼 */}
          {this.props.isLogin ? (
            // 로그인 시 검색, 알림, 마이메뉴 버튼
            <Styled.Ul>
              <Search />
              <Styled.Li>
                <IconButton aria-label="notifications">
                  <Link to="#">
                    <NotificationsRounded />
                  </Link>
                </IconButton>
              </Styled.Li>
              <Styled.Li>
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  aria-label="my menu"
                  onClick={this.handleClick}
                >
                  <AccountCircleRounded />
                </IconButton>
                <Styled.StyledMenu
                  id="customized-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClick}
                >
                  <Styled.StyledMenuItem>
                    <ListItemIcon>
                      <EditRounded fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="프로필 수정" />
                  </Styled.StyledMenuItem>
                  <Styled.StyledMenuItem>
                    <ListItemIcon>
                      <SettingsRounded fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="환경 설정" />
                  </Styled.StyledMenuItem>
                  {this.props.isLogin ? (
                    <Styled.StyledMenuItem
                      onClick={() => {
                        window.sessionStorage.clear();
                      }}
                    >
                      <ListItemIcon>
                        <ExitToApp fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Log Out" />
                    </Styled.StyledMenuItem>
                  ) : null}
                </Styled.StyledMenu>
              </Styled.Li>
            </Styled.Ul>
          ) : (
            // 미로그인 시 로그인, 회원가입 버튼
            <Styled.Ul>
              <Styled.Li>
                <Button
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  style={{ backgroundColor: '#80cbc4', color: 'white' }}
                >
                  <Link to="/loginPage" style={{ color: 'white' }}>
                    <ListItemText primary="로그인" />
                  </Link>
                </Button>
              </Styled.Li>
              <Styled.Li>
                <Button
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  style={{ backgroundColor: '#80cbc4', color: 'white' }}
                >
                  <Link to="/signupPage" style={{ color: 'white' }}>
                    <ListItemText primary="회원가입" />
                  </Link>
                </Button>
              </Styled.Li>
            </Styled.Ul>
          )}
        </Styled.NavBar>
      </div>
    );
  }
}

export default Navbar;
