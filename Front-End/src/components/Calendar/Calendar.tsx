import React, { FunctionComponent } from 'react';
import { Table } from "./style";
import { DateData, CalendarProps } from './_types/calendar';
import {Td} from './Table';

const Calendar: FunctionComponent<CalendarProps> = props => {
  const { openModal, list, reload } = props;

  // XXX: How can i fix?
  const trList: any[] = [];
  const tdList: any[] = [];
  let cnt = 100;

  list.map((data: DateData, idx: number) => {
    if (idx !== 0 && idx % 7 === 0) {
      trList.push(<tr key={cnt++}>{tdList.map(e => e)}</tr>);
      tdList.length = 0;
    }

    tdList.push(
      <Td key={++cnt} days={data.days} schedules={data.schedules} openModal={openModal} reload={reload} />
    );
  });
  trList.push(<tr key={cnt++}>{tdList.map(e => e)}</tr>);

  return (
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
        {trList}
      </tbody>
    </Table>
  )
}

export { Calendar };