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
  const [km, setKm] = useState("");
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [priceValue, setPriceValue] = useState(200);
  const [location, setLocation] = useState(null);
  const [center, setCenter] = useState("");
  const [mapLoading, setMapLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  //userBox內容
  const [userPopups, setUserPopups] = useState([]);
  const [userImage, setUserImage] = useState("");
  const { user, searchUser, setSearchUser } = UserAuth();
  //   const query = collection(db, "users");
  const ApiKey = "AIzaSyDPJLtuEnn3M599D5xRBzcuWfNidrXffI8";
  const mapId = ["df9fc52cd73ef254"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: ApiKey,
    mapIds: mapId,
  });

  const [mapInputValue, setMapInputValue] = useState("");
  const mapRef = useRef();

  const handlePriceChange = (event) => {
    setPriceValue(event.target.value);
  };

  //   const handleSubmit = async () => {
  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${mapInputValue}&key=${ApiKey}`
  //     );
  //     const data = await response.json();
  //     const { lat, lng } = data.results[0].geometry.location;
  //     setCenter({ lat, lng });
  //   };
  //取得現在位置
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setMapLoading(false);
      },
      (error) => console.log(error)
    );
  }, []);
  //取得所有用戶位置
  const getAllLocation = async () => {
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
      setMarkers((prevMarkers) => {
        return [...prevMarkers, doc.data().place];
      });
    });
  };

  const getClickedUser = async (marker, e) => {
    setCenter(e.latLng);
    // console.log(e.latLng);
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
      const clickedIcon = doc.data().place;
      if (marker.lng === clickedIcon.lng) {
        console.log(doc.data());
        setUserPopups(doc.data());
        setSearchUser(doc.data());
        const userImg = doc.data().uid;
        const imageRef = ref(storage, `${userImg}/profile`);
        getDownloadURL(imageRef).then((url) => {
          setUserImage((prev) => [...prev, url]);
          setUserImage(url);
        });
      }
    });
  };
  console.log(center);
  if (loadError) return "Error";
  if (!isLoaded || mapLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  const icon = { url: "marker.png", scaledSize: { width: 40, height: 40 } };
  return (
    <>
      <OverLay openLogin={openLogin} openSignup={openSignup}></OverLay>
      <div style={{ position: "relative" }}>
        <Nav
          openLogin={openLogin}
          closeModal={closeModal}
          setCloseModal={setCloseModal}
          setOpenSignup={setOpenSignup}
          setOpenLogin={setOpenLogin}
        />

        <Map
          userImage={userImage}
          userPopups={userPopups}
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
          getAllLocation={getAllLocation}
        />
        <LeftSideBar
          handlePriceChange={handlePriceChange}
          priceValue={priceValue}
          min={200}
          max={400}
          step={100}
          km={km}
          setKm={setKm}
        />
      </div>
      <Login
        openLogin={openLogin}
        closeModal={closeModal}
        setCloseModal={setCloseModal}
        setOpenSignup={setOpenSignup}
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
      {/* )} */}
      <HomeFooter>Copyright © Paws on Patrol 2023 </HomeFooter>
    </>
  );
};

const HomeFooter = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1;
  height: 50px;
  text-align: center;
  line-height: 50px;
`;
const OverLay = styled.div`
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: ${(props) =>
    props.openSignup || props.openLogin ? "flex" : "none"}; ;
`;

export default Homepage;
