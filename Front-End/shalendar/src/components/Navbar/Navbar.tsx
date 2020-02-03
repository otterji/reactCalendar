import * as React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../common/logo_full.png";
// import * as Styled from './StyledNavbar';
import styled from 'styled-components';
import {NotificationsRounded, AccountCircleRounded, SettingsRounded, MenuRounded, ExitToApp} from '@material-ui/icons';
import {Button, Menu, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {MenuProps} from '@material-ui/core/Menu';
import {withStyles} from '@material-ui/core/styles';
// import {MoveToInbox, Drafts, Send} from '@material-ui/icons';

// interface Props {
//   brand: {
//     name: string,
//     to: string,
//   }
//   isLogin:boolean,
// }
interface State {

}
// burgermenu part
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: '#80cbc4',
      // backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

// Main Navbar part
const Navbar = (props:any) => {
  // const { brand, links } = props;
  const { brand } = props;
  // const NavLinks: any = () => links.map(
  //   (link: {name: string, to: string}) => 
  //     <Li key={link.name}>
  //       <a href={link.to}>{link.name}</a>
  //     </Li>
  // );
 
  const isLogin = props.isLogin;
  console.log(isLogin);
// class Navbar extends Component<any, State>{
  // burger menu part
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // return part
  return (
    <div>
      <NavBar>
        <Brand href={brand.to}><img src={Logo} margin-top="10px" width="150px" height="auto"/></Brand>
        <Ul>
          {/* <NavLinks/> */}
          {/* <Li><a href="/notice"><NotificationsRounded/></a></Li>
          <Li><a href="/account"><AccountCircleRounded/></a></Li>
          <Li><a href="/settings"><SettingsRounded/></a></Li> */}
          <Li><Link to="/"><NotificationsRounded/></Link></Li>
          <Li>
            {
              props.isLogin ? 
              <Link to="/"><AccountCircleRounded/></Link>
              :
              <Link to="/loginPage"><AccountCircleRounded/></Link>
            }
            
          </Li>
          <Li><Link to="/"><SettingsRounded/></Link></Li>


          {/* burgermenu part */}
          {props.isLogin ? 
          <Li>
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              onClick={handleClick}
              style={{backgroundColor: '#80cbc4', color: 'white'}}
            >
              <MenuRounded/>
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem>
                <ListItemIcon>
                  <NotificationsRounded fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Notice" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <AccountCircleRounded fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="My page" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <SettingsRounded fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </StyledMenuItem>
              {
                props.isLogin ? 
                <StyledMenuItem onClick={() => {window.sessionStorage.clear()}}>
                  <ListItemIcon>
                    <ExitToApp fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Log Out"/>
                </StyledMenuItem>
                :
                null
              }
            </StyledMenu>
          </Li>
          : null}
          
          
        </Ul>
      </NavBar>


    </div>
  )
};

const ColorFont = {
  colors: {
    bg: `#fff`,
    dark: `gray`,
    light: `#EEEEEE`,
    red: `#ff5851`,
  },
  fonts: {
    body: `IBM Plex Sans, sans-serif`,
    heading: `IBM Plex Sans, sans-serif`,
  }
}

const NavBar = styled.nav`
  background: white;
  font-family: ${ColorFont.fonts.heading};
  display: fixed;
  padding-right: 20px;
  align-items: center;
  justify-content: space-between;
  a { color: black; text-decoration: none; }`;

const Brand = styled.a`
  font-size: 25px;
  font-weight: bold;
  font-style: italic;
  margin-left: 1rem;
  padding-right: 1rem;`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;`;

const Li = styled.li`
  flex: 0 0 auto;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: #999;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: #999;
  display: flex;
  font-size: 14px;
  height: 50px;
  justify-content: center;
  line-height: 16px;
  margin: 0 10px ;
  text-decoration: none;
  white-space: nowrap;`;

export default Navbar;