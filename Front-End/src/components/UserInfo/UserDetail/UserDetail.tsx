import React, { Component, ChangeEvent } from 'react';
import {
  Grid,
  Avatar,
  ListItem,
  ListItemAvatar,
  FormControlLabel
} from '@material-ui/core';
import { Instagram } from '@material-ui/icons';
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
  scheduleList: Array<Array<object>>;
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
      scheduleList: []
    };
  }

  async componentDidMount() {
    // 유저의 개인/채널 분류 확인하기
    const _isChannel = await IsChannel(this.state.id);
    this.setState({
      isChannel: _isChannel
    });

    // 유저정보 가져오기
    if (this.state.isChannel === 'channel') {
      // 유저가 채널인 경우
      try {
        const resUserInfo = await axios({
          method: 'get',
          url: `${_url}/${this.state.isChannel}/findChannelById/${this.state.id}`,
          data: {
            id: this.state.id
          }
        });
        const data = resUserInfo.data;
        this.setState({
          imgFile: `${_url}/img/${this.state.isChannel}/${this.state.id}.jpg`,
          nickname: data.nickname,
          msg: data.msg,
          link: data.link
        });
      } catch (err) {
        alert(err);
      }
    } else {
      // 유저가 개인일 경우
      try {
        const resUserInfo = await axios({
          method: 'get',
          url: `${_url}/${this.state.isChannel}/findMemberById/${this.state.id}`,
          data: {
            id: this.state.id
          }
        });
        const data = resUserInfo.data;
        this.setState({
          imgFile: `${_url}/multimedia/profile/${this.state.id}.jpg`,
          nickname: data.nickname,
          msg: data.msg,
          link: data.link
        });
      } catch (err) {
        alert(err);
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
      // 구독채널 일정정보 받아오기
      try {
        const tempList: any = [];
        this.state.subscribes.map(async (channel: any, idx: number) => {
          const resSubSch = await axios({
            method: 'get',
            url: `${_url}/getSchedules/${channel.id}/${this.props.yymm}`
          });
          tempList.push(resSubSch.data);
        });
        this.setState({ scheduleList: tempList });
        // console.log('구독채널 일정정보(전체):', this.state.scheduleList); // 2차원 배열로 받음
        this.props.changeSubscribeChannelSch(this.state.scheduleList);
      } catch (err) {
        alert(err);
      }
    }
  }

  handleChannelFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const _name = e.target.name;
    const _checked = e.target.checked;
    const sendingList: any[] = [];
    this.state.subscribes.map((channel: any) => {
      if (channel.id === _name) {
        channel['checked'] = _checked;
      }
      if (channel.checked) {
        sendingList.push(
          this.state.scheduleList[this.state.subscribes.indexOf(channel)]
        );
      }
      return null;
    });
    // console.log('구독채널 일정정보(필터링): ', sendingList);
    this.props.changeSubscribeChannelSch(sendingList);
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
      this.state.subscribes.map((channel: any) => {
        if (channel.id !== channelId) tempList.push(channel);
        return null;
      });
      this.setState({
        subscribes: tempList
      });
    }
  };

  render() {
    return (
      <Grid
        item
        container
        justify="center"
        direction="column"
        style={{ padding: '10px' }}
      >
        {/* profile img and nickname part */}
        <Grid item container alignItems="center" style={{ marginTop: '50px' }}>
          <Avatar
            src={this.state.imgFile}
            alt={this.state.nickname}
            style={{ width: '70px', height: '70px' }}
          />

          <Grid item>
            <Styled.profileName>{this.state.nickname}</Styled.profileName>
          </Grid>
        </Grid>

        {/* profile content part */}
        <Grid item>
          <Styled.content>
            <Instagram style={{ fontSize: '40px', margin: '10px' }} />
            {this.state.link}
          </Styled.content>
        </Grid>
        <Grid item>
          <Styled.content>{this.state.msg}</Styled.content>
        </Grid>

        {/* Subscribe list */}
        {this.state.isChannel === 'member' ? (
          <Grid item>
            <Styled.div style={{ width: '300px' }}>
              {this.state.subscribes.length >= 1
                ? this.state.subscribes.map((channel: any) => {
                    return (
                      <ListItem
                        key={channel.id}
                        button
                        style={{ padding: '5px' }}
                      >
                        <FormControlLabel
                          style={{ width: '200px' }}
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
                        {/* <ListItemAvatar>
                          <Avatar
                            alt={channel.nickName}
                            src={`${_url}/img/channel/${channel.img}.jpg`}
                          />
                        </ListItemAvatar> */}
                        <Styled.btn
                          onClick={this.unsubscribe.bind(this, channel.id)}
                        >
                          구독 취소
                        </Styled.btn>
                      </ListItem>
                    );
                  })
                : '구독 중인 채널이 없습니다.'}
            </Styled.div>
          </Grid>
        ) : null}
      </Grid>
    );
  }
}

export default UserDetail;
