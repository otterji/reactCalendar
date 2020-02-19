import styled, { css } from 'styled-components';
import { Button, Checkbox } from '@material-ui/core';

export const StUDCont = styled.div`
  margin-top: 20px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  

  .avatarCont{
    .avatar{
      margin: 0.2em;
      width: 5vw;
      height: 5vw;
    }
  }

  .icon {
    margin-left: 5px;
    color: #00e6b8;
  }
`

export const profileName = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5vw;
  font-weight: 700;
  margin-top: 5px;
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

export const StICCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  div{
    margin: 0 0.4vw 0 0.4vw;
    font-size: 90%;
    color: gray;
  }
`

export const StSubersCont = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 0.9vw;
  font-weight: 400;
`

export const StSnsCont = styled.div`
  display: flex;
  /* align-self: stretch; */
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;

  .snsIcon{
    display: flex;
    margin: 0 0.5vw 0 0.5vw;
  }
  .sns{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    font-style: italic;
    font-size: 0.9vw;
  }
`;

export const StMsgCont = styled.div`
  display: flex;
  /* align-self: stretch; */
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 20px;

  .msgIcon{
    display: flex;
    margin: 0 0.5vw 0 0.5vw;
  }
  .msg{
    width:100%;
  }
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
  position: absolute;
  left: 130px;
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

export const StListLabel = styled.div`
  margin-top: 5px;
`

export const div = styled.div<any>`
  /* position: absolute; */
  overflow: auto;
  width: 90%;
  margin: 10px 5px 20px 5px;
  border: 2px solid #00e6b8;
  border-radius: 3px;
  padding-left: 0.5vw;
  height: ${props => (props.height - 350)}px;
  .MuiFormControlLabel-label{
    font-size: 0.9vw;
  }
  .MuiListItem-button{
    width: 10vw;
  }
  .MuiListItem-dense{
    padding: 0;
  }

    /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #cccccc; 
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #a6a6a6; 
  }
`;

export const labelHover = styled.div`
  &:hover{
    .bbb{
      display: inline;
    }
  }
`;