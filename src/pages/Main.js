import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import { RxDoubleArrowDown } from "react-icons/rx";
const Main = () => {
  const navigate = useNavigate();
  return (
    <>
      <Circle></Circle>
      <Container>
        <Nav>
          <div className="logo">
            <img src="paw.png" alt="" />
            <p>Paws on Partrol</p>
          </div>

          <div className="buttons">
            <button onClick={() => navigate("/home")}>首頁</button>
          </div>
        </Nav>

        <FirstCard>
          <div className="text">
            <h1>寵物保姆平台</h1>
            <p>輕鬆找到一個可信賴的寵物保姆，讓您的毛孩得到最好的照顧。</p>
            <button onClick={() => navigate("/home")}>立即尋找</button>
          </div>
          <div className="img">
            <img src="kamudog.png" alt="" />
          </div>
          <RxDoubleArrowDown className="down" />
        </FirstCard>
        <Card>
          <Flex>
            <Gif>
              <img src="home.gif" alt="" />
            </Gif>

            <Text>
              <h3>自動定位及篩選條件</h3>
              <p>篩選價格和距離，找到最適合您的服務。</p>
            </Text>
          </Flex>
        </Card>
        {/* <Card></Card> */}
      </Container>
      <Footer />
    </>
  );
};

export default Main;

const Container = styled.div`
  /* background-color: #ffefd5; */
  margin: auto;
`;

const Circle = styled.div`
  width: 1000px;
  height: 1000px;
  border-radius: 100%;
  position: absolute;
  background-color: #fcbc94;
  z-index: -1;
  top: -600px;
  left: -600px;
`;

const Nav = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 40px;
  color: #696969;
  /* font-weight: 300; */
  .logo {
    display: flex;

    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      background: none;
      color: #9a9a9a;
      border: none;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        border-bottom: 2px solid #696969;
        color: #696969;
      }
    }
  }
`;

const FirstCard = styled.div`
  width: 80%;
  margin: auto;
  position: relative;
  font-weight: 300;
  display: flex;
  justify-content: space-between;
  /* align-items: flex-end; */
  height: calc(100vh - 100px);
  ${({ theme }) => theme.media.laptop`
      flex-direction: column;
      align-items:center;
      `}
  .down {
    position: absolute;
    bottom: 5%;
    right: 50%;
    transform: translate(50%, 50%);
    font-size: 30px;
    width: 60px;
    color: lightgray;
  }

  .img {
    img {
      ${({ theme }) => theme.media.laptop`
      width:300px;
      `}
    }
  }

  .text {
    height: 250px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    h1 {
      font-size: 38px;
    }
    p {
      margin: 10px 0;
      font-size: 28px;
    }
    /* flex: 1; */
    button {
      border: none;
      width: 100px;
      height: 40px;
      font-size: 20px;
      border-radius: 20px;
      background-color: #fcbc94;
      color: #ffffff;
      cursor: pointer;
      &:hover {
        background-color: #ffffff;
        color: #fcbc94;
      }
    }
  }
`;
const Card = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh);
  background-color: #ffe3cd;
`;

const Flex = styled.div`
  display: flex;
  padding: 10px;
  height: 60%;
  justify-content: center;
  align-items: center;
  max-height: 500px;
  border-radius: 20px;
  background-color: aliceblue;

  ${({ theme }) => theme.media.tablet`
      flex-direction: column;
      `}
`;
const Gif = styled.div`
  img {
    width: 100%;
    margin: 0 auto; /* 設定水平置中 */
    display: block;
    border-radius: 20px;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: inherit;
  width: 50%;
  text-align: center;
  h3 {
    font-size: 30px;
  }
  p {
    margin-top: 0;
    font-size: 16px;
  }
`;
