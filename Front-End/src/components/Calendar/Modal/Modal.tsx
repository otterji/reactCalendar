import React, { useMemo } from 'react';
import './Modal.scss';
import AddForm from '../PostCalendar/AddForm';
import { ModalProps } from '../_types/calendar';
import { TYPE_DETAIL, TYPE_ADD } from '../utils/CONST';
import { DetailScheduleModal } from './DetailScheduleModal';

const Modal = (params: ModalProps) => {
  const { close, data } = params;
  const { type  } = data;

  const typeObj = useMemo(() => ({
    [TYPE_DETAIL]: <DetailScheduleModal close={close} data={data} />,
    [TYPE_ADD]: <AddForm close={close} />,
  }), [])
  

  return (
    // @ts-ignore HACK: WTF?
      <>{typeObj[type] || <div>hi</div>}</>
  )
}

export default Modal;