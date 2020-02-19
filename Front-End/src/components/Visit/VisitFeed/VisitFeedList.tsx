import React, { Component } from "react";
import axios from "axios";
import { url } from "../../../url";
//mycomp
import VisitFeed from "./VisitFeed";

//style
import styled from "styled-components";
import { Zoom, Fab, } from "@material-ui/core";
import { KeyboardArrowUp, Autorenew, MoreHorizOutlined } from "@material-ui/icons";

interface State {
  height: number;
  feeds: any[];
  isTop: boolean;
  isBottom: boolean;
  lastFeedNo: number;
  noFeed: boolean;
}

class VisitFeedList extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      height: this.props.height,
      feeds: [],
      isTop: true,
      isBottom: false,
      lastFeedNo: 0,
      noFeed: false,
    };
  }

  componentDidMount() {
    this.getFeeds(0, 10);
  };
  setStateAsync(state: object) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  };

  infiniteScroll = () => {
    if (!this.state.isBottom && !this.state.noFeed) {
      const _scrollHeight = document.getElementsByName("feedContainer")[0]
        .scrollHeight;
      const _scrollTop = document.getElementsByName("feedContainer")[0]
        .scrollTop;
      const _clientHeight = document.getElementsByName("feedContainer")[0]
        .clientHeight;

      if (this.state.isTop && _clientHeight <= _scrollTop) {
        this.setState({ isTop: false });
      } else if (!this.state.isTop && _clientHeight > _scrollTop) {
        this.setState({ isTop: true });
      }

      if (_scrollHeight - _scrollTop < _clientHeight + 1) {
        this.setState({ isBottom: true });
        setTimeout(() => {
          this.getFeeds(this.state.lastFeedNo, 10).then(() => {
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

  getFeeds = async (_last:number, _count:number) => {
    try {
      const _id = this.props.id;
      await axios({
        method: "post",
        url: `${url}/feed/moreFeedInfo`,
        data: {
          id: _id,
          last: _last,
          count: _count,
        }
      })
      .then((res) => {
        const resData = res.data;
        if(resData.length === 0){ //불러온 피드가 없을때
          this.setState({ 
            noFeed: true,
            feeds: this.state.feeds.concat(
              [<div style={{ textAlign: "center", paddingBottom: "10px" }}>
                <Zoom in={true} timeout={500} key={0} >
                  <MoreHorizOutlined fontSize="large" style={{ color: "gray" }}/>
                </Zoom>
              </div>]
            )
          });
        }
        // else if(resData.length === _count) { //불러온 피드가 요청한 만큼 들어올 때
        else{
          this.setState({
            feeds: this.state.feeds.concat(
              resData.map((feed: any) => (
                <VisitFeed key={feed.feedNo} feedInfo={feed}/>
              ))
            )
          })
        }
      })
      this.setState({
        lastFeedNo: this.state.feeds[this.state.feeds.length - 1].props.feedInfo.feedNo
      })
    } 
    catch (err) {console.log(err);}

  };

  render() {
    return (<>
      <Zoom in={true}>
        <StFeedListCont
          name="feedContainer"
          height={this.state.height}
          onScroll={this.infiniteScroll}
        >
          
          {this.state.feeds}

          {this.state.isBottom ? (
            <div style={{ textAlign: "center", paddingBottom: "10px" }}>
              <Zoom in={true} timeout={500}>
                <Autorenew fontSize="large" style={{ color: "#00b386" }} />
              </Zoom>
            </div>
          ) : (
            // <div style={{ textAlign: "center", paddingBottom: "10px" }}>
            //   <Zoom in={false}>
            //     <Autorenew fontSize="large" style={{ color: "#00b386" }} />
            //   </Zoom>
            // </div>
            null
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
    </>);
  }
}
export default VisitFeedList;

  //////////////////////////////////////////////////////////// style
  const StFeedListCont = styled.div<any>`
  margin-top: 20px;
  border-radius: 5px;
  overflow: auto;
  height: ${props => (props.height - 100)}px;
  /* height: 150px; */
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
`;

  const StFab = styled(Fab)`
  position: absolute;
  background-color: black;
  color: white;
  bottom: 10px;
  right: 5%;

  &:hover {
    background-color: #8cebd1;
  }
`;