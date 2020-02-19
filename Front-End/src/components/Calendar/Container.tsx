import React, { FunctionComponent, useState, useEffect } from 'react';
import { Button, Title } from './style';
import { Slide } from '@material-ui/core';
import './Modal/Modal.scss';
import Modal from './Modal/Modal';
import { getPrevMonthDate, fetchData, getNextMonthDate } from './utils/utils';
import { DateData, ModalData } from './_types/calendar';
import { Calendar } from './Calendar';

const Container: FunctionComponent<any> = ({ changeYYMM, subscribeSch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [dataList, setDataList] = useState([] as DateData[]);
  const [toggleRender, setToggleRender] = useState(false);
  const [modalData, setModalData] = useState({} as ModalData);

  // console.log('Conatiner.tsx 안의 subList', subscribeSch)
  
  // 보여지고 있는 달력의 데이터가 변경될 때마다 훅스가 실행
  // @ts-ignore
  useEffect(() => {
    fetchData({ viewDate, setDataList, subscribeSch });
  }, [viewDate, isModalOpen, toggleRender, subscribeSch]);
  
  const showPrevMonthHandler = () => {
    const prevDate: Date = getPrevMonthDate(viewDate);
    setViewDate(prevDate);
    const addZero = (n: string) => {
      return n.length === 1 ? '0' + n : n;
    };
    const mm = addZero(`${viewDate.getMonth() + 1}`);
    changeYYMM(`${prevDate.getFullYear()}-${prevDate.getMonth() + 1}`);
  };

  const showNextMonthHandler = () => {
    const nextDate: Date = getNextMonthDate(viewDate);
    setViewDate(nextDate);
    const addZero = (n: string) => {
      return n.length === 1 ? '0' + n : n;
    };
    const mm = addZero(`${viewDate.getMonth() + 1}`);
    changeYYMM(`${nextDate.getFullYear()}-${nextDate.getMonth() + 1}`);
  };

  const openModalHandler = (data: ModalData) => {
    setModalData(data);
    setIsModalOpen(true);
  };
  const closeModalHandler = () => setIsModalOpen(false);
  const reloadHandler = () => setToggleRender(!toggleRender);


  return (
    <>
    <Slide in={true} direction="down" timeout={1000}>
      <Title>
        <Button
          style={{ cursor: 'pointer', outline: 'none', fontSize: '20px' }}
          onClick={showPrevMonthHandler}
        >
          {' '}
          &lt;{' '}
        </Button>
        <span style={{ display: 'inline-block', fontSize: '20px' }}>
          {viewDate.getFullYear()}년.
        </span>
        <span style={{ fontSize: '35px', color: '#009689' }}>
          {viewDate.getMonth() + 1}
        </span>
        월
                <Button
          style={{ cursor: 'pointer', outline: 'none', fontSize: '20px' }}
          onClick={showNextMonthHandler}
        >
          {' '}
          &gt;{' '}
        </Button>
      </Title>
    </Slide>

      <Calendar
        list={dataList}
        openModal={openModalHandler}
        reload={reloadHandler}
        subscribeSch={subscribeSch}
      />

      {isModalOpen ? (
        <Modal
          close={closeModalHandler}
          data={modalData}
          openModal={openModalHandler}
        />
      ) : null}
    </>
    
  );
};

export { Container };
