// import { Schedule } from "@material-ui/icons";

// // export 는 {} 를 사용하여 전달하면 해당 변수 안에 있는 데이터를
// // 객체 안에 담아 전달하겠다는 의미

// export const getSchedule = (startDate: number, endDate: number, schedule: Array<any>) => {
//     if (schedule.length === 0) return [];

//     const start = schedule[0].curDate.getTime();
//     const end = schedule[schedule.length - 1].curDate.getTime();

//     if (endDate.getTime() < start) return [];
//     else if (startDate.getTime() > end) return [];

//     const newSchedule = [];
//     for (let i = 0; i < schedule.length; i++) {
//         const curDate = schedule[i].curDate.getTime();
//         if (startDate.getTime() <= curDate && endDate.getTime() >= curDate) {
//             newSchedule.push(schedule[i]);
//         } else if (newSchedule.length !== 0) {
//             break;
//         }
//     }
//     return newSchedule;
// };

// export const insertDate = (addFormState, schedule) => {
//     const { title, curDate, startHour, endHour } = addFormState;
    
//     const newItem = { title, curDate, startHour, endHour };
//     return [...schedule.slice(0, index), newItem, ...schedule.slice(index)];

// };

// export const editDate = (addFormState, beforeEdit, schedule) => {
//     const { title, curDate, startHour, endHour } = addFormState;
//     // 이전 할 일을 지우고
//     const newSchedule = deleteDate(beforeEdit.curDate, beforeEdit.startHour, beforeEdit.endHour, schedule);
//     // 새 할 일을 추가하는데
//     const newItem = { title, curDate, startHour, endHour };
//     return [...newSchedule.slice(0, index), newItem, ...newSchedule.slice(index)];
// };

// export const deleteDate = (curDate, startHour, endHour, schedule) => {
//     let index = schedule.findIndex(
//         (el) => 
//             el.curDate.getTime() === curDate.getTime() && el.startHour === startHour && el.endHour === endHour
//             ? true
//             : false
//     );

//     if (index !== -1) {
//         return [...schedule.slice(0, index),
//             ...schedule.slice(index + 1)];
//     }
//     return schedule;
// };