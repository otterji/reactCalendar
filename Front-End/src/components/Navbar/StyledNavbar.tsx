import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Button, IconButton } from '@material-ui/core';
import { MenuProps } from '@material-ui/core/Menu';

export const NavBar = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: white; */

  box-sizing: border-box;
  width: 100%;
  background: white;
  border-bottom: 1px solid #009689;
  /* padding: 0 10px 0 10px; */
  padding: 0 5vw 0 5vw;
  z-index:1;
  a {
    color: black;
    text-decoration: none;
  }
`;

export const StBtnCont = styled.div<any>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items:center;

  button{
    color: black;
    &:hover {
      background-color: inherit;
      color: #8cebd1;
    }
    &[class$=${(props) => (props.mode)}]{
      color: #8cebd1;
    }
  }
`;

export const StBtn = styled(Button)`
  background-color: black;  
  font-size: 100%;
  margin-left: 2px;
  
  &:hover{
    background-color: #8cebd1;
  }
`;

export const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
));

export const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: '#80cbc4',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export const StLeftCont = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
`;

export const StRightCont = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
`;

export const StIconBtn = styled(IconButton)`
  padding-top: 0;
  padding-bottom: 0;
  background-color: inherit;
`;

// export const Ul = styled.ul`
//   display: flex;
//   flex-wrap: nowrap;
//   overflow-x: auto;
//   -webkit-overflow-scrolling: touch;
// `;

// export const Li = styled.li`
//   flex: 0 0 auto;
//   -webkit-box-align: center;
//   -webkit-box-pack: center;
//   -webkit-tap-highlight-color: transparent;
//   align-items: center;
//   color: #999;
//   height: 100%;
//   justify-content: center;
//   text-decoration: none;
//   -webkit-box-align: center;
//   -webkit-box-pack: center;
//   -webkit-tap-highlight-color: transparent;
//   align-items: center;
//   color: #999;
//   display: flex;
//   font-size: 14px;
//   height: 70px;
//   justify-content: center;
//   line-height: 16px;
//   margin: 0 10px;
//   text-decoration: none;
//   white-space: nowrap;
// `;
