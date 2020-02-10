import React, { Component } from "react";
import { Grid, Avatar } from "@material-ui/core";
import * as Styled from "./StyledUserDetail";
import axios from "axios";
import { url as _url } from "../../../url";

interface State {
  id: string | null;
  CountOfMyFollower: number;
  CountOfMyFollow: number;
}

// Main UserDetail part
class UserDetail extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      // id: window.sessionStorage.getItem("id"),  // sessionStorage에서 id를 받아오지 못하는듯...?
      id: "string2",
      CountOfMyFollower: 0,
      CountOfMyFollow: 0
    };
  }

  async componentDidMount() {
    try {
      const resFollowerCnt = await axios({
        method: "get",
        url: _url + "/member/getCountOfMyFollower/" + this.state.id,
        data: {
          id: this.state.id
        }
      });
      if (resFollowerCnt.data.state === "SUCCESS") {
        console.log(window.sessionStorage.getItem("id"));
        const data = JSON.stringify(resFollowerCnt.data);
        this.setState({
          CountOfMyFollower: JSON.parse(data).count
        });
      }
    } catch (err) {
      alert(err);
    }

    try {
      const resFollowCnt = await axios({
        method: "get",
        url: _url + "/member/getCountOfMyFollow/" + this.state.id,
        data: {
          id: this.state.id
        }
      });
      if (resFollowCnt.data.state === "SUCCESS") {
        const data = JSON.stringify(resFollowCnt.data);
        this.setState({
          CountOfMyFollow: JSON.parse(data).count
        });
      }
    } catch (err) {
      alert(err);
    }
  }

  render() {
    return (
      <Grid
        item
        container
        alignItems="center"
        justify="center"
        direction="column"
        style={{ margin: "1rem" }}
      >
        {/* profile img and nickname part */}
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          style={{ padding: "0 0.5rem 0.5rem 0" }}
        >
          {/* TODO: alt 값 this.state.id가 없는 경우 {this.state.id}  or 'profile img'로 들어가도록 수정 */}
          <Avatar src="images/pengsooluv_profile.png" alt="profile img" />{" "}
          {/* <Avatar src="images/engsooluv_profile.png" alt="Pengsooluv" />
          <Avatar alt="Pengsooluv" /> */}
          <Grid item>
            <b style={{ fontSize: "1.2rem", margin: "0 0 0 0.5rem" }}>
              {this.state.id}
            </b>
          </Grid>
        </Grid>

        {/* profile follower and following part*/}
        <Grid
          item
          container
          justify="space-evenly"
          alignItems="center"
          direction="row"
          style={{ width: "200px" }}
        >
          <Grid item>
            <Styled.profileNumber>7</Styled.profileNumber>
            <Styled.profileInfo>구독</Styled.profileInfo>
          </Grid>
          <Grid item>
            <Styled.profileNumber>
              {this.state.CountOfMyFollower}
            </Styled.profileNumber>
            <Styled.profileInfo>팔로워</Styled.profileInfo>
          </Grid>
          <Grid item>
            <Styled.profileNumber>
              {this.state.CountOfMyFollow}
            </Styled.profileNumber>
            <Styled.profileInfo>팔로잉</Styled.profileInfo>
          </Grid>
        </Grid>

        {/* profile content part */}
        <Grid item>
          <Styled.content>
            펭하
            <br />
            코린이의 일상 | 프로그래밍
          </Styled.content>
        </Grid>
      </Grid>
    );
  }
}

export default UserDetail;
