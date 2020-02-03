import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: white;
  width: 24px;
  height: 24px;
  top: 15px;
  border: none;
`

interface Props {
}

interface State{
  year: number;
  month: number;
  arr: number[][];
}

class Calendar extends Component<Props, State>{
  constructor(props: Props) {
    super(props)
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      arr: [],
    }
  }

  componentDidMount() {
    this.getCalendarDayList()
  }

  isYoonYear() {
    const year: number = this.state.year;
    if (year % 4 === 0 && year % 100 > 0) {
      return true
    } else if (year % 400 === 0 && year % 3200 > 0) {
      return true
    } else {
      return false
    }
  }

  getMonthLength(mt: number) {
    const month:number = mt
    if (month === 2) {
      if (this.isYoonYear()) {
        return 29
      } else {
        return 28
      }
    } else {
      if (month < 8) {
        if (month % 2 > 0) {
          return 31
        } else {
          return 30
        }
      } else {
        if (month % 2 > 0) {
          return 30
        } else {
          return 31
        }
      }
    }
  }

  getCalendarDayList() {
    const days: Array<any> = [];
    const endPoint: number = this.getMonthLength(this.state.month);  // 며칠까지 있는지
    let startpoint: Date = new Date(this.state.year, this.state.month - 1, 1);
    let init: number = startpoint.getDay();
    let arr: number[][] = [];
    let temp: number = 0


    for (let j=0; j < init; j++) {
      days.push(0)
    }

    for (let i = 1; i <= endPoint; i++) {
      days.push(i)
    }

    if (days.length > 30) {
      for (let k=0; k < endPoint; k++) {
        days.push(0)
      }
    }
    
    for (var i = 0; i < 6; i++) {
      arr[i] = []
      for (var j=0; j < 7; j++) {
        if (j < init) {
          arr[i][j] = 0
        }
        arr[i][j] = days[j+temp]
      }
      temp += 7;
    }

    this.setState({
      arr: arr
    });
  }

  
  
  showNextMonth() {
    if (this.state.month === 12) {
      this.setState({
        year: this.state.year + 1,
        month: 1
      }, () => {
        this.getCalendarDayList()
      })
    } else {
      this.setState({
        month: this.state.month + 1
      }, () => {
        this.getCalendarDayList()
      }
      )
    }
  }

  showPrevMonth() {
    if (this.state.month === 1) {
      this.setState({
        year: this.state.year - 1,
        month: 12
      }, () => {
        this.getCalendarDayList()
      })
    } else {
      this.setState({
        month: this.state.month - 1
      }, () => {
        this.getCalendarDayList()
      }
      )
    }
  }

  render() {

    const tempStyle={
      display:"inline-block",
    }

    const tableStyle={
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
    }

    const fontRed={
      color: 'red',
    }

    const fontBlue={
      color: 'blue',
    }

    return (
      <>
      <div>
        <Button style={tempStyle} onClick={this.showPrevMonth.bind(this)}> &lt; </Button>
        <h4 style={tempStyle}>
          {this.state.year}년 {this.state.month}월
        </h4>
        <Button style={tempStyle} onClick={this.showNextMonth.bind(this)}> &gt; </Button>
      </div>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={fontRed}>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th style={fontBlue}>토</th>
          </tr>
          {this.state.arr.map((row, index_1) => (
              <tr key={row.join("")}>
                {row.map((day, index_2) => (
                  day ? <td key={day+index_2}>{day}</td> : <td key={day+index_2}>{""}</td>
                ))}
                </tr>
            ))}
        </tbody>
      </table>
      </>
    )
  }
}

export default Calendar;