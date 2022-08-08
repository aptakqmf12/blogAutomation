import styled from "styled-components";
import { DatePicker, Select, Button, Row, Col, Input } from "antd";

export const SegBestBox = styled.div`
  position: sticky;
  top: 120px;
  height: calc(100vh - 300px);
  overflow: auto;
`;

export const ItemViewBox = styled.div`
  background-color: ${(props) =>
    props.theme === "light" ? "white" : "#282c35"};
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
`;
export const ItemViewTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px 0 30px;
  font-size: 20px;
  font-weight: 700;
`;
export const ItemContainer = styled.div`
  display: flex;
  gap: 30px;
  > div {
    width: 50%;
  }
`;
export const OptionsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
`;
export const Option = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 5px;
  svg {
    margin-left: 5px;
  }
`;

export const StyledTextarea = styled(Input.TextArea)`
  background-color: #eee;
  border-radius: 10px;
  resize: none;
  text-align: center;
  height: 20px;
  min-height: 20px;
  max-height: 20px;
  margin-bottom: 20px;
`;
export const CheckBoxSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 700px;
  overflow: auto;
`;

export const ItemCheckBox = styled.div`
  position: relative;
  width: 50%;
  padding: 10px;
  img {
    width: 100%;
  }
  .check-box {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

export const SegImgContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
  margin-bottom: 50px;
  gap: 20px;
  background-color: #f2f2f2;
  border: 3px ${(props) => props.color} solid;
  counter-reset: segCount;
  .content {
    position: relative;
    background-color: white;
    width: calc(50% - 10px);
    border: 1px #d8d8d8 solid;

    img {
      width: 100%;
    }
    &::before {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      counter-increment: segCount;
      content: counter(segCount);
      left: -10px;
      top: -10px;
      width: 40px;
      height: 40px;
      background-color: ${(props) => props.color};
      color: black;
      font-size: 24px;
      font-weight: bold;
      border-radius: 5px;
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
      font-family: "BMJUA";
    }
  }
`;
