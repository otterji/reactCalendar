import { Button, TextField } from '@material-ui/core/';
import styled, {css, } from 'styled-components';

interface divProps{
  browserWidth: number;
  browserHeight: number;
}
export const div = styled.div<divProps>`
  box-sizing: border-box;
  /* height: 90vh; */
  padding: 10px 0 20px 0;
  /* margin-top: 20vh; */
  /* margin-top: ${props => {return (props.browserHeight) / 2}}px; */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 0.2rem solid black;
  overflow: hidden;
  
  @media screen and (min-width: 600px){
    width: 584px;    
    margin-left: ${props => {return (props.browserWidth - 600) / 2}}px;
  }
`

export const logo = styled.img`
  width: 20rem;
  height: auto;
  margin: 1rem;

  @media screen and (max-width: 400px){
    
  }
`

export const form = styled.form`
  align-items: center;
  border: 0.1rem solid gray;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
`

interface textfieldProps {
  validate: string,
}
export const textfield = styled(TextField)<textfieldProps>`
  

  ${props => props.validate === 'invalid' && css`
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
  `
  }

  ${props => props.validate === 'valid' && css`
    & label {
      color: #8cebd1;    
    }
    & .MuiOutlinedInput-root {      
      svg {
          color: #8cebd1;
        }
      & fieldset {
        border-color: #8cebd1;
      }
    }
  `
  }

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


interface btnProps {
  mode: string,
}
export const btn = styled(Button)<btnProps>`
  background-color: ${props => (props.disabled ? 'gray' : 'black')};
  color: white;
  width: 100px;
  font-size: 70%;
  margin: 0.5rem;

  &:hover{
    background-color: #8cebd1;
  }

  ${props => props.mode==="login" && css`
      font-size: 100%;
      font-weight: 600;
      width: auto;
      margin: 1rem;
      padding-right: 80px;
      padding-left: 80px;
    `
  }
  ${props => props.mode==="google" && css`
      &:hover{
        background-color: blue;        
        font-weight: 600;
      }
    `
  }
  ${props => props.mode==="naver" && css`
      &:hover{
        background-color: #33cc33;
        font-weight: 600;
      }
    `
  }
  ${props => props.mode==="kakao" && css`
      &:hover{
        color: #4d2600;
        background-color: yellow;
        font-weight: 600;
      }
    `
  }
`