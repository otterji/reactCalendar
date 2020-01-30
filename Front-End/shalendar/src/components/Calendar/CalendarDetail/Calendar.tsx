import React, { Component } from 'react';

interface Props {
}

interface State{
  year: number;
  month: number;
  day: number;
  weekday: number;
  test: Array<any>;
  days: Array<any>;

}

class Calendar extends Component<Props, State>{
  constructor(props: Props) {
    super(props)
    this.state = {
      weekday: new Date().getDay(),
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      test: [<td>0</td>,<td>0</td>,<td>1</td>,<td>2</td>],
      days: [],
    }
  }

  // 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행
  componentDidMount() {
    this.getCalendarDayList()
    console.log(this.state.days);
    // console.log(this.state.test);
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

  // 펼침연산 알아보기
  // const trList = [];
  // const tt = tdList.reduce((acc, cur, idx) => {
  //   if(idx % 6 === 0) {
  //     trList.push(<tr>{...acc}</tr>);
  //     return [];
  //   }
  //   else acc.push(cur);

  //   return acc;
  // }, []);

  // 날짜(숫자)에 table 태그 걸어서 state에 있는 배열에 추가
  getCalendarDayList() {
    const days: Array<any> = []
    const finishMonth: number = this.state.weekday  // 이번 달 시작 요일 인덱스
    const endPoint: number = this.getMonthLength(this.state.month)  // 며칠까지 있는지
    let resultDaysHtml: Array<any> = []
    
    // console.log('hit');

    for (let j=0; j < finishMonth; j++) {
      this.state.days.push(<td>{0}</td>)
    }

    for (let i = 1; i < endPoint+1; i++) {
      this.state.days.push(<tr>{i}</tr>)
    }

    days.reduce((acc, cur, idx) => {
      if (idx % 6 === 0) {
        resultDaysHtml.push(<tr>{acc}</tr>);
        return [];
      }
      else {acc.push(cur)};
      return acc;
    }, []);

    // this.setState({
    //   days: days
    // });
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
      <tbody>
        {this.state.days}
        {this.state.test}
      </tbody>
    </table>
    </>
    )
  }
}

export default Calendar;