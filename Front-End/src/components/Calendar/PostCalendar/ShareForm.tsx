import React, {FunctionComponent, useState} from 'react';
import './Modal.scss';
import styled, {css} from 'styled-components';
import {ModalProps} from '../_types/calendar';
import {StyledButton} from '../style';
import axios from 'axios';
import {url as _url} from '../../../url';
import {Avatar} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Grid} from "@material-ui/core";


const ShareForm: FunctionComponent<ModalProps> = props => {
    const {close, data} = props;
    const {title, contents, startAt, endAt, place, attendants, schNo} = data.schedules[0];

    // content 는 새로 입력하는 값! contents랑 헷갈리지 말자ㅠ
    const [content, setContent] = useState('')
    const [selectedImgFile, setSelecctedImgFile] = useState('')
    const [selectedVideoFile, setSelecctedVideoFile] = useState('')

    const handleImgFileInput = (e: any) => {
        setSelecctedImgFile(e.target.files[0])
        // console.log('e.target.files', e.target.files[0])
    }

    const handleVideoFileInput = (e: any) => {
        setSelecctedVideoFile(e.target.files[0])
    }

    const handleContentInput = (e: any) => {
        setContent(e.target.value)
    }

    const submitHandler = async () => {


        try {
            if (selectedImgFile !== '') {
                const formData = new FormData();
                formData.append('file', selectedImgFile);
                console.log('file', selectedImgFile);

                const reqData = {
                    content: content,
                    id: window.sessionStorage.getItem('id'),
                    img: formData,
                    video: selectedVideoFile,
                    schNo: schNo,
                }

                // await axios.post(`${_url}/`);
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
            <div className="Modal-overlay" onClick={close}/>
            <div className="Modal">
                <Grid container spacing={1}>
                    <Grid item xs={8} sm={8} lg={8}>
                        <table style={{width: "90%"}}>
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
                                        return (<span key={idx}>{line}<br/></span>)
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
                            <input id="imageUpload" type="file" onChange={handleImgFileInput}/>
                        </StyledInputSet>

                        <StyledInputSet>
                            <label htmlFor="imageUpload">동영상 업로드</label>
                            <input id="imageUpload" type="file" onChange={handleVideoFileInput}/>
                        </StyledInputSet>
                    </Grid>
                </Grid>
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

export {ShareForm};

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