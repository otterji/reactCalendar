import React, { FunctionComponent, useState, useEffect } from 'react';
import './Modal.scss';
import styled from 'styled-components';
import { ModalProps, ServerData } from '../_types/calendar';
import { StyledButton } from '../style';
import { TYPE_SHARE } from '../utils/CONST';
import Axios from 'axios';

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

  const [ detailData, setDetailData ] = useState(defaultData);

  // isEdit값에 따라 detailData가 defaultData로 업데이트가 됨
  useEffect(() => setDetailData(defaultData), [isEdit]);

  // onChange를 걸어줘야해서 (value를 강제시키면 input으로 값을 넣는데 값이 바뀌지 않기 때문) detailData에 값을 갱신시켜줌
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // @ts-ignore
    const { name, value } = e.target as HTMLElement;
    setDetailData({ ...detailData, [name]: value });
  }

  const shareHandler = () => {
    openModal({days:data.days, schedules: data.schedules, type: TYPE_SHARE});
  }

  // 중급문법 : data - 와 attributes (안티패턴) 분기 걸어주기 
  const editHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { attributes } = e.target as HTMLButtonElement;
    const value: boolean = attributes[0].value === "true";
    
    setIsEdit(value);
  }

  const submitHandler = async () => {
    const params = {
      ...detailData
    };
    try {
      // const res = await Axios.post('', params);
      // SUCCESS LOGIC
      close();
    } catch(e) {
      alert(e);
    }
  }

  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
      <p className="title">{isEdit ? <input type="text" name="title" value={detailData.title} onChange={changeHandler} /> : detailData.title}</p>
      <div className="content">
        {/* TODO: Datepicker change */}
        <ContentsDiv >시작일: {isEdit ? <input type="date" name="startAt" onChange={changeHandler} /> : detailData.startAt}</ContentsDiv>
        <ContentsDiv >종료일: {isEdit ?  <input type="date" name="endAt" onChange={changeHandler} /> : detailData.endAt}</ContentsDiv>
        <ContentsDiv >내용: {isEdit ? <textarea value={detailData.contents} name="contents" onChange={changeHandler} /> : detailData.contents}</ContentsDiv>
        {/* <ContentsDiv >장소: {isEdit ? <input type="text" value={place} /> : place}</ContentsDiv> */}
        {/* <ContentsDiv >태그: {isEdit ? <input type="text" value={attendants} /> : attendants}</ContentsDiv> */}
      </div>
      {isEdit ?
       <>
        <StyledButton onClick={editHandler} data-is-edit={false} >수정하지않기</StyledButton>
        <StyledButton onClick={submitHandler}>완료</StyledButton>
      </>
        : 
      <>
        <StyledButton onClick={editHandler} data-is-edit={true} >수정</StyledButton>
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