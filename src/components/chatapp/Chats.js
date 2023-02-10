import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserAuth } from "../../context/AuthContext";
import { ChatAuth } from "../../context/ChatContext";
import { UserChat, UserChatInfo } from "./Search";
import { db } from "../../firebase.config";
const Chats = () => {
  const [chats, setChats] = useState([]);
  const { user } = UserAuth();
  const { dispatch } = ChatAuth();
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        // console.log("current Data:", doc.data());
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    user.uid && getChats();
  }, [user.uid]);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
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
                {/* <img
                  src={
                    chat[1].userInfo.photoURL ? chat[1].userInfo.photoURL : ""
                  }
                  alt=""
                /> */}
                <UserChatInfo>
                  <span>{chat[1].userInfo.name}</span>
                  <p>{chat[1].lastMessage?.text}</p>
                </UserChatInfo>
              </UserChat>
            ))
        : ""}
    </Container>
  );
};

export default Chats;

const Container = styled.div``;
