import React, { Component } from 'react';
import { Button, Table, Th, Td, Title } from './style';
import { Props, State } from './_types/calendar';
import './Modal/Modal.scss';
import Modal from "./Modal/Modal";



import {
  showPrevMonthFn, 
  getCalendarDayListFn, 
  showNextMonthFn,
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
  // showModal = () => showModalFn(this);
  // changeModalFalg = () => {
  //   this.setState({ isModalOpen: true });
  //   console.log(this.state.isModalOpen);

  //   this.showModal();
  // };

  // setStateAsync(state:object) {
  //   return new Promise((resolve) => {
  //     this.setState(state, resolve)
  //   });
  // }

  openModal = (day:number) => {
    this.setState({ isModalOpen: true });
    this.setState({ curDay: day });
  }

  closeModal = () => { this.setState({ isModalOpen: false }); }

  // showModal = () => {
  //   render( <Modal
  //   isOpen={this.state.isModalOpen}
  //   close={this.closeModal}
  //   year={this.state.year}
  //   month={this.state.month}
  //   // day = {day}
  //   />)
  //   render(<>{console.log("showModal")}</>)
  // }

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
          {this.state.arr.map((row, idx) => (
              <tr key={idx}>
                {row.map((day, idx2) => (
                  day
                  ? <Td key={idx2}>
                    
                    {/* 여기에 component 를 넣는 식으로 만들기 props 넘겨서 */}
                        <span onClick= {() => this.openModal(day)}>{day}</span>
                        <p>일정</p>
                        <p>일정</p>
                        <p>일정</p>
                        <p>일정</p>
                    </Td>
                  : <Td key={idx2}>{""}</Td>))}
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
        />
        : null}
      </>
    )
  }
}

export { Container };