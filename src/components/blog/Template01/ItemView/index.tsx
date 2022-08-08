import React, { useCallback } from "react";
import * as S from "./style";
import { Select, Empty, Checkbox } from "antd";
import { debounce } from "lodash";
import { Markup } from "interweave";
import { DeleteTwoTone } from "@ant-design/icons";
import { useAppDispatch } from "store";
import { useBlog, useUserData, useTheme } from "hooks";
import * as BlogReducer from "store/modules/blog";
import { fetchLabelData } from "store/modules/blog/saga";

const { blogAction } = BlogReducer;

export const ItemView = () => {
  const dispatch = useAppDispatch();
  const { currentTheme } = useTheme();
  const { customerName, options } = useUserData();
  const {
    userTextReducer,
    productsReducer,
    keywordsReducer,
    labelTemplateReducer,
    requestReducer,
    currentPrdIdReducer,
    replaceLabelByTokens,
    setcurrentProductId,
    setUserInputTitle,
    setUserInputHeadCopy,
    setUserInputTrandInfo,
    setTranslatedText,
  } = useBlog();

  const { Option } = Select;
  const { date } = requestReducer;

  // const onDebounceTitle = useCallback(
  //   debounce((value) => {
  //     dispatch(blogAction.setUserInputTitle(value));
  //   }, 1000),
  //   []
  // );
  // const onDebounceHeadCopy = useCallback(
  //   debounce((value) => dispatch(blogAction.setUserInputHeadCopy(value)), 1000),
  //   []
  // );
  // const onDebounceTrandInfo = useCallback(
  //   debounce(
  //     (value) => dispatch(blogAction.setUserInputTrandInfo(value)),
  //     1000
  //   ),
  //   []
  // );
  const onDebounceTitle = (value: string) => {
    setUserInputTitle(value);
  };
  const onDebounceHeadCopy = (value: string) => {
    setUserInputHeadCopy(value);
  };
  const onDebounceTrandInfo = (value: string) => {
    setUserInputTrandInfo(value);
  };

  const selectProduct =
    (prdId: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      const currentDeleteTarget = e.currentTarget.querySelector(".delete");
      // 선택된 상품을 셀렉
      if (
        e.currentTarget !== currentDeleteTarget && //삭제버튼이 아니고
        prdId !== currentPrdIdReducer // 이미 선택한상품이 아닐때
      ) {
        setcurrentProductId(prdId);
      } else {
        return;
      }
      if (prdId === currentPrdIdReducer || date === undefined) {
        return;
      }
      dispatch(
        fetchLabelData.request({
          productId: prdId,
          date: date,
        })
      );
    };
  const onDeleteItem =
    (prdId: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      dispatch(blogAction.setDeleteItem({ prdId }));
      prdId === currentPrdIdReducer && setcurrentProductId(null);
    };

  const setLeftLabel =
    (prdId: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.classList.add("selected");
      e.currentTarget.nextElementSibling?.classList.remove("selected");
      dispatch(blogAction.setLabelMode({ prdId: prdId, mode: 0 }));
      dispatch(blogAction.setLeftLabelClear({ prdId }));
    };
  const setRightLabel =
    (prdId: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.classList.add("selected");
      e.currentTarget.previousElementSibling?.classList.remove("selected");
      dispatch(blogAction.setLabelMode({ prdId: prdId, mode: 1 }));
      dispatch(blogAction.setRightLabelClear({ prdId }));
    };

  return (
    <div style={{ height: "calc(100vh - 340px)", overflow: "auto" }}>
      <S.KeywordViewBox theme={currentTheme}>
        <S.StyledTextarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onDebounceTitle(e.target.value);
          }}
          placeholder="text를 입력해주세요"
          rows={4}
          value={userTextReducer.text_1}
          style={{ marginBottom: "10px" }}
        ></S.StyledTextarea>
        {/* 키워드 영역 */}
        {keywordsReducer ? (
          <table
            style={{
              width: "333px",
              borderColor: "f2f2f2",
              margin: "10px auto 10px auto",
              textAlign: "center",
            }}
          >
            <tbody>
              <tr style={{ height: "200px" }}>
                <td style={{ width: "324.6px", height: "200px" }}>
                  <h2
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: "24px",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "나눔고딕, NanumGothic",
                        fontSize: "18pt",
                      }}
                    >
                      실시간 키워드 TOP {keywordsReducer?.list.length}
                    </span>
                  </h2>

                  <p style={{ lineHeight: 1.5, marginBottom: "10px" }}>
                    <span
                      style={{
                        fontFamily: "나눔고딕, NanumGothic",
                        fontSize: "18pt",
                      }}
                    >
                      <strong>
                        <img
                          id="852vCzx3/1st-line.png"
                          className="egjs-visible"
                          style={{
                            border: "none",
                            cursor: "pointer",
                          }}
                          src="https://i.postimg.cc/852vCzx3/1st-line.png"
                          alt=""
                          width="324"
                          height="1"
                        />
                      </strong>
                    </span>
                  </p>
                  <div style={{ textAlign: "left" }}>
                    {keywordsReducer?.list.map((keyword, index) => {
                      return (
                        <p style={{ lineHeight: 1.5 }} key={index}>
                          <strong>
                            <span
                              style={
                                index < 5
                                  ? { color: "#ff0000" }
                                  : { color: "#000" }
                              }
                            >
                              {index + 1}
                            </span>
                            <span
                              style={{
                                fontFamily: "나눔고딕, NanumGothic",
                                fontSize: "12pt",
                              }}
                            >
                              &nbsp; &nbsp; {keyword.keyword}
                            </span>
                            {/* 오늘의 픽 */}
                            {keyword.todaysPick === true ? (
                              <>
                                <span>👈&nbsp;</span>
                                <strong
                                  style={{
                                    fontFamily: "나눔고딕, NanumGothic",
                                    fontSize: "12pt",
                                  }}
                                >
                                  <span
                                    style={{
                                      backgroundColor: "#ffef00",
                                    }}
                                  >
                                    오늘의 Korea Pick!
                                  </span>
                                </strong>
                              </>
                            ) : null}
                          </strong>
                        </p>
                      );
                    })}
                  </div>

                  <p style={{ lineHeight: 1.5, textAlign: "right" }}>
                    <span style={{ fontFamily: "나눔고딕, NanumGothic" }}>
                      <img
                        id="852vCzx3/1st-line.png"
                        className="egjs-visible"
                        style={{ border: "none", cursor: "pointer" }}
                        src="https://i.postimg.cc/852vCzx3/1st-line.png"
                        alt=""
                        width="324"
                        height="1"
                      />
                    </span>
                  </p>
                  <p style={{ lineHeight: 1.5, textAlign: "right" }}>
                    <span style={{ fontFamily: "나눔고딕, NanumGothic" }}>
                      {date} 기준
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <Empty description="날짜를 선택해주세요" />
        )}

        <S.StyledTextarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onDebounceTrandInfo(e.target.value);
          }}
          style={{ textAlign: "center" }}
          placeholder="text를 입력해주세요"
          value={userTextReducer.text_2}
          rows={4}
        ></S.StyledTextarea>
        <S.StyledTextarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onDebounceHeadCopy(e.target.value);
          }}
          placeholder="text를 입력해주세요"
          value={userTextReducer.text_3}
          rows={4}
        >
          faqgqwe
        </S.StyledTextarea>
      </S.KeywordViewBox>
      {/* 상품 영역 */}

      <S.ItemViewBox theme={currentTheme}>
        {productsReducer && productsReducer.list.length > 0 ? ( // 데이터를 받아왔고, 받아온 데이터가 비어있지 않다면
          productsReducer?.list.map((item, index) => {
            const {
              id,
              cuid,
              productOwnerCuid,
              itemImage,
              itemUrl,
              itemName,
              brandName,
              brandPriceDiff,
              brandPriceUse,
              categoryPriceDiff,
              categoryPriceUse,
              hashTag,
              labels,
              selectedLabel,
            } = item;
            const leftLabelContent = replaceLabelByTokens(
              String(
                labelTemplateReducer?.list.filter(
                  (template) => template.id === selectedLabel[0]?.labelId
                )[0]?.template
              ),
              selectedLabel[0]?.labelProperties
            );
            const rightLabelContent = replaceLabelByTokens(
              String(
                labelTemplateReducer?.list.filter(
                  (template) => template.id === selectedLabel[1]?.labelId
                )[0]?.template
              ),
              selectedLabel[1]?.labelProperties
            );
            return (
              <S.ItemBox
                key={index}
                onClick={selectProduct(id)}
                className="itemBox"
                style={
                  currentPrdIdReducer === id
                    ? { backgroundColor: "#fbfbfb" }
                    : {}
                }
              >
                <S.DeleteBtn onClick={onDeleteItem(id)}>
                  <DeleteTwoTone className="delete" />
                </S.DeleteBtn>
                {/* 썸네일, 상품명 */}
                <S.ThumbBox>
                  <img src={itemImage} alt="thumbnail" />
                </S.ThumbBox>
                <S.Source>
                  (출처 :{" "}
                  {String(
                    options?.filter((opt) => opt?.value === productOwnerCuid)[0]
                      ?.label
                  )}{" "}
                  )
                </S.Source>
                <S.BuyBtnBox>
                  <a href={itemUrl} target="_blank">
                    <img
                      src="https://i.postimg.cc/g2c5bc2J/buy-button-v8.png"
                      alt="button"
                    />
                  </a>
                </S.BuyBtnBox>
                <S.BrandName>{brandName}</S.BrandName>
                <S.PrdName>{itemName}</S.PrdName>

                {/* 할인율 셀렉트 박스 */}
                <S.DiscountBox>
                  {brandPriceDiff > 0 ? (
                    <>
                      <div className="info">
                        브랜드 평균대비 약 {Math.ceil(brandPriceDiff)}%
                        <span style={{ color: "blue" }}>저렴합니다</span>
                      </div>
                      <Checkbox
                        checked={brandPriceUse}
                        onChange={() =>
                          dispatch(blogAction.setBrandPriceUse({ prdId: id }))
                        }
                      />
                    </>
                  ) : (
                    <>
                      {/* 브랜드 평균대비 약 {Math.ceil(brandPriceDiff) * -1}%
                          <span style={{ color: "red" }}>비쌉니다</span> */}
                    </>
                  )}
                </S.DiscountBox>
                <S.DiscountBox>
                  &nbsp;
                  {categoryPriceDiff > 0 ? (
                    <>
                      <div className="info">
                        카테고리 평균대비 약 {Math.ceil(categoryPriceDiff)}%
                        <span style={{ color: "blue" }}>저렴합니다</span>
                      </div>
                      <Checkbox
                        checked={categoryPriceUse}
                        onChange={() =>
                          dispatch(
                            blogAction.setCategoryPriceUse({ prdId: id })
                          )
                        }
                      />
                    </>
                  ) : (
                    <>
                      {/* 카테고리 평균대비 약 {Math.ceil(categoryPriceDiff) * -1}%
                      <span style={{ color: "red" }}>비쌉니다</span> */}
                    </>
                  )}
                </S.DiscountBox>
                {/* 라벨 */}
                <S.LabelBox>
                  {labels.length > 0 ? (
                    <>
                      {/* 좌측 레이블 */}
                      {selectedLabel[0] ? (
                        <S.Label onClick={setLeftLabel(id)}>
                          {leftLabelContent?.includes("|") ? (
                            <Empty description="레이블을 다시 선택 해주세요" />
                          ) : (
                            <Markup tagName="span" content={leftLabelContent} />
                          )}
                        </S.Label>
                      ) : (
                        <S.Label onClick={setLeftLabel(id)}></S.Label>
                      )}

                      {/* 우측 레이블 */}
                      {selectedLabel[1] ? (
                        <S.Label onClick={setRightLabel(id)}>
                          {rightLabelContent?.includes("|") ? (
                            <Empty description="레이블을 다시선택 해주세요" />
                          ) : (
                            <Markup
                              tagName="span"
                              content={rightLabelContent}
                            />
                          )}
                        </S.Label>
                      ) : (
                        <S.Label onClick={setRightLabel(id)}></S.Label>
                      )}
                    </>
                  ) : (
                    <Empty description="레이블이 없습니다" />
                  )}
                </S.LabelBox>

                {/* 해시태그 */}
                <S.HashTagsBox>
                  <S.HashTitle>#연관 해시태그</S.HashTitle>
                  <S.HashTage>
                    {hashTag.map((hash, index) => {
                      return <span key={index}>#{hash}&nbsp;</span>;
                    })}
                  </S.HashTage>
                </S.HashTagsBox>
              </S.ItemBox>
            );
          })
        ) : (
          <Empty />
        )}
      </S.ItemViewBox>
    </div>
  );
};

export default ItemView;
