import React from "react";
import { StyledPopup } from "../styles/Popup.styled";
const Popup = ({ mapLoading, setMapLoading }) => {
  const handleClose = () => {
    setMapLoading(false);
  };

  return (
    <StyledPopup primary={mapLoading}>
      <p className="text">若您未開啟定位，進入頁面後請手動輸入地址查詢。</p>
      <button className="btn" onClick={handleClose}>
        我了解了
      </button>
    </StyledPopup>
  );
};

export default Popup;
