# 내용 정리중입니다
<<<<<<< HEAD
## 결과 화면
## Shalendar
![대체텍스트](/Front-End/src/components/common/images/shalendar.gif "마우스 대면 나와요")

## 개인 및 사용자
![대체텍스트](/Front-End/src/components/common/images/1.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/2.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/3.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/4.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/11.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/22.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/33.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/44.jpg "마우스 대면 나와요")

=======
>>>>>>> 82b3030f01115f9cadcc14e60ae1ff5617bf1034

#### 개선사항
collection 을 이용해 동일한 속성의 데이터들을 반복적으로 비교 연산하는 부분을 줄여줌
#### 이전 코드
```
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
```

#### 개선 코드
```
const getMonthLengthFnImproved = (year: number, month: number) => {
    const comMonth = month;
    // 2월일 경우 먼저 고려 - 윤년여부
    if (comMonth == 2) { 
        return (year % 4 === 0 && year % 100 > 0) || (year % 400 === 0 && year % 3200 > 0) ? 29 : 28 }
    // 나머지 달 (0, 2월은 비워둠)
    const mtList = [0, 31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return mtList[comMonth]
  };
```
<<<<<<< HEAD
=======

>>>>>>> 82b3030f01115f9cadcc14e60ae1ff5617bf1034
