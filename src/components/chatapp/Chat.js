import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SiContactlesspayment } from "react-icons/si";
import Messages from "./Messages";
import Input from "./Input";
import { ChatAuth } from "../../context/ChatContext";
import { loadStripe } from "@stripe/stripe-js";
import { functions, createStripeCheckout } from "../../firebase.config";

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
