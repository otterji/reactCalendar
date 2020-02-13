import React, {FunctionComponent, useState, useEffect} from 'react';
import './Modal.scss';
import styled from 'styled-components';
import {ModalProps, ServerData} from '../_types/calendar';
import {StyledButton} from '../style';
import {TYPE_SHARE} from '../utils/CONST';
import axios from 'axios';
import '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
    createMuiTheme,
} from "@material-ui/core";

import {ThemeProvider} from "@material-ui/styles";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {DateTimePicker} from "@material-ui/pickers";
import {url as _url} from "../../../url"
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date';


const DetailScheduleModal: FunctionComponent<ModalProps> = props => {
    const [isEdit, setIsEdit] = useState(false);
    const {close, data, openModal} = props;

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
    // const [editedStartDate, setEditedStartDate] = useState((detailData.startAt) as MaterialUiPickersDate);
    // const [editedEndDate, setEditedEndDate] = useState((detailData.endAt) as MaterialUiPickersDate);

    // isEdit값에 따라 detailData가 defaultData로 업데이트가 됨
    useEffect(() => setDetailData(defaultData), [isEdit]);

    const changeDateStartHandler = (e: MaterialUiPickersDate) => setDetailData({...detailData, startAt: (e) as Date});
    const changeDateEndHandler = (e: MaterialUiPickersDate) => setDetailData({...detailData, endAt: (e) as Date});

    // onChange를 걸어줘야해서 (value를 강제시키면 input으로 값을 넣는데 값이 바뀌지 않기 때문) detailData에 값을 갱신시켜줌
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // @ts-ignore
        const {name, value} = e.target as HTMLElement;
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
        openModal({days: data.days, schedules: data.schedules, type: TYPE_SHARE});
    }

    // 중급문법 : data - 와 attributes (안티패턴) 분기 걸어주기
    const editHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {attributes} = e.target as HTMLButtonElement;
        const value: boolean = attributes[0].value === "true";
        setIsEdit(value);
    }

    const submitHandler = async () => {
        const params = {
            ...detailData,
            id: window.sessionStorage.getItem('id'),
        };
        try {
            await axios.put(`${_url}/updateSchedules`, params);
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
                    <tbody>
                    <tr>
                        <td>제목</td>
                        <td colSpan={2}>{isEdit ?
                            <input type="text" name="title" value={detailData.title}
                                   onChange={changeHandler}/> : detailData.title}
                        </td>
                    </tr>
                    <tr>
                        <td>기간</td>
                        <td><ContentsDiv>
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DateTimePicker
                                        value={detailData.startAt}
                                        onChange={changeDateStartHandler}
                                        label="시작일"
                                        showTodayButton
                                        name="startAt"
                                    />
                                </MuiPickersUtilsProvider>
                            </ThemeProvider>
                        </ContentsDiv></td>
                        <td><ContentsDiv>
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DateTimePicker
                                        value={detailData.endAt}
                                        onChange={changeDateEndHandler}
                                        label="종료일"
                                        showTodayButton
                                        name="endAt"
                                    />
                                </MuiPickersUtilsProvider>
                            </ThemeProvider>
                        </ContentsDiv>
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td colSpan={2}>
                            <div className="textA">{isEdit ? <textarea value={detailData.contents} name="contents"
                                                                       onChange={changeHandler}
                                                                       style={{width: "95%", padding: "10px"}}
                                                                       cols={30}
                                                                       rows={8}/> : detailData.contents?.split('\n').map(line => {
                                return (<span>{line}<br/></span>)
                            })}</div>
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
                    </tbody>
                </table>
                            
                {isEdit ?
                    <>
                        <div className="button-wrapDouble">
                            <button onClick={editHandler} data-is-edit={false}>뒤로가기</button>
                            <button onClick={submitHandler}>완료</button>
                        </div>
                    </>
                    :
                    <>
                        <div className="button-wrapDouble">
                            <button onClick={editHandler} data-is-edit={true}>수정</button>
                            <button onClick={shareHandler}>공유</button>
                        </div>
                    </>}
            </div>
        </>
    )

}

const ContentsDiv = styled.div`
  display: block;
`;

export {DetailScheduleModal};

const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: {main: '#8cebd1'},
    },
});