import React, { Component } from "react";
import { Grid, Avatar } from "@material-ui/core";
import { Instagram } from "@material-ui/icons";
import * as Styled from "./StyledUserDetail";
import ItemList from "../../common/ItemList/ItemList";
import axios from "axios";
import { url as _url } from "../../../url";

type subscribeObj = {
  id: string;
  nickName: string;
  img: string;
};

interface State {
  id: any;
  userInfoNickname: string;
  userInfoImg?: string;
  userInfoLink: string;
  userInfoMsg: string;
  subscribes: subscribeObj[];
}

// Main UserDetail part
class UserDetail extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: window.sessionStorage.getItem("id"),
      userInfoNickname: "",
      userInfoImg: "",
      userInfoLink: "",
      userInfoMsg: "",
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
    try {
      // 유저정보 가져오기
      const resUserInfo = await axios({
        method: "get",
        url: `${_url}/member/findMemberById/${this.state.id}`,
        data: {
          id: this.state.id
        }
      });
      const data = resUserInfo.data;
      this.setState({
        userInfoNickname: data.nickname,
        userInfoImg: `${_url}/img/member/${data.img}.jpg`,
        userInfoLink: data.link,
        userInfoMsg: data.msg
      });
    } catch (err) {
      alert(err);
    }

    // 구독 리스트 가져오기
    try {
      const resSubscribeList = await axios({
        method: "get",
        url: `${_url}/member/getSubscribeList/${this.state.id}`,
        data: {
          id: this.state.id
        }
      });
      this.setState({ subscribes: resSubscribeList.data });
      console.log(this.state.subscribes);
    } catch (err) {
      alert(err);
    }
  }

  render() {
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
          <Avatar
            src={this.state.userInfoImg}
            alt={this.state.userInfoNickname}
          />
          <Grid item>
            <Styled.profileName>
              {this.state.userInfoNickname}
            </Styled.profileName>
          </Grid>
        </Grid>

        {/* profile content part */}
        <Grid item>
          {/* <Grid item> */}
          <Styled.content>
            <Instagram style={{ fontSize: "20px", margin: "10px" }} />
            {this.state.userInfoLink}
          </Styled.content>
        </Grid>
        <Grid item>
          <Styled.content>{this.state.userInfoMsg}</Styled.content>
        </Grid>

        {/* Subscribe list */}
        <Grid item>{/* <ItemList lists={this.state.subscribes} /> */}</Grid>
      </Grid>
    );
  }
}

export default UserDetail;
