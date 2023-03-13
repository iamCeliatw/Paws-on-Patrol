import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiDelete } from "react-icons/fi";
import { InputPlace, InputTextArea } from "../styles/Account.styled";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { storage } from "../firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../context/AuthContext";
import { uuidv4 } from "@firebase/util";

const Diary = ({
  diary,
  handleDelete,
  diaries,
  setDiaries,
  i,
  dirty,
  setDirty,
}) => {
  const { user } = UserAuth();
  const uid = user.uid;

  const getDiaryTitle = (e) => {
    setDiaries((prev) => {
      prev[i]["title"] = e.target.value;
      return [...prev];
    });
    setDirty(true);
  };
  const [diaryLoad, setDiaryLoad] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imgElement, setImgElement] = useState("");
  const getDiaryText = (e) => {
    setDiaries((prev) => {
      prev[i]["text"] = e.target.value;
      console.log(prev[i]["text"]);
      return [...prev];
    });
    setDirty(true);
  };

  useEffect(() => {
    if (diaryLoad) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(diaryLoad);
    }
  }, [diaryLoad]);

  const getFile = async (e) => {
    setDiaryLoad(e.target.files[0]);
    setImgElement(e.target.parentElement.children[0]);
    uploadFile(e);
  };
  const uploadFile = async (e) => {
    let file = e.target.files[0];
    const fileRef = ref(storage, `${uid}/${file.name}`);
    let result = await uploadBytes(fileRef, file);
    diaries[i]["photo"] = result.metadata.name;
    console.log(diaries[i]["photo"]);
    let newDiaries = [...diaries];
    await setDiaries(newDiaries);
    getDiaryURL(imgElement, i);
    setDirty(true);
  };

  const getDiaryURL = (imageElement, i) => {
    let imageName = diaries[i]["photo"];
    if (imageName) {
      getDownloadURL(ref(storage, `${uid}/${imageName}`))
        .then((url) => {
          setDiaries((prev) => {
            prev[i]["photo"] = url;
            return [...prev];
          });
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      return;
    }
  };
  return (
    <StyledDiv>
      <FiDelete
        className="closeIcon"
        size={30}
        color="#5c5c5c"
        onClick={() => {
          handleDelete(i);
          setDirty(true);
        }}
      />
      <div className="diary-img">
        <label className="upload_cover">
          {preview ? (
            <img src={preview} className="diaryImg" />
          ) : diary["photo"] ? (
            <img src={diary["photo"]} className="diaryImg" />
          ) : (
            <img src={"walkdog.png"} className="diaryImg" />
          )}
          <input
            id="upload_input"
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
          placeholder="幫您的日記取個名字吧"
          value={diaries[i]["title"] ? diaries[i]["title"] : ""}
          onChange={getDiaryTitle}
          type="text"
        />
        <DiaryTextArea
          placeholder="寫下你和毛孩的故事..."
          value={diaries[i]["text"] ? diaries[i]["text"] : ""}
          onChange={getDiaryText}
          cols="50"
          rows="10"
        ></DiaryTextArea>
      </div>
    </StyledDiv>
  );
};

export default Diary;

const StyledDiv = styled.div`
  padding: 15px;
  position: relative;
  display: flex;
  width: 100%;
  height: 350px;
  border-radius: 5px;
  background-color: #ebebeb;
  justify-content: space-around;
  margin-bottom: 30px;
  align-items: center;
  ${({ theme }) => theme.media.laptop`
  height: 450px;
  flex-direction: column;
    text-align: center;
 `}

  .upload_cover {
    margin-top: 25px;
    width: 100%;
    height: 180px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
  }
  .diaryImg {
    border-radius: 10px;
    object-fit: cover;
    width: 200px;
    height: 200px;
  }

  .plus_icon {
    position: absolute;
    right: 45%;
    top: 45%;
  }

  #upload_input {
    display: none;
  }

  .diary-text {
    height: 56%;
    align-items: center;
    justify-content: center;
    width: 60%;
    display: flex;
    flex-direction: column;
    ${({ theme }) => theme.media.tablet`
      align-items: center;
      width: -webkit-fill-available;
 `}
  }
  .closeIcon {
    position: absolute;
    right: 3%;
    top: 3%;
    cursor: pointer;
  }
`;
const DiaryInput = styled.input`
  width: 100%;

  margin: 25px auto;
  padding: 5px;
  outline: none;
  border: none;
  border-radius: 10px;
  filter: drop-shadow(1px 0px 2px rgba(15, 15, 51, 0.4));
  font-size: 15px;
  background-color: #ebebeb;
  transition: 0.3s;
  :hover,
  :focus {
    border-radius: 8px;
    box-shadow: 0 3px 3px rgba(15, 15, 51, 0.4);
  }
`;

const DiaryTextArea = styled.textarea`
  margin: 0 0 10px 0;
  width: 100%;
  padding: 5px;
  white-space: pre-wrap;
  resize: none;
  border: none;
  border-radius: 15px;
  filter: drop-shadow(1px 0px 2px rgba(15, 15, 51, 0.4));
  background-color: #ebebeb;
  transition: 0.3s;
  :hover,
  :focus {
    outline: none;
    border-radius: 8px;
    box-shadow: 0 3px 3px rgba(15, 15, 51, 0.4);
  }
`;
