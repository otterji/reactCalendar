import Axios from 'axios';

const SERVER_URL = 'http://70.12.246.45:8080';

const showPrevMonthFn = (self: any) => {
  const isNewYear = self.state.month === 1 ? true : false;
  const params = isNewYear 
      ? { ...self.state, year: self.state.year - 1, month: 12 }
      : { ...self.state, month: self.state.month - 1 };

  self.setState(params, () => getCalendarDayListFn(self));
  console.log(self)
};


const showNextMonthFn = (self: any) => {
  if (self.state.month === 12) {
    self.setState({
      year: self.state.year + 1,
      month: 1
    }, () => {
      getCalendarDayListFn(self)
    })
  } else {
    self.setState({
      month: self.state.month + 1
    }, () => {
      getCalendarDayListFn(self)
    }
    )
  }
  console.log(self)
};


const getMonthLengthFn = (year:number, month: number) => {
    if (month === 2) {
        if (isLeafYear(year)) {
        return 29
        } else {
        return 28
        }
    } else {
        if (month < 8) {
        if (month % 2 > 0) {
            return 31
        } else {
            return 30
        }
        } else {
        if (month % 2 > 0) {
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

const getCalendarDayListFn = (self: any) => {
  const days: Array<any> = [];
  const endPoint: number = getMonthLengthFn(self.state.year, self.state.month);  // 며칠까지 있는지
  const startpoint: Date = new Date(self.state.year, self.state.month - 1, 1);
  const init: number = startpoint.getDay();
  let arr: number[][] = [];
  let temp: number = 0
  
  for (let j=0; j < init; j++) {
    days.push(0)
  }

  for (let i = 1; i <= endPoint; i++) {
    days.push(i)
  }

  for (let k=0; k < endPoint; k++) {
      days.push(0)
  }


  for (let i = 0; i < 6; i++) {
    arr[i] = []
    for (let j=0; j < 7; j++) {
      if (j < init) {
        arr[i][j] = 0
      }
      arr[i][j] = days[j+temp]
    }
    temp += 7;
  }
  
  self.setState({
    retArr: arr
  });
  console.log('getDaylist arr', arr)
  // console.log('retData in gtCal()', self.state.retArr)
  return arr
};

const prepareRenderingFn = (self: any) => {
  const xxxList = [
    { title: "밥먹기", startAt: "2020-02-01" },
    { title: "싸피가기", startAt: "2020-02-03" },
    { title: "공부하기", startAt: "2020-02-03" },
    { title: "놀기", startAt: "2020-02-04" }
  ];
  self.setState({ xxxList });
  const list: any[] = (self.state.retArr).map((e: any[]) => {
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
  self.setState({ list });
  console.log('list', list)
}



// Modal.setAppElement('#App')

// const popupModal = (e:any, year:number, month:number, day:number) => {
//   console.log('no modal...')
//   return Modal
// };

// const onClickDayFn = (e:any, year:number, month:number, day:number) => {
//   // stopPropagation 은 부모태그로의 이벤트 전파를 stop 중지하라는 의미입니다.
//   // preventDefault 는 a 태그 처럼 클릭 이벤트 외에 별도의 브라우저 행동을 막기 위해 사용됩니다.
//   console.log(e, year, month, day);
//   popupModal(e, year, month, day);
// };

// 0 붙이는 연산
const addZero = (n:string) => {
  return n.length === 1 ? '0' + n : n;
}

// 0 빼는 연산
const subZero = (n:string) => {
  return n[0] === '0' ? n[1] : n
}

const getHttpXXXList = async ()=> {
  const _id = window.sessionStorage.getItem('id');
  const _yymm = '2020-02'
  try {
    const res = await Axios.get(`${SERVER_URL}/getSchedules/${_id}/${_yymm}`);
    // alert(JSON.stringify(res.data, null, 2));
    // console.log(JSON.stringify(res.data, null, 2))
    const returnList:any[] = res.data;
    return returnList;
  }catch(e) {
    alert(e);
  }
}

export { 
  showPrevMonthFn, 
  getCalendarDayListFn, 
  showNextMonthFn, 
  addZero,
  subZero, 
  SERVER_URL, 
  getHttpXXXList,
  prepareRenderingFn,
};