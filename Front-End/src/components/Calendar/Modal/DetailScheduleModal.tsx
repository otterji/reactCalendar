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
    endAt: data.schedules[0].endAt
  };

  const [detailData, setDetailData] = useState(defaultData);

  console.log('디폴트', defaultData);

  const [selectedStartDate, handleStartDateChange] = useState(detailData.startAt);

  const [selectedEndDate, handleEndDateChange] = useState(detailData.endAt);


  console.log(detailData)
  // isEdit값에 따라 detailData가 defaultData로 업데이트가 됨
  useEffect(() => setDetailData(defaultData), [isEdit]);

  // onChange를 걸어줘야해서 (value를 강제시키면 input으로 값을 넣는데 값이 바뀌지 않기 때문) detailData에 값을 갱신시켜줌
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // @ts-ignore
    const { name, value } = e.target as HTMLElement;
    handleEndDateChange(selectedEndDate)
    handleStartDateChange(selectedStartDate)
    // 안되네..
    setDetailData({ ...detailData, 
      [name]: value
    });
  }

  let str = document.getElementById("content")
  const upgradedContents: any = detailData.contents ? detailData.contents.replace(/(\n|\r\n)/g, `${<br></br>}`) : null

  const shareHandler = () => {
    openModal({ days: data.days, schedules: data.schedules, type: TYPE_SHARE });
  }

  // 중급문법 : data - 와 attributes (안티패턴) 분기 걸어주기 
  const editHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { attributes } = e.target as HTMLButtonElement;
    const value: boolean = attributes[0].value === "true";
    setIsEdit(value);
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
        content: detailData.contents,
        id: window.sessionStorage.getItem('id'),
        img: "string",
        schNo: detailData.schNo,
        video: "string"
    };
    try {
      // const res = await axios.post(`${_url}/feed/save`, detailData.schNo);
      console.log(params, 'params')

      // const res = await Axios.post('', params);
      // SUCCESS LOGIC
      close();
    } catch (e) {
      alert(e);
    }
  }


    return (
        <>
            <div className="Modal-overlay" onClick={close}/>
            <div className="Modal">
                <table style={{width: "90%"}}>
                    <tr>
                        <td>제목</td>
                        <td colSpan={2}><p className="title">{isEdit ?
                            <input type="text" name="title" value={detailData.title}
                                   onChange={changeHandler}/> :detailData.title}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>기간</td>
                        <td><ContentsDiv>시작일: {isEdit ?
                            <input type="date" name="startAt"
                                   onChange={changeHandler}/> : detailData.startAt}</ContentsDiv></td>
                        <td><ContentsDiv>종료일: {isEdit ?
                            <input type="date" name="endAt" onChange={changeHandler}/> :  '<br>'+ detailData.endAt}</ContentsDiv>
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td colSpan={2}><ContentsDiv>{isEdit ? <textarea value={detailData.contents} name="contents"
                                                                         onChange={changeHandler}/> : detailData.contents}</ContentsDiv>
                        </td>
                    </tr>
                    <tr>
                        <td>장소</td>
                        <td colSpan={2}><ContentsDiv>{isEdit ? <input type="text" value={detailData.place}
                                                                      onChange={changeHandler}/> : detailData.place}</ContentsDiv>
                        </td>
                    </tr>
                    <tr>
                        <td>태그</td>
                        <td colSpan={2}><ContentsDiv>{isEdit ? <input type="text" value={detailData.attendants}
                                                                      onChange={changeHandler}/> : detailData.attendants}</ContentsDiv>
                        </td>
                    </tr>
                </table>

                {isEdit ?
                    <>
                        <StyledButton onClick={editHandler} data-is-edit={false}>수정하지않기</StyledButton>
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