import styled from "styled-components";

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
  width: 250px;
  border: 1px solid #696fff;
  &:hover {
    color: #fff;
    background-color: #696fff;
  }
`;
