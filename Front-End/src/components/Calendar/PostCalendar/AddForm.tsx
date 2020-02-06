import React, { useState } from 'react';
import './Modal.scss';
import '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, 
    } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import { DateTimePicker } from "@material-ui/pickers";


const AddForm = ({ close, year, month, day, isView, setisView }:any) => {
  // `{${year}-${month}-${day}T00:00:00}`
  const [selectedStartDate, handleStartDateChange] = useState<any>(new Date(`${year}-${month}-${day}`));

  const changeStartDate = (_date: Date|null) => {
    handleStartDateChange(_date)
  }

  const [selectedEndDate, handleEndDateChange] = useState<any>(new Date(`${year}-${month}-${day}`));

  const changeEndDate = (_date: Date|null) => {
    handleEndDateChange(_date)
  }

  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
      <input placeholder="제목을 입력하세요" className="title"></input>
        <div className="content">
        <ThemeProvider theme={defaultMaterialTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              value={selectedStartDate}
              disablePast
              onChange={changeStartDate}
              label="시작일"
              showTodayButton
            />
            <DateTimePicker
              value={selectedEndDate}
              disablePast
              onChange={changeEndDate}
              label="종료일"
              showTodayButton
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
