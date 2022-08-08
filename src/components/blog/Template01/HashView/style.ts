import styled from "styled-components";

export const ViewBox = styled.div`
  background-color: ${(props) =>
    props.theme === "light" ? "white" : "#282c35"};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-family: "나눔고딕";
  h3 {
    font-size: 24px;
  }
`;
export const HashTagBox = styled.div`
  max-height: 300px;
  overflow: auto;
`;
export const HashTags = styled.div`
  font-weight: bold;
  color: #666;
`;
