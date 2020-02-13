import styled from 'styled-components';

export const div = styled.div<any>`
  box-sizing: border-box;
  /* height: 90vh; */
  padding: 10px 0 20px 0;
  margin-top: 5px;
  /* margin-top: 20vh; */
  /* margin-top: ${props => {return (props.browserHeight) / 2}}px; */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  @media screen and (min-width: 600px){
    width: 584px;    
    /* margin-left: ${props => {return (props.browserWidth - 600) / 2}}px; */
  }
`

export const logo = styled.img`
  width: 20rem;
  height: auto;
  margin: 1rem;
  @media screen and (max-width: 400px){
    
  }
`