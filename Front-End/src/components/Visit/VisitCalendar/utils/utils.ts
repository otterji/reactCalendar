import Axios from 'axios';
import { ServerData, DateData } from '../_types/calendar';
import { url as _url } from '../../../../url';

const getPrevMonthDate = (viewDate: Date) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth() + 1;
  const isNewYear = month === 1 ? true : false;
  const { computedYear, computedMonth } = {
    computedYear: isNewYear ? year - 1 : year,
    computedMonth: isNewYear ? 12 : month - 1
  };

  const ret = new Date(`${computedYear}-${computedMonth}`);
  return ret;
};

const getNextMonthDate = (viewDate: Date) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth() + 1;
  const isNewYear = month === 12 ? true : false;
  const { computedYear, computedMonth } = {
    computedYear: isNewYear ? year + 1 : year,
    computedMonth: isNewYear ? 1 : month + 1
  };

  const ret = new Date(`${computedYear}-${computedMonth}`);
  return ret;
};

const getCalendarDayList = (curDate: Date) => {
  const year = curDate.getFullYear();
  const month = curDate.getMonth() + 1;
  const days: Array<any> = [];
  const endPoint: number = getMonthLengthFn(year, month); // 며칠까지 있는지
  const startPoint: Date = new Date(year, month - 1, 1);
  const init: number = startPoint.getDay();

  for (let j = 0; j < init; j++) {
    days.push(0);
  }

  for (let i = 1; i <= endPoint; i++) {
    days.push(i);
  }

  // for (let k=0; k < endPoint; k++) {
  //   days.push(0)
  // }

  return days;
};

const getMonthLengthFn = (year: number, month: number) => {
  const comMonth = month;

  if (comMonth === 2) {
    if (isLeafYear(year)) {
      return 29;
    } else {
      return 28;
    }
  } else {
    if (comMonth < 8) {
      if (comMonth % 2 > 0) {
        return 31;
      } else {
        return 30;
      }
    } else {
      if (comMonth % 2 > 0) {
        return 30;
      } else {
        return 31;
      }
    }
  }
};

const isLeafYear = (year: number) => {
  const isLeaf: boolean =
    (year % 4 === 0 && year % 100 > 0) || (year % 400 === 0 && year % 3200 > 0);
  return isLeaf;
};


const getHttpXXXList = async (params: { _yymm: string, id: string }) => {
  const { _yymm, id } = params;

  try {
    const pageNickname = id
    const reqId = await Axios.get(`${_url}/channel/searchChannelByNickname/${pageNickname}`)
    const res = await Axios.get(`${_url}/getSchedules/${reqId.data[0].id}/${_yymm}`);
    const returnList: ServerData[] = res.data;

    return returnList;
  } catch (e) {
    alert(e);
  }
};

const fetchData = async (params: {
  // subList;
  viewDate: Date;
  setDataList: any;
  id: string;
}) => {
  const { viewDate, setDataList, id } = params;

  const addZero = (n: string) => {
    return n.length === 1 ? '0' + n : n;
  };

  try {

  } catch (e) {
    alert(e)
  }
  // 그 애 axios 요청만 보내기

  const mm = addZero(`${viewDate.getMonth() + 1}`);

  const qparams = {
    _yymm: `${viewDate.getFullYear()}-${mm}`,
    id: id
  };

  let reqRet: ServerData[] = [];
  try {
    reqRet = (await getHttpXXXList(qparams)) || [];
  } catch (e) {
    console.info('SERVER_ERR!!!', e);
  }

  const sortedList = reqRet.sort(
    (a: ServerData, b: ServerData) =>
      Date.parse(JSON.stringify(a.startAt)) -
      Date.parse(JSON.stringify(b.startAt))
  );
  const dayList: number[] = getCalendarDayList(viewDate);

  const list: DateData[] = dayList.map((e: number) => {
    const filters = sortedList.filter(
      (ein: ServerData) =>
        new Date(ein.startAt).getDate() <= e &&
        e <= new Date(ein.endAt).getDate()
    );
    // const channelFilters = subList.filter(s

    return {
      days:
        e === 0
          ? 0
          : new Date(
            `${viewDate.getFullYear()}-${viewDate.getMonth() + 1}-${e}`
          ),
      schedules: [...filters]
    };
  });

  setDataList(list);
};



export {
  getCalendarDayList,
  getHttpXXXList,
  getPrevMonthDate,
  fetchData,
  getNextMonthDate
};
