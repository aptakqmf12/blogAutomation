import styled from "styled-components";

export const LabelViewBox = styled.div`
  flex-direction: column;

  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.theme === "light" ? "white" : "#282c35"};
  font-family: "나눔고딕";

  text-align: center;
  h3 {
    font-size: 24px;
  }
`;
export const LabelBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  max-height: 500px;
  overflow: auto;
`;
export const Label = styled.div`
  display: inline-block;
  width: auto;
  box-sizing: border-box;
  margin: 0 0 20px 0;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 3px 3px #eee;
  }
  &.selected {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 20px;
      background-color: rgba(0, 0, 0, 0.2);
    }
    .checked {
      position: absolute;
      width: 25px;
      height: 25px;
      top: 12px;
      right: 18px;
      border-radius: 50%;
      background-color: #fff;
      font-size: 16px;
      z-index: 2;
    }
  }
`;
