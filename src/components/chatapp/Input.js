import React, { useState } from "react";
import styled from "styled-components";
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { MdAttachFile, MdOutlineAddPhotoAlternate } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { db } from "../../firebase.config";
import { ChatAuth } from "../../context/ChatContext";
import { UserAuth } from "../../context/AuthContext";

const Input = () => {
  const { data } = ChatAuth();
  const { user, text, setText, handleSend } = UserAuth();
  return (
    <Container>
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="請輸入訊息..."
        value={text}
        onKeyPress={(e) => (e.key === "Enter" ? handleSend(data) : null)}
      />
      <Send>
        <button onClick={() => handleSend(data)}>送出</button>
      </Send>
    </Container>
  );
};

export default Input;

const Container = styled.div`
  height: 50px;
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    width: 100%;
    border: none;
    outline: none;
    color: #2f2d52;
    font-size: 18px;

    &::placeholder {
      color: lightgray;
    }
  }
`;
const Send = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .icon {
    cursor: pointer;
  }
  label {
    display: flex;
  }
  button {
    border: none;
    padding: 10px 15px;
    color: white;
    background-color: #f0dbdb;
    cursor: pointer;
    width: 60px;
    &:hover {
      color: #ffffff;
      background-color: #dba39a;
    }
  }
`;
