import React, { useEffect, useState, useRef } from "react";
import Nav from "../components/Nav";
import ScrollTopButton from "../components/scrollTopButton";
import { IoClose } from "react-icons/io5";

import {
  StyledAccount,
  StyledDiv,
  StyledLabel,
  SubTitle,
  InputPlace,
  Title,
  InputTextArea,
  Container,
  MarginBox,
  Button,
  Keyword,
  AboutmeInput,
  SaveButton,
} from "../styles/Account.styled";
import Footer from "../components/Footer";
import Diary from "../components/Diary";
import { db, storage } from "../firebase.config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { updateProfile } from "firebase/auth";

const Account = () => {
  const [mypreview, setMyPreview] = useState("");
  const [photoUpload, setPhotoUpload] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [getNewMarker, setGetNewMarker] = useState(false);
  //tag
  const [tags, setTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");

  const [dirty, setDirty] = useState(false);

  const { user, marker, setMarker } = UserAuth();
  const [nameValue, setNameValue] = useState("");
  const [aboutMeText, setaboutMeText] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  //預覽
  const [preview, setPreview] = useState(null);
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
  const getProfileImage = () => {
    return new Promise((resolve, reject) => {
      getDownloadURL(imageProfileRef)
        .then((url) => {
          resolve(url);
          setProfileImage(url);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (dirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dirty]);

  useEffect(() => {
    if (!getNewMarker) {
      return;
    }
    if (marker && getNewMarker === true) {
      addUserData();
    }
  }, [marker]);

  //tag change and save
  const handleInputChange = (event) => {
    setTagInputValue(event.target.value);
    setDirty(true);
  };
  // tag enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && tagInputValue !== "") {
      if (tags.length >= 5) {
        alert("至多新增五個標籤");
        return;
      }
      setTags([...tags, tagInputValue]);
      setTagInputValue("");
    }
  };
  //tag delete
  const handleDeleteTag = (index) => {
    setTags(tags.filter((tag, i) => i !== index));
    setDirty(true);
  };

  const LocationHandler = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${addressValue}&key=${ApiKey}`
      );
      const data = await response.json();

      const { lat, lng } = data.results[0].geometry.location;
      setMarker({ lat, lng });
      setGetNewMarker(true);
    } catch (error) {
      console.log(error);
      alert(`取得地理位置失敗：${error.message}`);
      alert("找不到地址");
      throw error;
    }
  };

  // 按下save觸發
  const userSubmit = async () => {
    if (!addressValue) {
      alert("請填入地址");
      return;
    } else if (!priceValue) {
      alert("請填入價格");
      return;
    }
    try {
      await LocationHandler();
      await addUserData();
      alert("更新成功");
      setDirty(false);
    } catch (e) {
      alert("something went wrong:", e.message);
    }
  };

  //加資料到資料庫
  const addUserData = async () => {
    try {
      await setDoc(doc(db, "user", uid), {
        uid: uid,
        name: nameValue,
        price: priceValue,
        address: addressValue,
        place: marker || "",
        aboutme: aboutMeText || "",
        diary: diaries || "",
        profileURL: profileImage || "",
        tags: tags || "",
      });
      setGetNewMarker(false);
      if (imageUpload) {
        await addProfileImg();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const addProfileImg = async () => {
    //上傳到storage
    const imageRef = ref(storage, `${uid}/profile`);
    await uploadBytes(imageRef, imageUpload);
    const profileImage = await getProfileImage();
    //新增到資料庫
    const docRef = doc(db, "user", uid);
    await updateDoc(docRef, {
      profileURL: profileImage,
    });
    await updateProfile(user, {
      photoURL: profileImage,
      displayName: nameValue,
    });
  };
  //when press get now address
  const getNowAddress = async () => {
    setDirty(true);
    setAddressValue("");
    setGetAddress(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
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
      },
      (error) => {
        console.error(error);
        setGetAddress(false);
        alert("無法取得當前定位，請檢查您的網路狀態和定位設定。");
      }
    );
  };

  useEffect(() => {
    if (user && uid) {
      getUserData();
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
      setMarker(userdata.place);
      setNameValue(userdata.name);
      setPriceValue(userdata.price);
      setaboutMeText(userdata.aboutme);
      setProfileImage(userdata.profileURL);
      setTags(userdata.tags || []);
      setDiaries(
        userdata.diary || [
          {
            photo: null,
            title: null,
            text: null,
          },
        ]
      );
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

  const handleDelete = async (index) => {
    if (index === 0 && diaries.length === 1) {
      return;
    }
    diaries.splice(index, 1);
    setDiaries([...diaries]);
  };
  const priceChanger = (e) => {
    setPriceValue(e.target.value);
    setDirty(true);
  };
  return (
    <>
      <ScrollTopButton />
      <Container>
        <Nav />
        <StyledAccount>
          <MarginBox>
            <StyledDiv>
              <div className="profileImgDiv">
                <label className="upload_cover">
                  {preview ? (
                    <img src={preview} className="profileImg" />
                  ) : profileImage ? (
                    <img src={profileImage} className="profileImg" />
                  ) : (
                    <img src="user.png" className="profileImg" />
                  )}
                  <input
                    onChange={(e) => {
                      setImageUpload(e.target.files[0]);
                      setDirty(true);
                    }}
                    id="upload_input"
                    type="file"
                    accept="image/*"
                  />
                  <AiOutlinePlusCircle className="plus_icon" />
                </label>
              </div>
              <div className="profileText">
                <SubTitle>姓名</SubTitle>
                <InputPlace
                  value={nameValue ? nameValue : ""}
                  onChange={(e) => {
                    setNameValue(e.target.value);
                    setDirty(true);
                  }}
                  type="text"
                  placeholder="請輸入姓名"
                  id="name"
                />
                <div style={{ position: "relative" }}>
                  <SubTitle>服務區域</SubTitle>
                  <button onClick={getNowAddress} className="autoplace">
                    現在位置
                  </button>
                  <InputPlace
                    value={addressValue ? addressValue : ""}
                    id="addressValue"
                    type="text"
                    placeholder={
                      getAddress ? "取得中..." : "請輸入可提供服務的詳細地址"
                    }
                    onChange={(e) => {
                      setAddressValue(e.target.value);
                      setDirty(true);
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
              <AboutmeInput
                value={aboutMeText ? aboutMeText : ""}
                placeholder="請輸入您的自我介紹，讓大家更認識你！"
                onChange={(e) => {
                  setaboutMeText(e.target.value);
                  setDirty(true);
                }}
              ></AboutmeInput>
            </StyledDiv>

            <Title>關鍵字</Title>
            <Keyword>
              {tags.map((tag, index) => (
                <span className="tag" key={index}>
                  {tag}
                  <IoClose
                    className="icon"
                    onClick={() => handleDeleteTag(index)}
                  ></IoClose>
                </span>
              ))}
              <InputPlace
                placeholder="按下Enter即可生成個人關鍵字"
                className="tagInput"
                type="text"
                value={tagInputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyDown}
              />
            </Keyword>

            <Title>我的保姆日記</Title>
            {diaries &&
              diaries.map((diary, i) => (
                <Diary
                  dirty={dirty}
                  setDirty={setDirty}
                  i={i}
                  key={i}
                  diary={diary}
                  diaries={diaries}
                  setDiaries={setDiaries}
                  handleDelete={handleDelete}
                  photoURL={photoURL}
                  setPhotoURL={setPhotoURL}
                  mypreview={mypreview}
                  setMyPreview={setMyPreview}
                  photoUpload={photoUpload}
                  setPhotoUpload={setPhotoUpload}
                />
              ))}
            <Button>
              <button onClick={handleAddDiary} className="diaryButton">
                新增日記
              </button>
              <SaveButton
                onClick={() => {
                  userSubmit();
                }}
              >
                儲存
              </SaveButton>
            </Button>
          </MarginBox>
        </StyledAccount>
        <Footer />
      </Container>
    </>
  );
};

export default Account;
