import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import { IsChannel } from '../IsChannel';
//styles
import {
  InputAdornment,
  Avatar,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Checkbox
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import {
  Lock,
  Face,
  TagFaces,
  Instagram,
  Link,
  CheckCircle,
  EnhancedEncryption,
  CloseRounded,
  CreateRounded
} from '@material-ui/icons';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { url as _url } from '../../../url';
import * as Styled from './StyledUpdateUserInfo';

const regExp = {
  pw: /^[A-Za-z0-9]{6,15}$/,
  name: /^[A-Za-z가-힣]{2,}$/,
  nickname: /^[A-Za-z0-9가-힣]{2,10}$/
};

interface State {
  page: number;
  checkPrevPw: string;
  email: string | null;

  updatePw: boolean;
  pw: string | null;
  pwValid: string;
  pwLabel: string;

  pwCheck: string;
  pwCheckValid: string;
  pwCheckValidLabel: string;

  prevImg: string;
  imgBase64: string;
  imgFile: any;
  imgUpdate: boolean;

  poster: string;
  color: Array<string>;

  birth: any;
  birthValid: string;
  birthLabel: string;

  name: string;
  nameValid: string;
  nameLabel: string;

  nickname: string;
  nicknameValid: string;
  nicknameLabel: string;

  link: string;
  linkValid: string;
  linkLabel: string;

  msg: string;
  msgValid: string;
  msgLabel: string;

  // interests:{
  //   게임: boolean,
  //   스포츠: boolean,
  //   ...
  // }

  interests: object;
  interestsValid: string;
  interestsLabel: string;

  isChannel: string;
}

class UpdateUserInfo extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      checkPrevPw: '',
      email: window.sessionStorage.getItem('id'),

      updatePw: false,
      pw: '',
      pwValid: 'valid',
      pwLabel: '*새 비밀번호',

      pwCheck: '',
      pwCheckValid: 'valid',
      pwCheckValidLabel: '*새 비밀번호 확인',

      prevImg: '',
      imgBase64: '',
      imgFile: null,
      imgUpdate: false,

      poster: '',
      color: [],

      birth: null,
      birthValid: 'valid',
      birthLabel: '*생년월일',

      name: '',
      nameValid: 'valid',
      nameLabel: '*이름',

      nickname: '',
      nicknameValid: 'valid',
      nicknameLabel: '*닉네임',

      link: '',
      linkValid: 'valid',
      linkLabel: 'SNS 계정',

      msg: '',
      msgValid: 'valid',
      msgLabel: '프로필 내용',

      interests: {},
      interestsValid: 'valid',
      interestsLabel: '*',

      isChannel: ''
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  async componentDidMount() {
    // 유저의 개인/채널 분류 확인하기
    if (this.state.email) {
      const _isChannel = await IsChannel(this.state.email);
      this.setState({
        isChannel: _isChannel
      });
    }

    // 유저정보 가져오기
    if (this.state.isChannel === 'member') {
      // 유저가 개인일 경우
      // birth, id, img, link, msg, name, nickname, pw
      try {
        const resUserInfo = await axios({
          method: 'post',
          url: `${_url}/${this.state.isChannel}/jwt_auth/findMemberById/${this.state.email}`,
          headers: {
            jwt: sessionStorage.getItem('jwt')
          }
        });
        const data = resUserInfo.data.info;
        await this.setStateAsync({
          prevImg: data.img ? `${_url}/${data.img}` : '',
          imgBase64: data.img ? `${_url}/${data.img}?${Date.now()}` : '',
          nickname: data.nickname,
          msg: data.msg,
          link: data.link,
          birth: data.birth,
          name: data.name
        });
      } catch (err) {
        alert(err);
      }
    } else {
      // 유저가 채널인 경우
      // id, pw, name, nickname, img, link, poster, msg, color[]
      try {
        const resUserInfo = await axios({
          method: 'post',
          url: `${_url}/${this.state.isChannel}/jwt_auth/findChannelById/${this.state.email}`,
          headers: {
            jwt: sessionStorage.getItem('jwt')
          }
        });
        const data = resUserInfo.data.info;
        await this.setStateAsync({
          prevImg: data.img ? `${_url}/${data.img}` : '',
          imgBase64: data.img ? `${_url}/${data.img}?${Date.now()}` : '',
          nickname: data.nickname,
          msg: data.msg,
          link: data.link,
          poster: data.poster,
          color: data.color
        });
      } catch (err) {
        alert(err);
      }
    }
    if (!this.state.prevImg) {
      this.setState({
        imgUpdate: true
      });
    }
    // interests 목록 가져오기
    try {
      const res = await axios({
        method: 'get',
        url: `${_url}/interest/getAllInterests`,
        responseType: 'json'
      });
      this.setState({ interests: res.data });
    } catch (err) {
      alert(err);
    }

    // 유저 - interests 정보 가져오기
    try {
      const resInterests = await axios({
        // ["운동", "취업"]
        method: 'get',
        url: `${_url}/${this.state.isChannel}/getMyInterests/${this.state.email}`,
        responseType: 'json'
      });
      resInterests.data.map((interest: string) => {
        this.setStateAsync({
          interests: { ...this.state.interests, [interest]: true }
        });
      });
    } catch (err) {
      alert(err);
    }
  }

  onChangeBirth = (_date: Date | null) => {
    if (_date === null) {
      this.setState({ birthValid: 'init', birthLabel: '*생년월일' });
    } else if (_date.toString() === 'Invalid Date') {
      this.setState({
        birthValid: 'invalid',
        birthLabel: '정확히 기입해 주세요'
      });
    } else {
      this.setState({
        birth: _date,
        birthValid: 'valid',
        birthLabel: '생년월일'
      });
    }
  };

  renderInterest = (): Array<any> => {
    let renderList: any[] = [];
    const keyList = Object.keys(this.state.interests);
    const valueList = Object.values(this.state.interests);
    for (let i = 0; i < keyList.length; i++) {
      renderList.push(
        <FormControlLabel
          key={keyList[i]}
          control={
            <Checkbox
              checked={valueList[i]}
              name={keyList[i]}
              onChange={this.onChangeInterest}
              value={keyList[i]}
            />
          }
          label={keyList[i]}
        />
      );
    }
    return renderList;
  };

  onChangeInterest = async (e: ChangeEvent<HTMLInputElement>) => {
    const _name = e.target.name;
    const _checked = e.target.checked;
    await this.setStateAsync({
      interests: { ...this.state.interests, [_name]: _checked }
    });
    const checked = Object.values(this.state.interests).filter(v => v).length;
    if (this.state.isChannel) {
      if (checked === 0) {
        this.setState({ interestsValid: 'invalid', interestsLabel: '*' });
      } else if (checked >= 1) {
        this.setState({ interestsValid: 'valid', interestsLabel: '' });
      }
    } else {
      if (checked < 2) {
        this.setState({ interestsValid: 'invalid', interestsLabel: '*' });
      } else if (checked >= 2) {
        this.setState({ interestsValid: 'valid', interestsLabel: '' });
      }
    }
  };

  initList = () => {
    const curInterests: any = this.state.interests;
    let outputList = [];
    for (let i in curInterests) {
      if (curInterests[i]) {
        outputList.push(i);
      }
    }
    return outputList;
  };

  pressEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };

  handleAddPw = () => {
    this.setState({
      updatePw: !this.state.updatePw,
      pw: '',
      pwValid: 'init',
      pwLabel: '*새 비밀번호',
      pwCheck: '',
      pwCheckValid: 'init',
      pwCheckValidLabel: '*새 비밀번호 확인'
    });
  };

  handleImageUpdate = () => {
    this.setState({
      imgUpdate: !this.state.imgUpdate
    });
  };
  setStateAsync(state: object) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === 'checkPrevPw') {
      this.setState({
        [name]: e.target.value
      });
    } else if (name === 'pw') {
      await this.setStateAsync({ pw: e.target.value });
      if (regExp.pw.test(this.state.pw + '')) {
        this.setState({ pwValid: 'valid', pwLabel: '새 비밀번호' });
      } else {
        this.setState({
          pwValid: 'invalid',
          pwLabel: '영문, 숫자 조합 6~15자'
        });
      }
      if (this.state.pwCheck) {
        if (this.state.pw === this.state.pwCheck) {
          this.setState({
            pwCheckValid: 'valid',
            pwCheckValidLabel: '새 비밀번호 확인'
          });
        } else {
          this.setState({
            pwCheckValid: 'invalid',
            pwCheckValidLabel: '비밀번호가 일치하지 않습니다'
          });
        }
      }
    } else if (name === 'pwCheck') {
      await this.setStateAsync({ pwCheck: e.target.value });
      if (this.state.pwCheck) {
        if (this.state.pw === this.state.pwCheck) {
          this.setState({
            pwCheckValid: 'valid',
            pwCheckValidLabel: '새 비밀번호 확인'
          });
        } else {
          this.setState({
            pwCheckValid: 'invalid',
            pwCheckValidLabel: '비밀번호가 일치하지 않습니다'
          });
        }
      }
    } else if (name === 'name') {
      await this.setStateAsync({ name: e.target.value });
      if (regExp.name.test(this.state.name)) {
        this.setState({ nameValid: 'valid', nameLabel: '이름' });
      } else {
        this.setState({
          nameValid: 'invalid',
          nameLabel: '한글, 영문, 숫자 포함 2자 이상'
        });
      }
    } else if (name === 'nickname') {
      await this.setStateAsync({ nickname: e.target.value });
      if (regExp.nickname.test(this.state.nickname)) {
        this.setState({ nicknameValid: 'valid', nicknameLabel: '닉네임' });
      } else {
        this.setState({
          nicknameValid: 'invalid',
          nicknameLabel: '한글, 영문, 숫자 포함 2~10자'
        });
      }
    } else if (name === 'link') {
      this.setState({ link: e.target.value });
    } else if (name === 'msg') {
      this.setState({ msg: e.target.value });
    }
  };

  isValid = (): boolean => {
    return (this.state.updatePw
      ? this.state.pwValid === 'valid' && this.state.pwCheckValid === 'valid'
      : true) &&
      this.state.birthValid === 'valid' &&
      this.state.nameValid === 'valid' &&
      this.state.nicknameValid === 'valid' &&
      this.state.interestsValid === 'valid'
      ? true
      : false;
  };

  onChangePreview = async (e: any) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        this.setState({ imgBase64: base64.toString() }); // 파일 base64 상태 업데이트
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      this.setState({ imgFile: e.target.files[0] }); // 파일 상태 업데이트
    }
  };

  onDeletePrevImg = async () => {
    if (window.confirm('기존 이미지를 삭제할까요?')) {
      try {
        await axios.delete(
          `${_url}/${this.state.isChannel}/deleteImage/${this.state.email}`
        );
      } catch (err) {
        alert(err);
      }
      this.setState({
        imgBase64: '',
        prevImg: ''
      });
    }
  };

  onCancelUpload = async () => {
    const data = this.state.prevImg ? this.state.prevImg : '';
    this.setState({
      imgBase64: data,
      imgFile: ''
    });
  };

  onSubmit = async () => {
    if (this.state.page === 1) {
      try {
        const res = await axios({
          method: 'post',
          url: `${_url}/${this.state.isChannel}/confirmPassword`,
          data: {
            id: this.state.email,
            pw: this.state.checkPrevPw
          }
        });
        if (res.data.result) {
          this.setState({ page: 2 });
        } else {
          alert('비밀번호를 잘못 입력하셨습니다. 다시 입력해주세요.');
        }
      } catch (err) {
        alert(err);
      }
    } else {
      let res: any = null;
      try {
        // birth, id, img, link, msg, name, nickname, pw
        if (this.state.isChannel === 'member') {
          res = await axios({
            method: 'put',
            url: `${_url}/${this.state.isChannel}/updateMember/`,
            data: {
              id: this.state.email,
              pw: this.state.pw ? this.state.pw : this.state.checkPrevPw,
              img: null,
              name: this.state.name,
              birth: this.state.birth,
              nickname: this.state.nickname,
              link: this.state.link,
              msg: this.state.msg,
              interests: this.initList()
            }
          });
        } else {
          // id, pw, name, nickname, img, link, poster, msg, color[]
          res = await axios({
            method: 'put',
            url: `${_url}/${this.state.isChannel}/updateChannel/`,
            data: {
              id: this.state.email,
              pw: this.state.pw ? this.state.pw : this.state.checkPrevPw,
              img: null,
              name: 'channel',
              nickname: this.state.nickname,
              link: this.state.link,
              msg: this.state.msg,
              interests: this.initList(),
              poster: this.state.poster,
              color: this.state.color
            }
          });
        }
        if (res.data.state === 'SUCCESS') {
          if (this.state.imgFile) {
            const formData = new FormData();
            formData.append('file', this.state.imgFile);
            // TODO: 만약 formData에 아무 데이터도 안들어오면? 기존 이미지를 유지해야함
            try {
              let resImg = await axios({
                method: 'post',
                url: `${_url}/${this.state.isChannel}/uploadImage/${this.state.email}`,
                data: formData,
                headers: { 'content-Type': 'multipart/form-data' }
              });
              if (resImg.data.state === 'SUCCESS') {
                this.props.history.push('/mainPage');
              }
            } catch (err) {
              alert(err);
            }
          }
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  render() {
    let renderList = this.renderInterest();
    return (
      <>
        {this.state.page === 1 ? (
          <div>
            <p>회원정보 확인/수정을 위해 비밀번호를 입력해주세요.</p>
            <Styled.STextField
              name="checkPrevPw"
              type="password"
              label="비밀번호"
              value={this.state.checkPrevPw}
              onKeyPress={this.pressEnter}
              onChange={this.handleOnChange}
              variant="outlined"
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Lock />
                  </InputAdornment>
                )
              }}
            />
            <Styled.BtnContainer>
              <Styled.Btn onClick={this.onSubmit}>확인</Styled.Btn>
            </Styled.BtnContainer>
          </div>
        ) : (
          <Styled.Form autoComplete="on" onKeyPress={this.pressEnter}>
            {this.state.email}(
            {this.state.isChannel === 'channel' ? '채널' : '멤버'})
            <Avatar
              src={this.state.imgBase64}
              style={{ width: '100px', height: '100px' }}
            />
            {!this.state.imgUpdate ? (
              <Styled.InputSet>
                <label onClick={this.handleImageUpdate} id="cancel">
                  이미지 수정
                </label>{' '}
              </Styled.InputSet>
            ) : (
              <Styled.InputSet>
                {this.state.prevImg ? (
                  <label onClick={this.onDeletePrevImg} id="cancel">
                    기존 사진 삭제
                  </label>
                ) : null}
                <label htmlFor="imageUpload">사진 업로드</label>
                <input
                  id="imageUpload"
                  type="file"
                  onChange={this.onChangePreview}
                />
                {this.state.imgFile ? (
                  <label onClick={this.onCancelUpload}>업로드 취소</label>
                ) : null}
              </Styled.InputSet>
            )}
            {!this.state.updatePw ? (
              <Styled.InputSet>
                <label onClick={this.handleAddPw}>비밀번호 변경</label>
              </Styled.InputSet>
            ) : (
              <>
                <Styled.CancelBtn>
                  <CloseRounded onClick={this.handleAddPw} />
                </Styled.CancelBtn>
                <Styled.STextField
                  name="pw"
                  type="password"
                  validate={this.state.pwValid}
                  label={this.state.pwLabel}
                  onChange={this.handleOnChange}
                  variant="outlined"
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {this.state.pwValid === 'valid' ? (
                          <CheckCircle />
                        ) : (
                          <Lock />
                        )}
                      </InputAdornment>
                    )
                  }}
                />
                <Styled.STextField
                  name="pwCheck"
                  type="password"
                  validate={this.state.pwCheckValid}
                  label={this.state.pwCheckValidLabel}
                  onChange={this.handleOnChange}
                  variant="outlined"
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {this.state.pwCheckValid === 'valid' ? (
                          <CheckCircle />
                        ) : (
                          <EnhancedEncryption />
                        )}
                      </InputAdornment>
                    )
                  }}
                />
                {/* <Styled.Btn onClick={this.handleAddPw}>
                기존 비밀번호 유지
              </Styled.Btn> */}
              </>
            )}
            {this.state.isChannel === 'channel' ? null : (
              <>
                <Styled.STextField
                  name="name"
                  validate={this.state.nameValid}
                  label={this.state.nameLabel}
                  onChange={this.handleOnChange}
                  value={this.state.name}
                  variant="outlined"
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Face />
                      </InputAdornment>
                    )
                  }}
                />
                <ThemeProvider theme={Styled.defaultMaterialTheme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Styled.DatePicker
                      autoOk
                      openTo="year"
                      variant="inline"
                      margin="dense"
                      inputVariant="outlined"
                      invalidDateMessage=""
                      invalidLabel=""
                      maxDateMessage=""
                      minDateMessage=""
                      orientation="landscape"
                      format="yyyy.MM.dd"
                      InputAdornmentProps={{ position: 'end' }}
                      label={this.state.birthLabel}
                      value={this.state.birth}
                      onChange={this.onChangeBirth}
                      validate={this.state.birthValid}
                    />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </>
            )}
            <Styled.STextField
              name="nickname"
              value={this.state.nickname}
              validate={this.state.nicknameValid}
              label={this.state.nicknameLabel}
              onChange={this.handleOnChange}
              variant="outlined"
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <TagFaces />
                  </InputAdornment>
                )
              }}
            />
            <Styled.STextField
              name="link"
              value={this.state.link}
              validate={this.state.linkValid}
              label={this.state.isChannel === 'channel' ? '관련 페이지' : 'SNS'}
              onChange={this.handleOnChange}
              variant="outlined"
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {this.state.isChannel ? <Link /> : <Instagram />}
                  </InputAdornment>
                )
              }}
            />
            <Styled.STextField
              name="msg"
              value={this.state.msg}
              validate={this.state.msgValid}
              label={this.state.msgLabel}
              onChange={this.handleOnChange}
              variant="outlined"
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CreateRounded />
                  </InputAdornment>
                )
              }}
            />
            {this.state.isChannel ? (
              <Styled.InterestContainer validate={this.state.interestsValid}>
                <FormLabel component="label">{`${this.state.interestsLabel}카테고리`}</FormLabel>
                <Styled.SFormGroup row={true}>{renderList}</Styled.SFormGroup>
                <FormHelperText>1개 이상 체크해 주세요</FormHelperText>
              </Styled.InterestContainer>
            ) : (
              <Styled.InterestContainer validate={this.state.interestsValid}>
                <FormLabel component="label">{`${this.state.interestsLabel}관심사`}</FormLabel>
                <Styled.SFormGroup row={true}>{renderList}</Styled.SFormGroup>
                <FormHelperText>2개 이상 체크해 주세요</FormHelperText>
              </Styled.InterestContainer>
            )}
            <Styled.BtnContainer>
              <Styled.Btn disabled={!this.isValid()} onClick={this.onSubmit}>
                수정완료
              </Styled.Btn>
            </Styled.BtnContainer>
          </Styled.Form>
        )}
      </>
    );
  }
}
export default withRouter(UpdateUserInfo);
