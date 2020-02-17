import styled, { css } from 'styled-components';
import { Button, Checkbox } from '@material-ui/core';

export const profileName = styled.p`
  font-size: 23px;
  font-weight: 700;
  margin: 0 0 0 0.5rem;
`;

export const profileInfo = styled.p`
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
  text-align: center;
`;

// export const profileNumber = styled.p`
//   margin: 0.5rem 0 0 0;
//   font-size: 1.2rem;
//   font-weight: bold;
//   text-align: center;
// `;

export const content = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  margin: 2rem 0 2rem 0;
`;

export const img = styled.img`
  padding: 1rem;
  width: 50px;
  height: auto;
`;

export const listDiv = styled.div`
  position: absolute;
  background-color: black;
  top: center;
  left: center;
  .fcl{
    background-color: black;
  }
`;

export const btn = styled(Button) <any>`
  display: none;
  background-color: #b2dfdb;
  color: white;
  font-size: small;
  font-weight: 600;
  padding: 10px auto;
  margin-right: 0;
  &:hover {
    background-color: #009688;
  }
`;

export const checkbox = styled(Checkbox) <any>`
  ${props =>
    props.checked &&
    css`
      .MuiSvgIcon-root {
        color: ${props.colorlight};
      }
      // .MuiFormControlLabel-root {
      //   font-color: ${props.colordark};
      // }
    `}
`;

export const abcdefg = styled.div`
  &:hover{
    .bbb{
      display: flex;
    }
  }
`

export const div = styled.div`
  position: absolute;
  width: 200px;
  background-color: white;
  top: center;
  left: center;
`;
