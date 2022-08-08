import React, { useEffect, useState, FC } from "react";
import * as S from "./style";
import _ from "lodash";
import axios from "axios";
import blogService02 from "apis/services/blogServiceV2";
import { AppDispatch, useAppDispatch } from "store";
import html2canvas from "html2canvas";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Empty, Tabs } from "antd";
import { useUserData, useBlogV2, useTheme } from "hooks";
import { fetchHexaImageUrl } from "store/modules/blogV2/saga";
import { blogActionV2 } from "store/modules/blogV2";
import CaptureImages from "../Modal/CaptureImages";

const SegInfo = () => {
  const dispatch = useAppDispatch();
  const { currentTheme } = useTheme();
  const { customerName } = useUserData();
  const {
    itemSegInfo,
    similarSeg,
    segBest,
    associatedSeg,
    imageUploadResponse,
    replaceIndex,
    replaceMultipleText,
    firstSeg,
    secondSeg,
    thirdSeg,
    fourthSeg,
    hexaGraphData,
    hexaIndexText,
    barGraphData,
    barIndexText,
  } = useBlogV2();

  const { TabPane } = Tabs;
  const [barChartBlob, setBarChartBlob] = useState<Blob>();
  const { itemName, imageUrl, brandName, segData, salePrice, hashTags } =
    itemSegInfo || {}; // null일경우 대비

  const SegItemTitle: FC<{
    color: string;
    title: string;
    sub: string;
  }> = ({ color, title, sub }) => {
    return (
      <S.SegTitle>
        <div className="title">
          🔎 {itemName} <strong style={{ color }}>{title}</strong>
        </div>
        <div className="sub">
          <span style={{ color }}>▶</span>
          {sub}
        </div>
      </S.SegTitle>
    );
  };

  const SegInfo: FC = () => {
    return (
      <S.Item>
        <S.brandName>{brandName}</S.brandName>
        <S.ItemName>{itemName}</S.ItemName>
        <S.SegSlogan>ITEM PICK🤏 아이템 집중탐구생활 시리즈!</S.SegSlogan>
        <div>
          오늘 구매할 아이템에 대해 어디까지 알고 있나요? 아이템 기본 정보는
          물론, 함께 구매하면 좋은 연관 상품 추천과 아이템의 강점을 정리한
          캐릭터 분석까지 한 페이지로 정리 끝! 아이템에 숨겨진 이야기를 들려주는
          집중 탐구 보고서, ITEM PICK 쇼핑 전 꼭 확인해보세요!
        </div>
        <S.SegSlogan>🛍️ 오늘의 아이템 🛍️</S.SegSlogan>
        <div>
          <img
            style={{ width: "60%", margin: "0 auto" }}
            src={imageUrl}
            alt={itemName}
          />
        </div>

        <div>{itemName}</div>
        <div>{salePrice?.toLocaleString()}원</div>

        <div>
          <img
            src="https://blogfiles.pstatic.net/MjAyMjA2MjdfMTg0/MDAxNjU2MzExMDE3NzIw.c_PbgkuHb-iZPuKBkKFc6TgEfpa3wMJs8mo-EktrExAg.UsVyciE_qes3ozYUfY_xzA5VuWfp5pXJ-lv9jBR18fwg.PNG.koreapick11/%EA%B7%B8%EB%A6%BC10.png?type=w2"
            alt=""
          />
        </div>
      </S.Item>
    );
  };

  const SegBestInfo: FC = () => {
    return (
      <S.Item>
        <SegItemTitle
          color="#ff7e79"
          title="본캐 탐구"
          sub="본캐란? 본캐릭터의
                준말로, 상품의 가장 강한 속성을 의미합니다."
        />

        <div>{firstSeg?.segName}</div>

        <div>
          {itemName}의 본캐는 <strong>{firstSeg?.segName}</strong>(을)를{" "}
          <strong>대표하는 인기 상품</strong>이에요!
        </div>

        <div>
          {itemName}처럼 본캐가 #{firstSeg?.segName}인 상품
        </div>

        <S.SegImgContainer className="segBestImage" color="#ff7e79">
          {segBest
            ?.filter((el, index) => el.active)
            ?.map((el, index) => {
              return (
                <div className="content" key={index}>
                  <img src={el.imageUrl} alt="" />
                </div>
              );
            })}
        </S.SegImgContainer>

        <div>
          {segBest
            ?.filter((el, id) => id < 4)
            .map((seg, index) => {
              return (
                <div>
                  <a href={seg.itemUrl}>
                    <strong>
                      <span style={{ color: "#666666" }}>{index + 1}.</span>{" "}
                      <span style={{ color: "#0019FF" }}>{seg.itemName}</span>
                    </strong>
                  </a>
                </div>
              );
            })}
        </div>
      </S.Item>
    );
  };

  const BarChartInfo: FC = () => {
    return (
      <S.Item>
        <S.ChartTitle color="#ff7e79">
          <p>
            <b>{itemName}</b>는 다른 <b>{firstSeg?.segName}</b> 보다
          </p>
          <p>
            <b className="point">
              {barGraphData && barGraphData[0].indicatorName}{" "}
              {replaceMultipleText(firstSeg?.barGraph[0].multipleSegAvg)},
            </b>
          </p>
          <p>
            <b className="point">
              {barGraphData && barGraphData[1].indicatorName}{" "}
              {replaceMultipleText(firstSeg?.barGraph[1].multipleSegAvg)}
            </b>
          </p>
        </S.ChartTitle>

        {/* 바 차트 */}
        <S.ChartContent>
          <BarChart
            width={400}
            height={250}
            data={barGraphData}
            layout="vertical"
          >
            <XAxis type="number" hide axisLine={false} />
            <YAxis dataKey={"indicatorName"} type="category" />

            <Legend layout="vertical" verticalAlign="top" align="center" />
            <Bar
              name={itemSegInfo?.itemName}
              dataKey={"itemGraph"}
              fill="#ff7e79"
            />
            <Bar
              name={`${firstSeg?.segName} 평균`}
              dataKey={"avgGraph"}
              fill="#969696"
            />
          </BarChart>
        </S.ChartContent>
      </S.Item>
    );
  };

  const SimilarSegInfo: FC = () => {
    return (
      <S.Item>
        <SegItemTitle
          color="#feb942"
          title="부캐 탐구"
          sub="부캐란? 부캐릭터의
              준말로, 상품의 다른 속성을 의미합니다."
        />

        {/* 탭영역 */}
        <S.StyledTabs
          className="testTab"
          size="large"
          defaultActiveKey="1"
          centered
          type="card"
        >
          {/* 1번 탭 */}
          <TabPane
            tab={
              <S.TabBtn
                onClick={() => dispatch(blogActionV2.setSegTabIndex(1))}
              >
                type 01
              </S.TabBtn>
            }
            key={1}
          >
            <S.TabContent01>
              <div className="item">
                <div className="question">
                  🤑 {secondSeg && secondSeg.qna[0].question}
                </div>
                <div className="answer">
                  {secondSeg && secondSeg.qna[0].answer}
                </div>
              </div>

              <div className="item">
                <div className="question">
                  <div>👍 {thirdSeg && thirdSeg.qna[0].question}</div>
                </div>
                <div className="answer">
                  {thirdSeg && thirdSeg.qna[0].answer}
                </div>
              </div>
            </S.TabContent01>
          </TabPane>
          {/* 2번 탭 */}
          <TabPane
            tab={
              <S.TabBtn
                onClick={() => dispatch(blogActionV2.setSegTabIndex(2))}
              >
                type 02
              </S.TabBtn>
            }
            key={2}
          >
            <S.TabContent02>
              <div className="title">{itemName} 프로파일링 🔍</div>
              <dl className="qna">
                <dt>✅ {secondSeg?.segName}</dt>
                <dd>{secondSeg?.description}</dd>

                <dt>✅ {thirdSeg?.segName}</dt>
                <dd>{thirdSeg?.description}</dd>

                <dt>✅ {fourthSeg?.segName}</dt>
                <dd>{fourthSeg?.description}</dd>
              </dl>
            </S.TabContent02>
          </TabPane>
          {/* 3번 탭 */}
          <TabPane
            tab={
              <S.TabBtn
                onClick={() => dispatch(blogActionV2.setSegTabIndex(3))}
              >
                type 03
              </S.TabBtn>
            }
            key={3}
          >
            <S.TabContent03>
              <div className="title">{itemName} 똑똑하게 구매하기</div>
              <dl className="qna">
                <dt>🤔 {secondSeg?.qna[1].question}</dt>
                <dd>A. {secondSeg?.qna[1].answer}</dd>
              </dl>

              <dl className="qna">
                <dt>🤔 {thirdSeg?.qna[1].question}</dt>
                <dd>A. {thirdSeg?.qna[1].answer}</dd>
              </dl>

              <dl className="qna">
                <dt>🤔 {fourthSeg?.qna[1].question}</dt>
                <dd>A. {fourthSeg?.qna[1].answer}</dd>
              </dl>
            </S.TabContent03>
          </TabPane>
        </S.StyledTabs>

        <div>부캐 1️⃣2️⃣3️⃣의 BEST 상품</div>

        <S.SegImgContainer className="similarSegImage" color="#feb942">
          {similarSeg
            ?.filter((el, index) => el.active)
            ?.map((el, index) => {
              return (
                <div className="content" key={index}>
                  <img src={el.imageUrl} alt="" />
                </div>
              );
            })}
        </S.SegImgContainer>

        <div>
          {similarSeg
            ?.filter((el, id) => id < 4)
            .map((seg, index) => {
              return (
                <div>
                  <a href={seg.itemUrl}>
                    <strong>
                      <span style={{ color: "#666666" }}>{index + 1}.</span>{" "}
                      <span style={{ color: "#0019FF" }}>{seg.itemName}</span>
                    </strong>
                  </a>
                </div>
              );
            })}
        </div>
      </S.Item>
    );
  };

  const AssociatedSegInfo: FC = () => {
    return (
      <S.Item>
        <SegItemTitle
          color="#a5c33f"
          title="찰떡인 짝꿍템"
          sub="짝꿍템은? 소개한
              상품과 함께 구매된 상품으로, 함께 구매하기 좋은
              찰떡궁합템입니다."
        />

        <div>
          {itemName}와 함꼐 구매하기 좋은{" "}
          <strong style={{ color: "#a5c33f" }}>짝꿍템</strong>
        </div>

        <S.SegImgContainer className="associatedSegImage" color="#a5c33f">
          {associatedSeg
            ?.filter((el, index) => el.active)
            ?.map((el, index) => {
              return (
                <div className="content" key={index}>
                  <img src={el.imageUrl} alt="" />
                </div>
              );
            })}
        </S.SegImgContainer>

        <div>
          {associatedSeg
            ?.filter((el, id) => id < 4)
            .map((seg, index) => {
              return (
                <div>
                  <a href={seg.itemUrl}>
                    <strong>
                      <span style={{ color: "#666666" }}>{index + 1}.</span>{" "}
                      <span style={{ color: "#0019FF" }}>{seg.itemName}</span>
                    </strong>
                  </a>
                </div>
              );
            })}
        </div>
      </S.Item>
    );
  };

  const HexaChartInfo: FC = () => {
    return (
      <>
        {" "}
        <S.SegTitle>
          <div className="title">
            📊 {itemName}{" "}
            <strong style={{ color: "#0080F9" }}>캐릭터 분석</strong>
          </div>
        </S.SegTitle>
        <div>
          {firstSeg?.segName} <strong style={{ color: "#ff7e79" }}>본캐</strong>
          와
        </div>
        <div>
          #저세상_할인템, #꾸준한_효자템, #합리적인{" "}
          <strong style={{ color: "#feb942" }}>부캐</strong>를 가진
        </div>
        <S.ChartTitle color="#0080F9">
          <p>
            <b>{itemName}</b>는 <b className="point">이런상품</b> 이에요
          </p>
          <p>
            <span>{firstSeg?.segName}</span> 전체 평균 대비{" "}
            <b className="point">
              {hexaIndexText && replaceIndex(hexaIndexText[0].indicatorName)}
            </b>
            과(와){" "}
            <b className="point">
              {hexaIndexText && replaceIndex(hexaIndexText[1].indicatorName)}
            </b>
            가 높은 상품!
          </p>
        </S.ChartTitle>
        {/* 레이더 차트 */}
        <S.Item>
          <S.ChartContent>
            {hexaGraphData ? (
              <RadarChart
                width={400}
                height={300}
                outerRadius={100}
                data={hexaGraphData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="indicatorName" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Legend
                  layout="vertical"
                  verticalAlign="top"
                  align="center"
                  iconType={"triangle"}
                  wrapperStyle={{
                    fontSize: 12,
                  }}
                />

                <Radar
                  name={itemName}
                  dataKey={"itemGraph"}
                  stroke="#0080F9"
                  fill="#0080F9"
                  fillOpacity={0.7}
                />
                <Radar
                  name="전체 평균"
                  dataKey={"avgGraph"}
                  stroke="#969696"
                  fill="#969696"
                  fillOpacity={0.7}
                />
              </RadarChart>
            ) : null}
          </S.ChartContent>
        </S.Item>
      </>
    );
  };

  return (
    <S.ItemViewBox theme={currentTheme}>
      <S.SegHeader>AI가 알려주는 아이템 프로파일링!</S.SegHeader>

      {itemSegInfo ? (
        <S.Item>
          <SegInfo />
          {/* 본캐탐구 */}
          <SegBestInfo />

          <div>
            <strong>✋여기서 잠깐✋</strong>
          </div>

          <BarChartInfo />

          {/* 부캐탐구 */}
          <SimilarSegInfo />

          {/* 찰떡템 */}
          <AssociatedSegInfo />

          {/* 캐릭터분석 */}
          <HexaChartInfo />
        </S.Item>
      ) : (
        <Empty />
      )}
    </S.ItemViewBox>
  );
};

export default SegInfo;
