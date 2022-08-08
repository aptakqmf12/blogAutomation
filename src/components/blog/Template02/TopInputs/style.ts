import styled from "styled-components";
import { DatePicker, Select, Button, Row, Col, Input } from "antd";

export const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.theme === "light" ? "white" : "#282c35"};
  margin-bottom: 20px;
  padding: 10px 50px;
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 2px 2px 5px lightgray;
`;

export const SelectCol = styled.div`
  display: flex;
`;

export const ButtonCol = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 350px;
`;

export const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & + & {
    margin-left: 25px;
  }
  @media only screen and (max-width: 1700px) and (min-width: 950px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
export const SelectTitle = styled.div`
  width: auto;
  margin-right: 10px;
  font-weight: bold;
  letter-spacing: -0.5px;
`;

export const StyledSelect = styled(Select)`
  width: 200px;
  height: 30px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.theme === "light" ? "white" : "#282c35"};
  &.ant-select-selector {
    color: ${(props) => (props.theme === "light" ? "black" : "#6f68b5")};
  }
  &.ant-select {
    margin-bottom: 1px;
  }
`;

export const StyledButton = styled(Button)`
  width: 150px;
  height: 30px;
  margin: 0 10px 10px 10px;
  padding: 0 0px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  margin-left: auto;
  letter-spacing: -0.2px;
  &.ant-btn {
    // 안먹으면 !import
    height: 30px;
    padding: 4px 0px;
    border-radius: 6px;
    font-weight: bold;
  }
`;
