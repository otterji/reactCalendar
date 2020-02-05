import React, { useState } from 'react';
import './Modal.scss';

const AddForm = ({ close, isView, setisView }:any) => {
  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
      <input placeholder="제목을 입력하세요" className="title"></input>
        <div className="content">
        <form action="#">
          내용 : <input></input> <br></br>
          기간:   <input id="datepick" placeholder="DatePicker"></input><br></br>
          참석자:   <input></input> <br></br>
          장소:   <input></input> <br></br>
        </form>
        </div>
        <div className="button-wrap">
          <button onClick={() => setisView(true)}>추가</button>
        </div>
      </div>
    </>
  )
 }
export default AddForm ;