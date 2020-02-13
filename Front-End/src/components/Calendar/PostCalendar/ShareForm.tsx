import React, { FunctionComponent, useState } from 'react';
import './Modal.scss';
import styled, { css } from 'styled-components';
import { ModalProps } from '../_types/calendar';
import { StyledButton } from '../style';
import axios from 'axios';
import { url as _url } from '../../../url';
import { Avatar } from "@material-ui/core";


const ShareForm: FunctionComponent<ModalProps> = props => {
  const { close, data } = props;
  const { title, contents, startAt, endAt, place, attendants, schNo } = data.schedules[0];

  // content 는 새로 입력하는 값! contents랑 헷갈리지 말자ㅠ
  const [content, setContent] = useState('')
  const [selectedImgFile, setSelecctedImgFile] = useState('')
  const [selectedVideoFile, setSelecctedVideoFile] = useState('')

  const handleImgFileInput = (e: any) => {
    setSelecctedImgFile(e.target.files[0])
    console.log(e.target.files)
  }

  const handleVideoFileInput = (e: any) => {
    setSelecctedVideoFile(e.target.files[0])
  }

  const handleContentInput = (e: any) => {
    setContent(e.target.value)
  }

  const submitHandler = async () => {

    const reqData = {
      content: content,
      id: window.sessionStorage.getItem('id'),
      img: selectedImgFile,
      video: selectedVideoFile,
      schNo: schNo,
    }
    console.log('reqData', reqData)
    try {
      console.log(selectedImgFile)
      if (selectedImgFile !== '') {
        const formData = new FormData();
        formData.append('file', selectedImgFile);
        console.log('formData', formData)
      }
      // const res = await axios.post(`${_url}/feed/save`, params);
      alert('피드에 공유되었습니다 >_< 야호!')
      close();
    } catch (e) {
      alert(e);
    }
  }



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

          <input
            id="content"
            type="textarea"
            placeholder="피드에 올릴 부가설명을 입력해주세요"
            onChange={handleContentInput}
          />

          <StyledInputSet >
            <label htmlFor="imageUpload">사진 업로드</label>
            <input id="imageUpload" type="file" onChange={handleImgFileInput} />
          </StyledInputSet>

          <StyledInputSet >
            <label htmlFor="imageUpload">동영상 업로드</label>
            <input id="imageUpload" type="file" onChange={handleVideoFileInput} />
          </StyledInputSet>

        </div>
        <StyledButton>수정</StyledButton>
        <StyledButton onClick={submitHandler}>완료</StyledButton>
      </div>
    </>
  )

}

const ContentsDiv = styled.div`
  display: block;
`;

export { ShareForm };

const StyledInputSet = styled.div<any>`
  label{
    display: block;
    background-color: black;
    color: white;
    font-size: 80%;
    font-weight: 600;
    cursor: pointer;
    border-radius: 4px;
    width: 110px;
    margin: 0.5rem;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 5px;
    &:hover{
      background-color: #8cebd1;
    }

    ${props => props.isUploaded && css`
      background-color: #8cebd1;
    `}
  }

  input{
    position: absolute; 
    width: 1px; 
    height: 1px; 
    padding: 0; 
    margin: -1px; 
    overflow: hidden; 
    clip:rect(0,0,0,0); 
    border: 0;
  }
`
