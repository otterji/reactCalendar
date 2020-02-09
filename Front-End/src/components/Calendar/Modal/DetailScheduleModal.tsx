import React, { FunctionComponent } from 'react';
import './Modal.scss';
import styled from 'styled-components';
import { ModalProps } from '../_types/calendar';

const DetailScheduleModal: FunctionComponent<ModalProps> = props => {
  const { close, data } = props;
  const { title, contents, startAt, endAt, place, attendants } = data.schedules[0];

  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
      <p className="title">{startAt}~{endAt}</p>
      <div className="content">
        <ContentsDiv >제목: {title}</ContentsDiv>
        <ContentsDiv >내용: {contents}</ContentsDiv>
        <ContentsDiv >장소: {place}</ContentsDiv>
        <ContentsDiv >태그: {attendants}</ContentsDiv>
      </div>
      </div>
    </>
  )

}

const ContentsDiv = styled.div`
  display: block;
`;

export { DetailScheduleModal };