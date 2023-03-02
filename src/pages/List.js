import React, { useState } from "react";
import Nav from "../components/Nav";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import InviteList from "../components/List/InviteList";
import NannyList from "../components/List/NannyList";

const List = () => {
  const { userselectOpen, openInfo } = UserAuth();
  const items = ["邀請列表", "客戶列表"];
  const [activeItem, setActiveItem] = useState(0);
  const [openInform, setOpenInform] = useState(false);
  return (
    <>
      <OverLay openInform={openInform} />

      <InformBox openInform={openInform}>
        <b>已接受邀請，請至歷史訂單查詢客戶付款狀態</b>
        <button className="btn" onClick={() => setOpenInform(false)}>
          確認
        </button>
      </InformBox>
      <Nav />
      <Container>
        <MarginBox>
          <TopBar activeItem={activeItem}>
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
          </TopBar>
        </MarginBox>
        <Main>
          {activeItem === 0 && <InviteList />}
          {activeItem === 1 && (
            <NannyList openInform={openInform} setOpenInform={setOpenInform} />
          )}
        </Main>
      </Container>
    </>
  );
};

export default List;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: auto;
`;

const MarginBox = styled.div`
  margin-top: 120px;
`;
const TopBar = styled.div`
  width: auto;
  /* margin: 120px auto; */
  flex: 1;
  height: fit-content;
  &:hover {
    cursor: pointer;
  }
  ul {
    display: flex;
    justify-content: space-evenly;
    .listItem {
      padding: 10px 5px;
      list-style: none;
      position: relative;
      ${({ theme }) => theme.media.mobile`
      font-size: 14px;
  `}
      &:hover {
        color: #d5897e;
      }
      &[id="${(props) => props.activeItem}"]::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: #d5897e;
        display: flex;
        color: #d5897e;
      }
    }
  }
`;
const Main = styled.div`
  /* margin: 120px auto; */
  /* flex: 3; */
  margin: 20px;
  height: fit-content;
`;
const OverLay = styled.div`
  backdrop-filter: blur(0.5px);
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: ${(props) => (props.openInform ? "block" : "none")}; ;
`;
const InformBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 300px;
  height: 100px;
  background-color: #ffffff;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  z-index: 2;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 45%;
  left: 50%;
  display: ${(props) => (props.openInform ? "flex" : "none")};

  .btn {
    margin: 5px auto;
    vertical-align: middle;
    cursor: pointer;
    width: 55px;
    height: 25px;
    border: none;
    border-radius: 20px;
    /* box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08); */
    background-color: #aaa;
    color: white;
    &:hover {
      opacity: 0.6;
    }
  }

  b {
    margin-bottom: 5px;
    text-align: center;
  }
`;
