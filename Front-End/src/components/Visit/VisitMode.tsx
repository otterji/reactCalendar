import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
//
import { visitStorage } from './VisitCh'
import { VisitContainer } from './VisitCalendar/VisitContainer'
import VisitFeedList from './VisitFeed/VisitFeedList'
import SameList from './VisitFeed/SameList'
//style
import styled from 'styled-components'
import {Grid} from '@material-ui/core'

interface State{
  curChName: string;
  height: number;
  _yymm: string;
}
class VisitMode extends Component<any, State> {
  constructor(props:any){
    super(props);
    this.state = {
      curChName: this.props.match.params.chName,
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
    const addZero = (n: string) => {
      return n.length === 6 ? n[0] + n[1] + n[2] + n[3] + n[4] + '0' + n[5] : n;
    };
    const mm = addZero(`${yymm}`);
    this.setState({_yymm: mm})
  };

  onChangeCh = (_curChName:string) => {
    this.setState({
      curChName: _curChName
    })
  }


  render(){
    return(<><visitStorage.Consumer>{store => {
      return(<>
        {
          store.mode === "calendar" ?
          // 채널 달력
          // <VisitContainer id={store.chInfo.id}/>
          <VisitContainer 
            id={this.state.curChName}
            changeYYMM={this.changeYYMM}
          />
          :
          // 채널 피드
          <StFeedSameCont>
          <Grid container spacing={1}>
            <Grid item xs={9} sm={9} lg={9}>
            <div className="feed">
              <VisitFeedList id={store.chInfo.id} height={this.state.height}/>
            </div>
            </Grid>
            <Grid item xs={3} sm={3} lg={3}>
            <div className='same'>
              <SameList id={store.chInfo.id} height={this.state.height} onChangeCh={this.onChangeCh} />
            </div>
            </Grid>
          </Grid>
          </StFeedSameCont>
        }
      </>)
    }}</visitStorage.Consumer></>)
  }
}

export default withRouter(VisitMode);

const StFeedSameCont = styled.div`
  /* display: flex; */
  .feed{
    position: relative;
    /* flex-grow: 3; */
  }
  .same{
    position: relative;
    /* flex-grow: 1; */
    margin-top: 20px;
    margin-left: 2vw;
    margin-right: 2vw;
  }
`