import React, { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
const UserBox = ({
  userPopups,
  setUserPopups,
  userImage,
  isActive,
  setIsActive,
  imgLoading,
}) => {
  const [userName, setUserName] = useState("");
  const [userPrice, setUserPrice] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [usertags, setUserTags] = useState([]);
  const { user, searchUser, setSearchUser, handleSelect } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (userPopups) {
      console.log(userPopups);
      setUserAddress(userPopups.address);
      setUserPrice(userPopups.price);
      setUserName(userPopups.name);
      setUserTags(userPopups.tags);
    }
  }, [userPopups]);

  const handleReservation = async () => {
    navigate(`/reserve/${searchUser.uid}`);
  };

  const closeUserPopups = () => {
    setIsActive(false);
  };
  return userPopups ? (
    <Container isActive={isActive}>
      <StyledUserBox>
        <IoClose
          className="closeButton"
          onClick={() => closeUserPopups()}
        ></IoClose>
        <div className="user-img">
          {imgLoading ? (
            <img src="background.png" className="img" alt="" />
          ) : (
            <img
              src={userImage !== "" ? userImage : "user.png"}
              className="img"
              alt=""
            />
          )}
        </div>
        <p>{userName}</p>
        <TagDiv>
          {/* icon */}

          {usertags &&
            usertags.map((tag, index) => {
              return <Keyword key={index}>{tag}</Keyword>;
            })}
        </TagDiv>
        <p>{userAddress}</p>
        <p>{userPrice}</p>
        {user ? (
          <ButtonDiv>
            <button onClick={handleReservation}>預約</button>
          </ButtonDiv>
        ) : (
          <Span>登入後即可預約</Span>
        )}
      </StyledUserBox>
    </Container>
  ) : (
    ""
  );
};

export default UserBox;

const Container = styled.div`
  margin-right: 5%;
  padding: 15px;
  border-radius: 10px;
  position: absolute;
  right: 0;
  top: 20%;
  z-index: 2;
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 18%);
  /* opacity: ${(props) => (props.isActive ? 1 : 0)}; */
  transform: translateX(${(props) => (props.isActive ? "-5%" : 0)});
  transition: all 0.5s ease-in-out;
  background-color: rgba(255, 255, 255, ${(props) => (props.isActive ? 1 : 0)});
  visibility: ${(props) => (props.isActive ? "visible" : "hidden")};

  ${({ theme }) => theme.media.tablet`
    padding: 10px;
    right: 30%;
    top: 14%;
    transform: translateY(${(props) => (props.isActive ? "5%" : 0)});
    `}

  ${({ theme }) => theme.media.mobile`
    padding: 0px;
    right: 15%;
    top: 14%;
    transform: translateY(${(props) => (props.isActive ? "5%" : 0)});
    `}
`;

const StyledUserBox = styled.div`
  position: relative;
  width: 230px;
  height: auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  ${({ theme }) => theme.media.mobile`
  height: 250px;
  `}
  /* &:after {
    content: " ";
    position: absolute;
    right: 43%;
    bottom: -15px;
    border-top: 15px solid #d9d9d9;
    border-right: 15px solid transparent;
    border-left: 7px solid transparent;
    border-bottom: none;
  } */
  .closeButton {
    position: absolute;
    right: 15px;
    top: 5px;
    cursor: pointer;
  }
  .user-img {
    width: 120px;
    height: 120px;
    ${({ theme }) => theme.media.mobile`
      width: 70px;
    height: 70px;
    `}
    .img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      object-fit: cover;
    }
  }
  p {
    text-align: center;
    ${({ theme }) => theme.media.mobile`
  font-size: 14px;
    `}
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  width: inherit;
  justify-content: space-around;
  button {
    width: 70px;
    height: 30px;
    font-size: 18px;
    color: white;
    border: none;
    border-radius: 10px;
    background-color: #c6c4c4;
    margin-top: 8px;
    &:hover {
      cursor: pointer;
      box-shadow: 1px 1px 1px #898989;
    }
  }
`;
const Span = styled.span`
  color: #e06464;
`;

const TagDiv = styled.div`
  text-align: center;
`;

const Keyword = styled.span`
  display: inline-block;
  word-wrap: break-word;
  margin: 5px;
  padding: 0px 5px;
  font-size: 12px;
  width: auto;
  border-radius: 20px;
  background-color: #b5b5b5;
`;
