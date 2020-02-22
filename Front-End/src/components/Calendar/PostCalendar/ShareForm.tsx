import React, { FunctionComponent, useState } from 'react';
import './Modal.scss';
import styled, { css } from 'styled-components';
import { ModalProps } from '../_types/calendar';
import axios from 'axios';
import { url as _url } from '../../../url';
import { Grid } from "@material-ui/core";


const ShareForm: FunctionComponent<ModalProps> = props => {
  const { close, data } = props;
  const { title, contents, startAt, endAt, place, attendants, schNo } = data.schedules[0];

  // content 는 새로 입력하는 값! contents랑 헷갈리지 말자ㅠ
  const [content, setContent] = useState('')
  const [selectedImgFile, setSelecctedImgFile] = useState('')
  const [selectedVideoFile, setSelecctedVideoFile] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isImgUploading, setIsImgUpLoading] = useState(false)
  const [isVideoUploading, setIsVideoUpLoading] = useState(false)

  const handleImgFileInput = (e: any) => {
    setSelecctedImgFile(e.target.files[0])
    setIsImgUpLoading(false)
    alert(`이미지(${e.target.files[0].name})가 업로드 되었습니당`)
    setIsImgUpLoading(true)
  }

  const handleVideoFileInput = (e: any) => {
    setSelecctedVideoFile(e.target.files[0])
    setIsVideoUpLoading(false)
    alert(`비디오(${e.target.files[0].name})가 업로드 되었습니당`)
    setIsVideoUpLoading(true)
  }

  const handleContentInput = (e: any) => {
    setContent(e.target.value)
  }

  const submitHandler = async () => {
    try {
      const params = {
        content: content,
        id: window.sessionStorage.getItem('id'),
        img: null,
        video: null,
        schNo: schNo,
      }

      const res = await axios.post(`${_url}/feed/save`, params);
      const feedNo = res.data.count

      if (selectedImgFile !== '') {
        const formData = new FormData();
        formData.append("file", selectedImgFile);
        await axios({
          method: "post",
          url: `${_url}/feed/uploadImage/${feedNo}`,
          data: formData,
          headers: { "content-Type": "multipart/form-data" }
        });
      }
      if (selectedVideoFile !== '') {
        const formData = new FormData();
        formData.append("file", selectedVideoFile);
        setIsLoading(true)
        await axios({
          method: "post",
          url: `${_url}/feed/uploadVideo/${feedNo}`,
          data: formData,
          headers: { "content-Type": "multipart/form-data" }
        });
        setIsLoading(false)
      }
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
        {isLoading ?
          <>
            <div className='lcontainer'>
              <div className='loader'>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--text'></div>
              </div>
            </div>

          </>
          :
          <>
            <Grid container spacing={1}>
              <Grid item xs={8} sm={8} lg={8}>
                <table style={{ width: "90%" }}>
                  <tbody>
                    <tr>
                      <td colSpan={2}>{title}</td>
                    </tr>
                    <tr>
                      <td>{startAt}</td>
                      <td>{endAt}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <div className="textA">{contents?.split('\n').map((line, idx) => {
                          return (<span key={idx}>{line}<br /></span>)
                        })}</div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>{place}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>{attendants}</td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
              <Grid item xs={4} sm={4} lg={4}>
                <textarea id="content"
                  placeholder="피드에 올릴 부가설명을 입력해주세요"
                  onChange={handleContentInput}
                  style={{
                    width: "80%",
                    height: "50%",
                    marginTop: "50px",
                    marginRight: "40px",
                    padding: "15px"
                  }}></textarea>

                <StyledInputSet>
                  <label htmlFor="imageUpload">사진 업로드</label>
                  <input id="imageUpload" type="file" onChange={handleImgFileInput} />
                  {isImgUploading ? <><div style={{ textAlign: "center" }}>업로드 되었습니다.</div></> : <></>}
                </StyledInputSet>

                <StyledInputSet>
                  <label htmlFor="videoUpload">동영상 업로드</label>
                  <input id="videoUpload" type="file" onChange={handleVideoFileInput} />
                  {isVideoUploading ? <><div style={{ textAlign: "center" }}>업로드 되었습니다.</div></> : <></>}
                </StyledInputSet>

              </Grid>
            </Grid>
          </>
        }

        <div className="button-wrapDouble">
          <button>수정</button>
          <button onClick={submitHandler}>완료</button>
        </div>
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
    color: #8cebd1;
    font-size: 80%;
    font-weight: 600;
    cursor: pointer;
    border-radius: 4px;
    width: 80%;
    margin: 0.5rem;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 5px;
    border: 1px solid #8cebd1;
    &:hover{
      background-color: #8cebd1;
      color: white;
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