import React, { useState, useEffect } from "react";
import { message, Select, Modal, notification, Card } from "antd";
import * as S from "./style";

import { ADMIN } from "assets/constants/string";
import { useUserData, useBlogV2, useTheme } from "hooks";
import { useAppDispatch } from "store";
import { blogActionV2 } from "store/modules/blogV2";
import BlogTemplateV2 from "./BlogV2Template";
import CaptureImages from "./CaptureImages";
import CopyToClipboard from "react-copy-to-clipboard";

const BlogModal = () => {
  const PC_WIDTH = 1000;
  const MO_WIDTH = 600;

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const [modalWidth, setModalWidth] = useState<600 | 1000>(PC_WIDTH);
  const {
    language,
    htmlSource,
    openModal,
    itemSegInfo,
    uploadImageByClassName,
  } = useBlogV2();
  const { authority } = useUserData();
  const setLanguage = (text: string) => {
    dispatch(blogActionV2.setLanguage(text));
  };

  const uploadSegImagesAndCopyHtml = () => {
    setLoading(true);

    uploadImageByClassName(".hexaChart", "blog/graph/img/hexa/").then(
      (res1) => {
        alert("헥사차트 받음");
        uploadImageByClassName(".barChart", "blog/graph/img/bar/").then(
          (res2) => {
            alert("바차트 받음");
          }
        );
      }
    );

    // uploadImageByClassName(".hexaChart", "blog/graph/img/hexa/").then(() => {
    //   uploadImageByClassName(".barChart", "blog/graph/img/bar/").then(() => {
    //     uploadImageByClassName(".segBestImage", "blog/segImg/segBest/").then(
    //       () => {
    //         uploadImageByClassName(
    //           ".similarSegImage",
    //           "blog/segImg/similarSeg/"
    //         ).then(() => {
    //           uploadImageByClassName(
    //             ".associatedSegImage",
    //             "blog/segImg/associatedSeg/"
    //           ).then(() => {
    //             alert("복사 성공!");
    //             setLoading && setLoading(false);
    //           });
    //         });
    //       }
    //     );
    //   });
    // });
  };

  const setHtmlText = (htmlText: string) => {
    dispatch(blogActionV2.setHtmlSource(htmlText));
  };

  useEffect(() => {
    // setLoading(true);
  }, [itemSegInfo]);

  const ModalHeaders = () => {
    return (
      <S.StyledModal>
        <S.ModalButton
          onClick={() => uploadSegImagesAndCopyHtml()}
          type="primary"
        >
          html 복사하기
        </S.ModalButton>

        {/* <CopyToClipboard
          text={htmlSource}
          onCopy={() => {
            message.success("복사 완료");
          }}
        >
          <S.ModalButton disabled={loading} type="primary">
            html소스 복사하기
          </S.ModalButton>
        </CopyToClipboard> */}
      </S.StyledModal>
    );
  };
  const ModalFooters = () => {
    const { Option } = Select;
    return (
      <S.StyledModal className="between">
        <div>
          {modalWidth === MO_WIDTH ? (
            <S.ModalButton onClick={() => setModalWidth(PC_WIDTH)}>
              PC 사이즈로 보기
            </S.ModalButton>
          ) : null}
          {modalWidth === PC_WIDTH ? (
            <S.ModalButton onClick={() => setModalWidth(MO_WIDTH)}>
              Mobile 사이즈로 보기
            </S.ModalButton>
          ) : null}
        </div>

        <S.ModalSelectBox>
          <S.ModalSelectTitle>출력언어 선택</S.ModalSelectTitle>
          <S.ModalSelect
            value={language}
            onChange={(value) => setLanguage(String(value))}
          >
            <Option value="ko" key="ko">
              한국어
            </Option>
            <Option value="en" key="en">
              영어
            </Option>
          </S.ModalSelect>
        </S.ModalSelectBox>
      </S.StyledModal>
    );
  };
  return (
    <>
      {/* 이미지 캡쳐 */}
      <Modal
        width={900}
        style={{ top: "2vh" }}
        visible={openModal === "pc" ? true : false}
        title={<ModalHeaders />}
        footer={<>{authority === ADMIN ? <ModalFooters /> : null}</>}
        onCancel={() => dispatch(blogActionV2.setOpenModal("none"))}
        mask={false}
      >
        <Card bordered={false} style={{ overflow: "auto", height: "80vh" }}>
          <CaptureImages />
        </Card>
      </Modal>

      {/* pc 미리보기 */}
      <Modal
        width={modalWidth}
        style={{ top: "2vh" }}
        visible={openModal === "pc" ? true : false}
        title={<ModalHeaders />}
        footer={<>{authority === ADMIN ? <ModalFooters /> : null}</>}
        onCancel={() => dispatch(blogActionV2.setOpenModal("none"))}
      >
        <Card bordered={false} style={{ overflow: "auto", height: "80vh" }}>
          <BlogTemplateV2 />
        </Card>
      </Modal>
    </>
  );
};

export default BlogModal;
