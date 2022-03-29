# Shalendar 
## 결과 화면
10만개가 넘는 달력 데이터,구독해 달력에 모아보세요!
개인 일정을 추가/수정/삭제할수도 있습니다.달력을 직접

![결과움짤](녹화_2020_02_20_14_10_58_346.gif)

## 개인 및 사용자
![대체텍스트](/Front-End/src/components/common/images/1.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/2.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/3.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/4.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/11.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/22.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/33.jpg "마우스 대면 나와요")
![대체텍스트](/Front-End/src/components/common/images/44.jpg "마우스 대면 나와요")


#### Contributing
- 달력을 제로베이스에서부터 생으로 제작했습니다.
- 100% 지분의 순수 제작입니다.


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

https://dillinger.io/
https://shields.io/
이모지는 :
이미지 정렬은 a태그 align property 사용
license

# Shalendar [![SSAFY #2](https://camo.githubusercontent.com/8557979850a5de4cfc5d5fca559882c121b75398/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f53534146592d322545412542382542302d626c7565)](https://www.ssafy.com/) [![IT Portfolio 2.0](https://camo.githubusercontent.com/d824c9b2c6cb80614d07d854e32977cd425e4c14/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f49542545442538462541432545442538412542382545442538462542342545422541362541432545432539382541342d322e302d626c7565)](https://docs.google.com/presentation/d/1paXAZDGyRnyS9EiZccDoD_yGR4pJ5etSK_tVZyhtf3k/edit?usp=sharing)

> Shalendar


## ⚡️ Quick start

### Installation

```
$ npm install 
```

### Usage

```
$ cd 
$ npm start
```

## 🍴 Contributing

Please fork this project first and pick one of issues you can handle then shoot us your pull request.

## 📄 License

