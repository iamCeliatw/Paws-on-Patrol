import { StyledLoader } from "../styles/Loader.styled";
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
