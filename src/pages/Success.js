import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { db } from "../firebase.config";
import { ChatAuth } from "../context/ChatContext";
import { doc, getDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const Success = () => {
  const navigate = useNavigate();
  const { user, handleSelect, searchUser, setSearchUser } = UserAuth();
  const { dispatch } = ChatAuth();

  useEffect(() => {
    const getData = async () => {
      if (user && user.uid) {
        const docRef = doc(db, "invitation", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSearchUser(docSnap.data().toUser);
          // do something
        }
      }
    };
    getData();
  }, [user]);

  const handleChat = async () => {
    console.log(searchUser.uid, user.uid);
    await handleSelect();
    dispatch({
      type: "CHANGE_USER",
      payload: {
        name: searchUser.name,
        photoURL: searchUser.profileURL,
        uid: searchUser.uid,
      },
    });
    navigate("/chatbox");
  };

  return (
    <>
      <Nav />
      <Container>
        <Margin>
          <b>付款成功，您可透過聊天室和保姆取得連繫！</b>
        </Margin>
        <Flex>
          <button onClick={handleChat}>
            和 {searchUser && searchUser.name}聊天
          </button>
          <button onClick={() => navigate("/home")}>回到首頁</button>
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default Success;

const Container = styled.div`
  min-height: 100vh;
  margin: auto;
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const Margin = styled.div`
  margin: 155px auto 50px auto;
  b {
    text-align: center;
  }
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  margin: 5px auto;
  button {
    padding: 5px;
    margin-right: 15px;
    height: 35px;
    border-radius: 5px;
    border: none;
    background-color: #6a6a6a;
    color: #ffffff;
    font-size: 10px;
    cursor: pointer;
    &:hover {
      border: #6a6a6a 1px solid;
      background-color: #f5f5f5;
      color: #6a6a6a;
    }
  }
`;
