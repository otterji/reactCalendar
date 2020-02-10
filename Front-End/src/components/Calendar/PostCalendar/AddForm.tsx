import React, { useState } from 'react';
import './Modal.scss';
import '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, 
    } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DateTimePicker } from "@material-ui/pickers";
import axios from "axios";
import { url as _url } from '../../../url';


type ReqData = {
  contents: string,
  attendants: string,
  place: string,
  title: string,
  startAt: Date,
  endAt: Date,
  id: any,
};

const AddForm = ({ close, dayData, rerenderHandler }:any) => {
  // `{${year}-${month}-${day}T00:00:00}`
  const [selectedStartDate, handleStartDateChange] = useState(dayData);
  const changeStartDate = (_date: Date|null) => {
    handleStartDateChange(_date)
  }

  const [selectedEndDate, handleEndDateChange] = useState(dayData);
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
      console.log('요청보내는거', reqData)
      // Validation error cut
      if(!reqData.title || !reqData.startAt || !reqData.endAt) {
        alert("wft");
        return;
      }

      const res = await axios.post(`${_url}/makeSchedules`, reqData);
      console.log('받은거', res)
      
      if(![200, 201, 301].includes(res.status)) {
        alert('wtf server');
        return;
      };

      close();
      
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
          // 이후 close 해야함
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
