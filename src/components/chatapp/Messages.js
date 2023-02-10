import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import styled from "styled-components";
import { ChatAuth } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = ChatAuth();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);
  return (
    <Container>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </Container>
  );
};

export default Messages;

const Container = styled.div`
  background-color: #ddddf7;
  padding: 10px;
  height: calc(100% - 100px);
  overflow: scroll;
`;
