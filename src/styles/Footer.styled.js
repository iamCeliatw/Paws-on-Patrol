import styled from "styled-components";
export const StyledFooter = styled.div`
  height: 50px; /*設定footer本身高度*/
  background-color: ${({ theme }) => theme.colors.background};
  line-height: 50px;
  text-align: center;
  margin-top: -50px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
`;
