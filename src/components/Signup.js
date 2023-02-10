import { async } from "@firebase/util";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { SignButton } from "../styles/Button.styled";
import { StyledLogin, Container, Landing } from "../styles/Login.styled";
import { FcGoogle } from "react-icons/fc";
import { db } from "../firebase.config";
import { collection, addDoc, setDoc, doc } from "@firebase/firestore";
import { updateCurrentUser, updateProfile } from "firebase/auth";

const Signup = ({ onSwitch, onClose, openSignup, setOpenSignup }) => {
  const style = { fontSize: "1.2em", verticalAlign: "sub" };
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [error, setError] = useState(false);
  const { user, createUser, setIsLogin, currentUserId, setCurrentUserId } =
    UserAuth();
  const navigate = useNavigate();
  const registerHandler = async () => {
    try {
      const createdUser = await createUser(signUpEmail, signUpPassword);

      setOpenSignup(false);
      setIsLogin(true);
      if (createdUser) {
        // console.log("c", createdUser);
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
      setError(true);
      alert(e.message);
    }
  };

  //   if (userId) {
  //     await setDoc(doc(db, "user", userId), {
  //       detail: {
  //         name: nameValue,
  //         price: null,
  //         place: null,
  //       },
  //     });

  //   useEffect(() => {
  //     if (user !== null) {
  //       // User is signed in.
  //       const userId = user.id;
  //       addDoc(collection(db, "users", userId), {
  //         name: signUpName,
  //         email: signUpEmail,
  //         password: signUpPassword,
  //       });
  //     } else {
  //       // No user is signed in.
  //       console.log("No user is signed in.");
  //     }
  //   }, [user]);

  if (!openSignup) return null;
  return (
    <Container>
      <button className="close" onClick={onClose}>
        X
      </button>
      <StyledLogin>
        <h2 className="title">Nice to meet you !</h2>
        <p>Name</p>
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
        <p>Password</p>
        <input
          onChange={(e) => setSignUpPassword(e.target.value)}
          type="text"
        />
        <SignButton onClick={registerHandler}>Sign up</SignButton>
        <p className="text">
          Already have account?
          <button className="changePop" onClick={onSwitch}>
            sign in
          </button>
        </p>
      </StyledLogin>
      {error && <span>Something went wrong!</span>}
    </Container>
  );
};

export default Signup;
