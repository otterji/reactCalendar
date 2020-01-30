import React, { Component } from 'react';

interface Props {
}

interface State{
  year: number;
  month: number;
  day: number;
}

class Calendar extends Component<Props, State>{
  constructor(props: Props) {
    super(props)
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    }
  }

  // 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행
  componentDidMount() {
    this.getCalendarDayList()
  }

  // 윤년 여부
  isYoonYear() {
    const year:number = this.state.year
    if (year % 4 === 0 && year % 100 > 0) {
      return true
    } else if (year % 400 === 0 && year % 3200 > 0) {
      return true
    } else {
      return false
    }
  }

  // 한 달에 몇 일 까지 있는지 구하기
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

  // 2차원 배열에 당월 날짜 넣기
  getCalendarDayList() {
    // const finishMonth: number = this.getMonthLength()
    // const lastDayOfLastMonth: number = new Date(this.state.year, this.state.month, 0).getDay()
    const startPoint: number = this.getMonthLength(this.state.month)
    // const displayDay: number = 0
    const days: number[] = []
    console.log(startPoint)
    for (let i = 1; i < startPoint+1; i++) {
      days.push(i)
    }
    return days
  }
  
  // 다음 달 버튼 눌렀을 때
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

  // 이전 달 버튼 눌렀을 때
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
    return (
    <>
    <div>
      <button onClick={this.showPrevMonth.bind(this)}/>
      <h4>
        {this.state.year}년{this.state.month}월
      </h4>
      <button onClick={this.showNextMonth.bind(this)}/>
    </div>
    <table >
      {/* tr 이 가로 한줄, td가 한 셀 */}
        <tr>
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>

        <tr>
          <td>
            {/* 날짜 한줄 */}
            1
          </td>
        </tr>
        <tr>
          <td>
            {/* 날짜 한줄 */}
          </td>
        </tr>
      <tbody>
        {/* {this.getCalendarDayList()} */}
      </tbody>
    </table>
    </>
    )
  }
}

export default Calendar;