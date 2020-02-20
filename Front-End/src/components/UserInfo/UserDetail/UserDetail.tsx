import React, { Component, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  ListItem,
  FormControlLabel,
  Tooltip,
  Zoom
} from '@material-ui/core';
import {
  Instagram,
  CheckCircle,
  EmojiPeopleOutlined,
  NotificationsOff, Public
} from '@material-ui/icons';
import * as Styled from './StyledUserDetail';
// import ItemList from "../../common/ItemList/ItemList";
import axios from 'axios';
import { url as _url } from '../../../url';
import { IsChannel } from '../IsChannel';

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
  subscribes: subscribeObj[];
  totalScheduleList: Array<Array<Object>>;

  interOrCate: any;
  subscribers: number;
  onButton: string;
}

// Main UserDetail part
class UserDetail extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.handleChannelFilter = this.handleChannelFilter.bind(this);
    this.state = {
      id: window.sessionStorage.getItem('id'),
      isChannel: '',
      nickname: '',
      imgFile: '',
      link: '',
      msg: '',
      subscribes: [
        {
          id: '',
          nickName: '',
          img: '',
          color: ['black', 'grey'],
          checked: true
        }
      ],
      totalScheduleList: [[{}]],

      interOrCate: [],
      subscribers: 0,
      onButton: 'init',
    };
  }
  setStateAsync(state: object) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {
    // 유저의 개인/채널 분류 확인하기
    const _isChannel = await IsChannel(this.state.id);
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
          imgFile: data.img ? `${_url}/${data.img}?${Date.now()}` : '',
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
        console.log(data.img, '??');
        await this.setStateAsync({
          imgFile: data.img ? `${_url}/${data.img}?${Date.now()}` : '',
          nickname: data.nickname,
          msg: data.msg,
          link: data.link
        });
      } catch (err) {
        alert('세션이 만료 되었습니다.');
        sessionStorage.clear();
        window.location.href = '/mainPage';
      }

      // 구독 리스트 가져오기
      try {
        const resSubscribeList = await axios({
          method: 'get',
          url: `${_url}/member/getSubscribeList/${this.state.id}`,
          data: {
            id: this.state.id
          }
        });
        resSubscribeList.data.map((channel: any) => {
          channel['checked'] = true;
          return null;
        });
        this.setState({ subscribes: resSubscribeList.data });
        // console.log('구독채널리스트: ', this.state.subscribes);
      } catch (err) {
        alert(err);
      }

      // 구독채널 전체 일정정보 받아오기
      try {
        const tempList: any = [];
        this.state.subscribes.map(async (channel: any, idx: number) => {
          const resSubSch = await axios({
            method: 'get',
            url: `${_url}/getSchedules/${channel.id}/${this.props.yymm}`
          });
          tempList.push(resSubSch.data);
        });
        this.setState({ totalScheduleList: tempList });
        // console.log('구독채널 일정정보(전체):', this.state.totalScheduleList); // 2차원 배열로 받음
        this.props.changeSubscribeChannelSch(this.state.totalScheduleList);
      } catch (err) {
        alert(err);
      }
    }
  } // componentDidMount END

  componentWillReceiveProps(nextProps: any) {
    if (this.props.yymm !== nextProps.yymm) {
      try {
        const tempList: any = [];
        const tempList2: any = [];
        this.state.subscribes.map(async (channel: any, idx: number) => {
          const resSubSch = await axios({
            method: 'get',
            url: `${_url}/getSchedules/${channel.id}/${nextProps.yymm}`
          });
          tempList.push(resSubSch.data);
          if (channel['checked']) {
            tempList2.push(resSubSch.data);
          }
        });
        this.setState({ totalScheduleList: tempList });
        this.props.changeSubscribeChannelSch(tempList2);
      } catch (err) {
        alert(err);
      }
    }
  }

  handleChannelFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const _name = e.target.name;
    const tempList: any[] = [];
    const tempList2: any[] = [];
    this.state.subscribes.map((channel: any) => {
      if (channel.id === _name) {
        channel['checked'] = !channel['checked'];
      }
      tempList.push(channel);
      if (channel['checked']) {
        this.state.totalScheduleList.map((schedule: any) => {
          // console.log(schedule, "here")
          if (schedule.length >= 1) {
            if (channel.id === schedule[0].csrDto.id) {
              // tempList2.push(this.state.totalScheduleList[this.state.subscribes.indexOf(channel)])
              tempList2.push(schedule);
            }
          }
        });
      }
    });
    this.setState({
      subscribes: tempList
    });
    this.props.changeSubscribeChannelSch(tempList2);
  };

  unsubscribe = (channelId: string) => {
    if (window.confirm('정말 구독을 취소하시겠어요?')) {
      try {
        axios({
          method: 'delete',
          url: `${_url}/member/unSubscribe`,
          data: {
            fromId: this.state.id,
            toCheannel: channelId
          }
        });
      } catch (err) {
        alert(err);
      }
      const tempList: subscribeObj[] = [];
      const tempList2: any[] = [];
      this.state.subscribes.map((channel: any) => {
        if (channel.id !== channelId) tempList.push(channel);
        return null;
      });
      this.setState({
        subscribes: tempList
      });

      this.state.totalScheduleList.map((schedule: any) => {
        if (schedule.length >= 1) {
          if (channelId !== schedule[0].csrDto.id) {
            // tempList2.push(this.state.totalScheduleList[this.state.subscribes.indexOf(channel)])
            tempList2.push(schedule);
          }
        }
      });
      this.props.changeSubscribeChannelSch(tempList2);
    }
  };

  getInterOrCate = async (_type: string) => {
    try {
      const _id = this.state.id;
      await axios({
        method: 'get',
        url: `${_url}/${_type}/getMyInterests/${_id}`
      }).then(res => {
        const resData = res.data;
        console.log(resData);
        this.setState({
          interOrCate: resData.map((res: any) => {
            return <div key={res}>{res}</div>;
          })
        });
      });
    } catch (err) {
      alert(err);
    }
  };

  getSubscribers = async () => {
    try {
      const _id = this.state.id;
      axios({
        method: 'get',
        url: `${_url}/member/getCountOfMySubscriber/${_id}`
      }).then(res => {
        const resData = res.data;
        this.setState({
          subscribers: resData.count
        });
      });
    } catch (err) {
      alert(err);
    }
  };

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
            {this.state.isChannel === 'member' ? (
              <>{this.state.nickname}</>
            ) : (
              <>
                <div className="nick">{this.state.nickname}</div>
                <div className="official">
                  <CheckCircle className="icon" fontSize="small" />
                </div>
              </>
            )}
          </Styled.profileName>

          {this.state.isChannel === 'channel' && (
            <>
              <Styled.StICCont>{this.state.interOrCate}</Styled.StICCont>

              <Styled.StSubersCont>
                구독자 {this.state.subscribers}명
              </Styled.StSubersCont>

              <br />
              <hr style={{ width: '90%' }} />
            </>
          )}

          {this.state.link === '' ? null : (
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
                <Link to="#" onClick={()=>{window.open(this.state.link, '_blank')}}>
                  {this.state.link}
                </Link>
              </div>
            </Styled.StSnsCont>
          )}

          {this.state.msg === '' ? null : (
            <Styled.StMsgCont>
              <div className="msgIcon">
                <EmojiPeopleOutlined fontSize="small" />
              </div>
              <div className="msg">
                <div>{this.state.msg}</div>
              </div>
            </Styled.StMsgCont>
          )}

        {this.state.isChannel === 'member' && sessionStorage.getItem('mode') === 'calendar' ? (<>
          <br/>
          <hr style={{width: "90%"}}/>
          <Styled.StListLabel>구독 리스트</Styled.StListLabel>
          <hr style={{width: "90%"}}/>
          <Styled.div height={this.props.height} >
            {this.state.subscribes.length >= 1
              ? this.state.subscribes.map((channel: any) => {
                return (
                  <Styled.labelHover key={channel.id}>
                    <ListItem
                      dense
                      button
                      // style={{ padding: '5px', width: '200px' }}
                    >
                      <FormControlLabel
                        control={
                          <Styled.checkbox
                            checked={channel.checked}
                            colordark={channel.color[0]}
                            colorlight={channel.color[1]}
                            name={channel.id}
                            onChange={this.handleChannelFilter}
                            value={channel.id}
                            
                          />
                        }
                        label={channel.nickName}
                      />
                      </ListItem>
                      {/* <Styled.btn className='btn' onClick={this.unsubscribe.bind(this, channel.id)}>
                        구독 취소
                      </Styled.btn> */}
                      <Tooltip title="구독 취소">
                        <Styled.StIconBtn 
                          onClick={this.unsubscribe.bind(this, channel.id)}
                        >
                          <NotificationsOff fontSize="small"/>
                        </Styled.StIconBtn>
                      </Tooltip>
                  </Styled.labelHover>
                );
              })
              // : '구독 중인 채널이 없습니다.'}
              : <Zoom in={true}><div style={{display:"flex", justifyContent:"center", marginTop:"20px"}}>구독 중인 채널이 없습니다.</div></Zoom>}
          </Styled.div>
      </>) : null}
      </Styled.StUDCont>
    </>);
  }
}

export default UserDetail;
