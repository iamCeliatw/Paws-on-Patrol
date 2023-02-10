import styled from "styled-components";

export const StyledPopup = styled.div`
  border-radius: 10px;
  color: #fff;
  width: 300px;
  height: 100px;
  background: #9a9999;
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  display: ${(props) => (props.primary ? "flex" : "none")};
  flex-direction: column;
  .text {
    margin: 10px 0;
  }
  .btn {
    width: fit-content;
    margin-left: auto;
    margin-right: 15px;
  }
`;
