import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
//
import { url } from '../../../url'
//style
import styled from 'styled-components'
import { Avatar } from '@material-ui/core'

interface State {
  info: any;
  subscribe: boolean;
}
class Recom extends Component<any, State>{
  constructor(props: any) {
    super(props);
    this.state = {
      info: this.props.info,
      subscribe: this.props.info.subscribe
    }
  }

  countUp = async () => {
    try{
      await axios({
        method: 'put',
        url: `${url}/channel/updateSearchFrequency/${this.state.info.id}`
      }).then(() => {
        sessionStorage.setItem('isVisit', 'true');
      })
    }
    catch(err){
      alert(err);
    }
  }

  render() {
    return (<>
      <StChCont>
        <div className="avatarCont">
          <Avatar className="avatar" src={`${url}/${this.state.info.img}`}/>
        </div>
        <div className="link">
          <Link 
            to={`/visitPage/${this.state.info.nickname}`} 
            onClick={this.countUp}
          >
            {this.state.info.nickname}
          </Link>
        </div>
      </StChCont>
    </>)
  }
}
export default Recom;


const StChCont = styled.div`
  font-size: 0.9vw;
  display: flex;
  justify-content: start;
  border-bottom: 1px dotted gray;
  margin: 10px 10px 0 10px;
  :hover{
    border-radius: 8px;
    border-style: none;
    background-color: #99ffcc; 
    .link a{
      color:white;
      text-shadow: 5px 5px 10px gray;
    }
  }
  .avatarCont{
    .avatar{
      margin: 0.2em;
      width: 1.8em;
      height: 1.8em;
    }
  }
  .lin{
    width: 100%;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
  .link{
    font-size: 90%;
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
`;
