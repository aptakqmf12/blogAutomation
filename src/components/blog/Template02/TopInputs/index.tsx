import React, { useState, useRef, useEffect } from "react";
import {
  message,
  Select,
  Row,
  Col,
  Modal,
  notification,
  Card,
  Tooltip,
  Button,
} from "antd";
import * as S from "./style";
import _ from "lodash";
import { SelectValue } from "antd/lib/select";
import CopyToClipboard from "react-copy-to-clipboard";
import { ADMIN } from "assets/constants/string";
import { useUserData, useBlogV2, useTheme } from "hooks";
import { useAppDispatch } from "store";
import { blogActionV2 } from "store/modules/blogV2";
import BlogTemplateV2 from "../Modal/BlogV2Template";
import CaptureImages from "../Modal/CaptureImages";
import {
  fetchCriteria,
  fetchItemSegInfo,
  fetchSegBest,
  fetchSimilarSeg,
  fetchSegs,
} from "store/modules/blogV2/saga";
import { QuestionCircleOutlined } from "@ant-design/icons";

const TopInputs = () => {
  const dispatch = useAppDispatch();
  const isMount = useRef<boolean>(false);
  const { currentTheme } = useTheme();
  const { currentCuid, authority } = useUserData();
  const { criteria, request } = useBlogV2();

  const [pcModal, setPcModal] = useState<boolean>(false);
  const [moModal, setMoModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(blogActionV2.setPersistStateDraw());
    if (isMount.current === false) {
      isMount.current = true;
    }
  }, [currentCuid]);

  useEffect(() => {
    dispatch(fetchCriteria.request({ cuid: currentCuid }));
  }, [currentCuid]);

  const dateOptions = _.uniqBy(criteria, "date");
  const typeOptions = _.uniqBy(
    criteria?.filter((crt) => crt.date === request.date),
    "targetType"
  );
  const nameOptions = _.uniqBy(
    criteria?.filter(
      (crt) =>
        crt.date === request.date && crt.targetType === request.targetType
    ),
    "targetName"
  );

  // 날짜 변경시
  const setDateRequest = (date: string) => {
    dispatch(
      blogActionV2.setRequest({
        ...request,
        date,
      })
    );
    dispatch(
      blogActionV2.setRequest({
        date,
        targetType: undefined,
        targetName: undefined,
        objectId: undefined,
      })
    );
  };
  // 타입 변경시
  const setTypeRequest = (targetType: string) => {
    dispatch(
      blogActionV2.setRequest({
        ...request,
        targetType,
      })
    );
    dispatch(
      blogActionV2.setRequest({
        ...request,
        targetType,
        targetName: undefined,
        objectId: undefined,
      })
    );
  };
  // 이름 변경시 (데이터 요청)
  const setNameRequest = (targetName: string) => {
    // name지정과 동시에 objectId도 지정
    const objectId = criteria.filter(
      (crt) =>
        crt.date === request?.date &&
        crt.targetType === request?.targetType &&
        crt.targetName === targetName
    )[0]?.objectId;

    dispatch(
      blogActionV2.setRequest({
        ...request,
        targetName,
        objectId,
      })
    );

    if (
      request.date === undefined &&
      request.targetType === undefined &&
      request.targetName === undefined &&
      request.objectId === undefined
    ) {
      return;
    } else {
      // 아이템세그, 베스트세그, 유사세그 호출(아이템세그 -> 베스트세그는 비동기로)
      dispatch(
        fetchSegs.request({
          cuid: currentCuid,
          date: request.date,
          objectId: objectId,
        })
      );
    }
  };

  const setCurrentState = () => {
    dispatch(blogActionV2.setCurrentState());
    notification.info({
      message: "설정값이 저장되었습니다",
      description: "새로고침을 하더라도 설정상태로 남아있습니다",
      placement: "bottomRight",
    });
  };

  const clearCurrentState = () => {
    dispatch(blogActionV2.setClearCurrentState());

    notification.info({
      message: "설정값이 초기화되었습니다",
      description: "",
      placement: "bottomRight",
    });
  };

  return (
    <>
      <S.InputBox theme={currentTheme}>
        <S.SelectCol>
          <S.SelectBox>
            <S.SelectTitle>
              <Tooltip title="데이터를 확인할 기준 날짜를 선택합니다.">
                날짜 선택 <QuestionCircleOutlined />
              </Tooltip>
            </S.SelectTitle>
            <S.StyledSelect
              placeholder={
                criteria.length > 0 ? "날짜 선택" : "데이터가 없습니다"
              }
              disabled={criteria.length > 0 ? false : true}
              onChange={(date) => {
                setDateRequest(String(date));
              }}
              value={request.date}
            >
              {dateOptions.map((crt) => {
                return <Select.Option key={crt.date}>{crt.date}</Select.Option>;
              })}
            </S.StyledSelect>
          </S.SelectBox>

          <S.SelectBox>
            <S.SelectTitle>
              <Tooltip title="콘텐츠 메인 테마인 '상품'을 선택합니다.">
                유형 선택 <QuestionCircleOutlined />
              </Tooltip>
            </S.SelectTitle>
            <S.StyledSelect
              placeholder={"타입을 골라주세요"}
              disabled={request.date === undefined ? true : false}
              onChange={(targetType) => {
                setTypeRequest(String(targetType));
              }}
              value={request.targetType}
            >
              {typeOptions.map((crt) => {
                return (
                  <Select.Option key={crt.targetType}>
                    {crt.targetType}
                  </Select.Option>
                );
              })}
            </S.StyledSelect>
          </S.SelectBox>

          <S.SelectBox>
            <S.SelectTitle>
              <Tooltip title="선택한 유형에서 소개하고 싶은 상품을 선택합니다.">
                상품 선택 <QuestionCircleOutlined />
              </Tooltip>
            </S.SelectTitle>
            <S.StyledSelect
              placeholder={"네임을 골라주세요"}
              disabled={request.targetType === undefined ? true : false}
              onChange={(targetName) => {
                setNameRequest(String(targetName));
              }}
              value={request.targetName}
              style={{ width: 400 }}
            >
              {nameOptions.map((crt) => {
                return (
                  <Select.Option key={crt.targetName}>
                    {crt.targetName}
                  </Select.Option>
                );
              })}
            </S.StyledSelect>
          </S.SelectBox>
        </S.SelectCol>

        <S.ButtonCol>
          <S.StyledButton
            onClick={() => dispatch(blogActionV2.setOpenModal("pc"))}
          >
            미리보기 🔍
          </S.StyledButton>

          <S.StyledButton onClick={() => setCurrentState()}>
            현재 설정값 저장하기
          </S.StyledButton>
          <S.StyledButton onClick={() => clearCurrentState()}>
            설정값 초기화하기
          </S.StyledButton>
        </S.ButtonCol>
      </S.InputBox>
    </>
  );
};

export default TopInputs;
