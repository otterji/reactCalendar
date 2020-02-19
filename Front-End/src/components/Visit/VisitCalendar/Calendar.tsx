import React, { FunctionComponent, useState } from 'react';
import { Table } from "./style";
import { DateData, CalendarProps } from './_types/calendar';
import { Td } from './Table';
import { Zoom } from '@material-ui/core'

const Calendar: FunctionComponent<CalendarProps & any> = props => {
  const { openModal, list, reload, } = props;

  const [hoverRange, setHoverRange] = useState([0, 0]);

  // XXX: How can i fix?
  const trList: any[] = [];
  const tdList: any[] = [];
  let cnt = 100;



  // console.log('Calendar.tsx 안의 subList', subscribeSch)
  // console.log(list)
  list.map((data: DateData, idx: number) => {
    if (idx !== 0 && idx % 7 === 0) {
      trList.push(<tr key={cnt++}>{tdList.map(e => e)}</tr>);
      tdList.length = 0;
    }

    tdList.push(
      <Td key={++cnt}
        days={data.days}
        schedules={data.schedules}
        openModal={openModal}
        reload={reload}
        setHoverRange={setHoverRange}
        hoverRange={hoverRange} />
    );
  });
  trList.push(<tr key={cnt++}>{tdList.map(e => e)}</tr>);



  return (
    <Zoom in={true} timeout={500}>
      <Table>
        <tbody style={{ width: "100%" }}>
          <tr style={{ backgroundColor: "#80CBC4" }}>
            <th style={{ color: "red", borderRadius: "3px" }}>일</th>
            <th style={{ borderRadius: "3px" }}>월</th>
            <th style={{ borderRadius: "3px" }}>화</th>
            <th style={{ borderRadius: "3px" }}>수</th>
            <th style={{ borderRadius: "3px" }}>목</th>
            <th style={{ borderRadius: "3px" }}>금</th>
            <th style={{ color: "blue", borderRadius: "3px" }}>토</th>
          </tr>
          {trList}
        </tbody>
      </Table>
    </Zoom>
  )
}

export { Calendar };