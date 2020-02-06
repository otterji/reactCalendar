import React, { Component } from 'react';
import { Button, Table, Th, Td, Title } from './style';
import { Props, State } from './_types/calendar';
import './Modal/Modal.scss';
import Modal from "./Modal/Modal";
import {
  showPrevMonthFn, 
  getCalendarDayListFn, 
  showNextMonthFn,
  getHttpXXXList
 } from './utils';

class Container extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      arr: [],
      isModalOpen: false,
      curDay: 0,
      xxxList: [],
      list: [] as any
    }
  }

  // setTestState = (callback) => {
  //   this.setState({...callbak});
  // }

  async componentDidMount() {
    const reqRet: any[] = await getHttpXXXList();
    const xxxList = reqRet.sort((a, b) => Date.parse(a.startAt) - Date.parse(b.startAt));
    this.getCalendarDayList();
    this.setState({xxxList});

    const list: any = this.state.arr.map((e: any) => ({
      days: e,
      xxx: xxxList.filter(ein => {
        const inDay = new Date(ein.startAt).getDate();
        return e.includes(inDay) ? ein : null;
      })
    }));

    this.setState({list});
    
    console.log(this.state.list)
  }

  getCalendarDayList = () => getCalendarDayListFn(this);
  showNextMonth = () => showNextMonthFn(this);
  showPrevMonth = () => showPrevMonthFn(this);

  openModal = (day:number) => {
    this.setState({ isModalOpen: true });
    this.setState({ curDay: day });
  }

  closeModal = () => { this.setState({ isModalOpen: false }); }

  render() {
    return (
      <>
      <Title>
        <Button onClick={this.showPrevMonth}> &lt; </Button>
        <h4 style={{display: 'inline-block'}} >
          {this.state.year}년 {this.state.month}월
        </h4>
        <Button onClick={this.showNextMonth}> &gt; </Button>
      </Title>
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
          {/* Calendar 렌더링 부분 */}
          {this.state.list.map((row, idx) => (
              <tr key={idx}>
                {
                  row.days.map((day, idx2) => (
                    day
                    ? <Td>
                      {day}
                  {row.xxx.map(xe => <p key={idx2}>{day}{xe.title}</p>)}
                  </Td>
                    : null
                  ))
                }
              </tr>
          ))}
        </tbody>
      </Table>
      { this.state.isModalOpen ? 
        <Modal
        isOpen={this.state.isModalOpen}
        close={this.closeModal}
        year={this.state.year}
        month={this.state.month}
        day = {this.state.curDay}
        xxxList={this.state.xxxList}
        selectedDate={new Date(`${this.state.year}-${this.state.month}-${this.state.curDay}`)}
        />
        : null}
      </>
    )
  }
  
}

export { Container };