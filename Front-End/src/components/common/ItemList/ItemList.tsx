import React, { Component } from "react";
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";
import * as Styled from "./StyledItemList";

interface State {
  channelList: Array<object>;
  scheduleList: Array<Array<object>>;
}

class ItemList extends Component<any, State> {
  constructor(props: any[]) {
    super(props);
    this.state = {
      channelList: [],
      scheduleList: []
    };
  }
  async componentDidMount() {
    this.setState({
      channelList: this.props.lists
    });
    console.log("testtest");
    console.log(this.props.lists);
    console.log(this.state.channelList);
    this.props.lists.map((channel: any) => {
      console.log(channel);
      // tempList.push({
      //   id: channel.id,
      //   nickname: channel.nickName,
      //   img: channel.img,
      //   checked: true
      // });
      return null;
    });
    // this.setState({
    //   channelList: tempList
    // });
    console.log("herehere");
    // console.log(tempList);
    console.log(this.state.channelList);
  }

  renderChannelList = (): Array<any> => {
    let renderList: any[] = [];
    const keyList = Object.keys(this.props.lists);
    const valueList = Object.values(this.props.lists);
    this.props.lists.map((channel: any) => {
      return (
        <ListItem key={channel.id} button style={{ padding: "5px" }}>
          <Styled.checkbox
            checked={channel.id}
            name={channel.nickName}
            // onChange={this.onChangeChecked}
            value={true}
          />
          <ListItemText id={channel.id} primary={`${channel.nickName}`} />
          <Styled.btn>구독 취소</Styled.btn>
        </ListItem>
      );
    });
    return [];
  };

  render() {
    console.log("123123");
    console.log(this.props.lists);
    console.log(this.state.channelList);
    // this.props.chagelist(list);
    // let renderList = this.renderChannelList();
    return (
      <Styled.div>
        {this.props.lists.length >= 1
          ? this.props.lists.map((channel: any) => {
              return (
                <ListItem key={channel.id} button style={{ padding: "5px" }}>
                  <Styled.checkbox
                    checked={channel.id}
                    name={channel.nickName}
                    // onChange={this.onChangeChecked}
                    value={true}
                  />
                  {/* <ListItemAvatar>
                      <Avatar
                        alt={channel.nickName}
                        src={`${_url}/img/channel/${channel.img}.jpg`}
                      />
                    </ListItemAvatar> */}
                  <ListItemText
                    id={channel.id}
                    primary={`${channel.nickName}`}
                  />
                  <Styled.btn>구독 취소</Styled.btn>
                </ListItem>
              );
            })
          : "구독 중인 채널이 없습니다."}
      </Styled.div>
    );
  }
}

export default ItemList;
