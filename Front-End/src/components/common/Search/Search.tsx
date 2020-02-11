import React, { Component } from 'react';
import * as Styled from './StyledSearch';
import { SearchRounded,  } from '@material-ui/icons';
import { TextField, IconButton, Tooltip, Grow, InputAdornment } from '@material-ui/core';

interface State {
  searchAnchorEl: any;
}

class Search extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { 
      searchAnchorEl: null,
    };
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
          label="채널검색"
          size="small"          
          />
        </Grow>
        : 
        <Grow in={false}>
          <Styled.StTextField
          autoFocus={true}
          variant="outlined"
          margin="dense"
          label="채널검색"
          size="small"/>
        </Grow>
      }
      <Tooltip title="채널검색">
        <IconButton aria-label="채널검색" onClick={this.searchHandleClick}>
          {
            this.state.searchAnchorEl === null ? 
            <SearchRounded />  
            :
            <SearchRounded style={{color:"#8cebd1"}}/>
          }
          {/* <SearchRounded /> */}
        </IconButton>
      </Tooltip>
      </Styled.StSearch>
    );
  }
}

export default Search;
