import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase.config";
import { UserAuth } from "../../context/AuthContext";
import { doc, getDocs, where, collection, query } from "firebase/firestore";
const InviteHistory = () => {
  const { user } = UserAuth();
  const [history, setHistory] = useState([]);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    getHistory();
  }, [user, user.uid]);

  const getHistory = async () => {
    if (user.uid) {
      const queryHistory = query(
        collection(db, "inviteHistory"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(queryHistory);

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const timestamp = data.dateTime;
        const date = new Date(
          timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
        ); // 將時間戳記轉換為Date物件

        setHistory((prev) => [...prev, { ...data, date }]);
        setOrderList((prev) => [...prev, doc.id]);
      });
    }
  };
  return (
    <Container>
      {history
        ? history.map((i, index) => (
            <List key={index}>
              <div className="leftDetail">
                <div className="img-div">
                  <img src={i["invitePhotoURL"]} alt="" />
                </div>
                <div className="text-detail">
                  <b>保姆名稱：{i["inviteName"]}</b>
                  <p>價格：{i["amount"]}</p>
                  <p>交易日期： {i["date"].toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p>
                  訂單狀態：
                  {i["paymentStatus"] === "paid" ? (
                    <span style={{ color: "green" }}>已付款</span>
                  ) : i["paymentStatus"] === "declined" ? (
                    <span style={{ color: "red" }}>訂單已取消</span>
                  ) : (
                    <span style={{ color: "orange" }}>未付款</span>
                  )}
                </p>
              </div>
            </List>
          ))
        : ""}
    </Container>
  );
};

export default InviteHistory;

const Container = styled.div`
  overflow: scroll;
  margin: auto;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #8e8e8e;

  ${({ theme }) => theme.media.tablet`
font-size: 15px;
  `}
`;
const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dedede;
  padding: 10px 5px;
  ${({ theme }) => theme.media.tablet`
 flex-direction: column;
 align-items:center;
  `}
  .leftDetail {
    display: flex;
    align-items: center;
    width: auto;
    justify-content: space-evenly;
    ${({ theme }) => theme.media.tablet`
    text-align: center;
 flex-direction: column;
 align-items:center;
  `}
    .text-detail {
      line-height: 22px;
      margin-left: 10px;
    }
    .img-div {
      width: 60px;
      height: 60px;
    }
    img {
      border-radius: 100px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
