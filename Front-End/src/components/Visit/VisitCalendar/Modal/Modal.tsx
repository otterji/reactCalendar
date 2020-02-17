import React, { useMemo } from 'react';
import './Modal.scss';
import AddForm from '../PostCalendar/AddForm';
import { ModalProps } from '../_types/calendar';
import { TYPE_DETAIL, TYPE_ADD, TYPE_SHARE } from '../utils/CONST';
import { DetailScheduleModal } from './DetailScheduleModal';
import { ShareForm } from '../PostCalendar/ShareForm';

const Modal = (params: ModalProps) => {
  const { close, data, openModal } = params;
  const { type } = data;

  const typeObj = useMemo(() => ({
    [TYPE_DETAIL]: <DetailScheduleModal close={close} data={data} openModal={openModal} />,
    [TYPE_ADD]: <AddForm close={close} dayData={data.days} openModal={openModal} />,
    [TYPE_SHARE]: <ShareForm close={close} data={data} openModal={openModal} />,
  }), [close, data, openModal]);

  return (
    // @ts-ignore HACK: WTF?
    <>{typeObj[type] || <div>Modal을 띄우는 데 문제가 생겼습니당 ㅜㅠ</div>}</>
  )
}

export default Modal;