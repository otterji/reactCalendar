import React, { Component } from 'react'
import { Link, } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
//style
import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers'
import { Event, StarBorderRounded, StarRounded,
  AddRounded, AddCircleRounded, } from '@material-ui/icons'

interface State {
  isInterest: boolean;
  isAdd: boolean;
  isOpen: boolean;
}

class Feed extends Component<any, State>{
  constructor(props:any){
    super(props);
    this.state = {
      isInterest: false,
      isAdd: false,
      isOpen: false,
    }
  }

  openCalendar = () => {
    this.setState({isOpen: !this.state.isOpen})
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


  render() {
    return (
        <>
          <StFeedCont>

            <StUserCont>
              <Avatar src=''/>
              <Link to=''>{this.props.info.schedules.nickName}</Link>
            </StUserCont>

            <StContentCont>
              <h3 className="title">
                {this.props.info.schedules.title}
              </h3>
              <div className="contents">
                {this.props.info.schedules.contents}
              </div>
            </StContentCont>

            <StBtnCont>
              <div className="schedule">
                <Event className="calendar" onClick={this.openCalendar}/>
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
              </div>
            </StBtnCont>
          </StFeedCont>


        </>
    )
  }
}

export default Feed;



const StFeedCont = styled.div`
  position: relative;
  margin: 20px;
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
  /* position: absolute;
  bottom: 10px;
  right: 15px;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 3px; */

  display: flex;
  justify-content: space-between;

  *{
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
      color: yellow;
    }
  }
  .stared{
    color: yellow;
    &:hover{
      color: black;
    }
  }`