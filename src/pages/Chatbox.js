import React from "react";
import Sidebar from "../components/chatapp/Sidebar";
import Chat from "../components/chatapp/Chat";
import styled from "styled-components";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { UserAuth } from "../context/AuthContext";
// import UserSelect from "../components/UserSelect";
// import Info from "../components/Info";
const Chatbox = () => {
  const { userselectOpen, setUserselectOpen, openInfo, setOpenInfo } =
    UserAuth();
  return (
    <>
      <Nav />
      <Home>
        <Container>
          <Sidebar />
          <Chat />
        </Container>
      </Home>
      <Footer />
    </>
  );
};
export default Chatbox;

const Home = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  margin-top: 45px;
  border: 1px solid white;
  border-radius: 10px;
  width: 65%;
  height: 75%;
  display: flex;
  overflow: hidden;
  ${({ theme }) => theme.media.tablet`
  width: 95%;
`};
`;
