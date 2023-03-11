import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase.config";
import { UserAuth } from "../../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { functions, createStripeCheckout } from "../../firebase.config";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  collection,
  where,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
const InviteList = () => {
  const { user } = UserAuth();
  const [inviteData, setInviteData] = useState({});
  //   const [inviting, setInviting] = useState(false);
  const [payStatus, setPayStatus] = useState(false);
  const [paymentdata, setPaymentdata] = useState({});
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [status, setStatus] = useState("");

  const deleteInvite = async () => {
    const inviteRef = doc(db, "invitation", user.uid);
    const docSnap = await getDoc(inviteRef);
    const documentId = docSnap.data().documentId;
    await updateDoc(inviteRef, {
      status: "declined",
    });
    await updateDoc(doc(db, "clientHistory", documentId), {
      paymentStatus: "declined",
    });
    await updateDoc(doc(db, "inviteHistory", documentId), {
      paymentStatus: "declined",
    });
  };

  //  實時監聽status變化
  useEffect(() => {
    const getStatus = () => {
      if (user.uid) {
        const unsub = onSnapshot(doc(db, "invitation", user.uid), (doc) => {
          if (doc.data()) {
            setStatus(doc.data().status);
          }
        });
        return () => {
          unsub();
        };
      }
    };
    getStatus();
  }, [user.uid]);

  //payment function
  const handlePayment = async (inviteData, user) => {
    if (paymentLoading) {
      return;
    }
    setPaymentLoading(true);
    const userId = user.uid;
    const price = inviteData.price;
    const memberId = inviteData["toUser"]["uid"];
    const filterPrice = parseInt(price.replace(/[^0-9]/gi, ""), 10);
    const stripe = await loadStripe(
      "pk_test_51MZSBHAx03PMdijSJDe1PlZn8fiWwVlA1xee0ipHioQXQTRSZvEah09XZR80PxSrExr7ykyVMwhWWpFzYu1mAoYC00VlECtoVk"
    );
    try {
      createStripeCheckout({
        unitAmount: filterPrice,
        userid: userId,
        memberid: memberId,
      }).then((response) => {
        const sessionId = response.data.id;
        stripe.redirectToCheckout({ sessionId: sessionId });
      });
      setPaymentLoading(false);
      //   await updateDoc(doc(db, "invitation", user.uid), {
      //     status: "paid",
      //   });
    } catch (err) {
      setPaymentLoading(false);
      alert(err);
    }
  };
  useEffect(() => {
    const getData = async () => {
      if (user.uid) {
        const queryInvite = query(
          collection(db, "invitation"),
          where("fromUser.id", "==", user.uid)
        );

        if (inviteData) {
          //   setInviting(true);
          const querySnapshot = await getDocs(queryInvite);
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setInviteData(data);
          });
        }
      }
    };
    getData();
  }, [user.uid]);
  console.log(status);
  const cancelInvite = async () => {
    const inviteRef = await getDoc(doc(db, "invitation", user.uid));
    if (inviteRef.exists()) {
      await deleteDoc(doc(db, "invitation", user.uid));
      setInviteData("");
    }
  };
  return (
    <>
      <Container>
        {paymentLoading && <img src="loadmouse.gif" />}
        <Div>
          {inviteData &&
          (status === "accepted" ||
            status === "pending" ||
            status === "denied") ? (
            <Flex>
              <div className="img-div">
                <img
                  src={
                    inviteData &&
                    inviteData["toUser"] &&
                    inviteData["toUser"]["profileURL"] !== "" &&
                    status
                      ? inviteData["toUser"]["profileURL"]
                      : "/user.png"
                  }
                  alt=""
                />
              </div>
              {inviteData["toUser"] && inviteData["toUser"]["name"] ? (
                <b>
                  {status === "pending"
                    ? `正在等待${inviteData["toUser"]["name"]}接受你的請求`
                    : status === "accepted"
                    ? `${inviteData["toUser"]["name"]}已接受你的請求`
                    : status === "paid"
                    ? `您已向${inviteData["toUser"]["name"]}付款${inviteData["price"]}成功！`
                    : null}
                </b>
              ) : null}
              <Button>
                {inviteData["toUser"] && inviteData["toUser"]["name"] ? (
                  status === "pending" ? (
                    <button
                      className="btn cancel"
                      onClick={() => cancelInvite()}
                    >
                      取消邀請
                    </button>
                  ) : status === "accepted" ? (
                    <div>
                      <button
                        className="btn pay"
                        onClick={() => handlePayment(inviteData, user)}
                      >
                        立即付款
                      </button>
                      <button
                        className="btn cancel"
                        onClick={() => deleteInvite()}
                      >
                        取消
                      </button>
                    </div>
                  ) : status === "denied" ? (
                    <b>{inviteData["toUser"]["name"]} 已拒絕您的請求</b>
                  ) : null
                ) : null}
              </Button>
            </Flex>
          ) : (
            <Flex>目前沒有邀約任何寵物保姆！</Flex>
          )}
        </Div>
      </Container>
    </>
  );
};

export default InviteList;

const Container = styled.div`
  /* overflow: scroll; */
  margin: auto;
  width: 100%;
  border-radius: 5px;
  /* border: 1px solid #8e8e8e; ; */
`;

const Div = styled.div`
  height: 300px;
  .img-div {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    object-fit: cover;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      object-fit: cover;
    }
  }
`;
const Flex = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Button = styled.div`
  .btn {
    margin: 5px;
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
    width: 80px;
    height: 30px;
    color: #ffffff;
    background-color: #fcc5c5;
  }
  .pay {
    width: 80px;
    height: 30px;
    color: #ffffff;
    background-color: #8bd876;
  }
`;
