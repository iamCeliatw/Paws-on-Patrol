import React from "react";
import { Button } from "../styles/Button.styled";
import Login from "../components/Login";
const MemberPage = () => {
  return (
    <div>
      <Login />
      {/* <Button onClick={signInWithGoogle}> signinwith google </Button> */}
      {/* <h1>{localStorage.getItem("name")}</h1>
      <h1>{localStorage.getItem("email")}</h1>
      <img src={localStorage.getItem("profilePic")} alt="" /> */}
    </div>
  );
};

export default MemberPage;
