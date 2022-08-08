import styled, { css } from "styled-components";
import {
  DatePicker,
  Select,
  Button,
  Row,
  Col,
  Upload,
  Input,
  Checkbox,
} from "antd";

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

export const ItemContainer = styled.div`
  position: relative;
  min-width: 1080px;
  max-width: 1080px;
  min-height: 1080px;
  max-height: 1080px;
  padding: 20px 20px 0px 20px;
  text-align: center;
  border: 1px #eee solid;
  zoom: 70%;
  background-color: #dfe0f3;
  /* ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
    `} */

  &.Instagram-Cover {
    padding: 20px 40px;
  }
`;

export const ItemBox = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  background-color: white;
  box-shadow: 3px 3px 5px #d0d0d0;
  border: 1px #d0d0d0 solid;
  border-radius: 20px;
`;

export const TopResourceInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  padding: 10px 0;
  background-color: #ced1d4;
  font-size: 20pt;

  border-radius: 20px 20px 0 0;

  .btns {
    display: flex;
    margin: 0;
    list-style: none;
    li {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      & + li {
        margin-left: 10px;
      }
    }
  }
  .info {
    width: 100%;
    max-width: 800px;
    margin-left: 20px;
    padding: 1px 30px;
    border-radius: 10px;
    background-color: white;
    text-align: center;
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "Cafe24Dangdanghae";
    font-weight: 800;
  }
`;

export const BottomPrdInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: calc(100% - 60px);
  padding: 0 20px;
  background-color: white;
  border-radius: 0 0 20px 20px;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: "BMJUA", "Cafe24Dangdanghae";
`;

export const ThumbImg = styled.div`
  width: 400px;
  height: 460px;

  padding: 30px 0;
  img {
    width: 100%;
    max-width: 400px;
    max-height: 400px;
  }
`;
export const Source = styled.div`
  font-size: 14px;
`;
export const BrandName = styled.div`
  margin-bottom: 20px;
  font-family: "BMJUA", "Jalnan", "나눔고딕";

  font-size: 53px;
  line-height: 1;
`;
export const ItemName = styled.div`
  font-family: "BMJUA", "Jalnan", "나눔고딕";
  font-weight: 500;
  font-size: 33px;
  color: #666;
`;
export const DiffOption = styled.div`
  font-size: 21px;
  color: #666;
  b {
    padding: 0 5px;
    font-size: 24px;
    color: #41d4c3;
  }
`;
export const LabelBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  transform: scale(1.4);
`;
export const InputWrap = styled.div`
  width: calc(100% - 40px);
  margin-left: 40px;
`;
export const InputBox = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #efefef;
  border: 1px #dcdbdb solid;
  & + & {
    margin-top: 50px;
  }
`;

export const FileUpload = styled.div`
  margin-top: 10px;
`;
export const DubbingInfo = styled.div`
  margin-top: 30px;
`;
export const StyledInput = styled(Input.TextArea)`
  margin-top: 10px;
  font-size: 18px;
  resize: none;
`;
export const StyledCheckbox = styled(Checkbox)`
  font-size: 20px;
  margin-left: 0 !important;

  .ant-checkbox-inner {
    width: 20px;
    height: 20px;
  }
`;
export const StyledButton = styled(Button)`
  text-align: right;
`;
export const StyledSelect = styled(Select)`
  width: 200px;
  height: 200px;
  .ant-select-selector {
    height: 200px !important;
    .ant-select-selection-search {
    }
    .ant-select-selection-item {
    }
  }
`;
// 커버 이미지
export const CoverItemBox = styled(ItemBox)`
  height: auto;
`;

export const CoverTitle = styled.div`
  position: absolute;
  right: 10px;
  bottom: 120px;
  width: 85%;
  z-index: 1;
`;

export const CoverTopResourceInfo = styled(TopResourceInfo)`
  height: auto;
  padding: 5px;
  border-radius: 10px 10px 0 0;
  .btns {
    li {
      width: 15px;
      height: 15px;
    }
  }
`;

export const CoverBottomTitle = styled(BottomPrdInfo)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  height: calc(84px * 2 * 1.5);
  font-size: 84px;
  line-height: 1.5;
  font-family: "BMJUA", "Jalnan", "나눔고딕";
  overflow: hidden;
`;

// 키워드 이미지
export const KeywordBox = styled.div`
  font-size: 24px;
  text-align: cente;
  table {
    width: 500px;
    border-collapse: collapse;
    th,
    td {
      border: 1px white solid;
    }
    th {
      background-color: #7c77ea;
      color: white;
    }
    td {
      padding: 5px 10px;
      border: 1px white solid;
      background-color: #f0f0f0;
      .todaysPick {
        span {
          font-size: 24px;
        }
      }
    }
  }
`;

export const KeywordsBottomContent = styled(BottomPrdInfo)`
  display: flex;
  justify-content: center;
`;

export const KeywordsTitle = styled.div`
  display: flex;

  .titles {
    .edit {
      max-width: 600px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .slogan {
      font-size: 36px;
    }
  }

  img {
    width: 300px;
  }
`;
export const KeywordsDate = styled.div`
  width: 100%;
  text-align: left;
  font-size: 20px;
`;
export const KeywordsChart = styled.div`
  display: flex;
`;

// 마지막 페이지
export const FinishItemBox = styled(ItemBox)`
  height: 80%;
`;
export const FinishTop = styled(TopResourceInfo)``;
export const FinishBottomPrdInfo = styled(BottomPrdInfo)`
  background-color: #f2f2f2 !important;

  .whiteBoard {
    width: 90%;
    padding: 30px 50px;
    border-radius: 20px;
    background-color: white;
    box-shadow: 3px 3px 6px rgba(200, 200, 200);
    line-height: 2;
    font-family: "BMJUA", "Jalnan", "Cafe24Dangdanghae";

    &__title {
      font-size: 60px;
      text-align: left;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: bold;
    }
    &__slogan {
      font-size: 40px;
      text-align: left;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
