import React, { Component } from "react";
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";
import * as Styled from "./StyledItemList";

class ItemList extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Styled.div>
        {this.props.lists.length >= 1
          ? this.props.lists.map((channel: any) => {
              return (
                <ListItem key={channel.id} button style={{ padding: "5px" }}>
                  <Styled.checkbox />
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
