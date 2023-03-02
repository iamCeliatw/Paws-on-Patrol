import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FaAngleUp } from "react-icons/fa";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={handleScrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <FaAngleUp className="icon" />
    </Button>
  );
};

const Button = styled.div`
  position: fixed;
  bottom: 90px;
  right: 40px;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 40px;
  font-size: 50px;
  cursor: pointer;
  z-index: 1000;
  .icon {
    background-color: #bcbcbc;
    /* border: 3px solid #bcbcbc; */
    border-radius: 100%;
    color: #ffffff;
  }
`;

export default ScrollToTopButton;
