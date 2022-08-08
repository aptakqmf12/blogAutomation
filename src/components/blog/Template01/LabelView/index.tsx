import React from "react";
import * as S from "./style";
import { Empty, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { useAppDispatch } from "store";
import { Markup } from "interweave";
import { useBlog, useTheme } from "hooks";
import { blogAction } from "store/modules/blog";

const LabelView = () => {
  const dispatch = useAppDispatch();
  const { currentTheme } = useTheme();
  const {
    productsReducer,
    labelTemplateReducer,
    currentPrdIdReducer,
    labelData,
    replaceLabelByTokens,
  } = useBlog();

  const selectLabel =
    (prdId: string, label: any) => (e: React.MouseEvent<HTMLDivElement>) => {
      /// labelData에서 labelId에 해당하는걸 products/labels에 덮어버리
      const currentMode = productsReducer?.list?.filter(
        (el) => el.id === prdId
      )[0]?.selectMode;

      if (currentMode === 0) {
        dispatch(blogAction.setLeftLabel({ prdId: prdId, label: label }));
      } else if (currentMode === 1) {
        dispatch(blogAction.setRightLabel({ prdId: prdId, label: label }));
      } else {
        notification.info({
          message: "레이블을 선택해주세요",
          description: "좌측 상품페이지의 레이블을 클릭해주세요",
          placement: "topRight",
        });
      }
    };

  return (
    <>
      <S.LabelViewBox theme={currentTheme}>
        <h3>레이블 선택 영역 </h3>
        <S.LabelBox>
          {currentPrdIdReducer && labelData && labelData.list.length > 0 ? (
            labelData.list.map((Label) => {
              const { labelId, labelProperties } = Label;
              const isSelected =
                labelId !==
                  productsReducer?.list.filter(
                    (prd) =>
                      prd.id === currentPrdIdReducer && prd.selectedLabel[0]
                  )[0]?.selectedLabel[0]?.labelId &&
                labelId !==
                  productsReducer?.list.filter(
                    (prd) =>
                      prd.id === currentPrdIdReducer && prd.selectedLabel[1]
                  )[0]?.selectedLabel[1]?.labelId;

              if (isSelected) {
                return (
                  // 선택되지 않은 라벨들
                  labelTemplateReducer?.list
                    .filter((template) => template.id === labelId) // labelData에 남은 레이블들의 템플릿만
                    .map((el) => {
                      let labelHTML = replaceLabelByTokens(
                        el.template,
                        labelProperties
                      );
                      if (labelHTML?.includes("|")) {
                        console.log(
                          ` 상품아이디 : ${currentPrdIdReducer},  오류레이블 : ${el.id}번`
                        );
                      } else {
                        return (
                          <S.Label
                            key={labelId}
                            onClick={selectLabel(currentPrdIdReducer, Label)}
                          >
                            <Markup content={labelHTML} />
                          </S.Label>
                        );
                      }
                    })
                );
              } else {
                return labelTemplateReducer?.list
                  .filter((template) => template.id === labelId) // labelData에 남은 레이블들의 템플릿만
                  .map((el) => {
                    let labelHTML = replaceLabelByTokens(
                      el.template,
                      Label.labelProperties
                    );
                    if (labelHTML?.includes("|")) {
                      return null;
                    } else {
                      return (
                        <S.Label key={Label.labelId} className="selected">
                          <Markup content={labelHTML} />
                          <div className="checked">
                            <CheckOutlined />
                          </div>
                        </S.Label>
                      );
                    }
                  });
              }
            })
          ) : (
            <Empty />
          )}
        </S.LabelBox>
      </S.LabelViewBox>
    </>
  );
};

export default LabelView;
