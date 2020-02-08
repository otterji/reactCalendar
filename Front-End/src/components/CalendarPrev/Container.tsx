import React, { Component } from "react";
import { Button, Table, Th, Td, Title } from "./style";
import { Props, State } from "./_types/calendar";
import "./Modal/Modal.scss";
import Modal from "./Modal/Modal";
import {
  showPrevMonthFn,
  getCalendarDayListFn,
  showNextMonthFn,
  getHttpXXXList
} from "./utils";

// HACK: list 를 any 타입으로 바꿨음 타입 다 정의해주거나 이걸로 해줘야함.
// export interface State {
//   year: number;
//   month: number;
//   arr: number[][];
//   isModalOpen: boolean;
//   curDay: number;
//   xxxList: any[];
//   list: any
// }

class Container extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      arr: [],
      isModalOpen: false,
      curDay: 0,
      xxxList: [],
      list: [] as any,
      preventRefreshList: [],
      retArr: [],
    };
  }

  async componentDidMount() {
    const reqRet:any = await getHttpXXXList();
  

    // this.setState({
    //   preventRefreshList: reqRet
    // })
    // console.log('바뀌냐?', this.state.preventRefreshList)


    const xxxList = reqRet.sort((a:any, b:any) => Date.parse(a.startAt) - Date.parse(b.startAt));
    // WTF? Empty Data 
    // const xxxList = [
    //   { title: "밥먹기", startAt: "2020-02-01" },
    //   { title: "싸피가기", startAt: "2020-02-03" },
    //   { title: "공부하기", startAt: "2020-02-03" },
    //   { title: "놀기", startAt: "2020-02-04" }
    // ];
    // 아니면 이 행위를 또 해야됨. show prev mt 나 show next mt 할 때
    this.setState({ xxxList });
    const retArr = this.getCalendarDayList();
    let list: any[] = (retArr).map((e: any[]) => {
      return e.map((ein:any) => {
        const filters = xxxList.filter(
          (ein2:any) => new Date(ein2.startAt).getDate() === ein
        );
        return {
          days: ein,
          xxx: filters
        };
      });
    });
    this.setState({ list });
    // console.log(list)
    console.log('list', list)
    // this.setState({ retArr });
    // {this.setState({
    //   list: retArr
    // })}
  }
  
  componentDidUpdate() {
    console.log('hits');
    if (this.state.list !== this.state.list) {
      fetch(this.state.retArr)
    }
  }


  getCalendarDayList = () => getCalendarDayListFn(this);
  showNextMonth = () => showNextMonthFn(this);
  showPrevMonth = () => showPrevMonthFn(this);

  openModal = (day: number) => {
    this.setState({ isModalOpen: true });
    this.setState({ curDay: day });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <>
      {/* Maximum update depth exceeded */}
      {/* {this.setState({list: this.state.retArr})} */}
      { console.log('retArr in render',this.state.retArr)}
        <Title>
          <Button onClick={this.showPrevMonth}> &lt; </Button>
          <h4 style={{ display: "inline-block" }}>
            {this.state.year}년 {this.state.month}월
          </h4>
          <Button onClick={this.showNextMonth}> &gt; </Button>
        </Title>
        <Table>
          <tbody>
            <tr>
              <th style={{ color: "red" }}>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th style={{ color: "blue" }}>토</th>
            </tr>
            {/* Calendar 렌더링 부분 */}
            {console.log('렌더링 직전 list', this.state.list)}
            {/* {this.state.list = this.state.retArr} */}
            {this.state.list.map((row: any, idx: any) => (
              <tr key={idx}>
                {row.map((ele: any, idx2: any) =>
                  ele.days ? (
                    <Td key={idx2} onClick={() => this.openModal(ele.days)} className="plzHover">
                      {ele.days}
                      {ele.xxx.length > 0
                        ? ele.xxx.map((xel: any, idx3: any) => (
                            <span key={idx3} style={{ display: "block" }}>
                              {xel.title}
                            </span>
                            
                          ))
                        : null}
                    </Td>
                  ) : (
                    <td></td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        {this.state.isModalOpen ? (
          <Modal
            isOpen={this.state.isModalOpen}
            close={this.closeModal}
            year={this.state.year}
            month={this.state.month}
            day={this.state.curDay}
            xxxList={this.state.xxxList}
            selectedDate={
              new Date(
                `${this.state.year}-${this.state.month}-${this.state.curDay}`
              )
            }
            preventRefreshList={this.state.preventRefreshList}
            // preventRerenderingList={this.state.preventRefreshList}
          />
        ) : null}
      </>
    );
  }
}

export { Container };