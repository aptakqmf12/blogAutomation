import React from "react";
import { useBlogV2 } from "hooks";
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
import * as S from "../../SegInfo/style";

const CaptureImages = () => {
  const {
    hexaGraphData,
    barGraphData,
    itemSegInfo,
    segBest,
    similarSeg,
    associatedSeg,
    firstSeg,
  } = useBlogV2();

  return (
    <div>
      <S.Item>
        <S.ChartContent>
          <BarChart
            className="barChart"
            width={600}
            height={400}
            data={barGraphData}
            layout="vertical"
          >
            <XAxis type="number" hide axisLine={false} />
            <YAxis dataKey={"indicatorName"} type="category" />
            <Tooltip />
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

        <S.ChartContent>
          {hexaGraphData ? (
            <RadarChart
              className="hexaChart"
              width={600}
              height={400}
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
                name={itemSegInfo?.itemName}
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

      <S.Item>
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
      </S.Item>
    </div>
  );
};

export default CaptureImages;
