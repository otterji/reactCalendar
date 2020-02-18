import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
//
import { visitStorage } from './VisitCh'
import { VisitContainer } from './VisitCalendar/VisitContainer'
import VisitFeedList from './VisitFeed/VisitFeedList'
import SameList from './VisitFeed/SameList'
//style
import styled from 'styled-components'

interface State{
  height: number;
  _yymm: string;
}
class VisitMode extends Component<any, State> {
  constructor(props:any){
    super(props);
    this.state = {
      height: window.innerHeight,
      _yymm: `${new Date().getFullYear()}-0${new Date().getMonth() + 1}`,
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.curWindowH)
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.curWindowH)
  }
  curWindowH = () => {
    this.setState({
      height: window.innerHeight,
    })
  }

  changeYYMM = (yymm: string) => {
    this.setState({_yymm: yymm})
  };


  render(){
    return(<><visitStorage.Consumer>{store => {
      return(<>
        {
          store.mode === "calendar" ?
          // 채널 달력
          // <VisitContainer id={store.chInfo.id}/>
          <VisitContainer id={this.props.match.params.chName}/>
          :
          // 채널 피드
          <StFeedSameCont>
            <div className="feed">
              <VisitFeedList id={store.chInfo.id} height={this.state.height}/>
            </div>
            <div className='recom'>
              <SameList id={store.chInfo.id} height={this.state.height}/>
            </div>
          </StFeedSameCont>
        }
      </>)
    }}</visitStorage.Consumer></>)
  }
}

export default withRouter(VisitMode);

const StFeedSameCont = styled.div`
  display: flex;
  .feed{
    position: relative;
    flex-grow: 3;
  }
  .recom{
    position: relative;
    flex-grow: 1;
  }
`