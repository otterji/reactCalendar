import React, { FunctionComponent } from 'react';
import { StyledTd, StyledScheduleLi, StyledScheduleUi, StyledClearIcon, StyledLiTitle, StartLabel, EndLabel, DangLabel } from '../style';
import { DateData, OpenModal, ServerData } from '../_types/calendar';
import { TdDay } from './TdDay';
import { TYPE_DETAIL } from '../utils/CONST';
import axios from 'axios';
import { url as _url } from '../../../../url';
import {Fade} from '@material-ui/core';

const Td: FunctionComponent<DateData & OpenModal & Reload & any> = props => {
  const { days, schedules, openModal, reload, setHoverRange, hoverRange } = props;
  // console.log(days)
  const onClickHandler = (e: any) => {
    openModal({ days: (days as Date), schedules: [e], type: TYPE_DETAIL });
  }

  const deleteSchedule = async (e: ServerData) => {
    try {
      const res = await axios.delete(`${_url}/deleteSchedules/${e.schNo}`);
      if (![200, 201, 301].includes(res.status)) {
        alert('wtf server');
        return;
      }
      reload();
    } catch (err) {
      alert(err);
    }
  }

  // 스케쥴 리스트 그 자체임. 라벨을 포함한.
  const scheduleList = schedules.map((e: ServerData, idx: number) => {
    const selectedDate = typeof days !== 'number' ? (days as Date).getDate() : days;
    const startDate = (new Date(e.startAt.toString())).getDate();
    const endDate = (new Date(e.endAt.toString())).getDate();
    const isOneDay = e.oneDay

    const trueIdx: isValue = ([
      { is: isOneDay, value: '당' },
      { is: (startDate === selectedDate), value: '시' },
      { is: (endDate === selectedDate), value: '끝' },
      { is: true, value: false }
    ].find(e => e.is)) as isValue;

    let DayLabel;
    if (trueIdx.value == '시') {
      DayLabel = <StartLabel key={idx}>{trueIdx.value}</StartLabel>
    } else if (trueIdx.value == '끝') {
      DayLabel = <EndLabel key={idx}>{trueIdx.value}</EndLabel>
    } else {
      DayLabel = <DangLabel key={idx}>{trueIdx.value}</DangLabel>
    }

    const dayColor: any = (e: ServerData) => {
      let color = ""
      e.csrDto ? color = e.csrDto.color[0] : color = ""
      return color
    }

    const hoverRange: any = (e: ServerData) => {
      setHoverRange([startDate, endDate])
      reload();
    }

    const notHoverRange: any = (e: ServerData) => {
      setHoverRange([0, 0])
      reload();
    }

    return (
      <>
      {/* <Fade in={true} timeout={2500}> */}
        <StyledScheduleLi key={idx}>
          {trueIdx.value ?
            <>
              {DayLabel}
              <StyledLiTitle
                onClick={() => onClickHandler(e)}
                onMouseOver={() => hoverRange(e)}
                onMouseOut={() => notHoverRange(e)}
                style={{ color: dayColor(e) }}>
                {e.title}
              </StyledLiTitle>
            </>
            : null
          }
          </StyledScheduleLi>
      {/* </Fade> */}
      </>
        )
      });

    
    
      return (
    <StyledTd isDisplay={days !== 0}>
          {days === 0 ? null
            : (
              <>
                <TdDay days={(days) as Date} openModal={openModal} hoverRange={hoverRange}/>
                <StyledScheduleUi>{scheduleList}</StyledScheduleUi>
              </>
            )
          }</StyledTd>
        )
      };
      
type Reload = {
          reload: () => void;
      }
      
type isValue = {
          is: boolean;
        value: string | boolean;
      }
      
      
export {Td};