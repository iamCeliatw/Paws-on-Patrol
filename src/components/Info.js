import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
const Info = () => {
  const { user, bellMessage, setBellMessage } = UserAuth();
  const navigate = useNavigate();
  const [inviteData, setInviteData] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    getInviteInfo();
  }, [user]);
  const getInviteInfo = async () => {
    const inviteRef = await getDoc(doc(db, "invitation", user.uid));
    if (inviteRef.exists()) {
      setInviteData(inviteRef.data().clientInfo);
    }
  };
  const handleAccept = async () => {
    setBellMessage(false);
    updateDoc(doc(db, "invitation", user.uid), {
      status: "accept",
    });
    //待付款完成後再刪除
    setInviteData("");
  };
  const handleCancel = async () => {
    setBellMessage(false);
    updateDoc(doc(db, "invitation", user.uid), {
      status: "denied",
    });
    setInviteData("");
  };

  const cancelComfirm = async () => {
    await deleteDoc(doc(db, "invitation", user.uid));
    setBellMessage(false);
    setStatus("");
  };
  useEffect(() => {
    const getStatus = () => {
      if (user.uid) {
        const unsub = onSnapshot(doc(db, "invitation", user.uid), (doc) => {
          if (!doc.data()) return;
          setStatus(doc.data().status);
          if (doc.data().status === "cancel") {
            setBellMessage(true);
          }
        });
        return () => {
          unsub();
        };
      }
    };
    getStatus();
  }, [user.uid]);

  return (
    <div>
      <Container>
        {bellMessage && status === "pending" && inviteData.name ? (
          <StyleInfo>
            <div className="imgDiv">
              <img src={inviteData.photoURL} alt="" />
            </div>
            <b>{inviteData.name}向您發送請求</b>
            <Button onClick={() => navigate(`/reserve/${inviteData.id}`)}>
              查看
            </Button>
            <div>
              <AiOutlineCheckCircle
                onClick={handleAccept}
                className="iconCheck"
                size={"25px"}
              />
              <AiOutlineCloseCircle
                onClick={handleCancel}
                className="iconClose"
                size={"25px"}
              />
            </div>
          </StyleInfo>
        ) : status === "cancel" ? (
          <>
            <div className="info-div">
              <b className="text">對方已取消邀約</b>
              <button className="btn" onClick={cancelComfirm}>
                確認
              </button>
            </div>
          </>
        ) : status !== "cancel" ? (
          <b className="text">暫無用戶請求，請至列表查看訂單狀態</b>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

export default Info;

const Container = styled.div`
  padding: 10px;
  width: 300px;
  position: absolute;
  right: 100px;
  top: 10%;
  z-index: 2;
  border-radius: 5px;
  background-color: #ffffff;
  ${({ theme }) => theme.media.tablet`
    right:50px;
  `}
  ${({ theme }) => theme.media.mobile`
   right: 10px;
      `}

.info-div {
    display: flex;
    justify-content: space-around;
    .btn {
    }
  }
`;

const StyleInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .imgDiv {
    width: 30px;
    height: 30px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  .iconCheck {
    color: #ff0000;
    cursor: pointer;
    margin: 0 2px;
  }
  .iconClose {
    color: #393939;
    cursor: pointer;
  }
  .text {
    text-align: center;
  }
`;

const Button = styled.button`
  font-size: 16px;
  width: 32px;
  border-radius: 5px;
  border: none;
  background-color: lightgray;
  color: #505050;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: none;
  }
`;
