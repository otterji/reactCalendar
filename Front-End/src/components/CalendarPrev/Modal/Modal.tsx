import React, { useState } from 'react';
import './Modal.scss';
import View from './View';
import AddForm from '../PostCalendar/AddForm';

const Modal = (params: any) => {
  const { isOpen, close, year, month, day, selectedDate, xxxList, preventRefreshList } = params;
  const [isView, setisView] = useState(true);
  const qparams = {
      year,
      month,
      day,
      isView,
      xxxList,
      setisView,
      selectedDate,
      preventRefreshList,
  }

  return (
      <> 
      {
        isView
        ? <View 
          close={close}
          qparams={qparams}
          />
          
        : <AddForm 
        close={close}
        year={year}
        month={month}
        day={day}
        isView={isView}
        setisView={setisView}
        selectedDate={selectedDate}
        preventRefreshList={preventRefreshList}
        />
      } </>
  )
}
export default Modal;