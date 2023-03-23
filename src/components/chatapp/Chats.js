import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserAuth } from "../../context/AuthContext";
import { ChatAuth } from "../../context/ChatContext";
import { db } from "../../firebase.config";
const Chats = () => {
  const [chats, setChats] = useState({});
  const { user, searchUser } = UserAuth();
  const { dispatch } = ChatAuth();
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        console.log(doc.data());
        setChats(doc.data() || []);
      });
      return () => {
        unsub();
      };
    };
    user.uid && getChats();
  }, [user.uid]);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    console.log(u);
  };

  return (
    <Container>
      {chats
        ? Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <UserChat
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <img
                  src={
                    chat[1].userInfo.photoURL
                      ? chat[1].userInfo.photoURL
                      : "user.png"
                  }
                />
                <UserChatInfo>
                  <span>{chat[1].userInfo.name}</span>
                  <p>{chat[1].lastMessage?.text}</p>
                </UserChatInfo>
              </UserChat>
            ))
        : []}
    </Container>
  );
};

export default Chats;

const Container = styled.div`
  height: calc(100% - 50px);
  overflow: scroll;
`;
const UserChat = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f5ebe0;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const UserChatInfo = styled.div`
  span {
    font-size: 18px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    color: lightgray;
  }
`;
