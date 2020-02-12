import React, { Component } from "react";
import axios from "axios";
import { url as _url } from "../../url";
//mycomp
import Feed from "./Feed";

//style
import styled from "styled-components";
import { Slide, Zoom, Fab } from "@material-ui/core";
import { KeyboardArrowUp, Autorenew } from "@material-ui/icons";

interface State {
  feeds: any[];
  isTop: boolean;
  isBottom: boolean;
  lastFeed: number;
  noFeed: boolean;
}

class FeedList extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      feeds: [],
      isTop: true,
      isBottom: false,
      lastFeed: 0,
      noFeed: false
    };
  }

  componentDidMount() {
    this.getFeeds();
  }

  setStateAsync(state: object) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  infiniteScroll = () => {
    if (!this.state.isBottom) {
      const _scrollHeight = document.getElementsByName("feedContainer")[0]
        .scrollHeight;
      const _scrollTop = document.getElementsByName("feedContainer")[0]
        .scrollTop;
      const _clientHeight = document.getElementsByName("feedContainer")[0]
        .clientHeight;
      // console.log(_scrollHeight, _scrollTop, _scrollHeight - _scrollTop, _clientHeight + 2);

      if (this.state.isTop && _clientHeight <= _scrollTop) {
        this.setState({ isTop: false });
      } else if (!this.state.isTop && _clientHeight > _scrollTop) {
        this.setState({ isTop: true });
      }

      if (_scrollHeight - _scrollTop <= _clientHeight + 2) {
        this.setState({ isBottom: true });
        setTimeout(() => {
          this.getFeeds().then(() => {
            this.setState({
              isBottom: false
            });
          });
        }, 1000);
      }
    }
  };

  scrollToTop = () => {
    document.getElementsByName("feedContainer")[0].scrollTop = 0;
  };

  getFeeds = async () => {
    const _id = sessionStorage.getItem("id");
    try {
      const res = await axios({
        method: "post",
        url: `${_url}/feed/moreFeedInfo`,
        data: {
          id: _id,
          last: this.state.lastFeed
        }
      });
      console.log(JSON.stringify(res.data, null, 2));
      const resData = res.data;
      if (resData.length === 0) {
        this.setState({ noFeed: true });
      } else {
        await this.setStateAsync({
          feeds: this.state.feeds.concat(
            resData.map((feed: any, i: number) => (
              <Slide direction="up" in={true} timeout={500}>
                <Feed key={i} info={feed} />
              </Slide>
            ))
          )
        }).then(() => {
          this.setState({
            lastFeed: resData[resData.length - 1].feedNo
          });
        });
        // console.log(this.state.lastFeed, this.state.feeds);
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        <Zoom in={true}>
          <StFeedListCont
            name="feedContainer"
            height={this.props.winHeight}
            onScroll={this.infiniteScroll}
          >
            {this.state.feeds}

            {this.state.isBottom ? (
              <Zoom in={true}>
                <div style={{ textAlign: "center", paddingBottom: "10px" }}>
                  <Autorenew fontSize="large" style={{ color: "#00b386" }} />
                </div>
              </Zoom>
            ) : (
              <Zoom in={false}>
                <div style={{ textAlign: "center", paddingBottom: "10px" }}>
                  {/* <MoreHoriz fontSize="large" style={{color:"gray"}}/> */}
                  <Autorenew fontSize="large" style={{ color: "#00b386" }} />
                </div>
              </Zoom>
            )}
          </StFeedListCont>
        </Zoom>
        {this.state.isTop ? (
          <Zoom in={false}>
            <StFab size="small">
              <KeyboardArrowUp />
            </StFab>
          </Zoom>
        ) : (
          <Zoom in={true}>
            <StFab size="small" onClick={this.scrollToTop}>
              <KeyboardArrowUp />
            </StFab>
          </Zoom>
        )}
      </>
    );
  }
}
  export default FeedList;

  //////////////////////////////////////////////////////////// style
  const StFeedListCont = styled.div<any>`
  /* border-style: ridge;
  border-width: 2px;
  border-color: #00cc99; */
  border-radius: 5px;
  overflow: auto;
  height: ${props => props.height - 150}px;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
`;

  const StFab = styled(Fab)`
  background-color: black;
  color: white;
  position: absolute;
  bottom: 10px;
  right: 15px;

  &:hover {
    background-color: #8cebd1;
  }
`;