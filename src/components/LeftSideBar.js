import React from "react";
import { Button } from "../styles/Button.styled";
// import { Flex } from "../styles/Flex.styled";

import { StyledLeftSideBar, Flex } from "../styles/LeftSideBar.styled";

const LeftSideBar = ({
  priceValue,
  handlePriceChange,
  min,
  max,
  step,
  km,
  setKm,
}) => {
  return (
    <StyledLeftSideBar>
      <Flex>
        <div>
          <p>Price</p>
          <div className="priceFilter">
            <h2>{priceValue}</h2>
            <input
              className="range"
              type="range"
              defaultValue={priceValue}
              onChange={handlePriceChange}
              min={min}
              max={max}
              step={step}
            />
          </div>
        </div>
        <div>
          <p>Distance</p>
          <button onClick={() => setKm(1000)}>{`>1km`}</button>
          <button onClick={() => setKm(2000)}>{`>2km`}</button>
          <button onClick={() => setKm(3000)}>{`>3km`}</button>
        </div>
      </Flex>
    </StyledLeftSideBar>
  );
};

export default LeftSideBar;
