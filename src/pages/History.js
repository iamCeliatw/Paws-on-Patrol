import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import styled from "styled-components";
import Footer from "../components/Footer";
import { UserAuth } from "../context/AuthContext";
import InviteHistory from "../components/History/InviteHistory";
import NannyHistory from "../components/History/NannyHistory";
const History = () => {
  const { userselectOpen, openInfo } = UserAuth();
  const items = [" 我的訂單", "我的客戶"];
  const [activeItem, setActiveItem] = useState(0);
  return (
    <>
      <Nav />
      <Container>
        <LeftBar activeItem={activeItem}>
          <div>
            <ul>
              {items.map((item, index) => (
                <li
                  id={index}
                  className="listItem"
                  key={index}
                  onClick={() => setActiveItem(index)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </LeftBar>
        <Main>
          {activeItem === 0 && <InviteHistory />}
          {activeItem === 1 && <NannyHistory />}
        </Main>
      </Container>
      <Footer />
    </>
  );
};

export default History;

const Container = styled.div`
  height: 100vh;
  display: flex;
  width: 70%;
  margin: auto;
  ${({ theme }) => theme.media.tablet`
  padding: 0 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    `}
  ${({ theme }) => theme.media.tablet`
    width:95%;
    `}
`;
const LeftBar = styled.div`
  width: auto;
  margin: 120px auto 75px auto;
  flex: 1;
  height: fit-content;
  ul {
    ${({ theme }) => theme.media.tablet`
    max-width: 36px;
    `}
  }
  &:hover {
    cursor: pointer;
  }
  .listItem {
    padding: 10px 5px;
    list-style: none;
    position: relative;
    padding-left: 12px;
    ${({ theme }) => theme.media.mobile`
        font-size: 14px;
    `}
    &:hover {
      content: "";
      display: block;
      color: #d5897e;
      max-width: 100px;
      transition: transform 0.35s;
    }
    &[id="${(props) => props.activeItem}"]::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 6px;
      height: 100%;
      background: #d5897e;
      display: flex;
      margin-right: 3px;
    }
  }
`;
const Main = styled.div`
  margin: 120px auto 75px auto;
  flex: 3;
  ${({ theme }) => theme.media.mobile`
   width: 85%;`}
`;
