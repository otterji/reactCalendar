import React, { useState } from 'react';
import './Modal.scss';
import '@material-ui/pickers';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';




// import TextField from '@material-ui/core/TextField';

// const handleChange = (date:Date) => {
//   setcurDate(date)
// }
// const [curDate, setcurDate] = useState(new Date())


const AddForm = ({ close, year, month, day, isView, setisView }:any) => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    }),
  );

  function DateAndTimePickers() {
    const classes = useStyles();

    return (
      <form className={classes.container} noValidate>
        <TextField
          id="datetime-local"
          label="일정 시작일"
          type="datetime-local"
          defaultValue="2020-02-05T10:30"
          // defaultValue={`${year}-${month}-${day}T10:30`}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  }

  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
      <input placeholder="제목을 입력하세요" className="title"></input>
        <div className="content">
          {/* <DatePicker
            selected={curDate}
            onChange={handleChange}
          /> */}
          {/* <form noValidate>
            <TextField
              id="date"
              label="시작일"
              type="date"
              defaultValue={`${year}-${month}-${day}`}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form> */}
          {DateAndTimePickers()}
          {/* <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
        </form> */}
          내용 : <input></input> <br></br>
          참석자:   <input></input> <br></br>
          장소:   <input></input> <br></br>
        </div>
        <div className="button-wrap">
          <button onClick={() => setisView(true)}>추가</button>
        </div>
      </div>
    </>
  )
 }
export default AddForm ;