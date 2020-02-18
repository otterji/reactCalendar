import React, { Component } from "react";
import axios from "axios";
import { url } from "../../../url";
//mycomp
import VisitFeed from "./VisitFeed";

//style
import styled from "styled-components";
import { Zoom, Fab, } from "@material-ui/core";
import { KeyboardArrowUp, Autorenew } from "@material-ui/icons";

interface State {
  height: number;
  feeds: any[];
  isTop: boolean;
  isBottom: boolean;
  startFeed: number;
  lastFeed: number;
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
      startFeed: 0,
      lastFeed: 0,
      noFeed: false,
    };
  }

  componentDidMount() {
    this.getFeeds(0, 10);
  };

  infiniteScroll = () => {
    if (!this.state.isBottom && !this.state.noFeed) {
      const _scrollHeight = document.getElementsByName("feedContainer")[0]
        .scrollHeight;
      const _scrollTop = document.getElementsByName("feedContainer")[0]
        .scrollTop;
      const _clientHeight = document.getElementsByName("feedContainer")[0]
        .clientHeight;

      console.log(_scrollHeight - _scrollTop < _clientHeight + 1)

      if (this.state.isTop && _clientHeight <= _scrollTop) {
        this.setState({ isTop: false });
      } else if (!this.state.isTop && _clientHeight > _scrollTop) {
        this.setState({ isTop: true });
      }

      if (_scrollHeight - _scrollTop < _clientHeight + 1) {
        this.setState({ isBottom: true });
        setTimeout(() => {
          this.getFeeds(this.state.lastFeed, 10).then(() => {
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

  //axios로 feed를 count만큼 가져오는 메서드
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
        console.log(resData)
        this.setState({
          feeds: this.state.feeds.concat(
            resData.map((feed:any) => (
              <VisitFeed key={feed.feedNo} feedInfo={feed}/>
            ))
          ),
          lastFeed: resData[resData.length - 1].feedNo
        })
        if(resData.length < _count) {
          this.setState({
            noFeed: true,
          })
        }
      });
    } catch (err) {
      alert(err);
    }
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