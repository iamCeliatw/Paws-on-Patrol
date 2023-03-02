import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
const Sidebar = () => {
  return (
    <Container>
      <Navbar />
      {/* <Search /> */}
      <Chats />
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  flex: 1;
  border-right: 1px solid #fff5ef;
  background-color: #dba39a;
`;
