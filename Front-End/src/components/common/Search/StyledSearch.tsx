import styled from 'styled-components';
import { TextField, IconButton } from '@material-ui/core';

export const StSearch = styled.div`
  display: flex;
  align-items: center;
  .searchTX {
    position: relative;
  }
`;

export const StTextField = styled(TextField)<any>`
  width: 180px;
  & label.Mui-focused {
    color: #009687;
  }
  & .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #b2dfdb;
    }
    &.Mui-focused {
      svg {
        color: #b2dfdb;
      }
      & fieldset {
        border-color: #b2dfdb;
      }
    }
  }
`;

export const StIconBtn = styled(IconButton)`
  padding-top: 0;
  padding-bottom: 0;
  :hover {
    background-color: #b2dfdb;
  }
`;
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
`;
export const StNoCh = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5em;
`;
