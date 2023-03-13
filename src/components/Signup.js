import { async } from "@firebase/util";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  StyledLogin,
  Container,
  SignButton,
  ErrorMessage,
} from "../styles/Login.styled";
import { FcGoogle } from "react-icons/fc";
import { db } from "../firebase.config";
import { collection, addDoc, setDoc, doc } from "@firebase/firestore";
import { updateCurrentUser, updateProfile } from "firebase/auth";

const Signup = ({ onSwitch, onClose, openSignup, setOpenSignup }) => {
  const style = { fontSize: "1.2em", verticalAlign: "sub" };
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [signUpPassword, setSignUpPassword] = useState("");
  const {
    user,
    createUser,
    setIsLogin,
    currentUserId,
    setCurrentUserId,
    errorMessage,
    setErrorMessage,
  } = UserAuth();
  const navigate = useNavigate();
  const registerHandler = async () => {
    if (!signUpName || !signUpEmail || !signUpPassword) {
      setShowMessage(true);
      setErrorMessage("請輸入完整資訊");
      return;
    }
    try {
      const createdUser = await createUser(signUpEmail, signUpPassword);
      setOpenSignup(false);
      setIsLogin(true);
      if (createdUser) {
        updateProfile(createdUser.user, { displayName: signUpName });
        const userId = createdUser.user.uid;
        setDoc(doc(db, "user", userId), {
          name: signUpName,
          price: null,
          place: null,
        });
      }
      navigate("/account");
    } catch (e) {
      setShowMessage(true);
      let errorCode = e.code.split("auth/")[1];
      switch (errorCode) {
        case "email-already-in-use":
          setErrorMessage("此信箱已被使用");
          break;
        case "invalid-email":
          setErrorMessage("請輸入正確的email");
          break;
        case "weak-password":
          setErrorMessage("密碼需大於6個字元");
          break;
        default:
          setErrorMessage("註冊失敗");
          break;
      }
    }
  };
  useEffect(() => {
    if (showMessage) {
      const timeout = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showMessage]);

  if (!openSignup) return null;
  return (
    <Container>
      <button className="close" onClick={onClose}>
        X
      </button>
      <StyledLogin>
        <div className="title">
          <h2>您好，歡迎使用</h2>
        </div>

        <div className="form">
          <p>姓名</p>
          <input
            onChange={(e) => {
              setSignUpName(e.target.value);
            }}
            type="text"
          />
          <p>Email</p>
          <input
            onChange={(e) => {
              setSignUpEmail(e.target.value);
            }}
            type="text"
          />
          <p>密碼</p>
          <input
            onChange={(e) => setSignUpPassword(e.target.value)}
            type="password"
          />
        </div>
        <SignButton onClick={registerHandler}>註冊</SignButton>
        <p className="question-text">
          已經擁有帳號？
          <button className="changePop" onClick={onSwitch}>
            點我登入
          </button>
        </p>
        {showMessage && errorMessage && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </StyledLogin>
    </Container>
  );
};

export default Signup;
