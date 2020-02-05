import React, { useState } from 'react';
import './Modal.scss';

const View = ({ close, year, month, day, isView, setisView }: any) => {
  return(
  <React.Fragment>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
      <p className="title">{year}년 {month}월 {day}일</p>
      <div className="content">
      <p>
          일정 목록이 표시됩니다.
      </p>

      <button onClick={() => setisView(false)}>+</button>

      </div>
      <div className="button-wrap">
          <button onClick={close}>완료</button>
      </div>
      </div>
  </React.Fragment>
  )
}

export default View;