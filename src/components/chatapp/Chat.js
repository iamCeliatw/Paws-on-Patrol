import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Messages from "./Messages";
import Input from "./Input";
import { ChatAuth } from "../../context/ChatContext";

const Chat = () => {
  const { data } = ChatAuth();
  const navigate = useNavigate();
  const navigateUserPage = () => {
    navigate(`/reserve/${data.user.uid}`);
  };
  return (
    <Container>
      <ChatInfo>
        <span onClick={() => navigateUserPage()}>{data.user.name}</span>
      </ChatInfo>
      <Messages />
      <Input />
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  flex: 2;
`;
const ChatInfo = styled.div`
  font-size: 20px;
  cursor: pointer;
  height: 50px;
  background-color: #f0dbdb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  span {
    &:hover {
      text-decoration: underline;
    }
  }
`;
