import React, { useState } from 'react';
import './Modal.scss';
import '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  createMuiTheme,
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

const AddForm = ({ close, dayData, rerenderHandler }: any) => {
  // `{${year}-${month}-${day}T00:00:00}`
  const [selectedStartDate, handleStartDateChange] = useState(dayData);
  const changeStartDate = (_date: Date | null) => {
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
    });

  }

  const onSubmit = async () => {
    try {
      console.log(data)
      // 보내는 Data 를 펼쳤을때 이런 것들이 있다고 정의
      const text: any = data.contents

      const reqData: ReqData = {
        ...data,
        startAt: selectedStartDate,
        endAt: selectedEndDate,
        id: window.sessionStorage.getItem('id'),
        // contents: text.replace(/(\n|\r\n)/g, '<br>')
      }
      // Validation error cut
      if (!reqData.title || !reqData.startAt || !reqData.endAt) {
        alert("wft");
        return;
      }

      const res = await axios.post(`${_url}/makeSchedules`, reqData);

      if (![200, 201, 301].includes(res.status)) {
        alert('wtf server');
        return;
      }
      ;

      close();

    } catch (err) {
      alert(err); // WTF?
    }
  }

  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
        <table style={{ width: "90%" }}>
          <tr style={{ borderBottom: "3px solid black" }}>
            <td>제목</td>
            <td colSpan={2}><input placeholder="제목을 입력하세요" className="title" id="title"
              onChange={onChangeInput} style={{ padding: "10px" }} /></td>
          </tr>
          <tr>
            <ThemeProvider theme={defaultMaterialTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <td>기간</td>
                <td>
                  <DateTimePicker
                    value={selectedStartDate}
                    onChange={changeStartDate}
                    label="시작일"
                    showTodayButton
                  />
                </td>
                <td>
                  <DateTimePicker
                    value={selectedEndDate}
                    onChange={changeEndDate}
                    label="종료일"
                    showTodayButton
                  />
                </td>
              </MuiPickersUtilsProvider>
            </ThemeProvider> <br />
          </tr>
          <tr>
            <td>내용</td>
            <td colSpan={2}>
              <textarea id="contents" name="contents" onChange={onChangeInput} style={{ width: "100%", padding: "10px" }} cols={30}
                rows={10}></textarea>
              {/*<input id="contents" onChange={onChangeInput} style={{width: "100%"}}/>*/}
            </td>
          </tr>
          <tr>
            <td>참석자</td>
            <td colSpan={2}><input id="attendants" onChange={onChangeInput}
              style={{ width: "100%" }} /></td>
          </tr>
          <tr>
            <td>장소</td>
            <td colSpan={2}><input id="place" onChange={onChangeInput} style={{ width: "100%" }} /></td>
          </tr>
        </table>
        <div className="button-wrap">
          <button onClick={onSubmit}>추가</button>
        </div>
      </div>
    </>
  )
}
export default AddForm;

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: { main: '#8cebd1' },
  },
});

