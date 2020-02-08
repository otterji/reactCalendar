import React, { useState } from 'react';
import './Modal.scss';

const View = (params: any) => {
  const { close, qparams } = params;
  const { year, month, day, isView, setisView, selectedDate, xxxList } = qparams;
  
  return(
  <React.Fragment>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
      <p className="title">{year}년 {month}월 {day}일</p>
      <div className="content">
      <li>
          일정
          <button>수정</button>
          <button>삭제</button>
      </li>
      <li>
          일정
          <button>수정</button>
          <button>삭제</button>
      </li>

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