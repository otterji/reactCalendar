import React, { Component } from "react";
import { Grid, Avatar } from "@material-ui/core";
import { Instagram } from "@material-ui/icons";
import * as Styled from "./StyledUserDetail";
import ItemList from "../../common/ItemList/ItemList";
import axios from "axios";
import { url as _url } from "../../../url";
import { IsChannel } from "../IsChannel";

type subscribeObj = {
  id: string;
  nickName: string;
  img: string;
};

interface State {
  id: any;
  isChannel: any;
  nickname: string;
  imgFile?: string;
  link: string;
  msg: string;
  subscribes: subscribeObj[];
}

// Main UserDetail part
class UserDetail extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: window.sessionStorage.getItem("id"),
      isChannel: "",
      nickname: "",
      imgFile: "",
      link: "",
      msg: "",
      subscribes: [
        {
          id: "",
          nickName: "",
          img: ""
        }
      ]
    };
  }

  async componentDidMount() {
    // 유저의 개인/채널 분류 확인하기
    const _isChannel = await IsChannel(this.state.id);
    this.setState({
      isChannel: _isChannel
    });

    // 유저정보 가져오기
    if (this.state.isChannel === "channel") {
      // 유저가 채널인 경우
      try {
        const resUserInfo = await axios({
          method: "get",
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
          method: "get",
          url: `${_url}/${this.state.isChannel}/findMemberById/${this.state.id}`,
          data: {
            id: this.state.id
          }
        });
        const data = resUserInfo.data;
        this.setState({
          imgFile: `${_url}/img/member/${this.state.id}.jpg`,
          nickname: data.nickname,
          msg: data.msg,
          link: data.link
        });
      } catch (err) {
        alert(err);
      }
      // 구독 리스트 가져오기
      try {
        let tempList: Array<Object> = [];
        const resSubscribeList = await axios({ 
          method: "get",
          url: `${_url}/member/getSubscribeList/${this.state.id}`,
          data: {
            id: this.state.id
          }
        });
        this.setState({ subscribes: resSubscribeList.data });
      } catch (err) {
        alert(err);
      }
    }
  }

  render() {
    console.log("12345687");
    console.log(this.state.subscribes);
    return (
      <Grid
        item
        container
        // alignItems="center"
        justify="center"
        direction="column"
        style={{ padding: "10px" }}
      >
        {/* profile img and nickname part */}
        <Grid item container alignItems="center" justify="center">
          <Avatar src={this.state.imgFile} alt={this.state.nickname} />
          <Grid item>
            <Styled.profileName>{this.state.nickname}</Styled.profileName>
          </Grid>
        </Grid>

        {/* profile content part */}
        <Grid item>
          {/* <Grid item> */}
          <Styled.content>
            <Instagram style={{ fontSize: "20px", margin: "10px" }} />
            {this.state.link}
          </Styled.content>
        </Grid>
        <Grid item>
          <Styled.content>{this.state.msg}</Styled.content>
        </Grid>

        {/* Subscribe list */}
        {this.state.isChannel === "member" ? (
          <Grid item>
            <ItemList lists={this.state.subscribes} />
          </Grid>
        ) : null}
      </Grid>
    );
  }
}

export default UserDetail;
