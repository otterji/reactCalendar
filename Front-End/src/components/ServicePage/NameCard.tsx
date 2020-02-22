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
          <div className="tmHover"><a href="http://www.github.com/EXTC27/MyJavaScript"><div className="square"></div></a></div>
          <div className="tmHover"><a href="http://www.github.com/otterji"><div className="square"></div></a></div>
          <div className="tmHover"><a href="http://www.github.com/DongjoonPark"><div className="square"></div></a></div>
          <div className="tmHover"><a href="http://www.github.com/ssyup4259"><div className="square"></div></a></div>
          <div className="tmHover"><a href="http://www.github.com/sooyun429"><div className="square"></div></a></div>
          <div className="tmHover"><a href="http://www.github.com/jhlee-algo"><div className="square"></div></a></div>
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
  animation: mymove 5s infinite;
}

.logoTextBottom{
  font-size: 100px;
  padding-left: 300px;
  animation: mymove 5s infinite;
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
  height:400px;
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

.tmHover:hover {
  opacity: 1;
}

.tmHover:nth-child(1) {
  background: url(images/SinJae.jpg);
  background-size: cover;
  background-position: 90% 30%;
  transform : rotateZ(5deg)
}

.tmHover:nth-child(2) {
  background: url(images/YoungGee.jpg);
  background-size: cover;
  background-position: 50% 0;
  transform : rotateZ(-5deg)
}

.tmHover:nth-child(3) {
  background: url(images/DongJoon.png);
  background-size: cover;
  background-position: 90% 60%;
  transform : rotateZ(5deg)
}

.tmHover:nth-child(4) {
  background: url(images/SangYeop.jpg);
  background-size: cover;
  background-position: 50% 85%;
  transform : rotateZ(-5deg)
}

.tmHover:nth-child(5) {
  background: url(images/DoHee.jpg);
  background-size: cover;
  background-position: 50% 85%;
  transform : rotateZ(5deg)
}

.tmHover:nth-child(6) {
  background: url(images/JungHoon.jpg);
  background-size: cover;
  background-position: 50% 85%;
  transform : rotateZ(-5deg)
}

.nameCard{
  padding-bottom: 10px;
  vertical-align: bottom;
}

.square{
  margin: auto;
  margin-top: 10%;
  width: 80%;
  height: 90%;
  position: relative;
  z-index: 2;
}

.square::after,
.square::before {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0%;
    height: 0%;
    border: 2px solid white;
    border-width: 1px;
    transition: .5s;
}

.square::after {
  height: 100%;
  border-style: solid none;
}
.square::before {
  width: 100%;
  border-style: none solid;
}

.tmHover:hover .square::after,
.tmHover:hover .square::before {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

@keyframes mymove {
  from {color: #009689;}
  to {color: white;}
}
`;