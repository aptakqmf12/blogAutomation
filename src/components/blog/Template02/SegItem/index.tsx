import React from "react";
import * as S from "./style";
import { useUserData, useBlogV2, useTheme } from "hooks";
import { useAppDispatch } from "store";
import { blogActionV2 } from "store/modules/blogV2";

import { Checkbox, Input, Empty, Switch } from "antd";
import { ReactComponent as Add } from "assets/img/blog/Add.svg";
import { ReactComponent as Delete } from "assets/img/blog/Delete.svg";
import { SimilarSeg } from "types/blogV2";

const ProductsInfo = () => {
  const dispatch = useAppDispatch();
  const { currentTheme } = useTheme();
  const {
    similarSeg,
    segBest,
    associatedSeg,
    useSimilarSection,
    useAssociatedSection,
    segBestText,
    similarText,
    useBestSection,
    setActiveSegBest,
    setActiveSimilarSeg,
    setActiveAssociatedSeg,
    setSimilarSegSection,
    setBestSegSection,
    setAssociatedSegSection,
  } = useBlogV2();

  return (
    <S.SegBestBox>
      {/* segBest 영역 */}
      <S.ItemViewBox theme={currentTheme}>
        <S.ItemViewTitle>
          <div>seg내 대표 상품 소개 (브랜드를 대표하는 아이템)</div>
          <Switch
            checked={useBestSection}
            onChange={() => setBestSegSection(!useBestSection)}
          />
        </S.ItemViewTitle>

        {useBestSection ? (
          <S.ItemContainer>
            <div>
              <S.CheckBoxSection>
                {segBest?.map((seg, index) => {
                  return (
                    <S.ItemCheckBox key={seg.itemId}>
                      <Checkbox
                        onChange={() => setActiveSegBest(index)}
                        checked={seg.active}
                        className="check-box"
                      >
                        check
                      </Checkbox>
                      <img src={seg.imageUrl} alt="세그이미지" />
                    </S.ItemCheckBox>
                  );
                })}
              </S.CheckBoxSection>
            </div>
            <div>
              <h2>대표 세그 이미지</h2>
              <S.SegImgContainer color="#ff7e79">
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
            </div>
          </S.ItemContainer>
        ) : (
          <Empty description="섹션이 삭제되었습니다" />
        )}
      </S.ItemViewBox>

      {/* similar 영역 */}
      <S.ItemViewBox theme={currentTheme}>
        <S.ItemViewTitle>
          <div>유사 seg내 대표 상품 소개 (꾸준히 사랑받는 아이템)</div>
          <Switch
            checked={useSimilarSection}
            onChange={() => setSimilarSegSection(!useSimilarSection)}
          />
        </S.ItemViewTitle>

        {useSimilarSection ? (
          <S.ItemContainer>
            <div>
              <S.CheckBoxSection>
                {similarSeg?.map((seg, index) => {
                  return (
                    <S.ItemCheckBox key={seg.itemId}>
                      <Checkbox
                        onChange={() => setActiveSimilarSeg(index)}
                        checked={seg.active}
                        className="check-box"
                      >
                        check
                      </Checkbox>
                      <img src={seg.imageUrl} alt="세그이미지" />
                    </S.ItemCheckBox>
                  );
                })}
              </S.CheckBoxSection>
            </div>
            <div>
              <h2>유사 세그 이미지</h2>
              <S.SegImgContainer color="#feb942">
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
            </div>
          </S.ItemContainer>
        ) : (
          <Empty description="섹션이 삭제되었습니다" />
        )}
      </S.ItemViewBox>

      {/* 세번째 영역 */}
      <S.ItemViewBox theme={currentTheme}>
        <S.ItemViewTitle>
          <div>연관 seg(찰떡인 짝꿍템)</div>
          <Switch
            checked={useAssociatedSection}
            onChange={() => setAssociatedSegSection(!useAssociatedSection)}
          />
        </S.ItemViewTitle>

        {useAssociatedSection ? (
          <S.ItemContainer>
            <div>
              <S.CheckBoxSection>
                {associatedSeg?.map((seg, index) => {
                  return (
                    <S.ItemCheckBox key={seg.itemId}>
                      <Checkbox
                        onChange={() => setActiveAssociatedSeg(index)}
                        checked={seg.active}
                        className="check-box"
                      >
                        check
                      </Checkbox>
                      <img src={seg.imageUrl} alt="세그이미지" />
                    </S.ItemCheckBox>
                  );
                })}
              </S.CheckBoxSection>
            </div>
            <div>
              <h2>연관 세그 이미지</h2>
              <S.SegImgContainer color="#a5c33f">
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
            </div>
          </S.ItemContainer>
        ) : (
          <Empty description="섹션이 삭제되었습니다" />
        )}

        <div style={{ height: 100 }}></div>
      </S.ItemViewBox>
    </S.SegBestBox>
  );
};

export default ProductsInfo;
