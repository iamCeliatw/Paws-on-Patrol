import React from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
const Success = () => {
  return (
    <>
      <Nav />
      <Container>
        <Margin>
          <b>付款成功，您可透過聊天室和保姆取得連繫！</b>
        </Margin>
      </Container>
      <Footer />
    </>
  );
};

export default Success;

const Container = styled.div`
  margin: auto;
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const Margin = styled.div`
  margin: 155px auto 100px auto;
  b {
    text-align: center;
  }
`;
