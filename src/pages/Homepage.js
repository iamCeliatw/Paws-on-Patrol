import React, { useState, useRef, useEffect } from "react";
import Map from "../components/Map";
import Nav from "../components/Nav";
import Login from "../components/Login";
import LeftSideBar from "../components/LeftSideBar";
import { useLoadScript } from "@react-google-maps/api";
import { UserAuth } from "../context/AuthContext";
import Signup from "../components/Signup";
import UserBox from "../components/UserBox";
import { db, storage } from "../firebase.config";
import { doc, onSnapshot, collection, getDocs } from "firebase/firestore";
import styled from "styled-components";
import { ref, getDownloadURL } from "firebase/storage";
import Loader from "../components/Loader";
const Homepage = () => {
  const [isActive, setIsActive] = useState(false);
  const [km, setKm] = useState("");
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [priceValue, setPriceValue] = useState(400);
  const formattedPrice = `$${priceValue}`;
  const [center, setCenter] = useState({ lat: 25, lng: 121 });
  const [mapLoading, setMapLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  //userBox內容
  const [userPopups, setUserPopups] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [userData, setUserData] = useState("");
  const [imgLoading, setImgLoading] = useState(true);
  const [openLocation, setOpenLocation] = useState(false);
  const { user, setSearchUser, userselectOpen, setUserselectOpen, openInfo } =
    UserAuth();

  const [openFilterBar, setOpenFilterBar] = useState(false);
  const ApiKey = "AIzaSyDPJLtuEnn3M599D5xRBzcuWfNidrXffI8";
  const mapId = ["df9fc52cd73ef254"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: ApiKey,
    mapIds: mapId,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [mapInputValue, setMapInputValue] = useState("");
  const mapRef = useRef();

  const handlePriceChange = (event) => {
    setPriceValue(event.target.value);
  };

  //   根據填入地址 定位經緯度
  const locationHandler = async () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${mapInputValue}&key=${ApiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          const { lat, lng } = data.results[0].geometry.location;
          setCenter({ lat, lng });
          setOpenLocation(true);
          resolve();
        })
        .catch((e) => {
          alert(`取得地理位置失敗：${e.message}`);
          reject(e);
        });
    });
  };

  //取得現在位置
  useEffect(() => {
    const getCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setOpenLocation(true);
          setMapLoading(false);
        },
        (error) => {
          setMapLoading(false);
          setCenter({ lat: 25.0249141, lng: 121.4869647 });
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("您尚未開啟定位，若要找尋附近使用者請開啟定位並重整頁面。");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("無法取得您的所在地點，請重新整理頁面。");
              break;
            case error.TIMEOUT:
              alert("請求逾時，請重新整理頁面。");
              break;
            default:
              alert("An unknown error occurred.");
              break;
          }
        }
      );
    };
    getCurrentPosition();
  }, []);

  useEffect(() => {
    const getAllLocation = async () => {
      const querySnapshot = await getDocs(collection(db, "user"));
      const data = [];
      const newMarkers = []; // 儲存符合條件的 markers
      if (user) {
        querySnapshot.forEach((doc) => {
          if (
            user &&
            doc.data().uid !== user.uid &&
            doc.data().place &&
            doc.data().price
          ) {
            data.push(doc.data());
            const filterPrice = parseInt(
              doc.data().price.replace(/[^0-9]/gi, ""),
              10
            );
            if (priceValue >= filterPrice) {
              newMarkers.push(doc.data().place);
            }
          }
        });
      } else {
        querySnapshot.forEach((doc) => {
          if (doc.data().place && doc.data().price) {
            data.push(doc.data());
            const filterPrice = parseInt(
              doc.data().price.replace(/[^0-9]/gi, ""),
              10
            );
            if (priceValue >= filterPrice) {
              newMarkers.push(doc.data().place);
            }
          }
        });
      }
      if (!km) {
        setMarkers(newMarkers); // 更新 markers 狀態
      } else {
        setMarkers(filterUsers(newMarkers, km, priceValue));
      }
      setUserData(data);
    };
    getAllLocation();
  }, [priceValue, user, km, center]);

  const filterUsers = (newMarkers, km, priceValue) => {
    return newMarkers.filter((marker) => {
      // 計算用戶與當前位置的距離
      const userLocation = new window.google.maps.LatLng(
        marker.lat,
        marker.lng
      );

      const distance =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          center,
          userLocation
        );
      if (distance <= km) {
        return true;
      }
      return false;
    });
  };

  const getClickedUser = async (marker, e) => {
    setIsActive(true);
    setImgLoading(true);
    const clickedUser = userData.find((user) => user.place.lng === marker.lng);
    if (clickedUser) {
      setUserPopups(clickedUser);
      setSearchUser(clickedUser);
      const userImg = clickedUser.uid;
      const imageRef = ref(storage, `${userImg}/profile`);
      getDownloadURL(imageRef)
        .then((url) => {
          setUserImage(url);
          setImgLoading(false);
        })
        .catch((error) => {
          setUserImage("");
          setImgLoading(false);
        });
    }
  };
  if (mapLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  const icon = { url: "marker.png", scaledSize: { width: 40, height: 40 } };
  return (
    <div style={{ overflow: "hidden" }}>
      {showAlert && (
        <Alert>
          <p>請開啟定位或輸入搜尋地點</p>
          <button onClick={() => setShowAlert(false)}>確認</button>
        </Alert>
      )}
      <OverLay
        showAlert={showAlert}
        openLogin={openLogin}
        openSignup={openSignup}
      ></OverLay>
      <div
        style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
      >
        <Nav
          userselectOpen={userselectOpen}
          setUserselectOpen={setUserselectOpen}
          openLogin={openLogin}
          closeModal={closeModal}
          setCloseModal={setCloseModal}
          setOpenSignup={setOpenSignup}
          setOpenLogin={setOpenLogin}
        />
        <Map
          openLocation={openLocation}
          imgLoading={imgLoading}
          isActive={isActive}
          setIsActive={setIsActive}
          priceValue={priceValue}
          setPriceValue={setPriceValue}
          userImage={userImage}
          userPopups={userPopups}
          setUserPopups={setUserPopups}
          getClickedUser={getClickedUser}
          km={km}
          markers={markers}
          center={center}
          icon={icon}
          mapRef={mapRef}
          isLoaded={isLoaded}
          mapId={"df9fc52cd73ef254"}
          ApiKey={ApiKey}
          mapInputValue={mapInputValue}
          google={window.google}
        />
        <LeftSideBar
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          openLocation={openLocation}
          openFilterBar={openFilterBar}
          setOpenFilterBar={setOpenFilterBar}
          mapInputValue={mapInputValue}
          setMapInputValue={setMapInputValue}
          locationHandler={locationHandler}
          handlePriceChange={handlePriceChange}
          formattedPrice={formattedPrice}
          priceValue={priceValue}
          km={km}
          setKm={setKm}
        />
      </div>
      <Login
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        onClose={() => {
          setOpenLogin(false);
        }}
        onSwitch={() => {
          setOpenLogin(false);
          setOpenSignup(true);
        }}
      />
      <Signup
        openSignup={openSignup}
        closeModal={closeModal}
        setCloseModal={setCloseModal}
        setOpenLogin={setOpenLogin}
        setOpenSignup={setOpenSignup}
        onClose={() => {
          setOpenSignup(false);
        }}
        onSwitch={() => {
          setOpenSignup(false);
          setOpenLogin(true);
        }}
      />
      <HomeFooter>
        Copyright © 2023 Paws on Patrol. All rights reserved.
      </HomeFooter>
    </div>
  );
};

const HomeFooter = styled.div`
  width: 100%;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1;
  height: 50px;
  margin-top: -50px;
  text-align: center;
  line-height: 50px;
  ${({ theme }) => theme.media.mobile`
font-size: 13px;
  `}
`;
const OverLay = styled.div`
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: ${(props) =>
    props.openSignup || props.openLogin || props.showAlert ? "flex" : "none"}; ;
`;
const Alert = styled.div`
  padding: 5px 10px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 300px;
  background-color: #c1c1c1;
  color: #ffffff;
  border-radius: 5px;
  text-align: center;
  button {
    cursor: pointer;
    background-color: #ffffff;
    color: gray;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 10px;
    &:hover {
      background-color: #c1c1c1;
      color: #ffffff;
      border: 1px solid #ffffff;
    }
  }
`;
export default Homepage;
