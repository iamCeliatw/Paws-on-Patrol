import styled from "styled-components";

export const Container = styled.div`
  /* position: relative; */
`;

export const StyledAccount = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
`;

export const MarginBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 160px auto 80px auto;
  width: 60%;
  min-height: 100vh;
  ${({ theme }) => theme.media.tablet`
  width:100%;
  `}
`;

export const StyledDiv = styled.div`
  margin: auto;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 100px;
  border-radius: 5px;
  background-color: #ebebeb;
  justify-content: space-around;
  ${({ theme }) => theme.media.tablet`
   flex-direction: column;
    text-align: center;
  `}
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

  .profileImgDiv {
    margin: 15px 0;
    text-align: center;
    flex: 1;
    position: relative;
  }
  .profileText {
    margin: 15px 0;
    flex: 2;
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
  .confirmButton {
    margin: 10px;
    border-radius: 10px;
    border: none;
    color: #5b5b5b;
    background-color: #ffffff;
    width: 70px;
    height: 23px;
    font-size: 13px;
    vertical-align: top;
    box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    &:hover {
      background-color: #ffffffac;
    }
    ${({ theme }) => theme.media.tablet`
    margin-top: 10px;
    `}
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
    position: absolute;
    top: 0;
    left: 30%;
    border-radius: 10px;
    border: none;
    color: #5b5b5b;
    background-color: #ffffff;
    width: 70px;
    height: 23px;
    font-size: 13px;
    vertical-align: top;
    box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
    /* filter: drop-shadow(0px 0px 2px rgba(15, 15, 51, 0.4)); */
    cursor: pointer;
    &:hover {
      background-color: #ffffffac;
    }
    ${({ theme }) => theme.media.tablet`
    left: 70%;
    `}
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
  ${({ theme }) => theme.media.tablet`
  
  padding: 0 10px;
  `}
`;
export const InputPlace = styled.input`
  margin: 0 10px;
  height: 25px;
  width: 250px;
  padding: 12.5px;
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

  ${({ theme }) => theme.media.tablet`
  width:100%;
  margin: 0 ;
  `}
`;

export const Title = styled.h3`
  color: #5b5b5b;
  margin: 15px 10px;
`;

export const Keyword = styled.div`
  background-color: #ebebeb;
  padding: 15px;
  border-radius: 5px;
  width: 100%;
  .tag {
    display: inline-block;
    word-wrap: break-word;
    margin: 10px;
    padding: 5px 12px;
    width: auto;
    border-radius: 20px;
    font-size: 16px;
    background-color: #ffffff;
    button {
      border: none;
      background-color: lightgray;
      border-radius: 100%;
      width: 20px;
      height: 20px;
      margin-left: 5px;
    }
  }
  .tagInput {
    margin: 15px 0;
  }

  .icon {
    vertical-align: text-top;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;
export const InputTextArea = styled.textarea`
  padding: 12.5px;
  aspect-ratio: 3/1;
  white-space: pre-wrap;
  width: 100%;
  height: 100%;
  margin: 10px auto;
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

export const Button = styled.div`
  display: flex;
  justify-content: center;
  .diaryButton {
    margin-right: 20px;
    border: none;
    color: #5b5b5b;
    background-color: #ffffff;
    width: 100px;
    height: 40px;
    font-size: 15px;
    border-radius: 30px;
    box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
    /* filter: drop-shadow(0px 0px 2px rgba(15, 15, 51, 0.4)); */
    cursor: pointer;
    &:hover {
      background-color: #5b5b5b;
      color: #ffffff;
    }
  }
`;

export const AboutmeInput = styled(InputPlace)`
  width: 100%;
  height: auto;
`;
export const SaveButton = styled.button`
  text-align: center;
  background-color: #ffffff;
  border: none;
  color: #5b5b5b;
  width: 90px;
  font-size: 15px;
  height: 40px;
  border-radius: 30px;
  box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
  /* ${({ theme }) => theme.media.tablet`
     background-image: url(save.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50% 50%;
    padding: 20px;
    font-size: 0;
    width: 35px;
    height: 35px;
    right: 5%;
    `} */
  cursor: pointer;
  &:hover {
    background-color: #5b5b5b;
    color: #ffffff;
  }
`;
