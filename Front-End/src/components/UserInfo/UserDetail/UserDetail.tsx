import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import * as Styled from './StyledUserDetail';

interface State {}

// Main UserDetail part
class UserDetail extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid
        item
        container
        alignItems="center"
        justify="center"
        direction="column"
        style={{ margin: '1rem' }}
      >
        {/* profile img and nickname part */}
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          style={{ padding: '0 1.5rem 0 0' }}
        >
          <Styled.img src="images/pengsooluv_profile.png" alt="profile img" />
          <Grid item>
            <b style={{ fontSize: '1.2rem', margin: '0 0 1rem 0' }}>
              Pengsooluv
            </b>
          </Grid>
        </Grid>

        {/* profile follower and following part*/}
        <Grid
          item
          container
          justify="space-evenly"
          alignItems="center"
          direction="row"
          style={{ width: '200px', marginTop: '1rem' }}
        >
          <Grid item>
            <Styled.b>7</Styled.b>
            <Styled.p>일정</Styled.p>
          </Grid>
          <Grid item>
            <Styled.b>610</Styled.b>
            <Styled.p>팔로워</Styled.p>
          </Grid>
          <Grid item>
            <Styled.b>429</Styled.b>
            <Styled.p>팔로잉</Styled.p>
          </Grid>
        </Grid>

        {/* profile content part */}
        <Grid item>
          <Styled.content>
            펭하
            <br />
            코린이의 일상 | 프로그래밍
          </Styled.content>
        </Grid>
      </Grid>
    );
  }
}

export default UserDetail;
