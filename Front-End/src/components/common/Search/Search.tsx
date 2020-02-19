import React, { Component } from 'react';
import axios from 'axios'
//
import { url } from '../../../url'
import SearchedCh from '././SearchedCh'
//style
import * as Styled from './StyledSearch';
import { Tooltip, Grow, Zoom } from '@material-ui/core';
// import { Autocomplete } from '@mat'
import { SearchRounded, } from '@material-ui/icons';

interface State {
  searchAnchorEl: any;
  searchNickname: string;
  openListTab: boolean;
  searchList: any;
}

class Search extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { 
      searchAnchorEl: null,
      searchNickname: '',
      openListTab: false,
      searchList: [],
    };
  }

  setStateAsync(state: object) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  searchHandleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (this.state.searchAnchorEl === null) {
      this.setState({ 
        searchAnchorEl: event.currentTarget,
      });
    } else {
      this.setState({ 
        searchAnchorEl: null,
        openListTab: false,
      });
    }
  };

  onChange = async (e:any) => {
    await this.setStateAsync({ searchNickname: e.target.value })
    
    if(this.isInputEmpty()){
      this.setState({
        openListTab: false
      });
      return;
    }

    try{
      await this.setStateAsync({
        openListTab: true
      });

      const res = await axios({
        method: 'get',
        url: `${url}/channel/searchChannelByNickname/${this.state.searchNickname}`,
      })
      const resData = res.data;
      // console.log(resData)
      if(resData.length === 0){
        await this.setStateAsync({
          searchList: [<Zoom in={true}><Styled.StNoCh>찾는 채널이 없습니다.</Styled.StNoCh></Zoom>]
        })
        return;
      }

      await this.setStateAsync({
        searchList: resData.map((res:any)=>{
          return(
            <SearchedCh key={res.ch_no} info={res}/>
          )
        })        
      })
    }
    catch(err){
      // alert(err);
    }
  }

  isInputEmpty = () => {
    if(this.state.searchNickname === ''){
      return true;
    }
    else{
      return false;
    }
  }

  render() {
    return (
      <Styled.StSearch className="search">
        <div className="searchTX">
        {
          this.state.searchAnchorEl ?
          <Grow in={true}>
            <Styled.StTextField
            autoFocus={true}
            variant="outlined"
            margin="dense"
            label="채널 검색"
            size="small"
            value={this.state.searchNickname}
            onChange={this.onChange}
            />
          </Grow>
          : 
          <Grow in={false}>
            <Styled.StTextField
            autoFocus={true}
            variant="outlined"
            margin="dense"
            label="채널 검색"
            size="small"
            value={this.state.searchNickname}
            />
          </Grow>
        }
        {
          this.state.openListTab ?
          <Grow in={true}>
            <Styled.StListCont>
              {
                this.state.searchList
              }
            </Styled.StListCont>
          </Grow>
          :
          <Grow in={false}>
            <Styled.StListCont>

            </Styled.StListCont>
          </Grow>
        }
        </div>


        <Tooltip title="채널 검색">
          <Styled.StIconBtn 
          aria-label="채널 검색" 
          onClick={this.searchHandleClick}>
            {
              this.state.searchAnchorEl === null ? 
              <SearchRounded />  
              :
              <SearchRounded style={{color:"#8cebd1"}}/>
            }
            {/* <SearchRounded /> */}
          </Styled.StIconBtn>
        </Tooltip>

      </Styled.StSearch>
    );
  }
}

export default Search;
