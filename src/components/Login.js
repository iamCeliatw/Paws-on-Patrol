import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";
import {
  StyledLogin,
  Container,
  SignButton,
  ErrorMessage,
} from "../styles/Login.styled";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase.config";
const Login = ({
  onSwitch,
  closeModal,
  setOpenSignup,
  setOpenLogin,
  openLogin,
  setCloseModal,
  onClose,
}) => {
  const style = { fontSize: "1.2em", verticalAlign: "sub" };
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const { signin, setIsLogin, errorMessage, setErrorMessage } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (showMessage) {
      const timeout = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showMessage]);

  const loginHandler = async () => {
    if (!loginEmail || !loginPassword) {
      setShowMessage(true);
      setErrorMessage("請輸入完整資訊");
      return;
    }
    try {
      await signin(loginEmail, loginPassword);
      setOpenLogin(false);
      setIsLogin(true);
      navigate("/account");
    } catch (e) {
      setShowMessage(true);
      let errorCode = e.code.split("auth/")[1];
      switch (errorCode) {
        case "user-not-found":
          setErrorMessage("查無此帳號");
          break;
        case "wrong-password":
          setErrorMessage("密碼錯誤");
          break;
        case "invalid-email":
          setErrorMessage("請輸入正確的email");
          break;
        default:
          setErrorMessage("登入失敗");
          break;
      }
    }
  };

  if (!openLogin) return null;
  return (
    <>
      <Container>
        <button className="close" onClick={onClose}>
          X
        </button>
        <StyledLogin>
          <div className="title">
            <h2>Welcome Back!</h2>
          </div>
          <div className="form">
            <p>Email</p>
            <input
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
              type="text"
            />
            <p>Password</p>
            <input
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
              type="password"
            />
          </div>
          <SignButton onClick={loginHandler}>Login</SignButton>
          <p className="question-text">
            Don't have any account?
            <button className="changePop" onClick={onSwitch}>
              sign up
            </button>
          </p>
          {showMessage && errorMessage && (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          )}
        </StyledLogin>
      </Container>
    </>
  );
};

export default Login;
