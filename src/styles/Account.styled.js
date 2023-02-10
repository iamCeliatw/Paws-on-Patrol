import styled from "styled-components";

export const StyledAccount = styled.div`
  margin: auto;
  width: 60%;
  display: flex;
  flex-direction: column;
  .diaryButton {
    margin: 50px auto 100px auto;
    border: none;
    background-color: white;
    width: 80px;
    font-size: 15px;
    border-radius: 10px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    cursor: pointer;
    &:hover {
      background-color: #5b5b5b;
      color: #ffffff;
    }
  }
`;

export const StyledDiv = styled.div`
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
    width: 100%;
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    position: relative;
    cursor: pointer;
  }
  #upload_input {
    display: none;
  }

  .saveBtn {
    cursor: pointer;
    position: absolute;
    right: 3%;
    top: 15px;
    font-size: 20px;
    height: 30px;
    width: 70px;
    background-color: #ffffff;
    &:hover {
      border: 1px solid #5b5b5b;
      background-color: #474747;
      color: #ffffff;
      opacity: 0.8;
    }
  }
  .profileImgDiv {
    margin: 15px 0;
    text-align: center;
    width: 400px;
    position: relative;
  }
  .profileText {
    color: #5b5b5b;
  }
  .plus_icon {
    position: absolute;
    right: 45%;
    top: 45%;
  }
  .profileImg {
    overflow: hidden;
    object-fit: cover;
    width: 100%;
    height: 100%;
    top: 5%;
    left: 5%;
    border-radius: 50%;
  }

  button {
    border-radius: 20px;
    border: none;
    font-size: 18px;
    height: 15px;
  }

  input[type="radio"]:checked + label {
    background: #6f6f6f;
    color: #fff;
    cursor: default;
  }

  #price1,
  #price2,
  #price3 {
    display: none;
  }

  .userName {
    margin-top: 15px;
  }

  .closeIcon {
    position: absolute;
    right: 3%;
    top: 3%;
    cursor: pointer;
  }
  .autoplace {
    height: 20px;
    position: absolute;
    top: 0;
    left: 26%;
    font-size: 13px;
    cursor: pointer;
    background-color: white;
    border: 1px solid #5b5b5b;
    &:hover {
      background-color: #5b5b5b;
      color: white;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
  .profileText {
    width: 100%;
  }
`;

export const StyledLabel = styled.label`
  border-radius: 15px;
  display: inline-block;
  margin: 0 5px 10px 10px;
  padding: 5px 10px;
  background: #f7f7f7;
  color: #474747;
  cursor: pointer;
  font-size: 15px;
`;

export const SubTitle = styled.p`
  font-size: 16px;
  margin: 10px;
`;
export const InputPlace = styled.input`
  margin: 0 10px;
  height: 25px;
  width: 250px;
  padding: 12.5px;
  outline: none;
  border: none;
  border-radius: 30px;
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

export const Title = styled.h3`
  color: #5b5b5b;
  margin: 10px 0px;
`;
export const InputTextArea = styled.textarea`
  padding: 12.5px;
  aspect-ratio: 3/1;
  white-space: pre-wrap;
  width: 80%;
  height: auto;
  margin: 10px auto;
  resize: none;
  border: none;
  border-radius: 30px;
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
