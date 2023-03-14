import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Chats from "./Chats";
const Sidebar = () => {
  return (
    <Container>
      <Navbar />
      <Chats />
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  flex: 1;
  border-right: 1px solid #fff5ef;
  background-color: #dba39a;
  ${({ theme }) => theme.media.mobile`
  width: 30%;`}
`;
