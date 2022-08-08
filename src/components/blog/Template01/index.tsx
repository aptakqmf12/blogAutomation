import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useUserData, useBlog } from "hooks";
import BlogTemplate from "./BlogTemplate";
import TopInputs from "./TopInputs";
import ItemView from "./ItemView";
import LabelView from "./LabelView";
import HashView from "./HashView";

const BlogAutomation = () => {
  const { currentStateReducer, setPersistDraw } = useBlog();

  useEffect(() => {
    currentStateReducer && setPersistDraw();
  }, []);

  return (
    <>
      <TopInputs />
      <Row gutter={30}>
        <Col xl={2}></Col>
        <Col xl={13}>
          <ItemView />
        </Col>
        <Col xl={7}>
          <LabelView />
          <HashView />
        </Col>
        <Col xl={2}></Col>
        <Col xl={0}>
          <div style={{ display: "none" }}>
            <BlogTemplate />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BlogAutomation;
