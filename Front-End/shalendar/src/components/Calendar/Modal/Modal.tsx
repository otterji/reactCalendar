import React, { useState } from 'react';
import './Modal.scss';
import View from './View';
import AddForm from '../PostCalendar/AddForm';

const Modal = ({ isOpen, close, year, month, day }: any) => {
  const [isView, setisView] = useState(true);
  return (
    <>
    {
      isOpen ?
      <> 
      {
        isView
        ? <View 
          close={close}
          year={year}
          month={month}
          day={day}
          isView={isView}
          setisView={setisView}
          />
        : <AddForm 
        close={close}
        year={year}
        month={month}
        day={day}
        isView={isView}
        setisView={setisView}
        />
      } </>
    : <></>
    }
    </>
  )
}
export default Modal;