import React, { useState, EffectCallback } from 'react';
import './Modal.scss';
import '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, 
    } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DateTimePicker } from "@material-ui/pickers";
import axios from "axios";

const SERVER_URL = 'http://52.79.117.94:8080';
// const SERVER_URL = 'http://52.79.117.94:8080';

type ReqData = {
  contents: string,
  attendants: string,
  place: string,
  title: string,
  startAt: Date,
  endAt: Date,
  id: any,
};

const AddForm = ({ close, selectedDate, setisView }:any) => {
  // `{${year}-${month}-${day}T00:00:00}`
  const [selectedStartDate, handleStartDateChange] = useState(selectedDate);
  const changeStartDate = (_date: Date|null) => {
    handleStartDateChange(_date)
  }

  const [selectedEndDate, handleEndDateChange] = useState(selectedDate);
  const changeEndDate = (_date: Date | null) => {
    handleEndDateChange(_date);
  }


  const [data, setData] = useState({} as ReqData);
  const onChangeInput = (e: any) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({
      ...data,
      [id]: value,
    },);
    
  }

  const onSubmit = async () => {
    
    try{
      // 보내는 Data 를 펼쳤을때 이런 것들이 있다고 정의
      const reqData: ReqData = {
        ...data,
        startAt: selectedStartDate,
        endAt: selectedEndDate,
        id: window.sessionStorage.getItem('id'),
      }
      console.log(reqData)
      // Validation error cut
      if(!reqData.title || !reqData.startAt || !reqData.endAt) {
        alert("wft");
        return;
      }

      const res = await axios.post(`${SERVER_URL}/makeSchedules`, reqData);

      
      if(![200, 201, 301].includes(res.status)) {
        alert('wtf server');
        return;
      };
      // alert(JSON.stringify(res.data, null, 2));
      setisView(true);
      
      // const keyLength = (Object.keys(reqData)).length;
      // if(VALIDATION_LENGTH !== keyLength) {
      //   alert('empty data');
      //   return;
      // }
    } catch(err){
      alert(err); // WTF?
    }
  }

  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
      <input placeholder="제목을 입력하세요" className="title" id="title" onChange={onChangeInput} />
        <div className="content">
          <ThemeProvider theme={defaultMaterialTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                value={selectedStartDate}
                onChange={changeStartDate}
                label="시작일"
                showTodayButton
              />
              <DateTimePicker
                value={selectedEndDate}
                onChange={changeEndDate}
                label="종료일"
                showTodayButton
              />
            </MuiPickersUtilsProvider>
          </ThemeProvider> <br />
        내용 : <input id="contents" onChange={onChangeInput} /> <br />
        참석자:   <input id="attendants" onChange={onChangeInput} /> <br />
        장소:   <input id="place" onChange={onChangeInput} /> <br />
        </div>
        <div className="button-wrap">
          <button 
          onClick={onSubmit}
          >추가</button>
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
