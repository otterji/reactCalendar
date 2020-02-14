import React, { Component } from "react";
import axios from "axios";
import { url as _url } from "../../url";
//mycomp
import Feed from "./Feed";

//style
import styled from "styled-components";
import { Slide, Zoom, Fab, ThemeProvider } from "@material-ui/core";
import { KeyboardArrowUp, Autorenew } from "@material-ui/icons";

interface State {
  feeds: any[];
  isTop: boolean;
  isBottom: boolean;
  startFeed: number;
  lastFeed: number;
  deleteIdx: number;
  noFeed: boolean;
}

class FeedList extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      feeds: [],
      isTop: true,
      isBottom: false,
      startFeed: 0,
      lastFeed: 0,
      deleteIdx: 0,
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

  //axios로 feed 10개를 가져오는 메서드
  getFeeds = async (_last:number, _count:number) => {
    const _id = sessionStorage.getItem("id");
    try {
      const res = await axios({
        method: "post",
        url: `${_url}/feed/moreFeedInfo`,
        data: {
          id: _id,
          last: _last,
          count: _count,
        }
      });
      // console.log(JSON.stringify(res.data, null, 2));
      console.log(res.data);
      const resData = res.data;
      if (resData.length === 0) {
        this.setState({ noFeed: true });
      } else {
        await this.setStateAsync({
          feeds: this.state.feeds.concat(
            resData.map((feed: any) => (
              <Feed key={feed.feedNo} info={feed} delete={this.deleteFeed}/>
            ))
          )
        })
        .then(()=>{
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

  deleteFeed = async (_feedNo:number) => {
    console.log('삭제될 피드', _feedNo)
    const _id = sessionStorage.getItem("id");
    //삭제되는 컴포넌트의 인덱스
    const _idx = this.state.feeds.findIndex((feed) => (feed.key === _feedNo.toString()));
    const _count = this.state.feeds.length - _idx;

    try{
      const res = await axios({
        method: 'post',
        url: `${_url}/feed/moreFeedInfo`,
        data: {
          id: _id,
          last: _feedNo,
          count: _count,
        }
      })
      const resData = res.data;
      console.log('삭제하고 요청하는 피드들',resData)
      if (resData.length === 0) {
        this.setState({ noFeed: true });
      }
      else{
        await this.setStateAsync({
          feeds: this.state.feeds.slice(0, _idx).concat(
            resData.map((feed: any) => (
              <Feed key={feed.feedNo} info={feed} delete={this.deleteFeed}/>
            ))
          )
        })
        .then(() => {
          this.setState({
            lastFeed: resData[resData.length - 1].feedNo
          });
        })
        // console.log(this.state.feeds);
      }
      
      await axios({
        method: 'delete',
        url: `${_url}/feed/delete/${_feedNo}`
      });
    }
    catch(err){
      alert(err);
    }
  }

  render() {
    return (<>
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
    </>);
  }
}
  export default FeedList;

  //////////////////////////////////////////////////////////// style
  const StFeedListCont = styled.div<any>`
  /* border-style: ridge;
  border-width: 2px;
  border-color: #00cc99; */
  margin-top: 20px;
  border-radius: 5px;
  overflow: auto;
  height: ${props => (props.height - 150)}px;
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
  right: 5%;

  &:hover {
    background-color: #8cebd1;
  }
`;