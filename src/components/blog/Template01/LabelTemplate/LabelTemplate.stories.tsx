import LabelTemplate from "./LabelTemplate";
import { PropsWithChildren } from "react";
import { rest } from "msw";
import { ConfigProvider } from "antd";
import ko from "locales/ko.json";
import ko_KR from "antd/lib/locale/ko_KR";
import { IntlProvider } from "react-intl";

export default {
  component: LabelTemplate,
  title: "LabelTemplate",
};

const Template = (args: PropsWithChildren<any>) => <LabelTemplate {...args} />;

export const Table = () => {
  return (
    <IntlProvider locale={"ko"} messages={ko}>
      <ConfigProvider locale={ko_KR}>
        <LabelTemplate />;
      </ConfigProvider>
    </IntlProvider>
  );
};

const result  = {
  content: [
    {
      id: 33,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 32,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 31,
      template:
        "<div style=\"display: flex; flex-direction: column; flex-direction: center; align-items: center; justify-content: center; width: 320px; height: 130px; background-color: #f3f2f2; border-radius: 20px; text-align: center; font-family: '나눔고딕', 'Nanum Gothic', '돋움', '맑은고딕'; font-weight: bold; line-height: 1.5; letter-spacing: -0.2px; white-space: nowrap\">\n    <div style=\"font-size: 12px; font-family: 나눔고딕, NanumGothic; color: #000\">지금이 구매 타이밍!</div>\n    <div style=\"font-size: 12px; font-family: 나눔고딕, NanumGothic; color: #000\">최근 5주 중</div>\n    <div style=\"font-size: 20px; font-family: 나눔고딕, NanumGothic; font-weight: bolder; color: #ff654c\">⏰오늘 최저가⏰</div>\n</div>",
      enTemplate:"<div style=\"display: flex; flex-direction: column; flex-direction: center; align-items: center; justify-content: center; width: 320px; height: 130px; background-color: #f3f2f2; border-radius: 20px; text-align: center; font-family: '나눔고딕', 'Nanum Gothic', '돋움', '맑은고딕'; font-weight: bold; line-height: 1.5; letter-spacing: -0.2px; white-space: nowrap\">\n    <div style=\"font-size: 12px; font-family: 나눔고딕, NanumGothic; color: #000\">지금이 구매 타이밍!</div>\n    <div style=\"font-size: 12px; font-family: 나눔고딕, NanumGothic; color: #000\">최근 5주 중</div>\n    <div style=\"font-size: 20px; font-family: 나눔고딕, NanumGothic; font-weight: bolder; color: #ff654c\">⏰오늘 최저가⏰</div>\n</div>",
      used: true,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-22T01:30:13.770563",
    },
    {
      id: 30,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 29,
      enTemplate:"",
      template:
        "<div style=\"display: flex; flex-direction: column; flex-direction: center; align-items: center; justify-content: center; width: 320px; height: 130px; background-color: #f3f2f2; border-radius: 20px; text-align: center; font-family: '나눔고딕', 'Nanum Gothic', '돋움', '맑은고딕'; font-weight: bold; line-height: 1.5; letter-spacing: -0.2px; white-space: nowrap\">\n    <div style=\"font-size: 12px; font-family: 나눔고딕, NanumGothic; color: #000\">손해보고 파는 아이템</div>\n    <div style=\"font-size: 20px; font-family: 나눔고딕, NanumGothic; font-weight: bolder; color: #ff654c\">📌할인율 |dc_rate|%📌</div>\n    <div style=\"font-size: 12px; font-family: 나눔고딕, NanumGothic; color: #000\">#|brand_name| 평균 할인율 |brand_avg_dc_rate|%</div>\n</div>",
      used: true,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-22T01:30:13.770563",
    },
    {
      id: 28,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 27,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 26,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 25,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 24,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 23,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 22,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 21,
      enTemplate:"",
      template:
        "<div style=\"display: flex; flex-direction: column; flex-direction: center; align-items: center; justify-content: center; width: 320px; height: 130px; background-color: #f3f2f2; border-radius: 20px; text-align: center; font-family: '나눔고딕', 'Nanum Gothic', '돋움', '맑은고딕'; font-weight: bold; line-height: 1.5; letter-spacing: -0.2px; white-space: nowrap\">\n    <div style=\"font-size: 12px; font-family: 나눔고딕, NanumGothic; color: #000\">군계일학</div>\n    <div style=\"font-size: 20px; font-family: 나눔고딕, NanumGothic; font-weight: bolder; color: #ff654c\">🔺판매량 |brand_quantity_mul|배🔺</div>\n    <div style=\"font-size: 12px; font-family: 나눔고딕, NanumGothic; color: #000\">🔺#|brand_name| 평균 판매량 대비</div>\n</div>",
      used: true,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-22T01:30:13.770563",
    },
    {
      id: 20,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 19,
      enTemplate:"",
      template:
        "<div style=\"display: flex; flex-direction: column; flex-direction: center; align-items: center; justify-content: center; width: 320px; height: 130px; background-color: #f3f2f2; border-radius: 20px; text-align: center; font-family: '나눔고딕', 'Nanum Gothic', '돋움', '맑은고딕'; font-weight: bold; line-height: 1.5; letter-spacing: -0.2px; white-space: nowrap\">\n    <div style=\"font-size: 12px; font-family: 나눔고딕, NanumGothic; color: #000\">이 가격은 지금만!</div>\n    <div style=\"font-size: 12px; font-family: 나눔고딕, NanumGothic; color: #000\">최근 4주 중</div>\n    <div style=\"font-size: 20px; font-family: 나눔고딕, NanumGothic; font-weight: bolder; color: #ff654c\">👍할인율 최고??</div>\n</div>",
      used: true,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-22T01:30:13.770563",
    },
    {
      id: 18,
      enTemplate:"",
      template:
        "<div style=\"display: flex; flex-direction: column; flex-direction: center; align-items: center; justify-content: center; width: 320px; height: 130px; background-color: #f3f2f2; border-radius: 20px; text-align: center; font-family: '나눔고딕', 'Nanum Gothic', '돋움', '맑은고딕'; font-weight: bold; line-height: 1.5; letter-spacing: -0.2px; white-space: nowrap\">\n    <div style=\"font-size: 12px; font-family: 나눔고딕, NanumGothic; color: #000\">저를 데려가세요</div>\n    <div style=\"font-size: 20px; font-family: 나눔고딕, NanumGothic; font-weight: bolder; color: #ff654c\">📌할인율 |dc_rate|%📌</div>\n</div>",
      used: true,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-22T01:30:13.770563",
    },
    {
      id: 17,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 16,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 15,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
    {
      id: 14,
      enTemplate:"",
      template: "",
      used: false,
      createdAt: "2022-04-07T08:09:27.519043",
      updatedAt: "2022-04-07T08:09:27.519043",
    },
  ],
  pageable: {
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 20,
    paged: true,
    unpaged: false,
  },
  totalPages: 2,
  totalElements: 33,
  last: false,
  size: 20,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 20,
  first: true,
  empty: false,
}
Table.parameters = {
  msw: {
    handlers: [
      rest.get(
        "https://api.admin.stage.eigene.io/api/v2/automation/labels/template",
        (req, res, ctx) => {
          return res(
            ctx.json(result)
          );
        }
      ),
      rest.get(
        "/api/v2/automation/labels/template",
        (req, res, ctx) => {
          return res(
            ctx.json(result)
          );
        }
      ),
    ],
  },
};
