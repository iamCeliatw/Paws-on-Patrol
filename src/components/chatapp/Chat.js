import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SiContactlesspayment } from "react-icons/si";
import Messages from "./Messages";
import Input from "./Input";
import { ChatAuth } from "../../context/ChatContext";
import { loadStripe } from "@stripe/stripe-js";
import { functions, createStripeCheckout } from "../../firebase.config";
import Stripe from "stripe";

const Chat = () => {
  const { data } = ChatAuth();
  const a = async () => {
    const stripe = await loadStripe(
      "pk_test_51MZSBHAx03PMdijSJDe1PlZn8fiWwVlA1xee0ipHioQXQTRSZvEah09XZR80PxSrExr7ykyVMwhWWpFzYu1mAoYC00VlECtoVk"
    );
    createStripeCheckout().then((response) => {
      const sessionId = response.data.id;
      stripe.redirectToCheckout({ sessionId: sessionId });
    });
  };
  return (
    <Container>
      <ChatInfo>
        <span>{data.user.name}</span>
        <ChatIcons>
          <SiContactlesspayment
            onClick={a}
            color="white"
            size={40}
            style={{ cursor: "pointer", verticalAlign: "middle" }}
          />
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
  background-color: #5d5b8d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
const ChatIcons = styled.div``;
