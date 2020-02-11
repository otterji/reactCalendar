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

  const submitHandler = async () => {
    console.log('되냐')
    const params = {
      ...data,
        content: title,
        id: window.sessionStorage.getItem('id'),
        img: "string",
        schNo: schNo,
        video: "string"
    };
    try {
      const res = await axios.post(`${_url}/feed/save`, params);
      alert('피드에 공유되었습니다 >_< 야호!')
      close();
    } catch (e) {
      alert(e);
    }
  }

  // const [ imgBase64, setImgBase ] = useState(imgBase64);

  // const [ imgFile, setImgFile ] = useState(imgFile)
  

  // const onChangePreview = (e:any) => {
  //   let reader = new FileReader();

  //   reader.onloadend = () => {
  //     // 2. 읽기가 완료되면 아래코드가 실행됩니다.
  //     const base64 = reader.result;
  //     if (base64) {
  //       // console.log(base64)
  //       // this.setState({imgBase64: base64.toString()}); // 파일 base64 상태 업데이트
  //       setImgBase(base64.toString())
  //     }
  //   }

  //   // accountsForm 35번째줄
  //   if (e.target.files[0]) {
  //     reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
  //     // this.setState({imgFile: e.target.files[0]}); // 파일 상태 업데이트
  //     setImgFile(e.target.files[0])
  //   }
  // }

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

        <input id="content" type="textarea" placeholder="피드에 올릴 부가설명을 입력해주세요" />

        {/* <Avatar src={imgBase64} style={{width:"150px", height:"150px"}}/>
          <StyledInputSet isUploaded={!(imgBase64 === '')}>
            <label htmlFor="imageUpload">사진 업로드</label>
            <input id="imageUpload" type="file" onChange={}/>
        </StyledInputSet> */}

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
