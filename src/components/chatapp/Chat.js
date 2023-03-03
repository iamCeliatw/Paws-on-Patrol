import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SiContactlesspayment } from "react-icons/si";
import Messages from "./Messages";
import Input from "./Input";
import { ChatAuth } from "../../context/ChatContext";
import { loadStripe } from "@stripe/stripe-js";
import { functions, createStripeCheckout } from "../../firebase.config";

const Chat = () => {
  const { data } = ChatAuth();

  return (
    <Container>
      <ChatInfo>
        <span>{data.user.name}</span>
        <ChatIcons>
          {/* <SiContactlesspayment
            
            color="white"
            size={40}
            style={{ cursor: "pointer", verticalAlign: "middle" }}
          /> */}
        </ChatIcons>
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
  height: 50px;
  background-color: #f0dbdb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
const ChatIcons = styled.div``;
