import React, { Component } from 'react'
import { Link, } from 'react-router-dom'
import axios from 'axios'
//
import { url } from '../../url'
import { contextStorage } from '../../App';
//style
import styled from 'styled-components'
import { InputBase, Avatar, Slide, } from '@material-ui/core'
import {
  StarBorderRounded, StarRounded,
  AddRounded, AddCircleRounded, DeleteForeverOutlined
} from '@material-ui/icons'

interface State {
  isAdd: boolean;
  isInterest: boolean;
  isDelete: boolean;
  info: any;
  startDate: string;
  endDate: string;
}

class Feed extends Component<any, State>{
  constructor(props: any) {
    super(props);
    this.state = {
      isAdd: false,
      isInterest: false,
      isDelete: false,
      info: this.props.info,
      startDate: this.getTimeStamp(this.props.info.schedules.startAt),
      endDate: this.getTimeStamp(this.props.info.schedules.endAt),
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
    const _feedNo = this.props.info.feedNo
    await this.props.delete(_feedNo);

    this.props.toggleRender();
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
    try {
      await axios({
        method: 'put',
        url: `${url}/channel/updateSearchFrequency/${this.state.info.srDto.id}`
      }).then(() => {
        sessionStorage.setItem('isVisit', 'true');
      })
    }
    catch (err) {
      alert(err);
    }
  }

  render() {
    // window.scrollTo(0, 0)
    return (<>
      <Slide direction="up" in={true} timeout={500}>
        <StFeedCont>
          <StTopCont>
            <StLeftCont>
              <StUserCont>
                <h3 className="title">
                  {this.props.info.schedules.title}
                </h3>

              </StUserCont>

              <StDatePlaceCont>
                <StTFCont>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "10px" }}>시작:</div>
                    <StTF
                      margin="dense"
                      defaultValue={this.state.startDate}
                      inputProps={{ 'aria-label': '시작' }} />
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "10px" }}>종료:</div>
                    <StTF
                      margin="dense"
                      defaultValue={this.state.endDate}
                      inputProps={{ 'aria-label': '종료' }} />
                  </div>
                </StTFCont>

                <div className="place">
                  {
                    this.props.info.schedules.place &&
                    (<>{`장소: ${this.props.info.schedules.place}`}</>)
                  }
                </div>
              </StDatePlaceCont>
            </StLeftCont>

            <StRightCont>
              <div className="logoPlusNickName">
                <Avatar className="avatar" src={`${url}/${this.state.info.srDto.img}`} />
                {
                  sessionStorage.getItem('isChannel') === 'channel' ?
                  <StName>{this.state.info.srDto.nickName}</StName>
                  :
                  <StLink to={`/visitPage/${this.state.info.srDto.nickName}`}
                  onClick={this.countUp}>{this.state.info.srDto.nickName}</StLink>
                }
                {/* <StLink to={`/visitPage/${this.state.info.srDto.nickName}`}
                  onClick={this.countUp}>{this.state.info.srDto.nickName}</StLink> */}
              </div>
            </StRightCont>
          </StTopCont>

          <StContentCont>
            <div className="contents" style={{ borderBottom: "1px dotted black", paddingBottom: "10px" }} >
              {this.props.info.schedules.contents?.split('\n').map((line: any, idx: any) => {
                return (<span key={idx}>{line}<br /></span>)
              })}
            </div>
            <div className="contents" style={{ paddingTop: "5px" }}>
              {this.props.info.content?.split('\n').map((line: any, idx: any) => {
                return (<span key={idx}>{line}<br /></span>)
              })}
            </div>
            {
              this.state.info.img && <img className="img" src={`${url}/${this.state.info.img}`} alt="" />
            }
            {
              this.state.info.video && (
                <video className="video" controls>
                  <source src={`${url}/${this.state.info.video}`} type="video/mp4" />
                </video>
              )
            }
          </StContentCont>

          <StBtnCont>
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

              <contextStorage.Consumer>
                {store => {
                  return (<>
                    {store.isChannel ?
                      <DeleteForeverOutlined className="delete" onClick={this.deleteFeed} />
                      :
                      null
                    }
                  </>)
                }}
              </contextStorage.Consumer>
            </div>

          </StBtnCont>
        </StFeedCont>
      </Slide>
    </>)
  }
}

export default Feed;

const StFeedCont = styled.div`
  position: relative;
  margin: 20px;
  margin-top: 0;
  padding: 15px;
  border-radius: 12px;
  background-color: #eff5f5;
  box-sizing: border-box;
`;
const StTopCont = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
`
const StLeftCont = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
`
const StRightCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  .logoPlusNickName{
    text-align: center;
  }
  .avatar{
    margin: auto;
    width: 4vw;
    height: 4vw;
  }
`
const StLink = styled(Link)`

`
const StUserCont = styled.div`
  display: flex;
  /* justify-content: space-between; */
  
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

  .img, .video{
    width: 100%;
    height: auto;
  }
`;

const StDatePlaceCont = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .place {
    /* margin-top: 10px; */
    font-size: 80%;
    font-style: italic;
    font-weight: thin;
  }
`

const StName = styled.div`
  color: black;
`;

const StTFCont = styled.div`
  display: flex;
  flex-direction: column;
`
const StTF = styled(InputBase)`
  /* .MuiInputBase-marginDense{
    margin-left: 10px;
  } */
  /* border-width: 0; */
`

const StBtnCont = styled.div`
  display: flex;
  justify-content: flex-end;

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
