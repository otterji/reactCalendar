import styled, { css } from 'styled-components';
import {
  FormControl,
  FormGroup,
  Button,
  createMuiTheme,
  TextField
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

export const StCont = styled.div<any>`
  /* height: ${props => (props.height - 200 - 59)}px; */
  margin-top: 59px;
  padding: 20vh 0 20vh 0;
  ${props => (props.page === 2 && css`padding: 0;`)}
  
  /* margin: 10vh 0 10vh 0; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Form = styled.form`
  align-items: center;
  border: 0.1rem solid gray;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  padding-top: 1rem;
`;

export const InputSet = styled.div<any>`
  label {
    display: inline-block;
    background-color: #b2dfdb;
    text-align: center;
    color: #009687;
    font-size: 80%;
    font-weight: 600;
    cursor: pointer;
    border-radius: 4px;
    width: 100px;
    margin: 0.5rem;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 5px;
    &:hover {
      background-color: #009687;
      color: white;
    }
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export const InterestContainer = styled(FormControl)<any>`
  margin: 1rem;
  margin-left: 3rem;
  margin-right: 3rem;
  padding: 1rem;
  border: 0.05rem solid #bfbfbf;
  border-radius: 5px;

  .MuiFormLabel-root {
    margin: 0.5rem;
    margin-bottom: 1rem;
    color: gray;
  }

  .MuiFormControlLabel-root {
    margin: 0;
    .MuiFormControlLabel-label {
      width: 80px;
      text-align: left;
    }
  }

  .MuiFormHelperText-root {
    font-size: 70%;
    text-align: right;
  }

  ${props =>
    props.validate === 'invalid' &&
    css`
      border-color: red;

      .MuiFormLabel-root {
        color: red;
      }
      .MuiFormHelperText-root {
        color: red;
      }
      .MuiSvgIcon-root {
        color: red;
      }
    `}

  ${props =>
    props.validate === 'valid' &&
    css`
      border-color: #b2dfdb;

      .MuiFormLabel-root {
        color: gray;
      }
      .MuiFormHelperText-root {
        color: #009687;
      }
      .MuiSvgIcon-root {
        color: #009687;
      }
    `}
`;

export const SFormGroup = styled(FormGroup)`
  display: flex;
  justify-content: center;
`;

export const STextField = styled(TextField)<any>`
  ${props =>
    props.validate === 'invalid' &&
    css`
    & label {

      color: red;    
    }
    & label.Mui-focused{
      color: red;
    }
    & .MuiOutlinedInput-root {      
      svg {
          color: red;
      }
      & fieldset {
        border-color: red;
      }
      &:hover fieldset {
        border-color: red;
      }
      &.Mui-focused {
        & fieldset{
          border-color: red;
        }
      }
  `}

  ${props =>
    props.validate === 'valid' &&
    css`
      & label {
        color: gray;
      }
      & .MuiOutlinedInput-root {
        svg {
          color: #009687;
        }
        & fieldset {
          border-color: #b2dfdb;
        }
      }
    `}

  & label.Mui-focused {
    color: #009687;
  }
  & .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #b2dfdb;
    }
    &.Mui-focused {
      svg {
        color: #009687;
      }
      & fieldset {
        border-color: #b2dfdb;
      }
    }
  }
`;

export const DatePicker = styled(KeyboardDatePicker)<any>`
  .MuiIconButton-root {
    color: #009687;
    padding: 0px;
  }

  ${props =>
    props.validate === 'invalid' &&
    css`
    & label {
      color: red;    
    }
    & label.Mui-focused{
      color: red;
    }
    & .MuiOutlinedInput-root {      
      svg {
          color: red;
        }
      & fieldset {
        border-color: red;
      }
      &:hover fieldset {
        border-color: red;
      }
      &.Mui-focused {
        & fieldset{
          border-color: red;
        }
      }
  `}

  ${props =>
    props.validate === 'valid' &&
    css`
      & label {
        color: gray;
      }
      & .MuiOutlinedInput-root {
        svg {
          color: #009687;
        }
        & fieldset {
          border-color: #b2dfdb;
        }
      }
    `}

  & label.Mui-focused {
    color: #009687;
  }
  & .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #b2dfdb;
    }
    &.Mui-focused {
      svg {
        color: #009687;
      }
      & fieldset {
        border-color: #b2dfdb;
      }
    }
  }
`;
export const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: { main: '#b2dfdb' }
  }
});

export const BtnContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10px;
  /* margin: 1rem; */
  margin: 1rem 0 1rem 0;
`;

export const Btn = styled(Button)<any>`
  background-color: ${props => (props.disabled ? 'gray' : '#b2dfdb')};
  color: #009687;
  font-size: 100%;
  font-weight: 600;
  width: ${props => (props.fixedWidth ? '200px' : '34vw')};

  /* padding-right: 80px;
  padding-left: 80px; */

  /* width: 100px;
  font-size: 70%;
  margin: 0.5rem; */

  &:hover {
    background-color: #009687;
    color: white;
  }

  @media screen and (min-width: 570px) {
    width: 200px;
  }
`;

export const CancelBtn = styled(Button)<any>`
  &:hover {
    // background-color: #b2dfdb;
    color: white;
  }
`;

export const MainContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  margin-top: ${props => (props.mode === 'home' ? 20 : props.navHeight)}px;
  width: ${props => (props.width < 1380 ? props.width - 100 : 1380)}px;
  .feedClass {
    margin-right: 20px;
    margin-left: 20px;
  }
`;
