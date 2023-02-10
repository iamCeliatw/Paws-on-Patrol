import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { StyledNav, NavFlex } from "../styles/Nav.styled";
import { Flex } from "../styles/Flex.styled";
import { UserAuth } from "../context/AuthContext";
import { BiUser, BiChat } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
const Nav = ({ setOpenSignup, openLogin, setOpenLogin, setCloseModal }) => {
  const { logout, isLogin, setIsLogin, user } = UserAuth();
  const logoutHandler = async () => {
    try {
      await logout();
      setIsLogin(false);
    } catch (e) {
      alert(e.message);
    }
  };
  const navigate = useNavigate();
  return (
    <StyledNav>
      <NavFlex>
        <Flex>
          <img
            src="paw.png"
            alt="logoIcon"
            onClick={() => {
              navigate("/Home");
            }}
          />
          <b
            onClick={() => {
              navigate("/Home");
            }}
          >
            Paws on Patrol
          </b>
        </Flex>
        <div>
          {/* <Link className="myLink" to="/Account"> */}
          {user && (
            <BiChat
              className="icon"
              onClick={() => {
                if (user) {
                  navigate("/Chatbox");
                }
              }}
            />
          )}
          <BiUser
            onClick={() => {
              if (user) {
                navigate("/Account");
              } else {
                setOpenLogin(true);
                setOpenSignup(false);
                setCloseModal(false);
              }
            }}
            className="icon"
            alt="userImg"
          />
          {/* </Link> */}
          {user && (
            <IoMdLogOut
              onClick={logoutHandler}
              className="icon"
              alt="logoutIcon"
            />
          )}
        </div>
      </NavFlex>
    </StyledNav>
  );
};

export default Nav;
