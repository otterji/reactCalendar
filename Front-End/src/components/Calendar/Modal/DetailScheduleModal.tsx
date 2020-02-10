import React, { FunctionComponent } from 'react';
import './Modal.scss';
import styled from 'styled-components';
import { ModalProps } from '../_types/calendar';
import { StyledButton } from '../style';
import { TYPE_SHARE } from '../utils/CONST'

const DetailScheduleModal: FunctionComponent<ModalProps> = props => {
  const { close, data, openModal } = props;
  const { title, contents, startAt, endAt, place, attendants } = data.schedules[0];

  const shareHandler = () => {
    console.log('share');
    // openModal({data:data, close:close, type: TYPE_SHARE});
  }

  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
      <p className="title">{title}</p>
      <div className="content">
        <ContentsDiv >시작일: {startAt}</ContentsDiv>
        <ContentsDiv >종료일: {endAt}</ContentsDiv>
        <ContentsDiv >내용: {contents}</ContentsDiv>
        <ContentsDiv >장소: {place}</ContentsDiv>
        <ContentsDiv >태그: {attendants}</ContentsDiv>
      </div>
      <StyledButton>수정</StyledButton>
      <StyledButton onClick={shareHandler}>공유</StyledButton>
      </div>
    </>
  )

}

const ContentsDiv = styled.div`
  display: block;
`;

export { DetailScheduleModal };