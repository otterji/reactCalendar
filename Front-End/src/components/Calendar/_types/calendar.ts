// dataList
export type DateData = {
  days: Date | number;
  schedules: ServerData[];
};

export type ServerData = {
  title: string;
  contents?: string;
  startAt: Date;
  endAt: Date;
  place?: string;
  attendants?: string;
  schNo?: number;
  oneDay?: boolean;
  csrDto?: any;
};

export type ModalData = {
  days: Date;
  schedules: ServerData[];
  type: string;
};
export interface ModalProps extends OpenModal {
  close: () => void;
  data: ModalData;
}

export type OpenModal = {
  openModal: (data: ModalData) => void;
};

export interface CalendarProps extends OpenModal {
  list: DateData[];
  reload: () => void;
  subscribeSch: any;
}
