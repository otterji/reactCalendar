import React from 'react';
import './Modal.scss';

const Modal = ({ isOpen, close, year, month, day }: any) => {
  return (
    <React.Fragment>
    {
      isOpen ?
      <React.Fragment>
        {/* {console.log('hit')}
        굉장히 많은 hit 이 한번에 렌더링.. 5시간동안 고치려다 삽질만함.. */}
        <div className="Modal-overlay" onClick={close} />
        <div className="Modal">
          <p className="title">일정 추가</p>
          <div className="content">
            <p>
              {year}년 {month}월 {day}일 의
              일정을 입력해 주세요
            </p>
          </div>
          <div className="button-wrap">
            <button onClick={close}>완료</button>
          </div>
        </div>
      </React.Fragment>
      :
      null
    }
    </React.Fragment>
  )
}
export default Modal;