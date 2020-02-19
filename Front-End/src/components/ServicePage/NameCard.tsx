import React, { Component } from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

const NameCard: any = () => {
  return (
    <StIntroMemberCont>
      <div className="teamShalendar">
        <div className="teamShalendarTop">
          <div className="logoTop">
            <div className="logoTextTop">
              Shalendar
            </div>
            <div className="logoTextBottom">
              Coders
            </div>
          </div>
          <div className="teamMember"><h3>M</h3>
            <h2></h2>
            <h3 className="nameCard">김신재<br />Front-End</h3></div>
          <div className="teamMember"><h3>E</h3><h2></h2><h3 className="nameCard">노영지<br />Front-End</h3></div>
          <div className="teamMember"><h3>E</h3><h2></h2><h3 className="nameCard">박동준<br />Back-End</h3></div>
          <div className="teamMember"><h3>T</h3><h2></h2><h3 className="nameCard">신상엽<br />Back-End</h3></div>
          <div className="teamMember"><h3>U</h3><h2></h2><h3 className="nameCard">윤도희<br />Front-End</h3></div>
          <div className="teamMember"><h3>S</h3><h2></h2><h3 className="nameCard">이정훈<br />Back-End</h3></div>
        </div>
        <div className="teamShalendarBack">
          <div className="tmHover"></div>
          <div className="tmHover"></div>
          <div className="tmHover"></div>
          <div className="tmHover"></div>
          <div className="tmHover"></div>
          <div className="tmHover"></div>
        </div>
      </div>
    </StIntroMemberCont>
  )
}

export { NameCard };

const StIntroMemberCont = styled.div`
width: 100%;
height: 570px;

.logoTop{
  width: 70%;
  color: white;
  position: absolute;
  top: 20%;
  left: 25%
}

.logoTextTop{
  font-size: 100px;
}

.logoTextBottom{
  font-size: 100px;
  padding-left: 300px;
}

.teamShalendar {
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  background-size: 400% 400%;
  background-image: linear-gradient(-45deg, #eff3f5, #ffc107, #b9d47a, #a8d673, #ffa000);
  transition-duration: 0.5s;
  animation: Gradient 5s ease infinite;
  opacity: 0.9;
  overflow: hidden;
}

.teamShalendarTop{
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
}

.teamMember{
  background: black;
  width: 16.666%;
}

.teamMember > h2 {
  height:350px;
  color: white(26, 25, 25);
  font-size: 10px;
}

.teamShalendarBack{
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
}

.tmHover{
  background: red;
  width: 16.666%;
}

.tmHover:hover{
  opacity:1;
}

.teamShalendarTop {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}

h1,h2,p,h3 {
  color: white;
}

p {
  font-size: 1.5rem;
  padding-left: 1rem;
  opacity: 0.6;
}

h2 {
  font-size: 0.8rem;
}

h3 {
  text-align: center;
  text-transform: uppercase;
}

.tmHover{
  cursor: pointer;
  opacity: 0;
  transition-duration: 0.5s;
  position: relative;
  z-index: 10;
}

.tmHover > h2 {
  color: white(26, 25, 25);
  font-size: 5rem;
  transform: rotateZ(-90deg) translateX(-150%) translateY(-25%);
  transition-duration: 0.6s;
}

.tmHover:hover {
  opacity: 1;
}

.tmHover:hover > h2 {
  transform: rotateZ(-90deg) translateX(-50%) translateY(-25%);
}

.tmHover:nth-child(1) {
  background: url(images/SinJae.jpg);
  background-size: cover;
  background-position: 50% 85%;
}

.tmHover:nth-child(2) {
  background: url(images/YoungGee.jpg);
  background-size: cover;
  background-position: 50% 0;
}

.tmHover:nth-child(3) {
  background: url(images/DongJoon.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 90% 60%;
}

.tmHover:nth-child(4) {
  background: url(images/SangYeop.jpg);
  background-size: cover;
  background-position: 50% 85%;
}

.tmHover:nth-child(5) {
  background: url(images/DoHee.jpg);
  background-size: cover;
  background-position: 50% 85%;
}

.tmHover:nth-child(6) {
  background: url(images/JungHoon.jpg);
  background-size: cover;
  background-position: 50% 85%;
}

.nameCard{
  padding-bottom: 10px;
  vertical-align: bottom;
}
`;