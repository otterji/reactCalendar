import React from 'react';
import styled, { css } from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Button, IconButton } from '@material-ui/core';
import { MenuProps } from '@material-ui/core/Menu';

export const NavBar = styled.nav<any>`
  font-size: 1vw;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  background: white;
  border-bottom: 2px solid #009689;
  /* padding: 0 10px 0 10px; */
  padding: 0 5vw 0 5vw;
  z-index: 100;
  a {
    color: black;
    text-decoration: none;
  }
`;

export const StBtnCont = styled.div<any>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  button {
    color: black;
    &:hover {
      background-color: inherit;
      color: #b2dfdb;
    }

    ${props => {
      return props.mode === 'visit'
        ? css`
            & {
              color: black;
            }
          `
        : css`
      &[class$=${props.mode}]{
        color: #b2dfdb;
      }
    `;
    }}
  }
`;

export const StBtn = styled(Button)`
  margin-left: 2px;

  &:hover {
    background-color: lightgray;
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
    '& .MuiTypography-body1': {
      fontSize: '1vw'
    },
    '&:hover': {
      backgroundColor: '#80cbc4',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export const StLeftCont = styled.div<any>`
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
