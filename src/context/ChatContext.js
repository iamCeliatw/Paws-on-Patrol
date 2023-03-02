import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
// import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { UserAuth } from "./AuthContext";

const ChatContext = createContext();
export const ChatAuth = () => {
  return useContext(ChatContext);
};

export const ChatContextProvider = ({ children }) => {
  const { user } = UserAuth();
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            user.uid > action.payload.uid
              ? user.uid + action.payload.uid
              : action.payload.uid + user.uid,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
