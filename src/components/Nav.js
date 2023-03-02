import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase.config";
import { HiOutlineBell } from "react-icons/hi2";
import {
  getDoc,
  doc,
  onSnapshot,
  query,
  collection,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import UserSelect from "../components/UserSelect";
import Info from "../components/Info";
const Nav = ({ setOpenSignup, setOpenLogin, setCloseModal }) => {
  const {
    bellMessage,
    setBellMessage,
    user,
    userselectOpen,
    setUserselectOpen,
    openInfo,
    setOpenInfo,
  } = UserAuth();
  const selectRef = useRef();
  //   useEffect(() => {
  //     const getinviteRef = async () => {
  //       if (user && user.uid) {
  //         const unsub = onSnapshot(doc(db, "invitation", user.uid), (doc) => {
  //           if (doc.data() && doc.data().status === "accept") {
  //             setBellMessage(false);
  //           } else if (doc.data() && doc.data().status === "pending") {
  //             setBellMessage(true);
  //           } else return;
  //         });
  //         return () => {
  //           unsub();
  //         };
  //       }
  //     };
  //     if (user) {
  //       getinviteRef();
  //     }
  //   }, [user]);

  useEffect(() => {
    console.log(11);
    const getInviteStatus = async () => {
      if (user && user.uid) {
        const q = query(
          collection(db, "invitation"),
          where("toUser.id", "==", user.uid),
          where("status", "==", "pending")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const unreadMessages = snapshot.docs.filter(
            (doc) => doc.data().status === "pending"
          );
          console.log(unreadMessages);
          setBellMessage(unreadMessages.length > 0);
        });
        return () => {
          unsubscribe();
        };
      }
    };
    getInviteStatus();
  }, [user]);

  const navigate = useNavigate();

  const handleOpenSelect = () => {
    setUserselectOpen(!userselectOpen);
  };

  const handleClickOutside = (e) => {
    console.log(selectRef.current);
    if (
      selectRef.current &&
      !selectRef.current.contains(e.target) &&
      e.target.className !== "icon"
    ) {
      setUserselectOpen(false);
    }
  };

  //防止點擊過快造成的過度渲染
  //   const handleOpenInfo = debounce(() => {
  //     setOpenInfo(!openInfo);
  //   }, 200);

  return (
    <>
      {userselectOpen && (
        <UserSelect handleClickOutside={handleClickOutside} ref={selectRef} />
      )}
      <StyledNav>
        <NavFlex>
          <Flex>
            <img
              className="paw-logo"
              src="/paw.png"
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
          <Flex>
            {user ? (
              <img
                className="icon"
                src={user.photoURL ? user.photoURL : "/user.png"}
                onClick={() => handleOpenSelect()}
                // onClick={handleClick}
              />
            ) : (
              <img
                className="icon"
                src="user.png"
                onClick={() => {
                  setOpenLogin(true);
                  setOpenSignup(false);
                  setCloseModal(false);
                }}
              />
            )}
            {bellMessage && <i className="unread-point"></i>}
            <div>
              <div>
                {/* <HiOutlineBell className="icon" onClick={handleOpenInfo} /> */}
                {/* {bellMessage && <i className="unread-point"></i>} */}
              </div>

              {/* <CiBellOn className="icon" onClick={handleOpenInfo} /> */}
            </div>
          </Flex>
        </NavFlex>
      </StyledNav>
    </>
  );
};

export default Nav;
const StyledNav = styled.nav`
  width: 100%;
  height: 95px;
  position: fixed;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .unread-point {
    display: block;
    background: #f23436;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    top: 3px;
    right: 0;
    position: absolute;
  }
`;

const NavFlex = styled(Flex)`
  display: flex;
  align-items: center;
  padding: 0 100px;
  justify-content: space-between;
  line-height: 95px;
  ${({ theme }) => theme.media.tablet`
   padding: 0 50px;
      `}
  ${({ theme }) => theme.media.mobile`
   padding: 0 10px;
      `}
  .account-img {
    object-fit: cover;
    margin-left: 20px;
    width: 35px;
    height: 35px;
    vertical-align: middle;
    border-radius: 50%;
  }

  b {
    cursor: pointer;
    padding-left: 15px;
    font-size: 32px;
    font-weight: 300;
    color: #5b5b5b;
    ${({ theme }) => theme.media.tablet`
     font-size: 28px;
  `}
  }

  .paw-logo {
    vertical-align: middle;
    width: 40px;
    height: 40px;
    cursor: pointer;
    ${({ theme }) => theme.media.mobile`
      width: 32px;
      height: 32px;
      `}
  }
  div {
    position: relative;
    .icon {
      object-fit: cover;
      width: 35px;
      height: 35px;
      margin-left: 20px;
      cursor: pointer;
      vertical-align: middle;
      color: gray;
      border-radius: 100%;
      ${({ theme }) => theme.media.mobile`
      width: 28px;
      height: 28px;
      `}
    }
  }
  .myLink {
    text-decoration: none;
    color: inherit;
  }
`;
