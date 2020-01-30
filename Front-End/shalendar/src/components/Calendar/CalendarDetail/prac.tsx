import React, { Component } from 'react';
// // import Calendar from 'react-calendar';

// interface Props{

// }
// interface State{
//   date: Date;
//   today: {
//     cur: Date,
//   },
// }

// class MyCalendar extends Component<Props, State>{
//   constructor(props: Props){
//     super(props);
//     this.state = {
//       date: new Date(),
//       today: {
//         cur: new Date(),
//       }
//     }
//   }

//   // onChange = (date:Date) => this.setState({ date })

//   prevCalendar = () => {
//     const cur = this.state.today.cur;
//     this.state.today.cur = new Date(cur.getFullYear(), cur.getMonth() - 1, cur.getDate());
//     this.buildCalendar();
// }


//   nextCalendar = () => {
//       const cur = this.state.today.cur;
//       this.state.today.cur = new Date(cur.getFullYear(), cur.getMonth() + 1, cur.getDate());
//       this.buildCalendar();
//   }


//   buildCalendar = () => {
//       const cur = this.state.today.cur;
//       const doMonth = new Date(cur.getFullYear(), cur.getMonth(), 1);
//       const lastDate = new Date(cur.getFullYear(), cur.getMonth() + 1, 0);
//       const tbCalendar = document.getElementsByClassName("calendar");
//       const tbCalendarYM = document.getElementsByClassName("tbCalendarYM");

//       tbCalendarYM.innerHTML = cur.getFullYear() + "년 " + (cur.getMonth() + 1) + "월";
//       while (tbCalendar.rows.length > 2) {
//           tbCalendar.deleteRow(tbCalendar.rows.length - 1);
//       }

//       const rows: Array<number> = [];
//       rows.push(tbCalendar.insertRow());

//       let cnt = 0;
//       for (let i = 0; i < doMonth.getDay(); i++) {
//           rows[0].insertCell();
//           cnt++;
//       }
//       for (let i = 1; i <=
//           lastDate.getDate(); i++) {
//           const cell = cnt < 7 ? rows[0].insertCell() : rows[rows.length - 1].insertCell();
//           cell.innerHTML = i;
//           cnt++;
          
//           if (cnt % 7 == 1) {
//               cell.innerHTML = "<font color=red>" + i
//           }
//           if (cnt % 7 == 0) {
//               cell.innerHTML = "<font color=blue>" + i; rows.push(tbCalendar.insertRow());
//           }
//           if (cur.getFullYear() == this.state.date.getFullYear() && cur.getMonth() == this.date.getMonth() &&
//               i == this.state.date.getDate()) {
//               cell.bgColor = "yellow";
//           }
//       };
// }

//   render() {
//     return (
//       <>
//         <table id="calendar">
//             <tr>
//                 <td>
//                     <label id="prevBtn" onClick={this.prevCalendar}> &lt; </label>
//                 </td>
//                 <td id="tbCalendarYM" colSpan={5}>
//                     yyyy년 m월
//             </td>
//                 <td>
//                     <label id="nextBtn" onClick={this.nextCalendar}> &gt; </label>
//                 </td>
//             </tr>

//             <tr>
//                 <td  >
//                     <span style={{ color: 'red' }}>일</span>
//                 </td>
//                 <td  >월</td>
//                 <td  >화</td>
//                 <td  >수</td>
//                 <td  >목</td>
//                 <td  >금</td>
//                 <td>
//                     <span style={{ color: 'blue' }}>토</span>
//                 </td>
//             </tr>
//         </table>
//       </>
//       // <div>
//       //   <Calendar
//       //     // onChange={this.onChange}
//       //     value={this.state.date}
//       //   />
//       // </div>
//     );
//   }
// }

// export default MyCalendar;