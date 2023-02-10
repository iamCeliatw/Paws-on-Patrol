import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiDelete } from "react-icons/fi";
import { InputPlace, InputTextArea } from "../styles/Account.styled";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { storage } from "../firebase.config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../context/AuthContext";
import { uuidv4 } from "@firebase/util";

const Diary = ({
  diary,
  handleDelete,
  diaries,
  setDiaries,
  i,
  photoUpload,
  setPhotoUpload,
  mypreview,
  setMyPreview,
  //   getDiaryPhoto,
  photoURL,
  setPhotoURL,
}) => {
  const { user } = UserAuth();
  const uid = user.uid;

  const getDiaryTitle = (e) => {
    setDiaries((prev) => {
      prev[i]["title"] = e.target.value;
      return [...prev];
    });
  };
  const [diaryLoad, setDiaryLoad] = useState(null);
  const [preview, setPreview] = useState(null);
  //   const [photoURL, setPhotoURL] = useState(null);

  const getDiaryText = (e) => {
    setDiaries((prev) => {
      prev[i]["text"] = e.target.value;
      console.log(prev[i]["text"]);
      return [...prev];
    });
  };

  useEffect(() => {
    if (diaryLoad) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(diaryLoad);
    }
    console.log(diaryLoad);
  }, [diaryLoad]);

  const getFile = async (e) => {
    // console.log(e);
    let imageElement = e.target.parentElement.children[0];
    // console.log("imgele", imgElement);
    let file = e.target.files[0];
    console.log(1);
    setDiaryLoad(file);
    const fileRef = ref(storage, `${uid}/${file.name}`);
    let result = await uploadBytes(fileRef, file);
    // console.log(result);
    diaries[i]["photo"] = result.metadata.name;
    let newDiaries = [...diaries];
    await setDiaries(newDiaries);
    getDiaryURL(imageElement, i);
  };

  const getDiaryURL = (imageElement, i) => {
    let imageName = diaries[i]["photo"];
    if (imageName) {
      getDownloadURL(ref(storage, `${uid}/${imageName}`))
        .then((url) => {
          if (url) {
            imageElement.src = url;
            setDiaries((prev) => {
              prev[i]["photo"] = url;
              return [...prev];
            });
          } else {
            return;
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      return;
    }
  };

  // 待解決問題： 把上傳拆出來 待save之後再執行
  // storage and firestore 用照片名字關聯取出??

  return (
    <StyledDiv style={{ marginBottom: "100px" }}>
      <FiDelete
        className="closeIcon"
        size={30}
        color="#5c5c5c"
        onClick={() => handleDelete(i)}
      />
      <div className="diary-img">
        <label className="upload_cover">
          {/* {mypreview ? (
            <img className="diaryImg" src={mypreview} alt="" />
          ) : photoUpload ? (
            <img className="diaryImg" src={photoUpload} alt="" />
          ) : (
            ""
          )} */}
          {(diary["photo"] && (
            <img src={diary["photo"]} className="diaryImg" />
          )) ||
            ""}
          {/* <img src={preview} className="diaryImg" /> */}
          <input
            id="upload_input"
            // onChange={(e) => {
            //   setDiaryLoad(e.target.files[0]);
            // }}
            key={uuidv4()}
            onChange={(key) => getFile(key)}
            type="file"
            accept="image/*"
          />
          <AiOutlinePlusCircle className="plus_icon" />
        </label>
      </div>
      <div className="diary-text">
        <DiaryInput
          value={diaries[i]["title"] ? diaries[i]["title"] : ""}
          onChange={getDiaryTitle}
          type="text"
        />
        <DiaryTextArea
          value={diaries[i]["text"] ? diaries[i]["text"] : ""}
          onChange={getDiaryText}
          cols="30"
          rows="10"
        ></DiaryTextArea>
      </div>
    </StyledDiv>
  );
};

export default Diary;

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 300px;
  border-radius: 5px;
  background-color: #ebebeb;
  justify-content: space-around;
  .upload_cover {
    background-color: #fff;
    margin: auto;
    padding: 10px;
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    position: relative;
    cursor: pointer;
  }
  .plus_icon {
    position: absolute;
    right: 45%;
    top: 45%;
  }
  .diaryImg {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  #upload_input {
    display: none;
  }

  .diary-text {
    display: flex;
    flex-direction: column;
    width: 300px;
    input {
      width: inherit;
    }
    textarea {
      width: inherit;
      margin: 10px 0;
    }
  }
  .closeIcon {
    position: absolute;
    right: 3%;
    top: 3%;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    .diary-text {
      align-items: center;
    }
  }
`;
const DiaryInput = styled(InputPlace)`
  width: 100%;
  margin: 0 0 10px 0;
`;

const DiaryTextArea = styled(InputTextArea)`
  height: 122px;
`;
