import { Row, Col } from "antd";

import TopInputs from "./TopInputs";
import SegInfo from "./SegInfo";
import SegItem from "./SegItem";
import BlogModal from "./Modal";

const BlogAutomationV2 = () => {
  return (
    <>
      <TopInputs />

      <Row gutter={30}>
        <Col xl={1}></Col>

        <Col xl={8}>
          <SegInfo />
        </Col>

        <Col xl={14}>
          <SegItem />
        </Col>

        <Col xl={1}></Col>
      </Row>

      <BlogModal />
    </>
  );
};

export default BlogAutomationV2;
