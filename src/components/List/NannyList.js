import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase.config";
import { UserAuth } from "../../context/AuthContext";
import {
  doc,
  getDocs,
  updateDoc,
  query,
  onSnapshot,
  collection,
  where,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
const NannyList = ({ setOpenInform, openInform }) => {
  const { user, bellMessage, setBellMessage } = UserAuth();
  const [clientList, setClientList] = useState([]);
  const [documentId, setDocumentId] = useState(null);

  useEffect(() => {
    if (user.uid) {
      const queryInvite = query(
        collection(db, "invitation"),
        where("toUser.uid", "==", user.uid),
        where("status", "==", "pending")
      );
      const unsubscribe = onSnapshot(queryInvite, (snapshot) => {
        const updatedClientList = snapshot.docs.map((doc) => doc.data());
        setClientList(updatedClientList);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user.uid]);

  const acceptInvite = async (index) => {
    const docId = Date.now().toString();
    setDocumentId(docId);
    setOpenInform(true);
    const inviteRef = doc(
      db,
      "invitation",
      clientList[index]["fromUser"]["id"]
    );
    await updateDoc(inviteRef, {
      documentId: docId,
      status: "accepted",
    });
    const updatedList = clientList.filter((item, i) => i !== index);
    setClientList(updatedList);
    await setDoc(doc(db, "clientHistory", docId), {
      clientId: clientList[index]["fromUser"]["id"],
      clientName: clientList[index]["fromUser"]["name"],
      clientPhotoURL: clientList[index]["fromUser"]["photoURL"],
      userId: user.uid,
      userName: user.displayName,
      userPhotoURL: user.photoURL,
      amount: clientList[index]["price"],
      paymentStatus: "pending",
      dateTime: serverTimestamp(),
    });
    await setDoc(doc(db, "inviteHistory", docId), {
      userId: clientList[index]["fromUser"]["id"],
      userName: clientList[index]["fromUser"]["name"],
      userPhotoURL: clientList[index]["fromUser"]["photoURL"],
      inviteId: user.uid,
      inviteName: user.displayName,
      invitePhotoURL: user.photoURL,
      amount: clientList[index]["price"],
      paymentStatus: "pending",
      dateTime: serverTimestamp(),
    });
  };

  const deniedInvite = async (index) => {
    const inviteRef = doc(
      db,
      "invitation",
      clientList[index]["fromUser"]["id"]
    );
    await updateDoc(inviteRef, {
      status: "denied",
    });
    const updatedList = clientList.filter((item, i) => i !== index);
    setClientList(updatedList);
  };

  return (
    <>
      <Container>
        {clientList.length ? (
          clientList.map((i, index) => {
            return (
              <Flex key={index}>
                <FlexLeft>
                  <Img>
                    <img src={i["fromUser"]["photoURL"] || "user.png"} alt="" />
                  </Img>
                  <b>{i["fromUser"]["name"]}正在向您發送邀請</b>
                </FlexLeft>
                <Button>
                  <button
                    onClick={() => acceptInvite(index)}
                    className="btn pay"
                  >
                    接受
                  </button>
                  <button
                    onClick={() => deniedInvite(index)}
                    className="btn cancel"
                  >
                    拒絕
                  </button>
                </Button>
              </Flex>
            );
          })
        ) : (
          <List>目前沒有任何等待中的客戶</List>
        )}
      </Container>
    </>
  );
};

export default NannyList;

const Container = styled.div`
  margin: auto;
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #696969;
  padding: 20px 0;
  ${({ theme }) => theme.media.tablet`
  flex-direction: column;  
  `}
`;
const FlexLeft = styled(Flex)`
  flex: 2;
  justify-content: start;
  border-bottom: none;
`;
const Img = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 10px;
  ${({ theme }) => theme.media.tablet`
    width: 100px;
  height: 100px;
  margin-bottom: 10px;
  `}
  ${({ theme }) => theme.media.mobile`
    width: 80px;
  height: 80px;
  margin-bottom: 20px;
  `}
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
`;

const Button = styled.div`
  flex: 1;
  text-align: right;
  .btn {
    margin: 5px 15px 0 0;
    vertical-align: middle;
    cursor: pointer;
    width: 55px;
    height: 25px;
    border: none;
    border-radius: 20px;
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
const List = styled.div`
  height: 300px;
  line-height: 300px;
  text-align: center;
`;
