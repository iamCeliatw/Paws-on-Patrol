import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { UserAuth } from "../../context/AuthContext";
import { ChatAuth } from "../../context/ChatContext";

const Message = ({ message }) => {
  const { user } = UserAuth();
  const { data } = ChatAuth();
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <Container
      ref={ref}
      className={`message ${message.senderId === user.uid && "owner"}`}
    >
      <MessageInfo>
        <img
          src={
            message.senderId === user.uid && user.photoURL
              ? user.photoURL || "user.png"
              : data.user.photoURL || "user.png"
          }
          alt=""
        />
      </MessageInfo>
      <MessageContent className="messageContent">
        <p>{message.text}</p>
      </MessageContent>
    </Container>
  );
};

export default Message;

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  &.owner {
    flex-direction: row-reverse;
    .messageContent {
      align-items: flex-end;
    }
    p {
      background-color: #f0ceaa;
      color: white;
      border-radius: 10px 0 10px 10px;
    }
  }
`;
const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  font-weight: 300;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const MessageContent = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    background-color: white;
    padding: 10px 20px;
    border-radius: 0px 10px 10px 10px;
  }
  img {
    width: 50%;
  }
`;
