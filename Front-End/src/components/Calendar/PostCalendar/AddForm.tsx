import React, { useState } from 'react';
import './Modal.scss';
import '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import styled, { css, } from 'styled-components';
import { createMuiTheme, 
    } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";


const AddForm = ({ close, year, month, day, isView, setisView }:any) => {

  const onChangeEndDate = (_date: Date | null) => {
    // const [endDate, setendDate] = useState(_date);
    console.log('바뀜');
  };

  // const [startDate, setStartDate] = useState(new Date());

  // const handleDateChange = () => {
  //   const [selectedDate, handleDateChange] = useState(new Date("2018-01-01T00:00:00.000Z"));
  // }

  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
      <input placeholder="제목을 입력하세요" className="title"></input>
        <div className="content">
        <ThemeProvider theme={defaultMaterialTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              variant="inline"
              ampm={false}
              label="시작일"
              value={selectedDate}
              onChange={() => handleDateChange}
              onError={console.log}
              disablePast
              format="yyyy/MM/dd HH:mm"
            />
            <KeyboardDateTimePicker
              variant="inline"
              ampm={false}
              label="종료일"
              value={selectedDate}
              onChange={() => handleDateChange}
              onError={console.log}
              disablePast
              format="yyyy/MM/dd HH:mm"
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider> <br></br>
        내용 : <input></input> <br></br>
        참석자:   <input></input> <br></br>
        장소:   <input></input> <br></br>
        </div>
        <div className="button-wrap">
          <button onClick={() => setisView(true)}>추가</button>
        </div>
      </div>
    </>
  )
 }
export default AddForm ;

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: {main:'#8cebd1'},
    },
  });

const StyledDatePicker = styled(KeyboardDatePicker)<any>`
  .MuiIconButton-root{
    color: black;
    padding: 0px;
  }

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
  `}

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