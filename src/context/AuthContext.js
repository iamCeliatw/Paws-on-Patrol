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
} from "firebase/firestore";
import { auth } from "../firebase.config";
import { db } from "../firebase.config";
const UserContext = createContext();
export const UserAuth = () => {
  return useContext(UserContext);
};

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [marker, setMarker] = useState({});
  const [user, setUser] = useState({});
  const [searchUser, setSearchUser] = useState(null);
  const [searchName, setSearchName] = useState("");

  const [currentUserId, setCurrentUserId] = useState("");
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

  const handleSelect = async () => {
    if (user.uid === searchUser.uid) {
      alert("這是你自己");
    }
    //check whether the group (chats in firestore ) exists, if not create
    const combineId =
      user.uid > searchUser.uid
        ? user.uid + searchUser.uid
        : searchUser.uid + user.uid;
    console.log(combineId);
    try {
      const res = await getDoc(doc(db, "chats", combineId));
      const chatsRef = await getDoc(doc(db, "userChats", user.uid));
      const searchUserRef = await getDoc(doc(db, "userChats", searchUser.uid));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combineId), { messages: [] });
        console.log(1);
      }
      if (!chatsRef.exists()) {
        //create user chats
        await setDoc(doc(db, "userChats", user.uid), {
          [combineId]: {
            userInfo: {
              uid: searchUser.uid,
              name: searchUser.name,
              photoURL: searchUser.profileURL || "",
            },
            date: serverTimestamp(),
          },
        });
        if (!searchUserRef.exists()) {
          await setDoc(doc(db, "userChats", searchUser.uid), {
            [combineId]: {
              userInfo: {
                uid: user.uid,
                name: user.displayName,
                photoURL: user.photoURL || "",
              },
              date: serverTimestamp(),
            },
          });
        }
      } else {
        //create user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: searchUser.uid,
            name: searchUser.name,
            photoURL: searchUser.profileURL || "",
          },
          [combineId + ".date"]: serverTimestamp(),
        });
        console.log(2);
        await updateDoc(doc(db, "userChats", searchUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            name: user.displayName,
            photoURL: user.photoURL || "",
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
      console.log(3);
      // dispatch({ type: "CHANGE_USER", payload: u });
      //   console.log(u);
    } catch (err) {
      console.log(err.message);
    }
    setSearchUser(null);
    setSearchName("");
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        signin,
        logout,
        isLogin,
        setIsLogin,
        currentUserId,
        setCurrentUserId,
        marker,
        setMarker,
        searchUser,
        setSearchUser,
        handleSelect,
        searchName,
        setSearchName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
