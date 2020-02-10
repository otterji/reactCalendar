import Axios from 'axios';
import {ServerData,DateData} from '../_types/calendar';
import { url as _url } from '../../../url';


const getPrevMonthDate = (viewDate: Date) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth() + 1;
  const isNewYear = month === 1 ? true : false;
  const {computedYear, computedMonth} = {
      computedYear: isNewYear ? year - 1 : year,
      computedMonth: isNewYear ? 12 : month - 1
  }

  const ret = new Date(`${computedYear}-${computedMonth}`);
  return ret;
};

const getNextMonthDate = (viewDate: Date) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth() + 1;
  const isNewYear = month === 12 ? true : false;
  const {computedYear, computedMonth} = {
    computedYear: isNewYear ? year + 1 : year,
    computedMonth: isNewYear ? 1 : month + 1
}

const ret = new Date(`${computedYear}-${computedMonth}`);
return ret;
}

const getCalendarDayList = (curDate: Date) => {
  const year = curDate.getFullYear();
  const month = curDate.getMonth()+1;
  const days: Array<any> = [];
  const endPoint: number = getMonthLengthFn(year, month);  // 며칠까지 있는지
  const startPoint: Date = new Date(year, month - 1, 1);
  const init: number = startPoint.getDay();
  
  for (let j=0; j < init; j++) {
    days.push(0)
  }

  for (let i = 1; i <= endPoint; i++) {
    days.push(i)
  }

  // for (let k=0; k < endPoint; k++) {
  //   days.push(0)
  // }

  return days;
};

const getMonthLengthFn = (year:number, month: number) => {
  const comMonth = month ;

  if (comMonth === 2) {
    if (isLeafYear(year)) {
      return 29
    } else {
      return 28
    }
  } else {
    if (comMonth < 8) {
      if (comMonth % 2 > 0) {
        return 31
      } else {
        return 30
      }
    } else {
      if (comMonth % 2 > 0) {
        return 30
      } else {
        return 31
      }
    }
  }
};

const isLeafYear = (year: number) => {
    const isLeaf: boolean = (year % 4 === 0 && year % 100 > 0) || (year % 400 === 0 && year % 3200 > 0);
    return isLeaf;
};


// const prepareRenderingFn = (self: any) => {
//   const xxxList = [
//     { title: "밥먹기", startAt: "2020-02-01" },
//     { title: "싸피가기", startAt: "2020-02-03" },
//     { title: "공부하기", startAt: "2020-02-03" },
//     { title: "놀기", startAt: "2020-02-04" }
//   ];
//   self.setState({ xxxList });
//   const list: any[] = (self.state.retArr).map((e: any[]) => {
//     return e.map((ein:any) => {
//       const filters = xxxList.filter(
//         (ein2:any) => new Date(ein2.startAt).getDate() === ein
//       );
//       return {
//         days: ein,
//         xxx: filters
//       };
//     });
//   });
//   self.setState({ list });
// }



// // Modal.setAppElement('#App')

// // const popupModal = (e:any, year:number, month:number, day:number) => {
// //   return Modal
// // };

// // const onClickDayFn = (e:any, year:number, month:number, day:number) => {
// //   // stopPropagation 은 부모태그로의 이벤트 전파를 stop 중지하라는 의미입니다.
// //   // preventDefault 는 a 태그 처럼 클릭 이벤트 외에 별도의 브라우저 행동을 막기 위해 사용됩니다.
// //   popupModal(e, year, month, day);
// // };

// // 0 붙이는 연산
// const addZero = (n:string) => {
//   return n.length === 1 ? '0' + n : n;
// }

// // 0 빼는 연산
// const subZero = (n:string) => {
//   return n[0] === '0' ? n[1] : n
// }

const getHttpXXXList = async (params: { _yymm: number })=> {
  const {_yymm} = params;
  const _id = window.sessionStorage.getItem('id');
  
  try {
    const res = await Axios.get(`${_url}/getSchedules/${_id}/${_yymm}`);
    // alert(JSON.stringify(res.data, null, 2));
    const returnList:ServerData[] = res.data;

    return returnList;
  }catch(e) {
    alert(e);
  }
}

const fetchData = async (params: {viewDate: Date, setDataList: any}) => {
  const {viewDate, setDataList} = params;

  const qparams = {
    _yymm: viewDate.getMonth() + 1
  };

  let reqRet: ServerData[] = [] 
  try {   
    reqRet = await getHttpXXXList(qparams) || [];
  } catch(e) {
    console.info('SERVER_ERR!!!', e);
  }
  const sortedList = reqRet.sort((a:ServerData, b:ServerData) => Date.parse(JSON.stringify(a.startAt)) - Date.parse(JSON.stringify(b.startAt)));
  const dayList: number[] = getCalendarDayList(viewDate);

  const list: DateData[] = dayList.map((e: number) => {
    const filters = sortedList.filter(
      (ein:ServerData) => new Date(ein.startAt).getDate() === e
    );

    return {
      days: e === 0 ? 0 : new Date(`${viewDate.getFullYear()}-${viewDate.getMonth()+1}-${e}`),
      schedules: filters
    };
  });

  setDataList(list);
}

export { 
  getCalendarDayList, 
  getHttpXXXList,
  getPrevMonthDate,
  fetchData,
  getNextMonthDate
};