import { Markup } from "interweave";
import { useBlog, useUserData } from "hooks";
import _ from "lodash";
import React, { useState, useEffect, useRef, FC } from "react";
import blogService from "apis/services/blogService";
import { fetchVideo } from "store/modules/blog/saga";
import { useAppDispatch } from "store";
import * as S from "./style";
import { Modal, Card, Upload, Tabs, Select } from "antd";
import { Sticky, StickyContainer } from "react-sticky";
import { blogAction } from "store/modules/blog";
import {
  UploadOutlined,
  DownloadOutlined,
  VideoCameraAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import Cover from "./Cover";
import Keywords from "./Keywords";
import Finish from "./Finish";
import VideoStatusBoard from "./VideoStatusBoard";

type Props = {
  visible: boolean;
  onCancel: (e: boolean) => void;
};

const ContentsMaker: FC<Props> = ({ visible, onCancel }) => {
  const {
    productsReducer,
    labelTemplateReducer,
    language,
    replaceLabelByTokens,
    uploadImageByClassName,
    onSubmitContentsMaker,
    saveImgFile,
    DownloadImages,
    mediaLoading,
    setMediaLoading,
  } = useBlog();
  const { customerName } = useUserData();
  const dispatch = useAppDispatch();

  const { TabPane } = Tabs;

  const [topTitle, setTopTitle] = useState<string>(
    "이유있는 트렌드 리포트 KOREA PICK"
  );
  const [tab, setTab] = useState<"setting" | "videoBoard">("setting");

  useEffect(() => {
    if (visible === false) {
      return;
    }

    // 더빙텍스트 + 이미지 설정
    productsReducer?.list.forEach((product, prdId) => {
      const {
        itemName,
        itemImage,
        itemUrl,
        media,
        brandName,
        brandPriceDiff,
        brandPriceUse,
        categoryPriceDiff,
        categoryPriceUse,
        selectedLabel,
      } = product;
      // 더빙텍스트 array화, 해당 데이터를 리덕스 저장
      dispatch(
        blogAction.setVideoDubbingScript({
          dubbingText: [
            String(brandName),
            String(itemName),
            `브랜드 대비${Math.floor(
              (brandPriceDiff * 100) / 100
            )}% 저렴한 상품입니다`,
            `카테고리 대비${Math.floor(
              (categoryPriceDiff * 100) / 100
            )}% 저렴한 상품입니다`,
          ],
          prdId,
        })
      );
    });
  }, [visible]);

  const onChangeDubbingText = (
    text: string,
    prdId: number,
    dubbingIndex: number
  ) => {
    dispatch(
      blogAction.editVideoDubbingScript({
        text,
        prdId,
        dubbingIndex,
      })
    );
  };

  const FooterElement = () => {
    return (
      <>
        <S.StyledButton
          type="primary"
          onClick={() => {
            setMediaLoading("IMG_LOADING");
            DownloadImages();
          }}
          icon={<DownloadOutlined />}
          loading={mediaLoading === "IMG_LOADING" ? true : false}
        >
          인스타용 이미지 다운로드
        </S.StyledButton>

        <S.StyledButton
          type="primary"
          onClick={() => {
            setMediaLoading("VIDEO_LOADING");
            setTab("videoBoard");
            onSubmitContentsMaker();
          }}
          icon={<VideoCameraAddOutlined />}
          loading={mediaLoading === "VIDEO_LOADING" ? true : false}
        >
          비디오 만들기
        </S.StyledButton>
      </>
    );
  };

  const uploadImage = (file: RcFile, index: number) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        reader.result &&
          dispatch(
            blogAction.setImageURL({
              prdId: index,
              imgUrl: reader?.result,
            })
          );
      };
    });
  };

  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <Sticky bottomOffset={80}>
      {() => <DefaultTabBar {...props} className="site-custom-tab-bar" />}
    </Sticky>
  );

  return (
    <Modal
      width={1400}
      style={{ top: "5vh" }}
      title={"비디오 자동화"}
      visible={visible}
      footer={
        tab === "setting" ? (
          <FooterElement />
        ) : (
          <div>비디오 제작은 설정탭에서 가능합니다</div>
        )
      }
      onCancel={() => onCancel(false)}
    >
      <Card
        bordered={false}
        style={{ overflowX: "hidden", overflowY: "auto", height: "80vh" }}
      >
        <StickyContainer>
          <Tabs
            defaultActiveKey={tab}
            centered
            size="large"
            onChange={(key) =>
              setTab(key === "setting" ? "setting" : "videoBoard")
            }
            activeKey={tab}

            // renderTabBar={renderTabBar}
          >
            <TabPane
              tab={
                <span>
                  <SettingOutlined /> 설정
                </span>
              }
              key={"setting"}
            >
              {/* 표지 */}
              <Cover topTitle={topTitle} setTopTitle={setTopTitle} />

              {/* 키워드 */}
              <Keywords topTitle={topTitle} />

              {/* 상품 */}
              {productsReducer?.list.map((product, index) => {
                const {
                  itemName,
                  itemImage,
                  itemUrl,
                  brandName,
                  brandPriceDiff,
                  brandPriceUse,
                  categoryPriceDiff,
                  categoryPriceUse,
                  media,
                  selectedLabel,
                } = product;

                return (
                  <S.Wrap>
                    <S.ItemContainer className={`Instagram-Image-${index}`}>
                      <S.ItemBox>
                        <S.TopResourceInfo>
                          <ul className="btns">
                            <li style={{ backgroundColor: "#FAEE76" }}></li>
                            <li style={{ backgroundColor: "#28A6A0" }}></li>
                            <li style={{ backgroundColor: "#FC4A71" }}></li>
                          </ul>
                          <div className="info">{topTitle}</div>
                        </S.TopResourceInfo>

                        <S.BottomPrdInfo>
                          <S.ThumbImg>
                            <img
                              width="50%"
                              src={
                                media.imageUrl === ""
                                  ? itemImage
                                  : media.imageUrl
                              }
                              alt={String(itemName)}
                            />
                          </S.ThumbImg>
                          {/* <S.Source>출처 : 폴더</S.Source> */}
                          <S.BrandName>{brandName}</S.BrandName>
                          <S.ItemName>{itemName}</S.ItemName>
                          {brandPriceUse && brandPriceDiff > 0 ? (
                            <S.DiffOption>
                              브랜드 대비
                              <b>{Math.ceil(brandPriceDiff)}% 저렴한</b>
                              상품입니다
                            </S.DiffOption>
                          ) : (
                            <S.DiffOption>&nbsp;</S.DiffOption>
                          )}
                          {categoryPriceUse && categoryPriceDiff > 0 ? (
                            <S.DiffOption>
                              카테고리 대비
                              <b>{Math.ceil(categoryPriceDiff)}% 저렴한</b>
                              상품입니다
                            </S.DiffOption>
                          ) : (
                            <S.DiffOption>&nbsp;</S.DiffOption>
                          )}

                          <S.LabelBox>
                            {selectedLabel?.map((label, index) => {
                              const labelHTML =
                                language === "en"
                                  ? replaceLabelByTokens(
                                      labelTemplateReducer?.list?.filter(
                                        (template) =>
                                          template.id === label?.labelId
                                      )[0]?.enTemplate as string,
                                      label?.labelProperties
                                    )
                                  : replaceLabelByTokens(
                                      labelTemplateReducer?.list?.filter(
                                        (template) =>
                                          template.id === label?.labelId
                                      )[0]?.template as string,
                                      label?.labelProperties
                                    );

                              return (
                                <div
                                  style={{
                                    margin: "0 10px",
                                  }}
                                  key={index}
                                >
                                  <Markup
                                    className={`label${index}`}
                                    content={
                                      labelHTML?.includes("|")
                                        ? labelHTML
                                        : labelHTML
                                    }
                                  />
                                </div>
                              );
                            })}
                          </S.LabelBox>
                        </S.BottomPrdInfo>
                      </S.ItemBox>
                      <S.Footer>{String(customerName)}</S.Footer>
                    </S.ItemContainer>

                    <S.InputWrap>
                      <S.InputBox>
                        <S.StyledCheckbox
                          checked={media.isChangeImage}
                          onChange={() =>
                            dispatch(
                              blogAction.setImageUseOption({
                                prdId: index,
                                isChangeImage: !media.isChangeImage,
                              })
                            )
                          }
                        >
                          상품 이미지 수정하기
                        </S.StyledCheckbox>

                        {media.isChangeImage ? (
                          <S.FileUpload>
                            <Upload
                              beforeUpload={(file) => {
                                uploadImage(file, index);
                              }}
                            >
                              <S.StyledButton icon={<UploadOutlined />}>
                                Click to Upload
                              </S.StyledButton>
                            </Upload>
                          </S.FileUpload>
                        ) : null}
                      </S.InputBox>

                      <S.InputBox>
                        <S.StyledCheckbox
                          checked={media.isChangeDubbing}
                          onChange={() =>
                            dispatch(
                              blogAction.setVideoUseOption({
                                prdId: index,
                                isChangeDubbing: !media.isChangeDubbing,
                              })
                            )
                          }
                        >
                          영상 스크립트 수정하기
                        </S.StyledCheckbox>
                        {media.isChangeDubbing ? (
                          <>
                            {media.dubbingScript.map((el, dubbingIndex) => {
                              return (
                                <S.StyledInput
                                  rows={1}
                                  value={el}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLTextAreaElement>
                                  ) =>
                                    onChangeDubbingText(
                                      String(e.target.value),
                                      index,
                                      dubbingIndex
                                    )
                                  }
                                ></S.StyledInput>
                              );
                            })}

                            <S.DubbingInfo>
                              {media.dubbingScript.map((str, index) => {
                                return (
                                  <div>
                                    스크립트{index + 1} : <b>{str}</b>
                                  </div>
                                );
                              })}
                            </S.DubbingInfo>
                          </>
                        ) : null}
                      </S.InputBox>
                    </S.InputWrap>
                  </S.Wrap>
                );
              })}

              {/* 마지막장 */}
              <Finish topTitle={topTitle} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <VideoCameraAddOutlined /> 비디오 리스트
                </span>
              }
              key={"videoBoard"}
            >
              {/* 비디오 조회 뷰 */}
              <VideoStatusBoard />
            </TabPane>
          </Tabs>
        </StickyContainer>
      </Card>
    </Modal>
  );
};

export default ContentsMaker;
