import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import { RxDoubleArrowDown } from "react-icons/rx";
const Main = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Circle></Circle>
        <Nav>
          <div className="logo">
            <img src="paw.png" alt="" />
            <p>Paws on Partrol</p>
          </div>

          <div className="buttons">
            <button onClick={() => navigate("/home")}>快速開始</button>
            <button onClick={() => navigate("/home")}>加入我們</button>
          </div>
        </Nav>

        <FirstCard>
          <div className="text">
            <h1>寵物保姆平台</h1>
            <p>輕鬆找到一個可信賴的寵物保姆，讓您的毛孩得到最好的照顧。</p>
            <button onClick={() => navigate("/home")}>立即尋找</button>
          </div>
          <div className="img">
            <img className="kamudog" src="kamudog.png" alt="" />
            <img className="happydog" src="happydog.png" alt="" />
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
        <Card>
          <Flex reverse>
            <Gif>
              <img src="gif3.gif" alt="" />
            </Gif>
            <Text>
              <h3>線上一對一聊天</h3>
              <p>即時聊天諮詢，與對方溝通零距離</p>
            </Text>
          </Flex>
        </Card>
        <Card>
          <Flex>
            <Gif>
              <img src="gif2.gif" alt="" />
            </Gif>
            <Text>
              <h3>線上支付服務</h3>
              <p>提供線上付款，讓您能更便利地享受服務</p>
            </Text>
          </Flex>
        </Card>
        {/* <Card></Card> */}
      </Container>
      <Margin></Margin>
      <Footer />
    </>
  );
};

export default Main;

const Container = styled.div`
  /* background-color: #ffefd5; */
  margin: auto;
  overflow: hidden;
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
  ${({ theme }) => theme.media.mobile`   
    width: 930px;
    height: 970px;
  `}
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
  ${({ theme }) => theme.media.tablet`
  width: 100%;`}
  .logo {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      ${({ theme }) => theme.media.mobile`
    width:30px;
    height:30px;    


  `}
    }
    p {
      font-size: 40px;
      ${({ theme }) => theme.media.tablet`
  font-size:26px;
  line-height:0;
  `}
      ${({ theme }) => theme.media.mobile`
  font-size:23px;
  line-height:0;

  `}
    }
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      margin-right: 20px;
      background: none;
      color: #9a9a9a;
      border: none;
      font-size: 20px;
      cursor: pointer;
      ${({ theme }) => theme.media.tablet`
  font-size:16px;
  `}
      ${({ theme }) => theme.media.mobile`
  font-size:12px;
  margin-right: 10px;

  `}
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
    overflow: hidden;
    .kamudog {
      /* width: 300px; */
      display: block;
      ${({ theme }) => theme.media.laptop`
      width:300px;
      display:none;
      `}
    }
    .happydog {
      display: none;
      ${({ theme }) => theme.media.laptop`
        display:block;
        width:370px;
        `}
    }
  }

  .text {
    text-align: center;
    height: 250px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    ${({ theme }) => theme.media.laptop`
    height: 300px;
    margin: 50px;
    text-align: center;`}
    h1 {
      font-size: 38px;
      ${({ theme }) => theme.media.mobile`
 font-size: 28px;`}
    }
    p {
      margin: 10px 0;
      font-size: 28px;
      ${({ theme }) => theme.media.mobile`

    font-size: 18px;`}
    }
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
  height: calc(90vh);
  background-color: #ffeee0;
`;

const Flex = styled.div`
  margin-bottom: 25%;
  width: 90%;
  margin: auto;
  display: flex;
  padding: 10px;
  height: 80%;
  justify-content: center;
  align-items: center;
  max-height: 500px;
  border-radius: 20px;
  background-color: #f9eee3;
  box-shadow: 1px 0px 2px rgba(177, 177, 199, 0.4);
  filter: drop-shadow(1px 0px 2px rgba(15, 15, 51, 0.4));
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  ${({ theme }) => theme.media.tablet`
      flex-direction: column;
  justify-content: space-evenly;

      `}
`;
const Gif = styled.div`
  img {
    width: 90%;
    margin: 0 auto; /* 設定水平置中 */
    display: block;
    border-radius: 20px;
  }
`;

const Text = styled.div`
  margin: 0 auto; /* 設定水平置中 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* width: 50%; */
  text-align: center;
  h3 {
    margin-bottom: 20px;
    font-size: 30px;
    ${({ theme }) => theme.media.tablet`
     font-size: 25px;
      `}
  }
  p {
    margin-top: 0;
    font-size: 20px;
    ${({ theme }) => theme.media.tablet`
          font-size: 15px;

      `}
  }
`;
const Margin = styled.div`
  margin: 20px 0;
`;
