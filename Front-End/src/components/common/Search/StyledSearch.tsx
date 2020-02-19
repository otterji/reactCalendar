import styled from 'styled-components';
import { TextField, IconButton } from '@material-ui/core';

export const StSearch = styled.div`
  display: flex;
  align-items: center;
  .searchTX{
    position: relative;
  }
`

export const StTextField = styled(TextField)<any>`  
  width: 180px;
  & label.Mui-focused {
    color: #8cebd1;      
  }
  & .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #8cebd1;
    }
    &.Mui-focused {
      svg {
        color: #8cebd1;
      }
      & fieldset{
        border-color: #8cebd1;
      }
    }
  } 
`

export const StIconBtn = styled(IconButton)`
  padding-top: 0;
  padding-bottom: 0;
  :hover{
    background-color: inherit;
  }
`
export const StListCont = styled.div`
  position: absolute;
  width: 130%;
  height: 200px;
  top: 95%;
  left: -15%;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background-color: white;
  z-index: 99;
  overflow: auto;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
`;
export const StNoCh = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5em;
`


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
