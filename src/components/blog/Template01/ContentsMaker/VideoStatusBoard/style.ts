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

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0 50px;
`;
export const Video = styled.div`
  width: calc(20% - 20px);
  margin: 10px;
  box-shadow: 3px 3px 3px lightgray;
  border: 1px lightgray solid;
  border-radius: 10px;
  .thumb {
    margin: 0 auto;
    padding: 0px;
    max-width: 300px;
    height: 250px;

    img {
      width: 100%;
    }
  }
  .info {
    padding: 10px;
    background-color: ${(props) => props.color};

    border-radius: 0 0 10px 10px;
    .id {
      font-size: 24px;
      color: white;
    }
    .name {
      margin-bottom: 10px;
      font-size: 11px;
      color: white;
    }
    .date {
      font-size: 12px;
      color: white;
    }
    .status {
      margin-bottom: 5px;
      font-size: 18px;
      color: #f8f9d7;
    }
    a {
      display: inline-block;
      padding: 0 5px;
      font-size: 16px;
      color: #c4d7e0;
      transition: all 0.3s ease;
      border-radius: 3px;
      &:hover {
        background-color: #f8f9d7;
        color: #6e85b7;
      }
    }
  }
`;
