import React, {Component} from 'react';
import axios from 'axios';
import {url as _url} from '../../url';
//mycomp
import Feed from './Feed'

//style
import styled from 'styled-components';
import {Slide, Fade, Zoom, Fab} from '@material-ui/core'
import {KeyboardArrowUp, Autorenew} from '@material-ui/icons'
import color from "@material-ui/core/colors/red";
import {red} from "@material-ui/core/colors";

interface State {
    feeds: any[];
    isTop: boolean;
    isBottom: boolean;
}

class FeedList extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            feeds: [],
            isTop: true,
            isBottom: false,
        }
    }

    componentDidMount() {
        this.setState({feeds: this.state.feeds.concat(this.tempFeeds())})
    }

    infiniteScroll = () => {
        const _scrollHeight = document.getElementsByName('feedContainer')[0].scrollHeight;
        const _scrollTop = document.getElementsByName('feedContainer')[0].scrollTop;
        const _clientHeight = document.getElementsByName('feedContainer')[0].clientHeight;
        console.log(_scrollHeight, _scrollTop, _scrollHeight - _scrollTop, _clientHeight + 2);

        if (this.state.isTop && _clientHeight <= _scrollTop) {
            this.setState({isTop: false})
        } else if (!this.state.isTop && _clientHeight > _scrollTop) {
            this.setState({isTop: true})
        }


        if (_scrollHeight - _scrollTop <= _clientHeight + 2) {
            this.setState({isBottom: true})
            setTimeout(() => {
                this.setState({
                    feeds: this.state.feeds.concat(this.tempFeeds()),
                    isBottom: false,
                })
            }, 1000);
        }
    }

    scrollToTop = () => {
        document.getElementsByName('feedContainer')[0].scrollTop = 0;
    }

    tempFeeds = () => {
        let _feedList = [];
        for (let i = this.state.feeds.length; i < this.state.feeds.length + 10; i++) {
            _feedList.push(
                <Slide direction="up" in={true} timeout={500}>
                    <Feed key={i}/>
                </Slide>
            )
        }
        return _feedList;
    }

    // getFeeds = async () => {
    //   try{
    //     const res = await axios({
    //       method: 'get',
    //       url: `${_url}/feed/feedList`,
    //     })
    //     // console.log(JSON.stringify(res.data, null, 2));
    //     this.setState({ feeds: res.data });
    //     // console.log(this.state.feeds)
    //     feedList = this.renderFeeds();
    //     // console.log('feedList', feedList)
    //   }
    //   catch(err){
    //     console.log(err)
    //   }
    // }

    // renderFeeds = ():Array<any> => {
    //   let feedList:any[] = []
    //   const length = this.state.feeds.length;
    //   for(let i = 0; i < length; i++){
    //     feedList.push(
    //       <StyledFeed key={i}>
    //         {this.state.feeds[i].id}<br/>
    //         {this.state.feeds[i].content}
    //       </StyledFeed>
    //     )
    //   }
    //   return feedList;
    // }


    render() {
        console.log('render')
        return (
            <>
                <Zoom in={true}>
                    <StFeedListCont name="feedContainer"
                                    height={this.props.winHeight}
                                    onScroll={this.infiniteScroll}>
                        <StFeedForm>
                            글 작성칸
                        </StFeedForm>
                        <hr style={{color: "#009687", border: "double", margin: "15px"}}></hr>
                        {this.state.feeds}

                        {
                            this.state.isBottom ?
                                <Zoom in={true}>
                                    <div style={{textAlign: "center", paddingBottom: "10px"}}>
                                        <Autorenew fontSize="large" style={{color: "#00b386"}}/>
                                    </div>
                                </Zoom>
                                :
                                <Zoom in={false}>
                                    <div style={{textAlign: "center", paddingBottom: "10px"}}>
                                        <Autorenew fontSize="large" style={{color: "#00b386"}}/>
                                    </div>
                                </Zoom>
                        }

                    </StFeedListCont>
                </Zoom>
                {
                    this.state.isTop ?
                        <Zoom in={false}>
                            <StFab size="small">
                                <KeyboardArrowUp/>
                            </StFab>
                        </Zoom>
                        :
                        <Zoom in={true}>
                            <StFab size="small" onClick={this.scrollToTop}>
                                <KeyboardArrowUp/>
                            </StFab>
                        </Zoom>
                }
            </>
        )
    }
}

export default FeedList;

//////////////////////////////////////////////////////////// style
const StFeedListCont = styled.div<any>`
  border-radius: 5px;
  overflow: auto;
  padding-right: 25%;
  height: ${props => (props.height - 150)}px;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { 
    display: none
  }
  scroll-behavior: smooth;
`
const StFeedForm = styled.div`
  height:150px;
  margin: 20px;
  padding : 15px;
  border: 3px solid  #eff5f5;
  border-radius: 12px;
  background-color: #eff5f5;
`

const StFab = styled(Fab)`
  background-color: black;
  color: white;
  position: absolute;
  bottom: 10px;
  right: 15px;

  &:hover{
    background-color: #8cebd1;
  }

`