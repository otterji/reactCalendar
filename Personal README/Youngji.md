# 2020-01- 21~23

- GitHub & Jira 생성
  - git branch 생성 및 공부 자료 배포
- Component 구성
  - Front-End Component 전체 틀 구성

- 구현할 기능 계획
  - https://docs.google.com/spreadsheets/d/1b4mjGYuvfoy-Lkdyh-ICw4auI-Y-zTwN5k_XVFKXz0g/edit#gid=0
- 프로젝트 기능 간소화 회의
- 초안 디자인 수정 및 정리
- 기본 스택 확정: JS, React, React Hooks, styled-component, material-UI
  - React: UI를 만들기위한 JS 라이브러리로, 강력한 추상화도구인 컴포넌트를 사용해 복잡한 UI단을 추상화해줌. 그리고 옵져버블이니 구독이니 하는 복잡한 개념들을 생각하지 않고 주어진 데이터를 가지고 어떻게 렌더링 할 것인가만 생각하면 됨. 또한, 가상 돔을 통해 최적화를 알아서 해줌. 그래서 씀
  - Hooks: 라이프사이클메소드가 간단해지고 functional component가 가독성이 더 뛰어나기 때문
  - styled-component: import를 다 안해도 되고 calssName을 표기하지 않아도 돼서 편함. 말 그 자체 대로 컴포넌트에 스타일을 입힌것. 
  - material-ui: 리액트의 장점을 그대로 받고 커스터마이징이 쉬워서. 아이콘 등을 사용

cf) typescript는 명확한 타입을 명시해 코드의 신뢰성을 높이고 강력한 에러 검출을 하는 장점이 있지만, JS의 장점인 유연함을 제한하고 모듈 설치시 정의 파일들도 별도로 install을 해야하는 번거로움이 있어서 빠르게 만들어야하는 우리 프로젝트에 불필요하다 생각해 사용하지 않았음.

내일