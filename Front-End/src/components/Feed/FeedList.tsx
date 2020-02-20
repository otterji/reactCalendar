import React, { Component } from "react";
import axios from "axios";
import { url } from "../../url";
//mycomp
import Feed from "./Feed";

//style
import styled from "styled-components";
import { Zoom, Fab, } from "@material-ui/core";
import { KeyboardArrowUp, Autorenew, MoreHorizOutlined } from "@material-ui/icons";

interface State {
  feeds: any[];
  isTop: boolean;
  isBottom: boolean;
  lastFeedNo: number;
  deleteIdx: number;
  noFeed: boolean;
  toggle: boolean;
}

class FeedList extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      feeds: [],
      isTop: true,
      isBottom: false,
      lastFeedNo: 0,
      deleteIdx: 0,
      noFeed: false,
      toggle: false,
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
      console.log(_scrollHeight - _scrollTop < _clientHeight + 1)
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

  //axios로 feed 10개를 가져오는 메서드
  getFeeds = async (_last:number, _count:number) => {
    try {
      const _id = sessionStorage.getItem("id")
      console.log('last', _last, 'count', _count)
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
                <Zoom in={true} timeout={500} key={-1} >
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
                <Feed key={feed.feedNo} info={feed} delete={this.deleteFeed} toggleRender={this.props.toggleRender}/>
              ))
            )
          })
        }
      })
      this.setState({
        lastFeedNo: this.state.feeds[this.state.feeds.length - 1].props.info.feedNo
      })
    } 
    catch (err) {console.log(err);}
  };

  deleteFeed = async (_feedNo:number) => {
    try{
      const _id = sessionStorage.getItem("id");
      //삭제되는 컴포넌트의 인덱스
      const _idx = this.state.feeds.findIndex((feed) => (feed.key === _feedNo.toString()));
      const _count = this.state.feeds.length - _idx;
    
      const res = await axios({
        method: 'post',
        url: `${url}/feed/moreFeedInfo`,
        data: {
          id: _id,
          last: _feedNo,
          count: _count,
        }
      })
      // await axios({
      //   method: 'delete',
      //   url: `${_url}/feed/delete/${_feedNo}`
      // });
      
      const resData = res.data;

      if (resData.length === 0) {
        this.setState({ 
          noFeed: true,
          feeds: this.state.feeds.concat(
            [<div style={{ textAlign: "center", paddingBottom: "10px" }}>
              <Zoom in={true} timeout={500} key={-1} >
                <MoreHorizOutlined fontSize="large" style={{ color: "gray" }}/>
              </Zoom>
            </div>]
          )
        });
      }
      else{
        await this.setStateAsync({
          feeds: this.state.feeds.slice(0, _idx).concat(
            resData.map((feed: any) => (
              <Feed key={feed.feedNo} info={feed} delete={this.deleteFeed} toggleRender={this.props.toggleRender}/>
            ))
          )
        })
        .then(() => {
          this.setState({
            lastFeedNo: resData[resData.length - 1].feedNo
          });
        })
        
      }
      await axios({
        method: 'delete',
        url: `${url}/feed/delete/${_feedNo}`
      });
      this.props.toggleRender();
      // window.location.reload(false);
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