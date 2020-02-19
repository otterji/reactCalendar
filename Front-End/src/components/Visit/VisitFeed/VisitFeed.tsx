import React, { Component } from 'react'
import axios from 'axios'
//
import { url } from '../../../url'
//style
import styled from 'styled-components'
import { InputBase, Avatar, Slide } from '@material-ui/core'
import { Event, StarBorderRounded, StarRounded, AddRounded, AddCircleRounded, } from '@material-ui/icons'

interface State {
  isAdd: boolean;
  isInterest: boolean;
  isDelete: boolean;
  feedInfo: any;
  startDate: string;
  endDate: string;
}

class VisitFeed extends Component<any, State>{
  constructor(props: any) {
    super(props);
    this.state = {
      isAdd: false,
      isInterest: false,
      isDelete: false,
      feedInfo: this.props.feedInfo,
      startDate: this.getTimeStamp(this.props.feedInfo.schedules.startAt),
      endDate: this.getTimeStamp(this.props.feedInfo.schedules.endAt),
    }
  }
  componentDidMount() {
    // console.log(this.getTimeStamp())
    // this.getTimeStamp(this.state.startDate)
    // this.getTimeStamp(this.state.endDate)
  }

  addSchedule = () => {
    this.setState({ isAdd: true })
  }
  exceptSchedule = () => {
    this.setState({ isAdd: false })
  }

  addInterest = () => {
    this.setState({ isInterest: true })
  }
  exceptInterest = () => {
    this.setState({ isInterest: false })
  }

  deleteFeed = async () => {
    const _confirm = window.confirm('피드를 삭제 하시겠습니까?');
    if (!_confirm) {
      return;
    }
    const _feedNo = this.props.feedInfo.feedNo
    await this.props.delete(_feedNo);
  }

  getTimeStamp = (_date: string) => {
    const d = new Date(_date);
    let s =
      this.leadingZeros(d.getFullYear(), 4) + '/' +
      this.leadingZeros(d.getMonth() + 1, 2) + '/' +
      this.leadingZeros(d.getDate(), 2) + ' ' +
      this.leadingZeros(d.getHours(), 2) + ':' +
      this.leadingZeros(d.getMinutes(), 2)
    // + ':' + this.leadingZeros(d.getSeconds(), 2);
    return s;
  }
  leadingZeros = (_n: number, digits: number) => {
    let zero = '';
    let n = _n.toString();
    if (n.length < digits) {
      for (let i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  }

  countUp = async () => {
    try{
      await axios({
        method: 'put',
        url: `${url}/channel/updateSearchFrequency/${this.state.feedInfo.srDto.id}`
      }).then(() => {
        sessionStorage.setItem('isVisit', 'true');
      })
    }
    catch(err){
      alert(err);
    }
  }

  render() {
    return (<>
      <Slide direction="up" in={true} timeout={500}>
        <StFeedCont>

          <StUserCont>
            <h3 className="title">
              {this.props.feedInfo.schedules.title}
            </h3>
            <div className="logoPlusNickName">
              <Avatar className="avatar" src={`${url}/${this.state.feedInfo.srDto.img}`} />
              <StName>{this.state.feedInfo.srDto.nickName}</StName>
            </div>
          </StUserCont>

          <StContentCont>
            <div className="contents" style={{ borderBottom: "1px dotted black", paddingBottom: "10px" }} >
              {this.props.feedInfo.schedules.contents?.split('\n').map((line :any, idx: any) => {
                    return (<span key={idx}>{line}<br /></span>)
                  })}
            </div>
            <div className="contents" style={{paddingTop:"5px"}}>
              {this.props.feedInfo.content?.split('\n').map((line: any, idx: any) => {
                    return (<span key={idx}>{line}<br /></span>)
                  })}
            </div>
            <div className="place">
              {`장소: ${this.props.feedInfo.schedules.place}`}
            </div>
            {
              this.state.feedInfo.img && <img className="img" src={`${url}/${this.state.feedInfo.img}`} alt="" />
            }
            {
              this.state.feedInfo.video && (
                <video className="video" controls>
                  <source src={`${url}/${this.state.feedInfo.video}`} type="video/mp4" />
                </video>
              )
            }


          </StContentCont>

          <StBtnCont>

            <StDateCont>
              <Event className="calendar" />
              <StTFCont>
                시작:
                <StTF
                  defaultValue={this.state.startDate}
                  inputProps={{ 'aria-label': '시작' }} />
                종료:
                <StTF
                  defaultValue={this.state.endDate}
                  inputProps={{ 'aria-label': '종료' }} />
              </StTFCont>
            </StDateCont>

            <div >
              {
                this.state.isAdd ?
                  <AddCircleRounded className="added" onClick={this.exceptSchedule} />
                  :
                  <AddRounded className="excepted" onClick={this.addSchedule} />
              }

              {
                this.state.isInterest ?
                  <StarRounded className="stared" onClick={this.exceptInterest} />
                  :
                  <StarBorderRounded className="unstared" onClick={this.addInterest} />
              }

            </div>

          </StBtnCont>
        </StFeedCont>
      </Slide>
    </>)
  }
}

export default VisitFeed;

const StFeedCont = styled.div`
  position: relative;
  margin: 20px;
  margin-top: 0;
  padding: 15px;
  border-radius: 12px;
  background-color: #eff5f5;
  box-sizing: border-box;
`;

const StUserCont = styled.div`
  display: flex;
  justify-content: space-between;
  .MuiAvatar-root{
    margin-right: 5px;
  }
  .logoPlusNickName{
    text-align: center;
  }
  .avatar{
    margin: auto;
  }
`;

const StName = styled.div`
  color: black;
`;

const StContentCont = styled.div`
  margin: 10px 0 10px 0;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  /* display: flex; */
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  div {
    width: 100%;
    height: 40%;
  }

  .title {
    margin-top: 0;
    font-weight: bold;
  }

  .contents {
    font-weight: 500;
  }

  .place {
    margin-top: 10px;
    font-size: 80%;
    font-style: italic;
    font-weight: thin;
  }

  .img, .video{
    width: 100%;
    height: auto;
  }
`;

const StDateCont = styled.div`

`
const StTFCont = styled.div`
  display: flex;
  flex-direction: vertical;

`
const StTF = styled(InputBase)`
  border-width: 0;
`

const StBtnCont = styled.div`
  display: flex;
  justify-content: space-between;

  *{
    margin: 0 4px 0 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .excepted, .calendar{
    &:hover{
      color: #8cebd1;
    }
  }
  .added {
    color:#8cebd1;
    &:hover{
      color: black;
    }
  }

  .unstared{
    &:hover{
      color: #e6e600;
    }
  }
  .stared{
    color: #e6e600;
    &:hover{
      color: black;
    }
  }

  .delete {
    &:hover{
      color: red;
    }
  }
`;
