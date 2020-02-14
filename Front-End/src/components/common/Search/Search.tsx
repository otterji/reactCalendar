import React, { Component } from 'react';
import axios from 'axios'
//
import { url } from '../../../url'
import SearchResult from './SearchResult'
//style
import * as Styled from './StyledSearch';
import { Tooltip, Grow, } from '@material-ui/core';
import { SearchRounded, TurnedIn, } from '@material-ui/icons';

interface State {
  searchAnchorEl: any;
  searchValue: string;
  openListTab: boolean;
  searchList: any;
}

class Search extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { 
      searchAnchorEl: null,
      searchValue: '',
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
      });
    }
  };

  onChange = async (e:any) => {
    await this.setStateAsync({ searchValue: e.target.value })
    
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
        url: `${url}`,
      })
      const resData = res.data;
      if(resData.length === 0){
        await this.setStateAsync({
          searchList: [<div>찾는 채널이 없습니다.</div>]
        })
        return;
      }

      await this.setStateAsync({
        searchList: resData.map((res:any)=>{
          return(
            <SearchResult key={res.no}/>
          )
        })        
      })
    }
    catch(err){
      // alert(err);
    }
  }

  isInputEmpty = () => {
    if(this.state.searchValue === ''){
      return true;
    }
    else{
      return false;
    }
  }

  render() {
    return (
      <Styled.StSearch>
        {
          this.state.searchAnchorEl ?
          <Grow in={true}>
            <Styled.StTextField
            autoFocus={true}
            variant="outlined"
            margin="dense"
            label="채널 검색"
            size="small"
            value={this.state.searchValue}
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
            value={this.state.searchValue}
            onChange={this.onChange}
          />
          </Grow>
        }
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
        

        {
          this.state.openListTab ?
          <Grow in={true}>
            <Styled.StListCont>

            </Styled.StListCont>
          </Grow>
          :
          <Grow in={false}>
            <Styled.StListCont>

            </Styled.StListCont>
          </Grow>
        }
        
      </Styled.StSearch>
    );
  }
}

export default Search;
