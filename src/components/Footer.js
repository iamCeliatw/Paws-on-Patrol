import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      Copyright © 2023 Paws on Patrol. All rights reserved.
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.div`
  height: 50px;

  background-color: rgba(255, 255, 255, 0.9);
  line-height: 50px;
  text-align: center;
  margin-top: -50px;
  position: absolute;
  right: 0;
  left: 0;
  ${({ theme }) => theme.media.mobile`
font-size: 13px;
  `}
`;
