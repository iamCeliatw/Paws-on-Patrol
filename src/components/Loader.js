import styled from "styled-components";
import React from "react";

const Loader = () => {
  return (
    <StyledLoader>
      <img src="Loading_icon.gif" alt="Loading" />
      <h1>正在定位您的所在地...</h1>
    </StyledLoader>
  );
};

export default Loader;

export const StyledLoader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  img {
    width: 400px;
  }
  h1 {
    margin-top: -100px;
  }
`;
