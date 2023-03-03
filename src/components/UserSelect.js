import React, { useEffect, useRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
const UserSelect = React.forwardRef(
  ({ handleClickOutside, handleClick }, ref) => {
    const {
      logout,
      setIsLogin,
      user,
      setUserselectOpen,
      userselectOpen,
      bellMessage,
    } = UserAuth();

    const HandleClick = () => {
      setUserselectOpen(false);
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);

    const logoutHandler = async () => {
      try {
        await logout();
        setIsLogin(false);
        setUserselectOpen(false);
      } catch (e) {
        alert(e.message);
      }
    };
    return (
      <Container ref={ref}>
        {bellMessage && <i className="unread-point"></i>}
        <ul>
          <li>
            <Link to="/chatbox" onClick={HandleClick}>
              聊天室
            </Link>
          </li>
          <li>
            <Link to="/account" onClick={HandleClick}>
              更改會員資料
            </Link>
          </li>
          <li>
            <Link to="/list" onClick={HandleClick}>
              媒合狀態
            </Link>
          </li>
          <li>
            <Link to="/history" onClick={HandleClick}>
              歷史訂單
            </Link>
          </li>
          <li>
            <p className="logout" onClick={logoutHandler}>
              登出
            </p>
          </li>
        </ul>
      </Container>
    );
  }
);
export default UserSelect;

const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 10%;
  right: 100px;
  width: 200px;
  height: auto;
  background-color: white;
  border-radius: 10px;
  transition: all 0.3s;
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 18%);
  .unread-point {
    display: block;
    background: #f23436;
    border-radius: 50%;
    width: 6px;
    height: 6px;
    bottom: 146px;
    right: 55px;
    position: absolute;
  }
  ${({ theme }) => theme.media.tablet`
    right:50px;
  `}
  ${({ theme }) => theme.media.mobile`
   right: 10px;
      `}
  ul {
    text-align: center;
    list-style: none;
    padding: 10px 0;
    li {
      padding: 15px 0;
      text-decoration: none;
      a,
      .logout {
        text-decoration: none;
        color: gray;
        cursor: pointer;
        &:hover {
          color: #e64c3c;
        }
      }
    }
  }
`;
