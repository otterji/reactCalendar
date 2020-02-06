import React, {Component, ChangeEvent, KeyboardEvent, } from 'react';
import { withRouter, } from 'react-router-dom';
import axios from "axios";
import DateFnsUtils from '@date-io/date-fns';
//mycomp

//styles 
import styled, { css, } from 'styled-components';
import { Button, TextField, InputAdornment, Avatar, createMuiTheme, 
        FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText, Checkbox, 
        RadioGroup, Radio } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Email, Lock, Face, TagFaces, Instagram, Link, CheckCircle, EnhancedEncryption, } from '@material-ui/icons';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

const regExp = {
  email: /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  pw: /^[A-Za-z0-9]{6,15}$/,
  name: /^[A-Za-z가-힣]{2,}$/,
  nickname: /^[A-Za-z0-9가-힣]{2,10}$/,
}

interface State{  
  email: string,
  emailValid: string,
  emailLabel: string,
  
  pw: string,
  pwValid: string,
  pwLabel: string,
  
  pwCheck: string,
  pwCheckValid: string,
  pwCheckLabel: string,

  imgBase64: string,
  imgFile: any,

  birth: any,
  birthValid: string,
  birthLabel: string,

  name: string,
  nameValid: string,
  nameLabel: string,

  nickname: string,
  nicknameValid: string,
  nicknameLabel: string,

  link: string,
  linkValid: string,

  // interests:{
  //   게임: boolean,
  //   스포츠: boolean,
  //   봉사: boolean,
  //   공연전시: boolean,
  //   영화: boolean,
  //   취업: boolean,
  // }
  interests:object,
  interestsValid: string,
  interestsLabel: string,

  member: string,
  isChannel: boolean,
}

let initList: any;
const _url:string = 'http://70.12.246.48:8080';

class AccountsForm extends Component<any, State> {
  constructor(props:any){
    super(props);    
    this.state = {
      email: '',
      emailValid: 'init',
      emailLabel: '이메일',

      pw: '',
      pwValid: 'init',
      pwLabel: '비밀번호',

      pwCheck: '',
      pwCheckValid: 'init',
      pwCheckLabel: '비밀번호 확인',

      imgBase64: '',
      imgFile: null,

      birth: null,
      birthValid: 'init',
      birthLabel: '*생년월일',

      name: '',
      nameValid: 'init',
      nameLabel: '*이름',

      nickname: '',
      nicknameValid: 'init',
      nicknameLabel: '*닉네임',

      link: '',
      linkValid: 'init',

      interests: {},
      interestsValid: 'init',
      interestsLabel: '*',

      member: 'personal',
      isChannel: false,
    }
  }
  
  componentWillMount(){
    // console.log('will mount')
    if(this.props.moreInfo){
      this.getAllInterests()
      .then(()=>{
        this.setState({ interests: initList })
      });
    }
  }

  getAllInterests = async () => {
    try{
      const res = await axios({
        method: 'get',
        url: 'http://70.12.246.48:8080/interest/getAllInterests',
        responseType: 'json'
      });
      console.log(res);
      initList = res.data;
    }
    catch(err){
      // alert(err);
      console.log(err);
    }
  }

  initState = async () => {
    await this.setStateAsync({
      birth: null,
      birthValid: 'init',
      birthLabel: '*생년월일',

      name: '',
      nameValid: 'init',
      nameLabel: '*이름',

      nickname: '',
      nicknameValid: 'init',
      nicknameLabel: '*닉네임',

      link: '',
      linkValid: 'init',

      interests: initList,
      interestsValid: 'init',
      interestsLabel: '*',
    })
  }

  setStateAsync(state:object) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  checkValid = async (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if(name === 'email'){
      await this.setStateAsync({email: e.target.value});
      if(this.state.email === ''){
        this.setState({emailValid: 'init', emailLabel: '이메일'});
      }
      else{
        if(regExp.email.test(this.state.email)){
          this.setState({emailValid: 'valid', emailLabel: '이메일'});
        }
        else{          
          this.setState({emailValid: 'invalid', emailLabel: '이메일 양식을 맞춰 주세요'});
        }
      }
    }
    else if(name === 'pw'){
      await this.setStateAsync({pw: e.target.value});
      if(this.state.pw === ''){
        this.setState({pwValid: 'init', pwLabel: '비밀번호'});
      }
      else{
        if(regExp.pw.test(this.state.pw)){
          this.setState({pwValid: 'valid', pwLabel: '비밀번호'});
        }
        else{
          this.setState({pwValid: 'invalid', pwLabel: '영문, 숫자 조합 6~15자',});
        }
      }
    }
    else if(name === 'pwCheck' && this.props.signup){
      await this.setStateAsync({pwCheck: e.target.value});
      if(this.state.pwCheck === ''){
        this.setState({pwCheckValid: 'init', pwCheckLabel: '비밀번호 확인'});
      }
      else{
        if(this.state.pw === this.state.pwCheck){
          this.setState({pwCheckValid: 'valid', pwCheckLabel: '비밀번호 확인'});
        }
        else{
          this.setState({pwCheckValid: 'invalid', pwCheckLabel: '비밀번호가 일치하지 않습니다',});
        }
      }
    }
    else if(name === 'name'){
      await this.setStateAsync({name: e.target.value});
      if(this.state.name === ''){
        this.setState({nameValid: 'init', nameLabel: '*이름'});
      }
      else{
        if(regExp.name.test(this.state.name)){
          this.setState({nameValid: 'valid', nameLabel: '이름'});
        }
        else{
          this.setState({nameValid: 'invalid', nameLabel: '정확히 기입해 주세요',});
        }
      }
    }
    else if(name === 'nickname'){
      await this.setStateAsync({nickname: e.target.value});
      if(this.state.nickname === ''){
        this.setState({nicknameValid: 'init', nicknameLabel: '*닉네임'});
      }
      else{
        if(regExp.nickname.test(this.state.nickname)){
          this.setState({nicknameValid: 'valid', nicknameLabel: '닉네임'});
        }
        else{
          this.setState({nicknameValid: 'invalid', nicknameLabel: '한글, 영문, 숫자 포함 2~10자',});
        }
      }
    }
  }

  isValid = ():boolean => {
    if(this.props.login){
      return (this.state.emailValid === 'valid' && 
              this.state.pwValid === 'valid') ? true : false;
    }
    else if(this.props.signup){
      return (this.state.emailValid === 'valid' && 
              this.state.pwValid === 'valid' &&
              this.state.pwCheckValid === 'valid') ? true : false;
    }
    else if(this.props.moreInfo){
      return (this.state.birthValid === 'valid' &&
              this.state.nameValid === 'valid' &&
              this.state.nicknameValid === 'valid' && 
              this.state.interestsValid === 'valid') ? true : false;
    }
    return false;
  }

  pressEnter = (e:KeyboardEvent) => {
    if(e.key === 'Enter' && this.isValid()){
      this.onSubmit();
    }
  }

  onLogin = (_id:string, _pw:string) => {
  }

  onSubmit = async () => {
    if(this.props.login){
      const _id = this.state.email;
      const _pw = this.state.pw;    
      try{
        const res = await axios({
          method:'post',
          // url: 'http://ec2-52-79-117-94.ap-northeast-2.compute.amazonaws.com:8080/member/signup',
          // url: 'http://52.79.117.94:8080/member/login',
          url: `${_url}/member/login`,
          data:{
            id: _id,
            pw: _pw,
          },
        });
        alert(JSON.stringify(res.data, null, 2));
        if(res.data.state === 'SUCCESS') {
          window.sessionStorage.setItem('id', _id);
          window.sessionStorage.setItem('pw', _pw);
          this.props.onLogin();
          this.props.history.push('/');
        }
      }
      catch(err){
        alert(err);
      }
    }
    else if(this.props.signup){
      const _id = this.state.email;
      const _pw = this.state.pw;

      try{
        const res = await axios({
          method:'get',
          url:`${_url}/member/isExist/${_id}`,
          responseType: 'json',
        })
        // alert(JSON.stringify(res.data, null, 2));
        if(res.data.state === 'SUCCESS'){
          window.sessionStorage.setItem('id', _id);
          window.sessionStorage.setItem('pw', _pw);
          this.props.history.push('/moreInfoPage');
        }
        else if(res.data.state === 'FAIL'){
          alert('이미 존재하는 아이디 입니다')
        }
      }
      catch(err){
        console.log(err)
      }
    }
    else if(this.props.moreInfo && this.state.isChannel){
      const _id = window.sessionStorage.getItem('id');
      const _pw = window.sessionStorage.getItem('pw');
      const formData = new FormData();
      formData.append('file', this.state.imgFile);
      
      try{
        let res = await axios(
          {
            method: 'post',
            url: `${_url}/member/uploadImage/${_id}`,
            data: formData,
            headers: {'content-Type': 'multipart/form-data' }
          }
        );

        const _img = null;
        const _nickname = this.state.nickname;
        const _link = this.state.link;
        const _msg = ''
        const _interests = this.initList();

        res = await axios(
          {
            method: 'post',
            url: `${_url}/member/signup/`,
            data:{
              id: _id,
              pw: _pw,
              img: _img,
              nickname: _nickname,
              link: _link,
              msg: _msg,
              interests: _interests,
            }
          }
        )
        if(res.data.state === 'SUCCESS') {      
          this.props.onLogin();
          this.props.history.push('/');
        }
      }
      catch(err){
        alert(err)
      }
    }
    else if(this.props.moreInfo && !this.state.isChannel){
      const _id = window.sessionStorage.getItem('id');
      const _pw = window.sessionStorage.getItem('pw');
      const formData = new FormData();
      formData.append('file', this.state.imgFile);
      
      try{
        let res = await axios(
          {
            method: 'post',
            url: `${_url}/member/uploadImage/${_id}`,
            data: formData,
            headers: {'content-Type': 'multipart/form-data' }
          }
        );

        const _name = this.state.nickname;
        const _birth = this.state.birth;
        const _nickname = this.state.nickname;
        const _img = null;
        const _link = this.state.link;
        const _msg = ''
        const _interests = this.initList();

        res = await axios(
          {
            method: 'post',
            url: `${_url}/member/signup/`,
            data:{
              id: _id,
              pw: _pw,
              name: _name,
              birth: _birth,
              nickname: _nickname,
              img: _img,
              link: _link,
              msg: _msg,
              interests: _interests,
            }
          }
        )
        if(res.data.state === 'SUCCESS') {      
          // alert(JSON.stringify(res.data, null, 2));
          this.props.onLogin();
          this.props.history.push('/');
        }
      }
      catch(err){
        alert(err)
      }
    }
  }
    
  onBack = () => {
    this.props.history.goBack();
  }

  onChangePreview = (e:any) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        // console.log(base64)
        this.setState({imgBase64: base64.toString()}); // 파일 base64 상태 업데이트
      }
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      this.setState({imgFile: e.target.files[0]}); // 파일 상태 업데이트
    }
  }

  onChangeBirth = (_date: Date | null) => {
    if(_date === null){
      this.setState({birthValid: 'init', birthLabel: '*생년월일'})
    }
    else if(_date.toString() === 'Invalid Date'){
      this.setState({birthValid: 'invalid', birthLabel: '정확히 기입해 주세요'})
    }
    else{
      this.setState({birth: _date, birthValid: 'valid', birthLabel: '생년월일'});    
    }
  }

  renderInterest = ():Array<any> => {
    let renderList:any[] = []
    const keyList = Object.keys(this.state.interests);
    const valueList = Object.values(this.state.interests);
    for(let i = 0; i < keyList.length; i++ ){
      renderList.push(
        <FormControlLabel
          key={keyList[i]}
          control={<Checkbox checked={valueList[i]} name={keyList[i]} onChange={this.onChangeInterest} value={keyList[i]} />}
          label={keyList[i]}
        />
      )
    }
    return renderList
  }
  
  onChangeInterest = async (e:ChangeEvent<HTMLInputElement>) => {
    const _name = e.target.name;
    const _checked = e.target.checked;
    await this.setStateAsync({ interests:{...this.state.interests, [_name]: _checked},})
    const temp = this.state.interests;
    const checked = Object.values(temp).filter(v => v).length;
    if(this.state.isChannel){
      if(checked === 0){
        this.setState({interestsValid: 'init', interestsLabel: '*'})
      }
      else if(checked >= 1){
        this.setState({interestsValid: 'valid', interestsLabel: ''})
      }
    }
    else{
      if(checked === 0){
        this.setState({interestsValid: 'init', interestsLabel: '*'})
      }
      else if(checked === 1){
        this.setState({interestsValid: 'invalid', interestsLabel: '*'})
      }
      else if(checked >= 2){
        this.setState({interestsValid: 'valid', interestsLabel: ''})
      }
    }
  }

  initList = () => {
    const curInterests:any = this.state.interests;
    let outputList = [];
    for(let i in curInterests){
      if(curInterests[i]){
        outputList.push(i)
      }
    }
    // console.log(out)
    return outputList
  }

  onChangeMember = async (e:ChangeEvent<HTMLInputElement>) => {
    const _member = e.target.value;
    await this.initState();
    await this.setStateAsync({ member: _member, isChannel: !this.state.isChannel });
  }

  onChangeLink = (e:ChangeEvent<HTMLInputElement>) => {
    const _link = e.target.value;
    this.setState({ link: _link, linkValid: 'valid' });
  }

  render(){
    if(this.props.moreInfo){
      let renderList = this.renderInterest();
      return(
        <>
          <StyledForm autoComplete="off" onKeyPress={this.pressEnter}>

            <Avatar src={this.state.imgBase64} style={{width:"150px", height:"150px"}}/>
            <StyledInputSet isUploaded={!(this.state.imgBase64 === '')}>
              <label htmlFor="imageUpload">사진 업로드</label>
              <input id="imageUpload" type="file" onChange={this.onChangePreview}/>
            </StyledInputSet>

            <StyledMemberContainer>
              <FormLabel component="legend">회원 구분</FormLabel>
              <RadioGroup 
                row
                aria-label="memberType" 
                name="memberType" 
                onChange={this.onChangeMember}
              >
              <StyledRadio checked={!this.state.isChannel} value="personal" control={<Radio />} label="개인" />
              <StyledRadio checked={this.state.isChannel} value="channel" control={<Radio />} label="채널" />
              </RadioGroup>
            </StyledMemberContainer>
            
            {
              this.state.isChannel ?
              null
              :
              <>
              <ThemeProvider theme={defaultMaterialTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <StyledDatePicker
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
                    InputAdornmentProps={{ position: "end" }}
                    label={this.state.birthLabel}
                    value={this.state.birth}
                    onChange={this.onChangeBirth}
                    validate={this.state.birthValid}
                  />
                </MuiPickersUtilsProvider>
              </ThemeProvider>

              <StyledTextField
              name="name"
              validate={this.state.nameValid}
              label={this.state.nameLabel}
              onChange={this.checkValid}
              // onKeyPress={this.pressEnter}
              variant="outlined"
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Face/> 
                  </InputAdornment>
                ),
              }}/>
              </>
            }
            
            <StyledTextField
              name="nickname"
              value={this.state.nickname}
              validate={this.state.nicknameValid}
              label={this.state.nicknameLabel}
              onChange={this.checkValid}
              variant="outlined"
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <TagFaces/> 
                  </InputAdornment>
                ),
              }}/>

            <StyledTextField
              name="link"
              value={this.state.link}
              validate={this.state.linkValid}
              label={this.state.isChannel ? "관련 페이지" : "SNS"}
              onChange={this.onChangeLink}
              variant="outlined"
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {
                      this.state.isChannel ? <Link/> : <Instagram/>
                    }
                  </InputAdornment>
                ),
              }}/>
            
            {
              this.state.isChannel ? 
              <StyledInterestContainer validate={this.state.interestsValid}>
                <FormLabel component="label">{`${this.state.interestsLabel}카테고리`}</FormLabel>
                <StyledFormGroup row={true}>
                  { renderList }
                </StyledFormGroup>
                <FormHelperText>1개 이상 체크해 주세요</FormHelperText>
              </StyledInterestContainer>
              :
              <StyledInterestContainer validate={this.state.interestsValid}>
                <FormLabel component="label">{`${this.state.interestsLabel}관심사`}</FormLabel>
                <StyledFormGroup row={true}>
                  { renderList }
                </StyledFormGroup>
                <FormHelperText>2개 이상 체크해 주세요</FormHelperText>
              </StyledInterestContainer>
            }

            <StyledBtnContainer>
              <StyledBtn 
                disabled={!this.isValid()}
                onClick={this.onSubmit}
                >
                제출              
              </StyledBtn>
              <StyledBtn 
                onClick={this.onBack}
                >
                뒤로가기
              </StyledBtn>
            </StyledBtnContainer>
          </StyledForm>
        </>
      )
    }
    else{
      return(
        <>
          <StyledForm autoComplete="on" onKeyPress={this.pressEnter}>
            <StyledTextField
              name="email"
              validate={this.state.emailValid}
              label={this.state.emailLabel}
              onChange={this.checkValid}
              variant="outlined"
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {
                      this.state.emailValid === 'valid' ? <CheckCircle/> : <Email/> 
                    }
                  </InputAdornment>
                ),
              }}/>
            <StyledTextField
              name="pw"
              type="password"
              validate={this.state.pwValid}   
              label={this.state.pwLabel}
              onChange={this.checkValid}
              variant="outlined"
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {
                      this.state.pwValid === 'valid' ? <CheckCircle/> : <Lock/> 
                    }
                  </InputAdornment>
                ),
              }}/>
            {
              this.props.signup ? 
              <StyledTextField
              name="pwCheck"
              type="password"
              validate={this.state.pwCheckValid}   
              label={this.state.pwCheckLabel}
              onChange={this.checkValid}
              variant="outlined"
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {
                      this.state.pwCheckValid === 'valid' ? <CheckCircle/> : <EnhancedEncryption/> 
                    }
                  </InputAdornment>
                ),
              }}/>
              :
              null
            }
            <StyledBtnContainer>
              <StyledBtn 
                disabled={!this.isValid()}
                onClick={this.onSubmit}
                >
                {
                  this.props.login ? 
                  "로그인"
                  :
                  "회원가입"
                }
              </StyledBtn>
            </StyledBtnContainer>
          </StyledForm>        
        </>
      )
    }
  }
}
export default withRouter(AccountsForm); 

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

const StyledMemberContainer = styled(FormControl)`
  width: 254.4px;
  margin: 8px 0 4px 0;
  padding: 10.5px 0 0 0;
  border: 0.05rem solid #8cebd1;
  border-radius: 5px;

  .MuiFormLabel-root{
    padding: 0 14px 0 14px;
    color: #8cebd1;
    font-weight: 600;
  }

  .MuiFormGroup-root{
    display: flex;
    justify-content: space-evenly;
  }

  .MuiFormControlLabel-root{
    margin: 0;
    
    .MuiFormControlLabel-label{
      width:50px;
      text-align:left;
    }
  }
`

const StyledRadio = styled(FormControlLabel)<any>`
  ${props => props.checked && css`
    .MuiSvgIcon-root{
      color: #8cebd1;
    }
  `}
`

const StyledInterestContainer = styled(FormControl)<any>`
  margin: 1rem;
  margin-left: 3rem;
  margin-right: 3rem;
  padding: 1rem;
  border: 0.05rem solid #bfbfbf;
  border-radius: 5px;

  .MuiFormLabel-root{
    margin: 0.5rem;
    margin-bottom: 1rem;
    color: gray;
  }

  .MuiFormControlLabel-root{
    margin: 0;
    .MuiFormControlLabel-label{
      width:80px;
      text-align:left;
    }
  }

  .MuiFormHelperText-root{
    font-size: 70%;
    text-align: right;
  }

  ${props => props.validate === 'invalid' && css`
    border-color: red;
    
    .MuiFormLabel-root {
      color: red;
    }
    .MuiFormHelperText-root{
      color: red;
    }
    .MuiSvgIcon-root{
      color: red;
    }
  `}

  ${props => props.validate === 'valid' && css`
    border-color: #8cebd1;
    
    .MuiFormLabel-root {
      color: #8cebd1;
    }
    .MuiFormHelperText-root{
      color: #8cebd1;
    }
    .MuiSvgIcon-root{
      color: #8cebd1;
    }
  `}
`

const StyledFormGroup = styled(FormGroup)`
  display: flex;
  justify-content: center;
`

const StyledForm = styled.form`
  align-items: center;
  border: 0.1rem solid gray;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;  
`

// interface textfieldProps {
//   validate: string,
// }
const StyledTextField = styled(TextField)<any>`
  ${props => props.validate === 'invalid' && css`
    & label {
      color: red;    
    }
    & label.Mui-focused{
      color: red;
    }
    & .MuiOutlinedInput-root {      
      svg {
          color: red;
      }
      & fieldset {
        border-color: red;
      }
      &:hover fieldset {
        border-color: red;
      }
      &.Mui-focused {
        & fieldset{
          border-color: red;
        }
      }
  `}

  ${props => props.validate === 'valid' && css`
    & label {
      color: #8cebd1;    
    }
    & .MuiOutlinedInput-root {      
      svg {
          color: #8cebd1;
        }
      & fieldset {
        border-color: #8cebd1;
      }
    }
  `}

  & label.Mui-focused {
    color: #8cebd1;      
  }
  & .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #8cebd1;
    }
    &.Mui-focused {
      svg {
        color: #8cebd1;
      }
      & fieldset{
        border-color: #8cebd1;
      }
    }
  } 
`

const StyledDatePicker = styled(KeyboardDatePicker)<any>`
  .MuiIconButton-root{
    color: black;
    padding: 0px;
  }

  ${props => props.validate === 'invalid' && css`
    & label {
      color: red;    
    }
    & label.Mui-focused{
      color: red;
    }
    & .MuiOutlinedInput-root {      
      svg {
          color: red;
        }
      & fieldset {
        border-color: red;
      }
      &:hover fieldset {
        border-color: red;
      }
      &.Mui-focused {
        & fieldset{
          border-color: red;
        }
      }
  `}

  ${props => props.validate === 'valid' && css`
    & label {
      color: #8cebd1;    
    }
    & .MuiOutlinedInput-root {      
      svg {
          color: #8cebd1;
        }
      & fieldset {
        border-color: #8cebd1;
      }
    }
  `
  }

  & label.Mui-focused {
    color: #8cebd1;      
  }
  & .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #8cebd1;
    }
    &.Mui-focused {
      svg {
        color: #8cebd1;
      }
      & fieldset{
        border-color: #8cebd1;
      }
    }
  } 
`
const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {main:'#8cebd1'},
  },
});

const StyledBtnContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10px;
  margin: 1rem;
`

const StyledBtn = styled(Button)`
  background-color: ${props => (props.disabled ? 'gray' : 'black')};
  color: white;
  font-size: 100%;
  font-weight: 600;
  width: 200px;
  /* width: auto; */
  
  /* padding-right: 80px;
  padding-left: 80px; */
  
  /* width: 100px;
  font-size: 70%;
  margin: 0.5rem; */
  
  &:hover{
    background-color: #8cebd1;
  }
`
