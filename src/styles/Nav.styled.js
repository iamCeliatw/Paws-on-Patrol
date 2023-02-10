import styled from "styled-components";
import { Flex } from "./Flex.styled";
export const StyledNav = styled.nav`
  width: 100%;
  height: 95px;
  position: absolute;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const NavFlex = styled(Flex)`
  /* padding: 0 30px; */
  padding: 0 5%;
  justify-content: space-between;
  line-height: 95px;

  b {
    cursor: pointer;
    padding-left: 15px;
    font-size: 40px;
    font-weight: 500;
  }

  img {
    vertical-align: middle;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  .icon {
    width: 35px;
    height: 35px;
    margin-right: 20px;
    cursor: pointer;
    vertical-align: middle;
    color: gray;
  }

  .myLink {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 500px) {
    b {
      font-size: 30px;
    }
  }
`;
