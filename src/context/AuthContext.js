import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { auth } from "../firebase.config";
import { db } from "../firebase.config";
import { v4 as uuid } from "uuid";

const UserContext = createContext();
export const UserAuth = () => {
  return useContext(UserContext);
};

export const AuthContextProvider = ({ children }) => {
  const [bellMessage, setBellMessage] = useState(false);
  //user選單視窗
  const [userselectOpen, setUserselectOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [marker, setMarker] = useState({});
  const [user, setUser] = useState({});
  // 在首頁被點擊的使用者
  const [searchUser, setSearchUser] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //info window
  const [openInfo, setOpenInfo] = useState(false);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //   const handleSelect = async () => {

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
  //       if (!chatsRef.exists()) {
  //         //create user chats
  //         await setDoc(doc(db, "userChats", user.uid), {
  //           [combineId]: {
  //             userInfo: {
  //               uid: searchUser.uid,
  //               name: searchUser.name,
  //               photoURL: searchUser.profileURL || "",
  //             },
  //             date: serverTimestamp(),
  //           },
  //         });
  //       }

  //       if (!searchUserRef.exists()) {
  //         await setDoc(doc(db, "userChats", searchUser.uid), {
  //           [combineId]: {
  //             userInfo: {
  //               uid: user.uid,
  //               name: user.displayName,
  //               photoURL: user.photoURL || "",
  //             },
  //             date: serverTimestamp(),
  //           },
  //         });
  //       }
  //       //create user chats
  //       await updateDoc(doc(db, "userChats", user.uid), {
  //         [combineId + ".userInfo"]: {
  //           uid: searchUser.uid,
  //           name: searchUser.name,
  //           photoURL: searchUser.profileURL || "",
  //         },
  //         [combineId + ".date"]: serverTimestamp(),
  //       });
  //       console.log(2);
  //       await updateDoc(doc(db, "userChats", searchUser.uid), {
  //         [combineId + ".userInfo"]: {
  //           uid: user.uid,
  //           name: user.displayName,
  //           photoURL: user.photoURL || "",
  //         },
  //         [combineId + ".date"]: serverTimestamp(),
  //       });

  //       console.log(3);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //     setSearchUser(null);
  //     setSearchName("");
  //   };

  const handleSelect = async () => {
    const combineId =
      user.uid > searchUser.uid
        ? user.uid + searchUser.uid
        : searchUser.uid + user.uid;

    try {
      const chatsRef = await getDoc(doc(db, "chats", combineId));
      const userChatsRef = await getDoc(doc(db, "userChats", user.uid));
      const searchUserChatsRef = await getDoc(
        doc(db, "userChats", searchUser.uid)
      );

      if (!chatsRef.exists()) {
        // Create a chat in the chats collection
        await setDoc(doc(db, "chats", combineId), { messages: [] });
      }

      const userChatData = {
        [combineId]: {
          userInfo: {
            uid: searchUser.uid,
            name: searchUser.name,
            photoURL: searchUser.profileURL || "",
          },
          date: serverTimestamp(),
        },
      };
      const searchUserChatData = {
        [combineId]: {
          userInfo: {
            uid: user.uid,
            name: user.displayName,
            photoURL: user.photoURL || "",
          },
          date: serverTimestamp(),
        },
      };

      if (!userChatsRef.exists()) {
        // Create user chats
        await setDoc(doc(db, "userChats", user.uid), userChatData);
      } else {
        // Update user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: userChatData[combineId].userInfo,
          [combineId + ".date"]: serverTimestamp(),
        });
      }

      if (!searchUserChatsRef.exists()) {
        // Create search user chats
        await setDoc(doc(db, "userChats", searchUser.uid), searchUserChatData);
      } else {
        // Update search user chats
        await updateDoc(doc(db, "userChats", searchUser.uid), {
          [combineId + ".userInfo"]: searchUserChatData[combineId].userInfo,
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err.message);
    }

    setSearchUser(null);
    setSearchName("");
  };

  // send input
  const handleSend = async (data) => {
    if (!text) return;

    if (data.chatId === "null") {
      alert("請選擇聊天對象");
      return;
    }
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: user.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
  };

  const value = {
    errorMessage,
    setErrorMessage,
    bellMessage,
    setBellMessage,
    openInfo,
    setOpenInfo,
    handleSend,
    text,
    setText,
    createUser,
    user,
    signin,
    logout,
    isLogin,
    setIsLogin,
    // currentUserId,
    // setCurrentUserId,
    marker,
    setMarker,
    searchUser,
    setSearchUser,
    handleSelect,
    // searchName,
    // setSearchName,
    userselectOpen,
    setUserselectOpen,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
