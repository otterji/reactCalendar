import React, { Component } from 'react'
import Recom from './Recom'
//style
import styled from 'styled-components'
import { GridList, } from '@material-ui/core'

class RecomList extends Component<any> {

  

  render(){
    return(
      <GridList >
        {
          <Recom/>
        }

      </GridList>
    )
  }
}

export default RecomList;