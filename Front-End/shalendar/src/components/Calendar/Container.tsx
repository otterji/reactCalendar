import React, { Component } from 'react';
import { Button, Table } from './style';
import { Props, State } from './_types/calendar';
import {showPrevMonthFn, getCalendarDayListFn, showNextMonthFn } from './utils';

class Container extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      arr: [],
    }
  }

//   const [year, setYear] = useState(new Date().getFullYear());
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
/** 
 *  useEffect(() => {
 *    setYear(year + 1);
 * }, [month]) 
 * 
 * useEffect(() => {
 *  setMonth(month + 1);
 * }, [next]);
 * 
 * */ 

  componentDidMount() {
    this.getCalendarDayList()
  }

  getCalendarDayList = () => getCalendarDayListFn(this);
  showNextMonth = () => showNextMonthFn(this);
  showPrevMonth = () => showPrevMonthFn(this);

  render() {
    return (
      <>
      <div>
        <Button onClick={this.showPrevMonth}> &lt; </Button>
        <h4 style={{display: 'inline-block'}}>
          {this.state.year}년 {this.state.month}월
        </h4>
        <Button onClick={this.showNextMonth}> &gt; </Button>
      </div>
      <Table>
        <tbody>
          <tr>
            <th style={{color: 'red'}}>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th style={{color: 'blue'}}>토</th>
          </tr>
          {this.state.arr.map((row, idx) => (
              <tr key={idx}>
                {row.map((day, idx2) => (
                  day ? <td key={idx2}>{day}</td> : <td key={idx2}>{""}</td>
                ))}
                </tr>
            ))}
        </tbody>
      </Table>
      </>
    )
  }
}

export { Container };