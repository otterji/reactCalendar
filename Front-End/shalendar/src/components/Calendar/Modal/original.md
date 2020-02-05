import React, { useState } from 'react';
import './Modal.scss';
import View from './View';
import AddForm from '../PostCalendar/AddForm';


const Modal = ({ isOpen, close, year, month, day }: any) => {

  return (
    <React.Fragment>
      {/* {console.log('Modal 들어왔슈', isOpen)} */}
    {
      isOpen ?
      <React.Fragment>
        <div className="Modal-overlay" onClick={close} />
        <div className="Modal">
          <p className="title">{year}년 {month}월 {day}일</p>
          <div className="content">
          <p>
             일정 목록이 표시됩니다.
          </p>
          <button onClick={test}>+</button>

          </div>
          <div className="button-wrap">
            <button onClick={close}>완료</button>
          </div>
        </div>
      </React.Fragment>
      :<>
        {/* {console.log('false 조건 걸렸슈', isOpen)} */}
      </>
    }
    </React.Fragment>
  )
}
export default Modal;