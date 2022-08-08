import styled from "styled-components";
import { DatePicker, Select, Button, Row, Col, Input } from "antd";
import {
  StyledButton,
  SelectTitle,
  StyledSelect,
  SelectBox,
} from "../TopInputs/style";

export const StyledModal = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  &.between {
    justify-content: space-between;
  }
`;

export const ModalButton = styled(StyledButton)`
  margin: 0;
  & + & {
    margin-left: 10px;
  }
`;
export const ModalSelectBox = styled(SelectBox)`
  margin-left: 10px;
`;
export const ModalSelectTitle = styled(SelectTitle)``;
export const ModalSelect = styled(StyledSelect)``;
