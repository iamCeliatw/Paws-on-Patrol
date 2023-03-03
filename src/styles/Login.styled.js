import styled from "styled-components";

export const Container = styled.div`
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 350px;
  position: absolute;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  z-index: 3;
  .close {
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    border: none;
    background: none;
    right: 5%;
    top: 5%;
  }
`;

export const StyledLogin = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    color: gray;
    text-align: center;
    margin-bottom: 18px;
  }
  .form {
    width: 90%;
    margin: 0 auto;
    p {
      text-align: left;
    }
    input {
      padding-left: 5px;
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
    }
  }
  .question-text {
    margin-top: 8px;
  }
  .changePop {
    text-align: center;
    border: none;
    margin-left: 5px;
    cursor: pointer;
    color: #5b5b5b;
    /* background-color: #ffffff; */
    /* width: 60px; */
    /* height: 30px; */
    /* border-radius: 5px; */
    /* border: #5b5b5b solid 1px; */
    &:hover {
      color: #fff;
      background-color: #696fff;
    }
  }
  /* .or-divider {
    color: #c3c3c3;
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1em;
  } */
  /* .or-divider.italic {
    font-style: italic;
  }
  .or-divider::before {
    content: "";
    height: 0.1em;
    background: #c3c3c3;
    flex: 1;
    margin: 0 0.25em 0 0;
  }
  .or-divider::after {
    content: "";
    height: 0.1em;
    background: #c3c3c3;
    flex: 1;
    margin: 0 0 0 0.25em;
  }
  .or-divider.italic::before,
  .or-divider.italic::after {
    transform: skew(-20deg);
  }
  .googleIcon {
    width: 18px;
    height: 18px;
    vertical-align: sub;
    margin-right: 3px;
  } */
`;

export const Button = styled.button`
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  width: 100px;
  height: 50px;
  margin-right: 3px;
  background-color: #fff;
  &:hover {
    background-color: #696fff;
  }
`;
export const SignButton = styled(Button)`
  margin-right: 0;
  height: 30px;
  width: 70%;
  border: 1px solid #696fff;
  &:hover {
    color: #fff;
    background-color: #696fff;
  }
`;

export const ErrorMessage = styled.span`
  color: #e64c3c;
`;
