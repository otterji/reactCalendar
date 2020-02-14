import React, { Component } from 'react'
import { Link, } from 'react-router-dom'
//
import { url } from '../../url'
//style
import styled from 'styled-components'
import { Avatar, Slide, Zoom } from '@material-ui/core'
import { Event, StarBorderRounded, StarRounded,
  AddRounded, AddCircleRounded, DeleteForeverOutlined } from '@material-ui/icons'

interface State {
  isAdd: boolean;
  isInterest: boolean;
  isDelete: boolean;
  info: any;
}

class Feed extends Component<any, State>{
  constructor(props:any){
    super(props);
    this.state = {
      isAdd: false,
      isInterest: false,
      isDelete: false,
      info: this.props.info,
    }
  }

  addSchedule = () => {
    this.setState({isAdd: true})
  }
  exceptSchedule = () => {
    this.setState({isAdd: false})
  }

  addInterest = () => {
    this.setState({isInterest: true})
  }
  exceptInterest = () => {
    this.setState({isInterest: false})
  }

  deleteFeed = async () => {
    const _confirm = window.confirm('피드를 삭제 하시겠습니까?');
    if(!_confirm){
      return;
    }
    const _feedNo = this.props.info.feedNo
    await this.props.delete(_feedNo);
  }

  render() {
    return (<>
      <Slide direction="up" in={true} timeout={500}>
        <StFeedCont>

          <StUserCont>
            <Avatar src={`${url}/${this.state.info.img}`}/>
            <StLink to='/visit/'>{this.state.info.schedules.nickName}</StLink>
          </StUserCont>

          <StContentCont>
            <h3 className="title">                
              {this.props.info.feedNo}
              {this.props.info.schedules.title}
            </h3>
            <div className="contents">
              {this.props.info.schedules.contents}
            </div>
          </StContentCont>

          <StBtnCont>
            <div className="schedule">
              <Event className="calendar"/>
            </div>

            <div >
              {
                this.state.isAdd ?
                    <AddCircleRounded className="added" onClick={this.exceptSchedule}/>
                    :
                    <AddRounded className="excepted" onClick={this.addSchedule}/>
              }

              {
                this.state.isInterest ?
                    <StarRounded className="stared" onClick={this.exceptInterest}/>
                    :
                    <StarBorderRounded className="unstared" onClick={this.addInterest}/>
              }

              <DeleteForeverOutlined className="delete" onClick={this.deleteFeed}/>
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
`

const StUserCont = styled.div`
  display: flex;
  align-items: center;

  .MuiAvatar-root{
    margin-right: 5px;
  }
`

const StLink = styled(Link)`
  text-decoration: none;
`

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