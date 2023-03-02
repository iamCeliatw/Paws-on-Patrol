import {
  collection,
  getDocs,
  getDoc,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { UserAuth } from "../../context/AuthContext";
import { ChatAuth } from "../../context/ChatContext";
import { db } from "../../firebase.config";

const Search = () => {
  const [err, setErr] = useState(false);
  const {
    user,
    searchUser,
    setSearchUser,
    handleSelect,
    searchName,
    setSearchName,
  } = UserAuth();
  const { dispatch } = ChatAuth();

  const handleSearch = async () => {
    const q = query(collection(db, "user"), where("name", "==", searchName));
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        setSearchUser(null);
        setErr(true);
        return;
      }
      setErr(false);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        setSearchUser(doc.data());
      });
    } catch (e) {
      setErr(true);
      console.log(e.message);
    }
  };

  //按下enter
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  //   const handleSelect = async (u) => {
  //     //check whether the group (chats in firestore ) exists, if not create
  //     const combineId =
  //       user.uid > searchUser.uid
  //         ? user.uid + searchUser.uid
  //         : searchUser.uid + user.uid;
  //     console.log(combineId);
  //     try {
  //       const res = await getDoc(doc(db, "chats", combineId));
  //       const chatsRef = await getDoc(doc(db, "userChats", user.uid));
  //       const searchUserRef = await getDoc(doc(db, "userChats", searchUser.uid));
  //       if (!res.exists()) {
  //         //create a chat in chats collection
  //         await setDoc(doc(db, "chats", combineId), { messages: [] });
  //         console.log(1);
  //       }
  //       if (!chatsRef.exists() || searchUserRef.exists()) {
  //         //create user chats
  //         await setDoc(doc(db, "userChats", user.uid), {
  //           [combineId]: {
  //             userInfo: {
  //               uid: searchUser.uid,
  //               name: searchUser.name,
  //               photoURL: searchUser.profileURL,
  //             },
  //             date: serverTimestamp(),
  //           },
  //         });

  //         await setDoc(doc(db, "userChats", searchUser.uid), {
  //           [combineId]: {
  //             userInfo: {
  //               uid: user.uid,
  //               name: user.displayName,
  //               photoURL: user.photoURL,
  //             },
  //             date: serverTimestamp(),
  //           },
  //         });
  //       } else {
  //         //create user chats
  //         await updateDoc(doc(db, "userChats", user.uid), {
  //           [combineId + ".userInfo"]: {
  //             uid: searchUser.uid,
  //             name: searchUser.name,
  //             photoURL: searchUser.profileURL,
  //           },
  //           [combineId + ".date"]: serverTimestamp(),
  //         });
  //         console.log(2);
  //         await updateDoc(doc(db, "userChats", searchUser.uid), {
  //           [combineId + ".userInfo"]: {
  //             uid: user.uid,
  //             name: user.displayName,
  //             photoURL: user.photoURL,
  //           },
  //           [combineId + ".date"]: serverTimestamp(),
  //         });
  //       }
  //       console.log(3);
  //       dispatch({ type: "CHANGE_USER", payload: u });
  //       console.log(u);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //     setSearchUser(null);
  //     setSearchName("");
  //   };

  return (
    <Container>
      <SearchForm>
        <input
          type="text"
          onKeyDown={handleKey}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="find a user"
          value={searchName}
        />
      </SearchForm>
      {err && <span>user not found!</span>}
      {searchUser && (
        <UserChat onClick={handleSelect}>
          <img src={searchUser.profileURL} alt="" />
          <UserChatInfo>
            <span>{searchUser.name}</span>
          </UserChatInfo>
        </UserChat>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  border-bottom: 1px solid gray;
`;
const SearchForm = styled.div`
  padding: 10px;
  input {
    background-color: transparent;
    border: none;
    color: white;
    outline: none;

    &::placeholder {
      color: lightgray;
    }
  }
`;
export const UserChat = styled.div`
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
export const UserChatInfo = styled.div`
  span {
    font-size: 18px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    color: lightgray;
  }
`;
