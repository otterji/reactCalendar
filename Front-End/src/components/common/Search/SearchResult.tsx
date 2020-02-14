import React, { Component } from 'react'

class SearchResult extends Component<any> {
  render(){
    return(<>
      {
        this.props.isEmpty ? 
        <div>채널이 없습니다.</div>
        :
        <div></div>
      }
    </>)
  }
}

export default SearchResult;