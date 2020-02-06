import React, { Component } from 'react';
import * as Styled from './StyledSearch';
import { SearchRounded } from '@material-ui/icons';
import { TextField, IconButton } from '@material-ui/core';

interface State {
  searchAnchorEl: any;
}

class Search extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { searchAnchorEl: null };
  }

  searchHandleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (this.state.searchAnchorEl === null) {
      this.setState({ searchAnchorEl: event.currentTarget });
    } else {
      this.setState({ searchAnchorEl: null });
    }
  };

  render() {
    return (
      <Styled.Li>
        {this.state.searchAnchorEl ? (
          <TextField
            id="total-search-bar"
            label="일정 및 유저 검색"
            size="small"
          />
        ) : null}

        <IconButton aria-label="search" onClick={this.searchHandleClick}>
          <SearchRounded />
        </IconButton>
      </Styled.Li>
    );
  }
}

export default Search;
