import React, { useEffect, useState, useRef } from "react";
import Nav from "../components/Nav";
import {
  StyledAccount,
  StyledDiv,
  StyledLabel,
  SubTitle,
  InputPlace,
  Title,
  InputTextArea,
} from "../styles/Account.styled";
import Footer from "../components/Footer";
import Diary from "../components/Diary";
import { db, storage } from "../firebase.config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";

const Account = () => {
  const [mypreview, setMyPreview] = useState("");
  const [photoUpload, setPhotoUpload] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  //   useEffect(() => {
  //     if (photoUpload) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         // setMyPreview(reader.result);
  //         console.log(reader.result);
  //         console.log(photoUpload);
  //       };
  //       reader.readAsDataURL(photoUpload);
  //     }
  //   }, [photoUpload]);

  const ApiKey = "";
  const { user, marker, setMarker } = UserAuth();
  const [nameValue, setNameValue] = useState("");
  const [aboutMeText, setaboutMeText] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  //預覽
  const [preview, setPreview] = useState("");
  //file檔
  const [imageUpload, setImageUpload] = useState(null);
  //字串
  const [profileImage, setProfileImage] = useState("");
  //點擊取得現在位置
  const [getAddress, setGetAddress] = useState(false);
  //diary
  const [diaries, setDiaries] = useState([
    {
      photo: null,
      title: null,
      text: null,
    },
  ]);
  const uid = user.uid;
  const imageProfileRef = ref(storage, `${uid}/profile`);

  //   根據填入地址 定位經緯度
  const LocationHandler = async () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${addressValue}&key=${ApiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          const { lat, lng } = data.results[0].geometry.location;
          console.log({ lat, lng });
          console.log("completed");
          setMarker({ lat, lng });
          console.log(marker);
          resolve();
        })
        //   await setAddressValue({ lat, lng });
        .catch((e) => {
          alert(e.message);
          reject(e);
        });
    });
  };

  // 按下save觸發
  const userSubmit = async () => {
    try {
      if (!addressValue) {
        alert("請填入地址");
        return;
      }
      await LocationHandler();
      await addUserData();
    } catch (e) {
      alert(e.message);
    }
  };
  const getProfileImage = () => {
    return new Promise((resolve, reject) => {
      getDownloadURL(imageProfileRef)
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  //加資料到資料庫
  const addUserData = async () => {
    try {
      await setDoc(doc(db, "user", uid), {
        uid: uid,
        name: nameValue || "",
        price: priceValue || "",
        address: addressValue || "",
        place: marker || "",
        aboutme: aboutMeText || "",
        diary: diaries || "",
      });
      if (imageUpload == null) return;
      const imageRef = ref(storage, `${uid}/profile`);
      await uploadBytes(imageRef, imageUpload);
      alert("image uploaded!");
      const profileImage = await getProfileImage();
      console.log("profileimg", profileImage);
      const docRef = doc(db, "user", uid);
      await updateDoc(docRef, {
        profileURL: profileImage,
      });
      await updateProfile(user, {
        photoURL: profileImage,
        displayName: nameValue,
      });
      console.log("DONE");
    } catch (e) {
      console.log(e.message);
    }
  };

  const getNowAddress = async () => {
    setAddressValue("");
    setGetAddress(true);
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${ApiKey}`
        );
        const data = await response.json();
        setAddressValue(data.results[0].formatted_address);
        setGetAddress(false);
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (user && uid) {
      getUserData();
      console.log(user.photoURL);
    }
  }, [user, user.photoURL]);

  useEffect(() => {
    if (imageUpload) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(imageUpload);
    }
  }, [imageUpload]);

  const getUserData = async () => {
    const docRef = doc(db, "user", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let userdata = docSnap.data();
      setAddressValue(userdata.address);
      setNameValue(userdata.name);
      setPriceValue(userdata.price);
      setaboutMeText(userdata.aboutme);
      setProfileImage(userdata.profileURL);
      setDiaries(userdata.diary);
    }
  };

  const handleAddDiary = async () => {
    setDiaries([
      ...diaries,
      {
        photo: null,
        title: null,
        text: null,
      },
    ]);
  };

  //   const getDiaryImage = () => {
  //     return new Promise((resolve, reject) => {
  //       getDownloadURL(imageRef)
  //         .then((url) => {
  //           resolve(url);
  //         })
  //         .catch((error) => {
  //           reject(error);
  //         });
  //     });
  //   };

  //   const getDiaryPhoto = async (e, i) => {
  //     setDiaries((prev) => {
  //       prev[i]["photo"] = e.target.files[0];
  //       setPhotoURL(URL.createObjectURL(e.target.files[0]));
  //       console.log(prev[i]["photo"]);
  //       return [...prev];
  //     });
  //   };

  const handleDelete = async (index) => {
    diaries.splice(index, 1);
    setDiaries([...diaries]);
  };
  const priceChanger = (e) => {
    setPriceValue(e.target.value);
  };
  return (
    <div style={{ position: "relative" }}>
      <Nav />
      <StyledAccount>
        <StyledDiv style={{ marginTop: "130px" }}>
          <div className="profileImgDiv">
            <label className="upload_cover">
              {preview ? (
                <img src={preview} className="profileImg" />
              ) : profileImage ? (
                <img src={profileImage} className="profileImg" />
              ) : (
                ""
              )}

              <input
                onChange={(e) => {
                  setImageUpload(e.target.files[0]);
                }}
                id="upload_input"
                type="file"
                accept="image/*"
              />
              <AiOutlinePlusCircle className="plus_icon" />
            </label>
            {/* {imageList.map((url, index) => {
              return <img src={url} key={index} className="profileImg" />;
            })} */}
          </div>
          <div className="profileText">
            <button onClick={userSubmit} className="saveBtn">
              Save
            </button>
            <SubTitle>姓名</SubTitle>
            <InputPlace
              value={nameValue ? nameValue : ""}
              onChange={(e) => setNameValue(e.target.value)}
              type="text"
              placeholder="請輸入姓名"
              id="name"
            />
            <div style={{ position: "relative" }}>
              <SubTitle>服務區域</SubTitle>
              <button onClick={getNowAddress} className="autoplace">
                自動填入現在位置
              </button>
              <InputPlace
                value={addressValue ? addressValue : ""}
                id="addressValue"
                type="text"
                placeholder={getAddress ? "取得中..." : "請輸入具體服務地點"}
                onChange={(e) => {
                  setAddressValue(e.target.value);
                }}
              />
            </div>

            <div>
              <SubTitle>價格</SubTitle>
              <input
                type="radio"
                name="label"
                id="price1"
                onChange={priceChanger}
                value="$200/次"
                checked={priceValue === "$200/次"}
              />
              <StyledLabel htmlFor="price1">$200/次</StyledLabel>
              <input
                type="radio"
                name="label"
                id="price2"
                onChange={priceChanger}
                value="$300/次"
                checked={priceValue === "$300/次"}
              />
              <StyledLabel htmlFor="price2">$300/次</StyledLabel>
              <input
                type="radio"
                name="label"
                id="price3"
                onChange={priceChanger}
                value="$400/次"
                checked={priceValue === "$400/次"}
              />
              <StyledLabel htmlFor="price3">$400/次</StyledLabel>
            </div>
          </div>
        </StyledDiv>

        <Title>關於我</Title>

        <StyledDiv>
          <InputTextArea
            value={aboutMeText ? aboutMeText : ""}
            placeholder="請輸入您的自我介紹，讓大家更認識你！"
            onChange={(e) => {
              setaboutMeText(e.target.value);
            }}
          ></InputTextArea>
        </StyledDiv>
        <Title>我的保姆日記</Title>
        {diaries &&
          diaries.map((diary, i) => (
            <Diary
              i={i}
              key={i}
              diary={diary}
              diaries={diaries}
              setDiaries={setDiaries}
              handleDelete={handleDelete}
              photoURL={photoURL}
              setPhotoURL={setPhotoURL}
              // getDiaryPhoto={getDiaryPhoto}
              mypreview={mypreview}
              setMyPreview={setMyPreview}
              photoUpload={photoUpload}
              setPhotoUpload={setPhotoUpload}
              // diaryLoad={diaryLoad}
              // setDiaryLoad=
            />
          ))}
        <button onClick={handleAddDiary} className="diaryButton">
          新增日記
        </button>
      </StyledAccount>
      <Footer />
    </div>
  );
};

export default Account;
