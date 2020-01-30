# 시잰의 PJT LOG



## 20/01/20

- ###### 로그인 페이지 UI 구현 및 컴포넌트 화

  - 전체적인 컴포넌트는 Material UI 사용, 디테일한 부분은 CSS로 작성
  - 파일명 Login.js, Login.scss



- ###### ~~설치해야할 module들 <br/>(주의!  `npm start` 하는 위치에서 명령어를 입력 해야함, `create-react-app` 프로젝트 안에 `node_modules` 폴더에 저장해야하기 때문)~~

  - ~~`npm install @material-ui/core ` : MUI~~
  - ~~`npm install @material-ui/icons` : MUI에서 제공하는 아이콘들~~
  - ~~`npm install @material-ui/lab` : MUI에서 실험적으로 사용하는 컴포넌트들~~
  - ~~`npm install react-calendar` : 달력 라이브러리, 안깔아도 상관은 없음~~
  - ~~`npm install node-sass` : React에서 scss 파일을 import할 수 있게 해주는 라이브러리~~



- ###### ~~requirement 파일에 npm install 한 파일들 명시하기~~



---



## 20/01/21

- ###### 기존에 작성한 프로젝트와 코드 Typescript로 변환

  - 개발 환경 구축 설명서

    >1. `npx install create-react-app --typescript` 로 프로젝트 생성
    >2. `npm install --save typescript @types/node @types/react @types/react-dom @types/jest` , 이거 써야 import 에러 안뜨더라
    >3. `npm start` 하는 폴더 경로에서  `npm install` 입력,  개인적으로 다운받은 node-module들을 통합적으로 다운로드 하는 방법.



- ###### Typescript 관련해서 참고하면 좋은 링크

  - https://create-react-app.dev/docs/adding-typescript/ : React-TS 설치
  - https://typescript-kr.github.io/ : TypeScript-Handbook 한글 문서
  - https://react-etc.vlpt.us/06.typescript-basic.html : TS 기초
  - https://velog.io/@velopert/using-react-with-typescript : TS 기초,  이분의 다른 TS관련 글도 참고하면 좋음
  - https://velopert.com/3595 : 갓로퍼트



- ###### 와이어프레임 퓨ㅠㅠㅠㅠㅠㅠ 하기시러러러러ㅓ



---



## 20.01.22

- 아이디어 회의



---



## 20.01.23

- styled-components 연습해봤는데 일반적인 css 보다 관리가 편할 것 같아서 채택해도 될 것 같다. 하지만, 아직 테스트 단계
- Typescript를 사용하면 다른 라이브러리나 모듈을 사용할 때, 일일이 ts 형식으로 바꿔주어야 하는 번거로움이 있다. 따라서 ts는 그냥 버리기로 했다.



---



## 20.01.28

- 오늘은 로그인 화면을 보완하고 회원가입 페이지를 구현했다. 내일 중으로 validation 끝내야 할 것 같다.

- 그냥 다시 Typescript 사용하기로 결정했다... 
  궁합이 좋아서 React를 사용하면 Typescript를 사용하는 것을 권장하고, 현업에서도 그렇게 쓰인다고 한다.

- CSS-in-JS는 라이브러리 간의 계층 순서가 존재한다. 
  따라서  Material-UI와 styled-components를 연동 시킬 때, styled-components 라이브러리로 작성한 코드가 적용이 안되는 경우가 있다. 이때 !!!! index.tsx 파일에 다음과 같이 작성해주자

  ```tsx
  import { StylesProvider } from '@material-ui/core/styles';
  
  ReactDOM.render(<StylesProvider injectFirst><App /></StylesProvider>, document.getElementById('root'));
  ```

  

---



## 20.01.29

- 타입스크립트 ㅈㄴ 싫어
- 라우터 활용해서 클라이언트 사이드에서 페이지 전환