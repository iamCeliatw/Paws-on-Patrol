import React, { useState } from "react";
import styled from "styled-components";
import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx";
const LeftSideBar = ({
  openFilterBar,
  setOpenFilterBar,
  mapInputValue,
  setMapInputValue,
  locationHandler,
  priceValue,
  handlePriceChange,
  km,
  setKm,
  formattedPrice,
}) => {
  const [selectKm, setSelectKm] = useState(0);

  const keyPress = (e) => {
    if (e.key === "Enter" && mapInputValue !== "") {
      locationHandler();
      console.log(123);
    }
  };
  const handleKmClick = (km) => {
    setSelectKm(km);
    setKm(km);
  };
  return (
    <StyledLeftSideBar openFilterBar={openFilterBar}>
      <div className="icon">
        {openFilterBar ? (
          <RxDoubleArrowDown
            className="icon"
            onClick={() => setOpenFilterBar(!openFilterBar)}
          />
        ) : (
          <RxDoubleArrowUp
            className="icon"
            onClick={() => setOpenFilterBar(!openFilterBar)}
          />
        )}
      </div>
      <Container>
        <div>
          <p>搜尋地點</p>
          <input
            placeholder="查詢其他地點..."
            className="locateInput"
            type="text"
            onChange={(e) => setMapInputValue(e.target.value)}
            onKeyDown={keyPress}
          />

          <button className="submitBtn" onClick={locationHandler}>
            送出
          </button>
        </div>
        <div>
          <p>價格</p>
          <div className="priceFilter">
            <h2>{formattedPrice}</h2>
            <input
              className="range"
              type="range"
              defaultValue={priceValue}
              onChange={handlePriceChange}
              min="200"
              max="400"
              step="100"
            />
          </div>
        </div>
        <div>
          <p>距離</p>
          <div className="button-div">
            <button
              className={selectKm === 1000 ? "button-click" : "button"}
              onClick={() => handleKmClick(1000)}
            >{`>1km`}</button>
            <button
              className={selectKm === 2000 ? "button-click" : "button"}
              onClick={() => handleKmClick(2000)}
            >{`>2km`}</button>
            <button
              className={selectKm === 3000 ? "button-click" : "button"}
              onClick={() => handleKmClick(3000)}
            >{`>3km`}</button>
          </div>
        </div>
      </Container>
    </StyledLeftSideBar>
  );
};

export default LeftSideBar;

export const StyledLeftSideBar = styled.div`
  border-radius: 10px;
  z-index: 1;
  position: absolute;
  top: 45%;
  transform: translate(0, -50%);
  left: 100px;
  background-color: ${({ theme }) => theme.colors.background};
  width: fit-content;
  ${({ theme }) => theme.media.tablet`
    border-radius: 10px 10px 0px 0px;
    bottom:  ${(props) => (props.openFilterBar ? "-400px" : "-158px")}; 
    transition: all 0.5s ease-in-out;
    top: auto;
    background-color: rgba(255, 255, 255, 0.9);
    height: fit-content;
    width: 100vw;
    top: auto;
    left: 0;
  `}
  .icon {
    display: none;
    ${({ theme }) => theme.media.tablet`
    cursor:pointer;
    display: block;
    width: 30px;
    height: 25px;
    margin: 5px auto;
    `}
  }
`;

// opacity: ${(props) => (props.isActive ? 1 : 0)};
// transform: translateX(${(props) => (props.isActive ? "-5%" : 0)});
// transition: all 0.5s ease-in-out;
// background-color: rgba(255, 255, 255, ${(props) => (props.isActive ? 1 : 0)});
export const Container = styled.div`
  padding: 20px;
  ${({ theme }) => theme.media.tablet`
    padding: 10px;`}

  p {
    color: #5b5b5b;
    font-size: 20px;
    margin: 15px auto;
    ${({ theme }) => theme.media.tablet`
    margin: 10px auto;
    `}
  }
  div {
    flex: 1;
  }
  .locateInput {
    width: 200px;
    padding: 5px;
    border-radius: 10px;
    height: 30px;
    border: none;
    :hover,
    :focus {
      outline: none;
      border-radius: 8px;
      box-shadow: 0 3px 3px rgba(15, 15, 51, 0.4);
    }
  }
  .submitBtn {
    margin-left: 10px;
    vertical-align: middle;
    cursor: pointer;
    width: 60px;
    height: 30px;
    border: none;
    border-radius: 20px;
    /* box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08); */
    background-color: #aaa;
    color: white;
    &:hover {
      opacity: 0.6;
    }
  }
  .priceFilter {
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    h2 {
      color: #5b5b5b;
      margin-bottom: 5px;
    }
    .range {
      cursor: pointer;
      /* width: 80%; */
      height: 14px;
      -webkit-appearance: none;
      background: #ffffff;
      outline: none;
      border-radius: 15px;
      overflow: hidden;
    }
    /* 滑動軌道 樣式 */
    .range::-webkit-slider-runnable-track {
      height: 8px;
      /* width: 280px; */
      border-radius: 4px;
      background: #aaa;
    }
    .range::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      margin-top: -5px;
      position: relative;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.gray};
      cursor: pointer;
      border: 2px solid #ffffff;
      box-shadow: -407px 0 0 400px ${({ theme }) => theme.colors.gray};
    }
  }
  .button-div {
    display: flex;
    justify-content: space-evenly;
    .button {
      width: 68px;
      height: 40px;
      font-size: 22px;
      text-align: center;
      border-radius: 5px;
      background-color: #ffffff;
      border: ${({ theme }) => theme.colors.gray} solid 1px;
      margin-right: 15px;
      &:hover {
        cursor: pointer;
        color: #ffffff;
        background-color: ${({ theme }) => theme.colors.gray};
      }
      ${({ theme }) => theme.media.mobile`
        width: 58px;    
        height: 35px;    
        font-size: 18px;
   `}
    }
    .button-click {
      width: 68px;
      height: 40px;
      font-size: 22px;
      text-align: center;
      border-radius: 5px;
      color: #ffffff;
      background-color: ${({ theme }) => theme.colors.gray};
      border: ${({ theme }) => theme.colors.gray} solid 1px;
      margin-right: 15px;
      ${({ theme }) => theme.media.mobile`
        width: 58px;    
        height: 35px;    
        font-size: 18px;
   `}
      &:hover {
        cursor: default;
        /* color: #ffffff; */
        /* background-color: ${({ theme }) => theme.colors.gray}; */
      }
    }
  }
`;
