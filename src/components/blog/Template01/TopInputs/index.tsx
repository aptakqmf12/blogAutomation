import React, { useState, useEffect, useCallback } from "react";
import {
  message,
  Select,
  Row,
  Col,
  Modal,
  notification,
  Card,
  Tooltip,
} from "antd";
import { ADMIN } from "assets/constants/string";
import { QuestionCircleOutlined } from "@ant-design/icons";
import _ from "lodash";
import CopyToClipboard from "react-copy-to-clipboard";
import * as S from "./style";
import { useAppDispatch } from "store";
import { useUserData, useBlog, useTheme } from "hooks";
import { useIntl } from "react-intl";
import { blogAction } from "store/modules/blog";
import {
  fetchCriteria,
  fetchProducts,
  fetchLabelTemplate,
  fetchKeyword,
} from "store/modules/blog/saga";

import BlogTemplate from "../BlogTemplate";
import ContentsMaker from "../ContentsMaker";
import { SelectValue } from "antd/lib/select";

const TopInputs = () => {
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();
  const { currentTheme } = useTheme();
  const {
    getHtmlSource,
    currentStateReducer,
    currentPrdIdReducer,
    criteriaReducer,
    productsReducer,
    keywordsReducer,
    requestReducer,
    userTextReducer,
    htmlReducer,
    language,
    translatedTxt,
    setRequestAction,
    setHtmlSource,
    setCurrentStateAction,
    setClearCurrentStateAction,
    setClearProductsAction,
    setcurrentProductId,
    setTranslatedText,
  } = useBlog();
  const { currentCuid, authority } = useUserData();
  const [isRender, setIsRender] = useState<boolean>(false);
  const [pcModal, setPcModal] = useState<boolean>(false);
  const [moModal, setMoModal] = useState<boolean>(false);
  const [videoModal, setVideoModal] = useState<boolean>(false);

  const { date, targetType, targetValue, crossType } = requestReducer;

  const setClearProducts = () => {
    // 상품, 선택된상품id 초기화
    productsReducer && setClearProductsAction();
    currentPrdIdReducer && setcurrentProductId(null);
  };

  // Date 수정시
  const setDatePicker = (date: string) => {
    setRequestAction({
      ...requestReducer,
      date: String(date),
      targetType: undefined,
      targetValue: undefined,
      crossType: undefined,
    });

    dispatch(
      fetchKeyword.request({
        cuid: currentCuid,
        date: String(date),
      })
    );
    setClearProducts();
  };

  // Type 수정시
  const setTargetObjectType = (targetType: SelectValue) => {
    setRequestAction({
      ...requestReducer,
      targetType: String(targetType),
      targetValue: undefined,
      crossType: undefined,
    });
    setClearProducts();
  };

  // Value 수정시
  const setTargetObjectValue = (targetValue: SelectValue) => {
    setRequestAction({
      ...requestReducer,
      targetValue: String(targetValue),
      crossType: undefined,
    });
    setClearProducts();
    dispatch(blogAction.setKeywordPick({ targetKeyword: String(targetValue) }));
  };

  // Cross 수정시
  const setCrossObjectType = (crossType: SelectValue) => {
    setRequestAction({
      ...requestReducer,
      crossType: String(crossType),
    });

    if (
      date === undefined &&
      targetType === undefined &&
      targetValue === undefined &&
      crossType === undefined
    ) {
      return;
    }

    dispatch(
      fetchProducts.request({
        cuid: currentCuid,
        date: date,
        targetType: targetType,
        targetValue: targetValue,
        crossType: String(crossType),
      })
    );

    notification.info({
      message: "데이터를 업데이트 하였습니다",
      description: "스크롤을 내려 확인해보세요",
      placement: "bottomRight",
    });
  };

  const { Option } = Select;

  const dateOptions = _.uniqBy(criteriaReducer, "date");
  const typeOptions = _.uniqBy(
    criteriaReducer?.filter((crt) => crt.date === date),
    "targetType"
  );
  const crossOptions = _.uniqBy(
    criteriaReducer?.filter(
      (crt) =>
        crt.date === date &&
        crt.targetType === targetType &&
        crt.targetValue === targetValue
    ),
    "crossType"
  );

  // 현재 설정값 저장하기
  const setCurrentState = () => {
    setCurrentStateAction();
    notification.info({
      message: "설정값이 저장되었습니다",
      description: "새로고침을 하더라도 설정상태로 남아있습니다",
      placement: "bottomRight",
    });
  };
  // 현재 설정값 초기화
  const setClearCurrentState = () => {
    setClearCurrentStateAction();
    notification.info({
      message: "설정값이 초기화되었습니다",
      description: "",
      placement: "bottomRight",
    });
  };

  const setLanguage = (value: string) => {
    dispatch(blogAction.setLanguage(value));
  };

  useEffect(() => {
    dispatch(fetchLabelTemplate.request());
    setIsRender(true);
  }, []);

  useEffect(() => {
    if (isRender === true) {
      //렌더링이후 cuid가 바뀔경우만
      setClearCurrentState();
    }
    // 렌더링시, cuid가 바뀔시 모두
    dispatch(fetchCriteria.request(currentCuid));
  }, [currentCuid]);

  // HTML 복사
  useEffect(() => {
    const htmlSource = getHtmlSource();
    htmlSource && setHtmlSource(htmlSource);
  }, [
    keywordsReducer,
    productsReducer,
    criteriaReducer,
    userTextReducer,
    language,
  ]);

  const HtmlCopyButton = () => {
    return (
      <CopyToClipboard
        text={htmlReducer}
        onCopy={() => {
          message.success("복사 완료");
        }}
      >
        <S.StyledButton type="primary">
          {formatMessage({
            id: "Components.Blog.html.copy",
          })}
        </S.StyledButton>
      </CopyToClipboard>
    );
  };

  const LanguageSelect = () => {
    return (
      <S.SelectBox>
        <S.SelectTitle>출력언어 선택</S.SelectTitle>
        <S.StyledSelect
          value={language}
          onChange={(value) => setLanguage(String(value))}
        >
          <Option value="ko" key="ko">
            한국어
          </Option>
          <Option value="en" key="en">
            영어
          </Option>
        </S.StyledSelect>
      </S.SelectBox>
    );
  };

  return (
    <S.InputBox theme={currentTheme}>
      <S.StyledRow>
        <S.StyledCol xl={6}>
          <S.SelectBox>
            <S.SelectTitle>
              <Tooltip
                title={formatMessage({
                  id: "Components.Blog.date.tooltip",
                })}
              >
                1.
                {formatMessage({
                  id: "Components.Blog.date.title",
                })}
                <QuestionCircleOutlined />
              </Tooltip>
            </S.SelectTitle>
            <S.StyledSelect
              placeholder={
                criteriaReducer && criteriaReducer[0]
                  ? formatMessage({
                      id: "Components.Blog.date.placeholder",
                    })
                  : formatMessage({
                      id: "Components.Blog.date.placeholder.empty",
                    })
              }
              disabled={criteriaReducer && criteriaReducer[0] ? false : true}
              value={date}
              onChange={(value) => setDatePicker(String(value))}
            >
              {dateOptions.map((el, index) => (
                <Option value={el.date} key={index}>
                  {el.date}
                </Option>
              ))}
            </S.StyledSelect>
          </S.SelectBox>
        </S.StyledCol>

        <S.StyledCol xl={6}>
          <S.SelectBox>
            <S.SelectTitle>
              <Tooltip
                title={formatMessage({
                  id: "Components.Blog.targetType.tooltip",
                })}
              >
                2.
                {formatMessage({
                  id: "Components.Blog.targetType.title",
                })}
                <QuestionCircleOutlined />
              </Tooltip>
            </S.SelectTitle>

            <S.StyledSelect
              placeholder={formatMessage({
                id: "Components.Blog.targetType.placeholder",
              })}
              value={targetType}
              onChange={(value) => setTargetObjectType(String(value))}
              disabled={date === undefined ? true : false}
            >
              {typeOptions.map((el, index) => (
                <Option value={el.targetType} key={index}>
                  {el.targetType}
                </Option>
              ))}
            </S.StyledSelect>
          </S.SelectBox>

          <S.SelectBox>
            <S.SelectTitle>
              <Tooltip
                placement="bottom"
                title={formatMessage({
                  id: "Components.Blog.targetValue.tooltip",
                })}
              >
                3.{" "}
                {formatMessage({
                  id: "Components.Blog.targetValue.title",
                })}{" "}
                <QuestionCircleOutlined />
              </Tooltip>
            </S.SelectTitle>
            <S.StyledSelect
              placeholder={formatMessage({
                id: "Components.Blog.targetValue.placeholder",
              })}
              value={targetValue}
              disabled={targetType === undefined ? true : false}
              onChange={(value) => setTargetObjectValue(String(value))}
            >
              {keywordsReducer?.list.map((keyword, index) => (
                <Option value={keyword.keyword} key={index}>
                  {keyword.keyword}
                </Option>
              ))}
            </S.StyledSelect>
          </S.SelectBox>
        </S.StyledCol>

        <S.StyledCol xl={6}>
          <S.SelectBox>
            <S.SelectTitle>
              <Tooltip
                title={formatMessage({
                  id: "Components.Blog.crossType.tooltip",
                })}
              >
                4.{" "}
                {formatMessage({
                  id: "Components.Blog.crossType.title",
                })}{" "}
                <QuestionCircleOutlined />
              </Tooltip>
            </S.SelectTitle>

            <S.StyledSelect
              placeholder={formatMessage({
                id: "Components.Blog.crossType.placeholder",
              })}
              value={crossType}
              disabled={targetValue === undefined ? true : false}
              onChange={(value) => setCrossObjectType(String(value))}
            >
              {crossOptions.map((el, index) => (
                <Option value={el.crossType} key={index}>
                  {el.crossType}
                </Option>
              ))}
            </S.StyledSelect>
          </S.SelectBox>
        </S.StyledCol>
        <Col xl={1} lg={0}></Col>
        <S.StyledCol xl={5}>
          <Row>
            <Col>
              <S.StyledButton onClick={() => setPcModal(true)}>
                {formatMessage({
                  id: "Components.Blog.preview.pc",
                })}
              </S.StyledButton>
              <S.StyledButton onClick={() => setMoModal(true)}>
                {formatMessage({
                  id: "Components.Blog.preview.mo",
                })}
              </S.StyledButton>

              <S.StyledButton onClick={() => setCurrentState()}>
                {formatMessage({
                  id: "Components.Blog.currentState.save",
                })}
              </S.StyledButton>
              <S.StyledButton
                type={currentStateReducer ? "primary" : "default"}
                onClick={() => {
                  setClearCurrentState();
                  dispatch(fetchCriteria.request(currentCuid));
                }}
              >
                {formatMessage({
                  id: "Components.Blog.currentState.reset",
                })}
              </S.StyledButton>
              {authority === ADMIN ? (
                <S.StyledButton onClick={() => setVideoModal(true)}>
                  이미지/영상 자동생성하기
                </S.StyledButton>
              ) : null}
            </Col>
          </Row>
        </S.StyledCol>
      </S.StyledRow>

      <Modal
        width={1000}
        style={{ top: "2vh" }}
        visible={pcModal}
        title={<HtmlCopyButton />}
        footer={<>{authority === ADMIN ? <LanguageSelect /> : null}</>}
        onCancel={() => setPcModal(false)}
      >
        <Card bordered={false} style={{ overflow: "auto", height: "80vh" }}>
          <BlogTemplate />
        </Card>
      </Modal>

      <Modal
        width={550}
        style={{ top: "5vh" }}
        visible={moModal}
        title={"미리보기(Mobile)"}
        footer={null}
        onCancel={() => setMoModal(false)}
      >
        <Card
          bordered={false}
          style={{ overflowX: "hidden", overflowY: "auto", height: "80vh" }}
        >
          <BlogTemplate />
        </Card>
      </Modal>

      <ContentsMaker
        visible={videoModal}
        onCancel={() => setVideoModal(false)}
      />
    </S.InputBox>
  );
};

export default TopInputs;
