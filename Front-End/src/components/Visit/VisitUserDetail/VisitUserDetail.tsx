import React, { Component, } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
} from '@material-ui/core';
import { Instagram, CheckCircle, EmojiPeopleOutlined, Public, } from '@material-ui/icons';
import * as Styled from './StyledUserDetail';
// import ItemList from "../../common/ItemList/ItemList";
import axios from 'axios';
import { url as _url } from '../../../url';

type subscribeObj = {
  id: string;
  nickName: string;
  img: string;
  color: Array<string>;
  checked: boolean;
};

interface State {
  id: any;
  isChannel: any;
  nickname: string;
  imgFile?: string;
  link: string;
  msg: string;

  interOrCate: any;
  subscribers: number;
  onButton: boolean;
}

// Main UserDetail part
class UserDetail extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: window.sessionStorage.getItem('id'),
      isChannel: window.sessionStorage.getItem('isChannel'),
      nickname: '',
      imgFile: '',
      link: '',
      msg: '',

      interOrCate: [],
      subscribers: 0,
      onButton: false,
    };
  }
  setStateAsync(state: object) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {
    // 유저의 개인/채널 분류 확인하기
    const _isChannel = this.state.isChannel;
    this.setState({
      isChannel: _isChannel
    });

    // 유저정보 가져오기
    if (this.state.isChannel === 'channel') {
      this.getInterOrCate('channel');
      this.getSubscribers();
      // 유저가 채널인 경우
      try {
        const resUserInfo = await axios({
          method: 'post',
          url: `${_url}/${this.state.isChannel}/jwt_auth/findChannelById/${this.state.id}`,
          headers: {
            jwt: sessionStorage.getItem('jwt')
          }
        });
        const data = resUserInfo.data.info;
        this.setState({
          imgFile: `${_url}/${data.img}?${Date.now()}`,
          nickname: data.nickname,
          msg: data.msg,
          link: data.link
        });
      } catch (err) {
        alert(err);
      }
    } else {
      this.getInterOrCate('member');
      // 유저가 개인일 경우
      try {
        const resUserInfo = await axios({
          method: 'post',
          url: `${_url}/${this.state.isChannel}/jwt_auth/findMemberById/${this.state.id}`,
          headers: {
            jwt: sessionStorage.getItem('jwt')
          }
        });
        const data = resUserInfo.data.info;
        await this.setStateAsync({
          imgFile: `${_url}/${data.img}?${Date.now()}`,
          nickname: data.nickname,
          msg: data.msg,
          link: data.link
        });
      } catch (err) {
        alert('세션이 만료 되었습니다.');
        sessionStorage.clear();
        window.location.href = '/mainPage';
      }

    }
  } // componentDidMount END

  getInterOrCate = async (_type:string) => {
    try{
      const _id = this.state.id;
      await axios({
        method: 'get',
        url: `${_url}/${_type}/getMyInterests/${_id}`
      })
      .then((res) => {
        const resData = res.data;
        // console.log(resData)
        this.setState({
          interOrCate: resData.map((res:any) => {
            return(<div key={res}>{res}</div>)
          })
        })
      })
    }
    catch(err){
      alert(err);
    }
  }

  getSubscribers = async () => {
    try{
      const _id = this.state.id
      axios({
        method: 'get',
        url: `${_url}/member/getCountOfMySubscriber/${_id}`
      })
      .then((res) => {
        const resData = res.data
        this.setState({
          subscribers: resData.count
        })
      })
    }
    catch(err){
      alert(err)
    }
  }

  render() {
    return (
      <>
        <Styled.StUDCont>
          <div className="avatarCont">
            <Avatar
              className="avatar"
              src={this.state.imgFile}
              alt={this.state.nickname}
            />
          </div>

        <Styled.profileName>
          {
            this.state.isChannel === 'member' ? (<>
              {this.state.nickname}
            </>) : (<>
              <div className="nick">
                {this.state.nickname}
              </div>
              <div className="official">
                <CheckCircle className="icon" fontSize="small"/>
              </div>
            </>)
          }
        </Styled.profileName>

        {
          this.state.isChannel === "channel" &&
          (<>
            <Styled.StICCont>
              {this.state.interOrCate}
            </Styled.StICCont>

            <Styled.StSubersCont>
              구독자  {this.state.subscribers}명 
            </Styled.StSubersCont>
            
            <br/>
            <hr style={{width: "90%"}}/>
          </>)
        }
        

        {
          this.state.link === '' ? 
          null
          :
          // <Styled.StSnsCont>
          //   <div className="snsIcon">
          //     <Instagram fontSize="small"/>
          //   </div>
          //   <div className="sns">
          //     <a href={`${this.state.link}`}>{this.state.link}</a>
          //   </div>
          // </Styled.StSnsCont>
          <Styled.StSnsCont>
            {
              this.state.isChannel === 'channel' ? 
              <div className="snsIcon">
                <Public fontSize="small" />
              </div>
              :
              <div className="snsIcon">
                <Instagram fontSize="small" />
              </div>
            }
            
            <div className="sns">
              <Link to="#"
              onClick={()=>{window.open(this.state.link, '_blank')}}>
                {this.state.link}
              </Link>
            </div>
          </Styled.StSnsCont>
        } 
        

        {
          this.state.msg === '' ? 
          null
          :
          <Styled.StMsgCont>
            <div className="msgIcon">
              <EmojiPeopleOutlined fontSize="small"/>
            </div>
            <div className="msg">
              <div>{this.state.msg}</div>
            </div>
          </Styled.StMsgCont>
        }
        
      </Styled.StUDCont>
    </>);
  }
}

export default UserDetail;
