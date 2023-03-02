import React, { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import styled from "styled-components";
import { UserAuth } from "../../context/AuthContext";
import { doc, getDocs, where, collection, query } from "firebase/firestore";

const NannyHistory = () => {
  const { user } = UserAuth();
  const [history, setHistory] = useState([]);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    getHistory();
  }, [user, user.uid]);

  //待做： 監聽status狀態變化 更新頁面

  const getHistory = async () => {
    if (user.uid) {
      const queryHistory = query(
        collection(db, "clientHistory"),
        where("userId", "==", user.uid)
      );
      //   console.log(user.uid);
      const querySnapshot = await getDocs(queryHistory);
      //   console.log(querySnapshot);
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
                  <img src={i["clientPhotoURL"] || "user.png"} alt="" />
                </div>
                <div>
                  <b>保姆名稱：{i["clientName"]}</b>
                  <p>價格：{i["amount"]}</p>
                  <p>交易日期： {i["date"].toLocaleString()}</p>
                </div>
              </div>
              <div>
                <b>
                  訂單狀態:
                  {i["paymentStatus"] === "paid"
                    ? "已付款"
                    : i["paymentStatus"] === "declined"
                    ? "訂單已取消"
                    : "未付款"}
                </b>
              </div>
            </List>
          ))
        : ""}
    </Container>
  );
};
export default NannyHistory;
const Container = styled.div`
  overflow: scroll;
  margin: auto;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #8e8e8e;
`;
const List = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dedede;
  padding: 10px 5px;
  .leftDetail {
    display: flex;
    align-items: center;
    width: 350px;
    justify-content: space-evenly;
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
