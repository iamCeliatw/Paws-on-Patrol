import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";
import { StyledLogin, Container, SignButton } from "../styles/Login.styled";
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
  const [error, setError] = useState("");
  const { signin, setIsLogin } = UserAuth();
  const navigate = useNavigate();
  const loginHandler = async () => {
    setError("");
    if (!loginEmail || !loginPassword) {
      alert("請輸入完整資訊");
    }
    try {
      await signin(loginEmail, loginPassword);
      setOpenLogin(false);
      setIsLogin(true);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  //google signin
  //   const provider = new GoogleAuthProvider();
  //   const signInWithGoogle = () => {
  //     signInWithPopup(auth, provider)
  //       .then((result) => {
  //         const name = result.user.displayName;
  //         const email = result.user.email;
  //         const profilePic = result.user.photoURL;
  //         console.log(result);
  //         localStorage.setItem("name", name);
  //         localStorage.setItem("email", email);
  //         localStorage.setItem("profilePic", profilePic);
  //         navigate("/Home");
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };
  if (!openLogin) return null;
  return (
    <Container>
      <button className="close" onClick={onClose}>
        X
      </button>
      <StyledLogin>
        <h2 className="title">Welcome Back!</h2>
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
          type="text"
        />
        <SignButton onClick={loginHandler}>Login</SignButton>
        <p className="text">
          Don't have any account?
          <button className="changePop" onClick={onSwitch}>
            sign up
          </button>
        </p>
        {/* <p className="or-divider italic">OR</p> */}
        {/* <SignButton onClick={signInWithGoogle}> */}
        {/* <FcGoogle style={style} /> Login With Google */}
        {/* </SignButton> */}
      </StyledLogin>
    </Container>
  );
};

export default Login;
