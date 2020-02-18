import React, { Component } from 'react'
import axios from 'axios'
//
import {url} from '../../url'
import VisitChInfo from './VisitChInfo'
// import ModeBar from './ModeBar'
import VisitMode from './VisitMode'
//style
import styled from 'styled-components'

interface State {
  isLogin: boolean;
  isChannel: boolean;

  chName: string;
  chInfo: any;
  isSubscribe: boolean;

  mode: string;
}

export const visitStorage  = React.createContext<Partial<State>>({});
class VisitCh extends Component<any, State>{
  constructor(props:any){
    super(props);
    this.state = {
      isLogin: this.props.isLogin,
      isChannel: this.props.isChannel,

      chName: this.props.chName,
      chInfo: {},
      isSubscribe: false,

      mode: 'calendar',
    }
  }

  componentDidMount(){
    this.getChannelInfo()
    .then(()=>{this.isSubscribe()});
  }

  getChannelInfo = async () => {
    //axios
    try{
      await axios({
        method: 'get',
        url: `${url}/channel/searchChannelByNickname/${this.state.chName}`,
      }).then((res) => {
        // console.log(res)
        this.setState({
          chInfo: res.data[0],
        })
      })
    }
    catch(err){
      alert(err);
    }
  }
  isSubscribe = async () => {
    try{
      const _id = sessionStorage.getItem('id');
      const _ch_id = this.state.chInfo.id;
      await axios({
        method: 'get',
        url: `${url}/member/isSubscribing/${_id}/${_ch_id}`,
      })
      .then((res) => {
        this.setState({
          isSubscribe: res.data.result,
        })
      })
    }
    catch(err){
      console.log(err)
    }
  }

  onSubscribe = async () => {
    try{
      const _id = sessionStorage.getItem('id');
      await axios({
        method: 'post',
        url: `${url}/member/subscribe`,
        data: {
          fromId: _id,
          toChannel: this.state.chInfo.id,
        }
      }).then((res) => {
        if(res.data.state === 'SUCCESS'){
          this.setState({
            isSubscribe: true,
          })
        }
      })
    }
    catch(err){
      alert(err)
    }
  }
  unSubscribe = async () => {
    let _confirm = window.confirm('구독을 취소하시겠습니까?');
    if(_confirm){
      const _id = sessionStorage.getItem('id');
      try{
        await axios({
          method: 'delete',
          url: `${url}/member/unSubscribe`,
          data: {
            fromId: _id,
            toChannel: this.state.chInfo.id,
          }
        })
        .then((res) => {
          if(res.data.state === 'SUCCESS'){
            this.setState({
              isSubscribe: false,
            })
          }
        })
      }
      catch(err){
        alert(err)
      }
    }
  }

  changeMode = (_mode:string) => {
    this.setState({
      mode: _mode
    })
  }

  render(){
    return(<>
    <visitStorage.Provider value={this.state}>
      <StVChCont>
        <VisitChInfo onSubscribe={this.onSubscribe} unSubscribe={this.unSubscribe} changeMode={this.changeMode}/>

        <StContentCont>
          {/* <ModeBar changeMode={this.changeMode}/> */}
          <VisitMode/>
        </StContentCont>

      </StVChCont>
    </visitStorage.Provider>
    </>)
  }
}
export default VisitCh;

const StVChCont = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 20px;
  padding: 5px;
  /* border: 2px solid #8cebd1; */
`;

const StContentCont = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 10px;
  /* border: 2px solid green; */
`