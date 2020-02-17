import React, { Component } from 'react'
import axios from 'axios'
//
import {url} from '../../url'
//style
import styled from 'styled-components';
import { Slide, Zoom, Fade } from '@material-ui/core';
import { FiberManualRecord,FiberManualRecordOutlined } from '@material-ui/icons'


interface State {
  banner: any;
  bannerLength: number;
  dot: any;
  idx: number;
  slideOn: boolean;
}
let slideInterval: any;
class Banner extends Component<any, State> {
  constructor(props:any){
    super(props);
    this.state = {
      banner: [],
      bannerLength: 0,
      dot: [],
      idx: 0,
      slideOn: true,
    }
  }
  componentDidMount(){
    console.log()
    this.getBanner();
    slideInterval = setInterval(()=>{
      if(this.state.idx === this.state.bannerLength - 1){
        this.setState({
          idx: 0,
        })  
      }
      else{
        this.setState({
          idx: this.state.idx + 1,
        })
      }
    }, 6000)
  }
  setStateAsync(state: object) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }
  

  getBanner = async () => {
    try{
      const res = await axios({
        method: 'get',
        url: `${url}/banner/getAllBanners`
      })
      const resData = res.data
      // console.log(JSON.stringify(resData, null, 2));
      await this.setStateAsync({
        bannerLength: resData.length,
        banner: resData.map((res:any)=>{
          return(
            <Fade in={true} timeout={2000} key={res.bn_no}>
              <StBanner
              imgurl={`${url}/${res.img}`}
              onClick={()=>{window.open(res.link, '_blank')}}/>
            </Fade>
          )
        })
      })
    }
    catch(err){
      alert(err)
    }
  }

  renderDot = () => {
    let dotList = new Array(this.state.bannerLength);
    for(let i = 0; i < this.state.bannerLength; i++){
      dotList[i] = 
      <>
      {
        this.state.idx === i ? 
        <FiberManualRecord/>
        :
        <FiberManualRecordOutlined 
        fontSize="small"
        id={i.toString()} 
        onClick={this.changeBanner}
        />
      }
      </>
    }
    return dotList;
  }

  changeBanner = (e:any) => {
    const _idx:string = e.currentTarget.id;
    this.setState({
      idx: Number(_idx),
    })
    if(this.state.slideOn){
      this.setState({
        slideOn: false,
      })
      clearInterval(slideInterval);
      setTimeout(()=>{
        this.setState({
          slideOn: true,
        })
        slideInterval = setInterval(()=>{
          if(this.state.idx === this.state.bannerLength - 1){
            this.setState({
              idx: 0,
            })  
          }
          else{
            this.setState({
              idx: this.state.idx + 1,
            })
          }
        }, 6000)
      }, 10000)
    }
  }
 
  render(){
    return (
      <StBannerCont navHeight={this.props.navHeight}>
        {
          this.state.banner[this.state.idx]
        }
        <Zoom in={true} timeout={500}>
          <StDotCont focusIdx={this.state.idx + 1}>
            {this.renderDot()}
          </StDotCont>
        </Zoom>
      </StBannerCont>
    )
  }
 
}
export default Banner;

const StBannerCont = styled.div<any>`
  /* position: relative; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: ${props => (props.navHeight)}px;
  overflow: hidden;
`;

const StBanner = styled.div<any>`
  width: 100%;
  height: 35vw;
  background: url(${props => (props.imgurl)});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;

const StDotCont = styled.div<any>`
  color: #99ffe6;
  display: flex;
  align-items: center;
  /* position: absolute; */
  /* left: 50%; */
  /* transform: translate(-50%); */

  *{
    cursor: pointer;
    &:hover{
      color: #00e6ac;
    }
  }

  svg:nth-child(${props => (props.focusIdx)}){
    color: #00e6ac;
  }
`;
