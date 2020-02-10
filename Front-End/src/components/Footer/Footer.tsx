import React, { Component } from "react";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import { Grid, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import * as Styled from "./StyledFooter";

class Footer extends Component {
  render() {
    return (
      <Grid
        container
        alignItems="center"
        direction="column"
        style={{
          marginTop: "1rem",
          padding: "3rem",
          backgroundColor: "#b2dfdb"
        }}
      >
        <Grid container item spacing={1} justify="center">
          <Grid item>
            <Link component={RouterLink} to="#" color="inherit">
              <Facebook />
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="#" color="inherit">
              <Instagram />
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="#" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Grid item>
          <Styled.p>
            <Link
              component={RouterLink}
              to="#"
              color="inherit"
              underline="hover"
            >
              문의하기
            </Link>{" "}
            |{" "}
            <Link
              component={RouterLink}
              to="#"
              color="inherit"
              underline="hover"
            >
              개인정보취급방침
            </Link>{" "}
            |{" "}
            <Link
              component={RouterLink}
              to="#"
              color="inherit"
              underline="hover"
            >
              제휴/광고
            </Link>
          </Styled.p>
          <Styled.p>
            (주)코더스 | 서울시 강남구 테헤란로 212 멀티캠퍼스 1102호
          </Styled.p>
          <Styled.p>Copyright CodeUs Co., Inc. All rights reserved.</Styled.p>
        </Grid>
      </Grid>
    );
  }
}

export default Footer;
