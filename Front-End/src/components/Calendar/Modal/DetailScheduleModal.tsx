import React, { FunctionComponent, useState, useEffect } from 'react';
import './Modal.scss';
import styled from 'styled-components';
import { ModalProps, ServerData } from '../_types/calendar';
import { StyledButton } from '../style';
import { TYPE_SHARE } from '../utils/CONST';
import axios from 'axios';
import '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  createMuiTheme,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DateTimePicker } from "@material-ui/pickers";
import { url as _url } from "../../../url"


const DetailScheduleModal: FunctionComponent<ModalProps> = props => {

  const [isEdit, setIsEdit] = useState(false);

  const { close, data, openModal } = props;

  // INFO: 글쓴이 api 만들어달라고 하셈: id or sid(시퀀스넘버)
  // const isMyPost = data.schedules[0].author === window.sessionStorage.getItem('id');

  // NULL 일때 뜨는 오류를 고치기 위함
  const defaultData: ServerData = {
    title: data.schedules[0].title || '-',
    contents: data.schedules[0].contents || '-',
    place: data.schedules[0].place || '-',
    attendants: data.schedules[0].attendants || '-',
    startAt: data.schedules[0].startAt,
    endAt: data.schedules[0].endAt,
    schNo: data.schedules[0].schNo
  };

  // 처음 값을 detailData에 저장
  const [detailData, setDetailData] = useState(defaultData);
  // console.log('디폴트', defaultData);

  // 각각 바뀔 애들 state 걸어주기 -> 멍청한짓...
  // const [editedStartDate, setEditedStartDate] = useState(detailData.startAt);
  // const [editedEndDate, setEditedEndDate] = useState(detailData.endAt);
  // const [editedAttendants, setEditedAttendants] = useState(detailData.attendants);
  // const [editedContents, setEditedContents] = useState(detailData.contents);
  // const [editedPlace, setEditedPlace] = useState(detailData.place);
  // const [editedTitle, setEditedTitle] = useState(detailData.title);


  console.log(detailData)
  // isEdit값에 따라 detailData가 defaultData로 업데이트가 됨
  useEffect(() => setDetailData(defaultData), [isEdit]);

  // onChange를 걸어줘야해서 (value를 강제시키면 input으로 값을 넣는데 값이 바뀌지 않기 때문) detailData에 값을 갱신시켜줌
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // @ts-ignore
    const { name, value } = e.target as HTMLElement;
    // 멍청한 짓 22....
    // setEditedStartDate(editedStartDate);
    // setEditedEndDate(editedEndDate);
    // setEditedTitle(editedTitle);
    // 안되네..
    setDetailData({
      ...detailData,
      [name]: value
    });

  }

  // let str = document.getElementById("content")
  // const upgradedContents: any = detailData.contents ? detailData.contents.replace(/(\n|\r\n)/g, `${<br></br>}`) : null

  const shareHandler = () => {
    openModal({ days: data.days, schedules: data.schedules, type: TYPE_SHARE });
  }

  // 중급문법 : data - 와 attributes (안티패턴) 분기 걸어주기 
  const editHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { attributes } = e.target as HTMLButtonElement;
    const value: boolean = attributes[0].value === "true";
    setIsEdit(value);

    // makeSchedule 할때 랑 똑같은거 보내는데 수정된애만 업데이트 해서 보냄 -> 멍청한짓 33..
    // const params = {
    //   ...detailData,
    //   attendants: editedAttendants,
    //   contents: editedContents,
    //   endAt: editedEndDate,
    //   startAt: editedStartDate,
    //   place: editedPlace,
    //   title: editedTitle
    // };
    // await axios.post(`${_url}/updateSchedules`, detailData);

  }

  const submitHandler = async () => {
    // const changeStartDate = (_date: Date|null) => {
    // //   handleStartDateChange(_date)
    // // }

    // const changeEndDate = (_date: Date | null) => {
    // //   handleEndDateChange(_date);
    // // }    

    const params = {
      ...detailData,
      id: window.sessionStorage.getItem('id'),
    };
    try {
      console.log(params, '보내는게 params')
      const res = await axios.put(`${_url}/updateSchedules`, params);
      console.log(res)
      close();
    } catch (e) {
      alert(e);
    }
  }


  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
        <table style={{ width: "90%" }}>
          <tr>
            <td>제목</td>
            <td colSpan={2}><p className="title">{isEdit ?
              <input type="text" name="title" value={detailData.title}
                onChange={changeHandler} /> : detailData.title}</p>
            </td>
          </tr>
          <tr>
            <td>기간</td>
            <td><ContentsDiv>
              <ThemeProvider theme={defaultMaterialTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <td>
                    <DateTimePicker
                      value={detailData.startAt}
                      onChange={() => changeHandler}
                      label="시작일"
                      showTodayButton
                    />
                  </td>
                </MuiPickersUtilsProvider>
              </ThemeProvider>
            </ContentsDiv></td>
            <td><ContentsDiv>
              <ThemeProvider theme={defaultMaterialTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <td>
                    <DateTimePicker
                      value={detailData.endAt}
                      onChange={() => changeHandler}
                      label="종료일"
                      showTodayButton
                    />
                  </td>
                </MuiPickersUtilsProvider>
              </ThemeProvider>
            </ContentsDiv>
            </td>
          </tr>
        <tr>
          <td>내용</td>
          <td colSpan={2}><ContentsDiv>{isEdit ? <textarea value={detailData.contents} name="contents"
            onChange={changeHandler} /> : detailData.contents}</ContentsDiv>
          </td>
        </tr>
        <tr>
          <td>장소</td>
          <td colSpan={2}><ContentsDiv>{isEdit ? <input type="text" value={detailData.place}
            onChange={changeHandler} /> : detailData.place}</ContentsDiv>
          </td>
        </tr>
        <tr>
          <td>태그</td>
          <td colSpan={2}><ContentsDiv>{isEdit ? <input type="text" value={detailData.attendants}
            onChange={changeHandler} /> : detailData.attendants}</ContentsDiv>
          </td>
        </tr>
        </table>

      {isEdit ?
        <>
          <StyledButton onClick={editHandler} data-is-edit={false}>뒤로가기</StyledButton>
          <StyledButton onClick={submitHandler}>완료</StyledButton>
        </>
        :
        <>
          <StyledButton onClick={editHandler} data-is-edit={true}>수정</StyledButton>
          <StyledButton onClick={shareHandler}>공유</StyledButton>
        </>}
    </div>
    </>
  )

}

const ContentsDiv = styled.div`
  display: block;
`;

export { DetailScheduleModal };

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: { main: '#8cebd1' },
  },
});