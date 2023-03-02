import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";
import { onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";
import { User, UserAuth } from "../context/AuthContext";
import { ChatAuth } from "../context/ChatContext";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import Footer from "../components/Footer";

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
  //   //payment function
  //   const handlePayment = async (memberdata, user) => {
  //     if (paymentLoading) {
  //       return;
  //     }
  //     setPaymentLoading(true);
  //     console.log(user.displayName);
  //     const userId = user.uid;
  //     const userName = user.displayName;
  //     const userPhotoURL = user.photoURL;
  //     const memberId = memberdata.uid;
  //     const price = memberdata.price;
  //     const memberName = memberdata.name;
  //     const memberPhotoURL = memberdata.profileURL;
  //     console.log(user.displayName, user.photoURL);
  //     const filterPrice = parseInt(price.replace(/[^0-9]/gi, ""), 10);
  //     const stripe = await loadStripe(
  //       "pk_test_51MZSBHAx03PMdijSJDe1PlZn8fiWwVlA1xee0ipHioQXQTRSZvEah09XZR80PxSrExr7ykyVMwhWWpFzYu1mAoYC00VlECtoVk"
  //     );
  //     try {
  //       createStripeCheckout({
  //         unitAmount: filterPrice,
  //         userid: userId,
  //         memberid: memberId,
  //         memberName: memberName,
  //         memberPhotoURL: memberPhotoURL,
  //         userName: userName,
  //         userPhotoURL: userPhotoURL,
  //       }).then((response) => {
  //         const sessionId = response.data.id;
  //         stripe.redirectToCheckout({ sessionId: sessionId });
  //       });
  //       setPaymentLoading(false);
  //     } catch (err) {
  //       setPaymentLoading(false);
  //       alert(err);
  //     }
  //   };

  //實時監聽status變化
  //   useEffect(() => {
  //     const getStatus = () => {
  //       if (memberData.uid) {clientList[index]["fromUser"]["id"]
  //         const unsub = onSnapshot(
  //           doc(db, "invitation", memberData.uid),
  //           (doc) => {
  //             if (doc.data()) {
  //               setStatus(doc.data().status);
  //             }
  //           }
  //         );
  //         return () => {
  //           unsub();
  //         };
  //       }
  //     };
  //     getStatus();
  //   }, [memberData.uid]);

  //   useEffect(() => {
  //     if (memberData && memberData.uid) {
  //       const getData = async () => {
  //         const inviteUserRef = await getDoc(
  //           doc(db, "invitation", memberData.uid)
  //         );
  //         if (
  //           inviteUserRef.data() &&
  //           inviteUserRef.data().clientInfo.id === user.uid &&
  //           inviteUserRef.data().status === "cancel"
  //         ) {
  //           setOpenInvite(false);
  //         } else if (
  //           inviteUserRef.data() &&
  //           inviteUserRef.data().clientInfo.id === user.uid
  //         ) {
  //           setOpenInvite(true);
  //         }
  //       };
  //       getData();
  //     }
  //   }, [memberData]);

  //   useEffect(() => {
  //     if (!memberData || !memberData.uid) return;

  //     const getData = async () => {
  //       const inviteUserRef = await getDoc(doc(db, "invitation", memberData.uid));
  //       const inviteData = inviteUserRef.data();

  //       if (!inviteData || inviteData.clientInfo.id !== user.uid) return;

  //       setOpenInvite(inviteData.status !== "cancel");
  //     };
  //     getData();
  //   }, [memberData, user.uid]);

  const handleChat = async () => {
    console.log(searchUser.uid, user.uid);
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
      inviteUserRef.data().fromUser.id === user.uid
    ) {
      alert("您已正在邀請此用戶");
      return;
    } else if (
      inviteUserRef.exists() &&
      inviteUserRef.data().status === "pending"
    ) {
      alert("您已邀請一位用戶，若想更改請至媒合狀態取消目前邀請");
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
        id: memberData.uid,
        photoURL: memberData.profileURL,
        name: memberData.name,
      },
      price: memberData.price,
      date: serverTimestamp(),
    });
    setOpenInvite(true);
    // }
    // else {
    //   alert("暫時無法邀請此用戶，請選擇其他用戶");
    // }
  };
  //已接收邀請後 按取消付款
  //   const cancelPayment = async () => {
  //     setCancelPay(true);
  //     setOpenInvite(false);
  //     updateDoc(doc(db, "invitation", memberData.uid), {
  //       status: "cancel",
  //     });
  //   };
  //邀請對方未回應時 按取消邀請
  //   const cancelInvite = async () => {
  //     setOpenInvite(false);
  //     const inviteUserRef = await getDoc(doc(db, "invitation", memberData.uid));
  //     if (inviteUserRef.exists()) {
  //       await deleteDoc(doc(db, "invitation", memberData.uid));
  //     }
  //   };
  //邀請對方被拒時 按確認 刪除資料庫並回到主頁面
  //   const cancelComfirm = async () => {
  //     await deleteDoc(doc(db, "invitation", memberData.uid));
  //     navigate("/home");
  //   };
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "user", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        //for page data
        setMemberData(docSnap.data());
        //for chat room function
        setSearchUser(docSnap.data());
        setDiaries(docSnap.data().diary);
        setTags(docSnap.data().tags);
      } else {
        // doc.data() will be undefined in this case
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
      {/* <OverLay openInvite={openInvite}></OverLay>
      {openInvite && status === "pending" ? (
        <InviteBox>
          <b>等待對方接收邀請中，請稍候．．． </b>
          <button className="btn cancel" onClick={cancelInvite}>
            取消
          </button>
        </InviteBox>
      ) : openInvite && status === "accept" ? (
        <InviteBox>
          <b>對方已確認訂單，請立即前往付款</b>
          <div className="btnDiv">
            <button
              className="btn pay"
              onClick={() => {
                handlePayment(memberData, user);
              }}
            >
              立即付款
            </button> */}
      {/* <button
              className="btn cancel"
              onClick={() => {
                cancelPayment();
              }}
            >
              取消付款
            </button> */}
      {/* </div> */}
      {/* </InviteBox> */}
      {/* ) : openInvite && !cancelPay && status === "denied" ? (
        <InviteBox>
          <b>對方現在無法接受，請另尋其他褓姆</b>
          <button className="btn" onClick={() => cancelComfirm()}>
            回主頁面
          </button>
        </InviteBox>
      ) : openInvite && cancelPay && status === "cancel" ? (
        <InviteBox>
          <b>另尋其他褓姆</b>
          <button onClick={() => navigate("/Home")}>回主頁面</button>
        </InviteBox>
      ) : null} */}
      <div>
        <Nav />
        <Container style={{ position: "relative" }}>
          <Button>
            <button className="button invite" onClick={handleInvite}>
              invite
            </button>
            <button className="button chat" onClick={handleChat}>
              chat
            </button>
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
            <p>{memberData.aboutme}</p>
          </StyledDiv>

          <Title>我的保姆日記</Title>
          {diaries ? (
            diaries.map((diary, i) => (
              <StyledDiv key={i} style={{ marginBottom: "130px" }}>
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
            <StyledDiv style={{ marginBottom: "130px" }}>
              <p>此用戶暫無撰寫日記！</p>
            </StyledDiv>
          )}
        </Container>
        <Footer />
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

  .button {
    cursor: pointer;
    font-size: 20px;
    height: 30px;
    width: 70px;
    background-color: #ffffff;
    border: none;
    margin: 0 0 10px 10px;
    border-radius: 10px;
    &:hover {
      border: 1px solid #5b5b5b;
      background-color: #474747;
      color: #ffffff;
      opacity: 0.8;
    }
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
      /* color: #4c4c4c; */
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
    width: 55px;
    height: 25px;
    border: none;
    border-radius: 20px;
    /* box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08); */
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
