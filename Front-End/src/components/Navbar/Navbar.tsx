import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "../common/Search/Search";
import * as Styled from "./StyledNavbar";
import {
  AccountCircleRounded,
  SettingsRounded,
  EditRounded,
  ExitToApp,
  DateRangeRounded,
  ChatRounded,
  HomeRounded,  
} from "@material-ui/icons";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Popover,
  Grid,
  Box
} from "@material-ui/core";

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

  changeMode = (e: any) => {
    const _name= e.currentTarget.name;
    console.log(_name);
    this.props.changeMode(_name);
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
      <Styled.NavBar>
        {/* <Box display="flex" justifyContent="flex-start" alignItems="center" p={1} m={1}> */}
        <Styled.StLeftCont>
          {/* logo */}
          {/* <Link to="/" style={{ margin: "1rem 1rem" }}> */}
          <Link to="/mainPage" style={{ margin: "1rem 1rem" }}>
            <img
              src="images/logo_full.png"
              alt="images/logo_full.png"
              width="200px"
            />
          </Link>

          {/* 홈, 일정보기, 피드보기 버튼 */}
          <Styled.StBtnCont>
            {this.props.isLogin ? 
            <>
            {/* <Grid container direction="row">
              <Grid item> */}
              <Tooltip title="홈">
                <IconButton
                  aria-label="홈" 
                  name="home" 
                  onClick={this.changeMode}
                >
                  <HomeRounded/>
                </IconButton>
              </Tooltip>
              <Tooltip title="일정보기">
                <IconButton 
                  aria-label="일정보기" 
                  name="calendar" 
                  onClick={this.changeMode}
                  >
                  <DateRangeRounded />
                </IconButton>
              </Tooltip>
              {/* </Grid>
              <Grid item> */}
              <Tooltip title="피드보기">
                <IconButton 
                  aria-label="피드보기"
                  name="feed"
                  onClick={this.changeMode}
                >
                  <ChatRounded />
                </IconButton>
              </Tooltip>
                {/* </Grid>
              </Grid> */}
            </>
            : 
            null}
          </Styled.StBtnCont>

        </Styled.StLeftCont>
        {/* </Box> */}
        

        {/* 메뉴 버튼 */}
        <Styled.StRightCont>
        
        {this.props.isLogin ? 
          // 로그인 시 검색, 알림, 마이메뉴 버튼
          <Styled.StBtnCont>
          {/* <Styled.Ul> */}
            <Search/>
            {/* <Styled.Li> */}
            <Tooltip title="My">
              <IconButton
                aria-label="My"
                onClick={this.handleClick}
              >
              {
                this.state.anchorEl === null ?
                <AccountCircleRounded />
                :
                <AccountCircleRounded style={{color: "#8cebd1"}}/>
              }
              </IconButton>
            </Tooltip>

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

                <Styled.StyledMenuItem onClick={this.props.onLogout}>
                  <ListItemIcon>
                    <ExitToApp fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </Styled.StyledMenuItem>

              </Styled.StyledMenu>
            {/* </Styled.Li> */}
          {/* </Styled.Ul> */}
          </Styled.StBtnCont>
          : 
          // 미로그인 시 로그인, 회원가입 버튼
          <>
          {/* <Styled.Ul> */}
            {/* <Styled.Li> */}
          <Styled.StBtn> 
            <Link to="/loginPage" style={{color:"white"}}>
              로그인
            </Link>
          </Styled.StBtn>
          <Styled.StBtn>
            <Link to="/signupPage" style={{color:"white"}}>
              회원가입
            </Link>
          </Styled.StBtn>

              {/* <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                style={{ backgroundColor: "#80cbc4", color: "white" }}
              >
                <Link to="/loginPage" style={{ color: "white" }}>
                  <ListItemText primary="로그인" />
                </Link>
              </Button> */}
            {/* </Styled.Li> */}
            {/* <Styled.Li> */}
              {/* <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                style={{ backgroundColor: "#80cbc4", color: "white" }}
              >
              <Link to="/signupPage" style={{ color: "white" }}>
                <ListItemText primary="회원가입" />
              </Link>
              </Button> */}
            {/* </Styled.Li> */}
          {/* </Styled.Ul> */}
          </>
        }
        
        </Styled.StRightCont>

      </Styled.NavBar>
    );
  }
}

export default Navbar;
