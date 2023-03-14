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
  z-index: 4;
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
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
      padding: 5px;
      border: 2px solid rgba(255, 255, 255, 0.578);
      background-color: rgba(238, 238, 238, 0.578);
      border-radius: 5px;
      &:focus {
        outline: none;
        border: 1px solid #696fff;
      }
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
    &:hover {
      color: #696fff;
    }
  }
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
