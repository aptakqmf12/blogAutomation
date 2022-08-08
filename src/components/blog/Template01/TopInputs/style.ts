import styled from "styled-components";
import { DatePicker, Select, Button, Row, Col, Input } from "antd";

export const StyledRow = styled(Row)`
  @media only screen and (max-width: 1700px) {
  }
`;
export const StyledCol = styled(Col)`
  @media only screen and (max-width: 1700px) {
  }
`;

export const InputBox = styled.div`
  background-color: ${(props) =>
    props.theme === "light" ? "white" : "#282c35"};
  margin-bottom: 20px;
  padding: 10px;
`;
export const TopInputs = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;
export const InputsBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 200px;
  height: 30px;
  border-radius: 6px;
  background-color: white;
`;

export const SelectBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media only screen and (max-width: 1700px) and (min-width: 950px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
export const SelectTitle = styled.div`
  width: auto;
  margin-right: 20px;
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
    margin-bottom: 10px;
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
