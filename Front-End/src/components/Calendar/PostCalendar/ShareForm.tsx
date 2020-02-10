import React, { FunctionComponent } from 'react';
import './Modal.scss';
import styled from 'styled-components';
import { ModalProps } from '../_types/calendar';
import { StyledButton } from '../style';

const ShareForm: FunctionComponent<ModalProps> = props => {
  const { close, data } = props;
  const { title, contents, startAt, endAt, place, attendants } = data.schedules[0];

  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
      <p className="title">SHAREFORM!!!! {title}</p>
      <div className="content">
        <ContentsDiv >시작일: {startAt}</ContentsDiv>
        <ContentsDiv >종료일: {endAt}</ContentsDiv>
        <ContentsDiv >내용: {contents}</ContentsDiv>
        <ContentsDiv >장소: {place}</ContentsDiv>
        <ContentsDiv >태그: {attendants}</ContentsDiv>
      </div>
      <StyledButton>수정</StyledButton>
      <StyledButton>공유</StyledButton>
      </div>
    </>
  )

}

const ContentsDiv = styled.div`
  display: block;
`;

export { ShareForm };