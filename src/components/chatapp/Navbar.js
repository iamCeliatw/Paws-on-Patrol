import React from "react";
import styled from "styled-components";
import { UserAuth } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = UserAuth();
  return (
    <Container>
      <span className="logo">Chat Room</span>
      <div className="user">
        <img src={user.photoURL || "user.png"} alt="" />
        <span>{user.displayName}</span>
      </div>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #d5897e;
  height: 50px;
  padding: 10px;
  justify-content: space-between;

  .logo {
    font-weight: bold;
    ${({ theme }) => theme.media.tablet`
   display:none;
  `}
  }
  .user {
    display: flex;
    gap: 10px;
    img {
      background-color: #ddddf7;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      object-fit: cover;
    }
    span {
      line-height: 24px;
      font-size: 20px;
    }
  }
`;
