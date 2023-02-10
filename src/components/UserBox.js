import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";

const UserBox = ({ userPopups, userImage }) => {
  const [userName, setUserName] = useState("");
  const [userPrice, setUserPrice] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const { user, searchUser, setSearchUser, handleSelect } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (userPopups) {
      setUserAddress(userPopups.address);
      // setUserImage(userPopups.aboutme);
      setUserPrice(userPopups.price);
      setUserName(userPopups.name);
    }
  }, [userPopups]);

  const openChat = async () => {
    if (searchUser.uid !== user.uid) {
      await handleSelect();
      navigate("/chatbox");
    }
  };

  return userPopups ? (
    <StyledBox>
      <StyledUserBox>
        <img src={userImage} alt="" />
        <p>{userName}</p>
        <div>
          {/* icon */}
          <p>{userAddress}</p>
        </div>
        <p>{userPrice}</p>
        <ButtonDiv>
          <button onClick={openChat}>聊一聊</button>
          <button>查看</button>
        </ButtonDiv>
      </StyledUserBox>
    </StyledBox>
  ) : (
    ""
  );
};

export default UserBox;

const StyledBox = styled.div`
  position: absolute;
  right: 0px;
  top: 100px;
  /* left: ${(prop) => prop.pageX}px;
  top: ${(prop) => prop.pageY}px; */
  /* transform: translate(-50%, -50%); */
  z-index: 1;
`;

const StyledUserBox = styled.div`
  position: relative;
  width: 230px;
  border-radius: 10px;
  background: #d9d9d9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  padding: 15px;
  &:after {
    content: " ";
    position: absolute;
    right: 43%;
    bottom: -15px;
    border-top: 15px solid #d9d9d9;
    border-right: 15px solid transparent;
    border-left: 7px solid transparent;
    border-bottom: none;
  }
  img {
    width: 50%;
    border-radius: 50%;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  width: inherit;
  justify-content: space-around;
  button {
    width: 50px;
    font-size: 15px;
    border: none;
    border-radius: 5px;
    background-color: #ffffff;
    &:hover {
      cursor: pointer;
      /* filter: drop-shadow(1px 0px 2px rgba(15, 15, 51, 0.4)); */
      box-shadow: 1px 1px 1px #898989;
    }
  }
`;
