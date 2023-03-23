import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";
import { db } from "../firebase.config";
import { User, UserAuth } from "../context/AuthContext";
import { ChatAuth } from "../context/ChatContext";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import Footer from "../components/Footer";
import { SaveButton } from "../styles/Account.styled";
const Reserve = () => {
  const { dispatch } = ChatAuth();
  const { id } = useParams();
  const [memberData, setMemberData] = useState({});
  const [diaries, setDiaries] = useState([]);
  const [status, setStatus] = useState("");
  const [cancelPay, setCancelPay] = useState(false);
  const [tags, setTags] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const navigate = useNavigate();
  const {
    user,
    userselectOpen,
    openInfo,
    searchUser,
    setSearchUser,
    handleSelect,
  } = UserAuth();
  const [openInvite, setOpenInvite] = useState(false);
  const { data } = ChatAuth();

  const handleChat = async () => {
    await handleSelect();
    dispatch({
      type: "CHANGE_USER",
      payload: {
        name: searchUser.name,
        photoURL: searchUser.profileURL,
        uid: searchUser.uid,
      },
    });
    navigate("/chatbox");
  };

  const handleInvite = async () => {
    const inviteUserRef = await getDoc(doc(db, "invitation", user.uid));
    if (
      inviteUserRef.exists() &&
      inviteUserRef.data().status === "pending" &&
      inviteUserRef.data().toUser.uid === id
    ) {
      alert("您已正在邀請此用戶");
      return;
    } else if (
      inviteUserRef.exists() &&
      inviteUserRef.data().status === "pending"
    ) {
      alert("正在邀請其他用戶，若想更改請至媒合狀態取消目前邀請");
      return;
    }
    await setDoc(doc(db, "invitation", user.uid), {
      status: "pending",
      fromUser: {
        id: user.uid,
        photoURL: user.photoURL,
        name: user.displayName,
      },
      toUser: {
        uid: memberData.uid,
        profileURL: memberData.profileURL,
        name: memberData.name,
      },
      price: memberData.price,
      date: serverTimestamp(),
    });
    setOpenInvite(true);
  };

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "user", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMemberData(docSnap.data());
        setSearchUser(docSnap.data());
        setDiaries(docSnap.data().diary);
        setTags(docSnap.data().tags);
      } else {
        console.log("No such document!");
      }
    };
    getData();
  }, []);
  return (
    <>
      <OverLay openInvite={openInvite}></OverLay>
      {openInvite && (
        <InviteBox>
          <b>已成功發送邀請，請至邀請頁面查看</b>
          <button className="btn " onClick={() => navigate("/list")}>
            前往
          </button>
        </InviteBox>
      )}

      <div>
        <Nav />
        <Container style={{ position: "relative" }}>
          <Button>
            <SaveButton className="inviteBtn" onClick={handleInvite}>
              邀請
            </SaveButton>
            <SaveButton onClick={handleChat}>聊一聊</SaveButton>
          </Button>
          <StyledDiv>
            <div className="profileImgDiv">
              <div className="upload_cover">
                <img
                  className="profileImg"
                  src={memberData.profileURL || "/user.png"}
                />
              </div>
            </div>
            <div className="profileDetail">
              <SubTitle>姓名</SubTitle>
              <p>{memberData.name}</p>
              <SubTitle>服務區域</SubTitle>
              <p>{memberData.address}</p>
              <SubTitle>價格</SubTitle>
              <p>{memberData.price}</p>
              {tags
                ? tags.map((tag, i) => (
                    <span className="tag" key={i}>
                      {tag}
                    </span>
                  ))
                : ""}
            </div>
          </StyledDiv>
          <Title>關於我</Title>
          <StyledDiv>
            <p>{memberData.aboutme || "暫無介紹"}</p>
          </StyledDiv>

          <Title>我的保姆日記</Title>
          {diaries ? (
            diaries.map((diary, i) => (
              <StyledDiv key={i} style={{ marginBottom: "50px" }}>
                <div className="profileImgDiv">
                  <div className="diary_div">
                    <img
                      className="diaryImg"
                      src={diary["photo"] || "/walkdog.png"}
                    />
                  </div>
                </div>
                <div className="profileDetail">
                  <h3>{diary["title"] || "暫無內容"}</h3>
                  <p>{diary["text"] || "暫無內容"}</p>
                </div>
              </StyledDiv>
            ))
          ) : (
            <StyledDiv style={{ marginBottom: "50px" }}>
              <p>此用戶暫無撰寫日記！</p>
            </StyledDiv>
          )}
        </Container>
        <div style={{ margin: " 50px 0 " }}></div>

        <Footer style={{ marginTop: "20px" }} />
      </div>
    </>
  );
};
export default Reserve;

const Container = styled.div`
  margin: auto;
  width: 60%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Button = styled.div`
  margin-top: 130px;
  text-align: right;
  ${({ theme }) => theme.media.tablet`
    text-align: center;
  `}
  .inviteBtn {
    margin: 0 20px 20px 0;
  }
`;

const StyledDiv = styled.div`
  padding: 20px;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 80px;
  border-radius: 5px;
  background-color: #ebebeb;
  justify-content: space-around;
  ${({ theme }) => theme.media.tablet`
    flex-direction: column;
    text-align: center;
  `}
  .tag {
    display: inline-block;
    word-wrap: break-word;
    padding: 0px 5px;
    font-size: 15px;
    margin-right: 10px;
    text-align: center;
    width: auto;
    height: 20px;
    border-radius: 20px;
    background-color: #b5b5b5;
    color: #ffffff;
  }
  .upload_cover {
    background-color: #fff;
    margin: auto;
    padding: 10px;
    width: 100%;
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    position: relative;
    cursor: pointer;
  }
  .profileImgDiv {
    flex: 1;
    margin: 15px;
    text-align: center;
    width: 150px;
    height: 150px;
    position: relative;
    border-radius: 20px;
  }
  .profileText {
    color: #5b5b5b;
  }
  .profileDetail {
    flex: 2;
    h3 {
      color: gray;
    }
    p {
      line-height: 25px;
      margin: 10px 0;
    }
  }
  .profileImg {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
  .diary_div {
    margin: auto;
    width: 150px;
    height: 150px;
  }
  .diaryImg {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  button {
    border-radius: 20px;
    border: none;
    font-size: 18px;
    height: 15px;
  }

  .profileText {
    width: 100%;
  }
`;

const SubTitle = styled.b`
  margin-bottom: 5px;
  color: #5d5b5b;
  font-size: 16px;
`;

const Title = styled.h3`
  color: #5b5b5b;
  margin: 10px 0px;
`;
const OverLay = styled.div`
  backdrop-filter: blur(0.5px);
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: ${(props) => (props.openInvite ? "flex" : "none")}; ;
`;

const InviteBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 300px;
  height: 100px;
  background-color: #ffffff;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  z-index: 2;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 45%;
  left: 50%;
  .btnDiv {
    width: 50%;
    display: flex;
  }
  .btn {
    margin: 5px auto;
    vertical-align: middle;
    cursor: pointer;
    width: 80px;
    height: 30px;
    border: none;
    border-radius: 20px;
    background-color: #aaa;
    color: white;
    &:hover {
      opacity: 0.6;
    }
  }
  .cancel {
    color: #ffffff;
    background-color: #fcc5c5;
  }
  .pay {
    color: #ffffff;
    background-color: #8bd876;
  }
`;
