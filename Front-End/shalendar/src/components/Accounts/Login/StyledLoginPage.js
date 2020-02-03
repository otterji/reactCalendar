import React, { Component } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button'
import styled, {css} from 'styled-components';

export const div = styled.div`
  box-sizing: border-box;
  border: 0.2rem solid black;
  margin-top: 50px;
  padding: 10px 0 20px 0;
  overflow: hidden;
  text-align: center;
`;

export const logo = styled.img`
  width: 45%;
  height: auto;
  margin: 1rem;
`;

export const btn = styled(Button)`
  background-color: black;
  color: white;
  font-size: 100%;
  font-weight: 600;
  margin: 1rem;
  
  &:hover{
    background-color: #8cebd1;
  }

  ${props => props.login && css`
      padding-right: 80px;
      padding-left: 80px;
    `
  }
`

