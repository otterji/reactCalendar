import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem } from '@material-ui/core';
import { MenuProps } from '@material-ui/core/Menu';

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
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
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

export const NavBar = styled.nav`
  background: white;
  display: fixed;
  padding-right: 20px;
  align-items: center;
  justify-content: space-between;
  a {
    color: black;
    text-decoration: none;
  }
`;

export const Ul = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Li = styled.li`
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
  height: 70px;
  justify-content: center;
  line-height: 16px;
  margin: 0 10px;
  text-decoration: none;
  white-space: nowrap;
`;
