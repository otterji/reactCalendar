import React, { Component } from 'react';
import Calendar from 'react-calendar';

interface Props{

}
interface State{
  date: Date;
}

class MyCalendar extends Component<Props, State>{
  constructor(props: Props){
    super(props);
    this.state = {
      date: new Date(),
    }
  }

  onChange = (date:Date) => this.setState({ date })

  render() {
    return (
      <div>
        <Calendar
          // onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default MyCalendar;