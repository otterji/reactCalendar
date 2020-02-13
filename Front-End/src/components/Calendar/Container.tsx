import React, { FunctionComponent, useState, useEffect } from "react";
import { Button, Title } from "./style";
import "./Modal/Modal.scss";
import Modal from "./Modal/Modal";
import {
  getPrevMonthDate,
  fetchData,
  getNextMonthDate
} from "./utils/utils";
import { DateData, ModalData } from './_types/calendar';
import { Calendar } from './Calendar';

const Container: FunctionComponent<{ data }> = props => {
  const { sublist } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [dataList, setDataList] = useState([] as DateData[]);
  const [toggleRender, setToggleRender] = useState(false);
  const [modalData, setModalData] = useState({} as ModalData);

  // 보여지고 있는 달력의 데이터가 변경될 때마다 훅스가 실행
  // @ts-ignore
  useEffect(() => {
    fetchData({ sublist, viewDate, setDataList });
  }, [sublist, viewDate, isModalOpen, toggleRender]);

  const showPrevMonthHandler = () => {
    const prevDate: Date = getPrevMonthDate(viewDate);
    setViewDate(prevDate);
  }

  const showNextMonthHandler = () => {
    const nextDate: Date = getNextMonthDate(viewDate);
    setViewDate(nextDate);
  }

  const openModalHandler = (data: ModalData) => {
    setModalData(data);
    setIsModalOpen(true);
  }
  const closeModalHandler = () => setIsModalOpen(false);
  const reloadHandler = () => setToggleRender(!toggleRender);

  return (
    <>
      <Title>
        <Button style={{ cursor: "pointer", outline: "none" }} onClick={showPrevMonthHandler}> &lt; </Button>
        <h4 style={{ display: "inline-block" }}>
          {viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
        </h4>
        <Button style={{ cursor: "pointer", outline: "none" }} onClick={showNextMonthHandler}> &gt; </Button>
      </Title>

      <Calendar list={dataList} openModal={openModalHandler} reload={reloadHandler} />

      {isModalOpen ? (
        <Modal
          close={closeModalHandler}
          data={modalData}
          openModal={openModalHandler}
        />
      ) : null}
    </>
  )
}

export { Container };