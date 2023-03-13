import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  StyledLogin,
  Container,
  SignButton,
  ErrorMessage,
} from "../styles/Login.styled";
const Login = ({ onSwitch, setOpenLogin, openLogin, onClose }) => {
  const style = { fontSize: "1.2em", verticalAlign: "sub" };
  const [loginEmail, setLoginEmail] = useState("test@test.com");
  const [loginPassword, setLoginPassword] = useState("test123");
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
            <h2>歡迎回來！</h2>
          </div>
          <div className="form">
            <p>Email</p>
            <input
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
              type="text"
              value={loginEmail}
            />
            <p>密碼</p>
            <input
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
              type="password"
              value={loginPassword}
            />
          </div>
          <SignButton onClick={loginHandler}>登入</SignButton>
          <p className="question-text">
            還沒有帳號嗎？
            <button className="changePop" onClick={onSwitch}>
              點我註冊
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
