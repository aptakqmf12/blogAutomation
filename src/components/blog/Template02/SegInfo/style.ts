import styled from "styled-components";
import { DatePicker, Select, Button, Row, Col, Input, Tabs } from "antd";

export const ItemViewBox = styled.div`
  background-color: ${(props) =>
    props.theme === "light" ? "white" : "#282c35"};
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
`;

export const Item = styled.div`
  margin-bottom: 100px;
  padding: 0 10px;
  color: black;
`;
export const SegHeader = styled.div`
  margin-bottom: 20px;
  padding: 15px 0;
  background-color: #60beb6;
  color: white;
  font-size: 20px;
`;
export const brandName = styled.div`
  font-size: 26px;
  font-weight: bold;
`;
export const ItemName = styled.div`
  font-size: 24px;
`;
export const SegSlogan = styled.div`
  margin: 10px 0;
  font-size: 24px;
  font-weight: bold;
`;
export const SegTitle = styled.div`
  margin-bottom: 20px;
  font-weight: bold;
  text-align: left;
  .title {
    font-size: 24px;
  }
  .sub {
    color: #7d7d7d;
  }
`;
export const SegName = styled.div`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
`;

// 탭 영역
export const StyledTabs = styled(Tabs)`
  margin-bottom: 100px;
  .ant-tabs-tab {
    padding: 0 !important;
  }
`;

export const TabBtn = styled.div`
  padding: 10px;
`;

// 1번탭
export const TabContent01 = styled.div`
  .item {
    margin: 0 10px 20px;
    text-align: left;
    .question {
      font-size: 18px;
      font-weight: bold;
    }
    .answer {
      font-size: 18px;
    }
  }
`;
export const TabContent02 = styled.div`
  text-align: left;
  .title {
    font-size: 22px;
    font-weight: bold;
    text-align: center;
  }
  .qna {
    padding: 20px 10px;
    font-size: 16px;
    dt {
      font-size: px;
      color: #9e9e9e;
    }
    dd {
      margin-bottom: 20px;
      font-weight: bold;
      color: #c1c1c1;
    }
  }
`;
// 3번탭
export const TabContent03 = styled.div`
  text-align: left;
  .title {
    padding: 5px 10px;
    margin-bottom: 10px;
    border-radius: 30px;
    background-color: #60beb6;
    color: white;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
  }
  .qna {
    padding: 0px 10px;
    margin-bottom: 10px;
    font-size: 16px;
    dt {
      color: #c1c1c1;
    }
    dd {
      font-weight: bold;
      color: #9e9e9e;
    }
  }
`;

// 차트 영역
export const ChartTitle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  p {
    margin: 0;
  }
  span {
    font-size: 24px;
    font-weight: bold;
  }
  .point {
    font-size: 24px;
    color: ${(props) => props.color};
  }
`;
export const ChartContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const BarChartDl = styled.dl``;

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
