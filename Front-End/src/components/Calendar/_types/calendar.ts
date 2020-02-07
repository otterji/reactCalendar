
export interface Props {
}

type xxx = {
  attendants?: string
  contents?:string;
startAt: Date
endAt: Date
id?: string
place?: string
title: string
}

type arrElement = {
  days: number[],
  xxx: xxx[]
}

export interface State{
  year: number;
  month: number;
  arr: number[][];
  isModalOpen: boolean;
  curDay: number;
  xxxList: any[];
  list: any;
  preventRefreshList: any;
}
