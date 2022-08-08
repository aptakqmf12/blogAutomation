import styled, { css } from "styled-components";
import { DatePicker, Select, Button, Row, Col, Input } from "antd";

export const ViewBox = styled.div`
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-family: "나눔고딕";
`;

export const KeywordViewBox = styled.div`
  background-color: ${(props) =>
    props.theme === "light" ? "white" : "#282c35"};
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-family: "나눔고딕";
`;
export const StyledTextarea = styled(Input.TextArea)`
  resize: none;
  &.ant-input {
    margin-bottom: 30px;
  }
`;

// Item View 페이지
export const ItemViewBox = styled.div`
  background-color: ${(props) =>
    props.theme === "light" ? "white" : "#282c35"};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-family: "나눔고딕";
  text-align: center;
`;
export const ItemBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding: 25px 50px;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px #c4c4c4 dashed;
  &:hover {
    box-shadow: 1px 1px 5px 5px #eee;
  }
`;
export const DeleteBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  .delete {
    font-size: 28px;
    transition: all 0.3s ease;
    &:hover {
      font-size: 34px;
    }
  }
`;
export const ThumbBox = styled.div`
  img {
    width: 100%;
    max-width: 200px;
    max-height: 200px;
    border: 1px #e5e5e5 solid;
  }
`;
export const BuyBtnBox = styled.div`
  img {
    width: 100%;
    max-width: 400px;
  }
`;
export const Source = styled.div`
  font-size: 12px;
  color: #000;
`;
export const BrandName = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;
export const PrdName = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  color: #7c7c7c;
  font-weight: bold;
`;
export const DiscountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .info {
    margin-right: 10px;
  }
  .ant-checkbox-inner {
    width: 20px;
    height: 20px;
  }
`;
export const DiscountSelect = styled(Select)`
  width: 70%;
  margin-bottom: 10px;
  font-size: 14px;
  .ant-select-selector {
    height: 30px !important;
    background-color: #e5e5e5 !important;
    .ant-select-selection-item {
      line-height: 30px !important;
    }
  }
  .ant-select-arrow {
    color: #7c7c7c;
  }
`;
export const LabelBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const Label = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 130px;
  margin-bottom: 10px;

  border: 1px gray solid;
  border-radius: 20px;
  font-size: 12px;
  @media only screen and (max-width: 1520px) {
    &:nth-child(2) {
      margin-left: 0px;
    }
  }
  &.selected {
    border: 3px red solid;
  }
  &:nth-child(2) {
    margin-left: 10px;
  }
  &:hover {
    box-shadow: 1px 1px 3px 3px #eee;
  }
  & > p {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export const HashTagsBox = styled.div`
  text-align: center;
  font-size: 14px;
`;
export const HashTitle = styled.div`
  font-weight: bold;
`;
export const HashTage = styled.div``;
