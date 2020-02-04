
                                                                                                                                                                                                                                       
const showPrevMonthFn = (self: any) => {
    const isNewYear = self.state.month === 1 ? true : false;
    const params = isNewYear 
        ? { ...self.state, year: self.state.year - 1, month: 12 } 
        : { ...self.state, month: self.state.month - 1 };

    self.setState(params, () => getCalendarDayListFn(self));
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
    arr: arr
  });
  console.log(arr);
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
};

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

export { showPrevMonthFn, getCalendarDayListFn, showNextMonthFn };