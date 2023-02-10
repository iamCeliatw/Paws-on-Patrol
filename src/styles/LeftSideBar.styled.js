import styled from "styled-components";

export const StyledLeftSideBar = styled.div`
  /* text-align: center;
  padding-top: 30px;
  font-size: 18px;
  width: 400px;
  height: calc(100vh);
  background-color: #fff;
  input {
    vertical-align: middle;
  }
  .buttons {
    align-items: center;
    justify-content: center;
    display: flex;
    button {
      font-size: 16px;
      color: #808080;
      background-color: #ebebeb;
      &:hover {
        color: #fff;
        background-color: #696fff;
      }
    }
  }
  .text {
    margin-bottom: 10px;
  } */
  border-radius: 10px;
  z-index: 1;
  position: absolute;
  top: 20%;
  left: 5%;
  background-color: ${({ theme }) => theme.colors.background};
  height: 410px;
  width: 350px;
`;

export const Flex = styled.div`
  padding: 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  p {
    color: #5b5b5b;
    font-size: 30px;
    margin-bottom: 20px;
  }
  div {
    flex: 1;
  }
  .range {
    cursor: pointer;
    width: 250px;
    height: 15px;
    -webkit-appearance: none;
    background: #ffffff;
    outline: none;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 1);
  }
  .range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gray};
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: -407px 0 0 400px ${({ theme }) => theme.colors.gray};
    /* box-shadow: 0px 4px 4px #000; */
  }
  button {
    width: 70px;
    height: 40px;
    font-size: 22px;
    text-align: center;
    border-radius: 5px;
    background-color: #ffffff;
    border: ${({ theme }) => theme.colors.gray} solid 1px;
    margin-right: 30px;
    &:hover {
      cursor: pointer;
      color: #ffffff;
      background-color: ${({ theme }) => theme.colors.gray};
    }
  }
`;
