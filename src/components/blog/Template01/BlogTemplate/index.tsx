import { Markup } from "interweave";
import { useBlog, useUserData } from "hooks";
import _ from "lodash";
import { useState, useEffect } from "react";
import blogService from "apis/services/blogService";
import { useAppDispatch } from "store";
import { KeywordResponse } from "types/blog";

const BlogTemplate = () => {
  const dispatch = useAppDispatch();

  const {
    userTextReducer,
    productsReducer,
    keywordsReducer,
    labelTemplateReducer,
    requestReducer,
    language,
    translatedTxt,
    replaceLabelByTokens,
    setTranslatedText,
    getHtmlSource,
    setHtmlSource,
  } = useBlog();
  const { options } = useUserData();
  const isEnglish = language === "en";

  const [keywordEn, setKeywordEn] = useState<string[]>([]);
  const [itemNameEn, setItemNameEn] = useState<string[]>([]);
  const [brandNameEn, setBrandNameEn] = useState<string[]>([]);
  const [hashEn, setHashEn] = useState<string[]>([]);
  const [sourceEn, setSourceEn] = useState<string[]>([]);
  const [userTextEn, setUserTextEn] = useState<string[]>([]);
  const [labelDataEn, setLabelDataEn] = useState<string[]>([]);

  // 키워드 번역
  useEffect(() => {
    if (!isEnglish) {
      return;
    }
    let keywords: string[] = [];
    keywordsReducer?.list.map((keyword) => {
      keywords.push(keyword.keyword);
    });

    Promise.resolve(blogService.getTranslatedText(keywords)).then((response) =>
      setKeywordEn(response.data.data.translatedText)
    );
  }, [keywordsReducer, isEnglish]);

  // 상품정보(아이템명, 브랜드명, 출처, 해시태그) 번역
  useEffect(() => {
    if (!isEnglish) {
      return;
    }
    let itemNames: string[] = [],
      brandNames: string[] = [],
      hashTags: string[] = [],
      sources: string[] = [],
      userTexts: string[] = [];

    productsReducer?.list.map((product) => {
      itemNames.push(String(product.itemName));
      brandNames.push(String(product.brandName));
      hashTags.push(product.hashTag.join("|"));
      sources.push(
        options.filter((opt) => opt.value === product.productOwnerCuid)[0].label
      );
    });
    userTexts.push(userTextReducer.text_1);
    userTexts.push(userTextReducer.text_2);
    userTexts.push(userTextReducer.text_3);

    Promise.resolve(blogService.getTranslatedText(itemNames)).then((response) =>
      setItemNameEn(response.data.data.translatedText)
    );
    Promise.resolve(blogService.getTranslatedText(brandNames)).then(
      (response) => setBrandNameEn(response.data.data.translatedText)
    );
    Promise.resolve(blogService.getTranslatedText(hashTags)).then((response) =>
      setHashEn(response.data.data.translatedText)
    );
    Promise.resolve(blogService.getTranslatedText(sources)).then((response) =>
      setSourceEn(response.data.data.translatedText)
    );
    Promise.resolve(blogService.getTranslatedText(userTexts)).then((response) =>
      setUserTextEn(response.data.data.translatedText)
    );
  }, [keywordsReducer, isEnglish]);

  useEffect(() => {
    const htmlSource = getHtmlSource();
    htmlSource && setHtmlSource(htmlSource);
  }, [
    keywordsReducer,
    isEnglish,
    keywordEn,
    itemNameEn,
    brandNameEn,
    hashEn,
    sourceEn,
  ]);

  return (
    <div
      className="blogContainer"
      style={{
        display: "block",
        width: "100%",
        maxWidth: "743px",
        margin: "0 auto",
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "block",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        {/* 타이틀 */}
        <div
          style={{
            fontSize: "14.6px",
            fontWeight: "bold",
            fontFamily: "나눔고딕, NanumGothic",
            textAlign: "left",
            marginBottom: "30px",
          }}
        >
          <strong>{isEnglish ? userTextEn[0] : userTextReducer.text_1}</strong>
        </div>
        {/* 실시간 키워드영역 */}
        <table
          style={{
            width: "333px",
            borderColor: "f2f2f2",
            margin: "0 auto 50px auto",
            textAlign: "center",
            backgroundColor: "white",
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
                      fontSize: "18pt ",
                    }}
                  >
                    {isEnglish
                      ? `Top ${keywordsReducer?.list.length} real-time keywords`
                      : `실시간 키워드 TOP ${keywordsReducer?.list.length}`}
                  </span>
                </h2>
                <p style={{ lineHeight: 1.5 }}>
                  <strong>&nbsp;</strong>
                </p>

                <p style={{ lineHeight: 1.5 }}>
                  <span
                    style={{
                      fontFamily: "나눔고딕, NanumGothic",
                      fontSize: "18pt ",
                    }}
                  >
                    <img
                      id="852vCzx3/1st-line.png"
                      className="egjs-visible"
                      style={{
                        border: "none",
                        cursor: "pointer",
                        maxWidth: "700px",
                      }}
                      src="https://i.postimg.cc/852vCzx3/1st-line.png"
                      alt=""
                      width="100%"
                      height="1"
                    />
                  </span>
                </p>

                <p style={{ lineHeight: 1.5 }}>&nbsp;</p>
                <p style={{ lineHeight: 1.5 }}>&nbsp;</p>

                <div style={{ textAlign: "left" }}>
                  {keywordsReducer?.list.map((keyword, index) => {
                    return (
                      <p
                        style={{ lineHeight: 1.5, marginBottom: "5px" }}
                        key={index}
                      >
                        <strong>
                          <span
                            style={
                              index < 5
                                ? {
                                    color: "#ff0000",
                                    fontSize: "12pt ",
                                    fontFamily: "나눔고딕, NanumGothic",
                                  }
                                : {
                                    color: "#000",
                                    fontSize: "12pt ",
                                    fontFamily: "나눔고딕, NanumGothic",
                                  }
                            }
                          >
                            {index + 1}
                          </span>
                          <span
                            style={{
                              fontFamily: "나눔고딕, NanumGothic",
                              fontSize: "12pt ",
                            }}
                          >
                            &nbsp; &nbsp;
                            {isEnglish ? (
                              <span>{keywordEn[index]}</span>
                            ) : (
                              <span>{keyword.keyword}</span>
                            )}
                          </span>
                          {/* 오늘의 픽 */}
                          {keyword.todaysPick === true ? (
                            <>
                              <span>👈&nbsp;</span>
                              <strong
                                style={{
                                  fontFamily: "나눔고딕, NanumGothic",
                                  fontSize: "12pt ",
                                }}
                              >
                                <span
                                  style={{
                                    backgroundColor: "#ffef00",
                                  }}
                                >
                                  {isEnglish
                                    ? "Today's Korea Pick!"
                                    : "오늘의 Korea Pick!"}
                                </span>
                              </strong>
                            </>
                          ) : null}
                        </strong>
                      </p>
                    );
                  })}
                </div>

                <p style={{ lineHeight: 1.5 }}>&nbsp;</p>
                <p style={{ lineHeight: 1.5 }}>&nbsp;</p>
                <p style={{ lineHeight: 1.5, textAlign: "right" }}>
                  <span style={{ fontFamily: "나눔고딕, NanumGothic" }}>
                    <img
                      id="852vCzx3/1st-line.png"
                      className="egjs-visible"
                      style={{
                        border: "none",
                        cursor: "pointer",
                        maxWidth: "700px",
                      }}
                      src="https://i.postimg.cc/852vCzx3/1st-line.png"
                      alt=""
                      width="100%"
                      height="1"
                    />
                  </span>
                </p>
                <p style={{ lineHeight: 1.5, textAlign: "right" }}>
                  <span style={{ fontFamily: "나눔고딕, NanumGothic" }}>
                    {isEnglish
                      ? `As of ${requestReducer?.date}`
                      : `${requestReducer?.date} 기준`}
                  </span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <p>&nbsp;</p>
        {/* 실시간 키워드 트랜드 */}
        <div
          className="keyword"
          style={{
            fontSize: "18px",
            fontFamily: "나눔고딕, NanumGothic고딕",
            marginBottom: "30px",
          }}
        >
          {isEnglish ? userTextEn[1] : userTextReducer.text_2}
        </div>
        {/* 헤드카피 */}
        <div
          style={{
            fontSize: "14.6px",
            fontFamily: "나눔고딕, NanumGothic고딕",
            textAlign: "left",
            marginBottom: "30px",
          }}
        >
          {isEnglish ? userTextEn[2] : userTextReducer.text_3}
        </div>

        {/* 실제데이터 */}
        {productsReducer?.list?.map((item, index) => {
          const {
            productOwnerCuid,
            itemName,
            itemImage,
            itemUrl,
            brandName,
            brandPriceDiff,
            brandPriceUse,
            categoryPriceDiff,
            categoryPriceUse,
            selectedLabel,
            hashTag,
          } = item;
          return (
            <div
              key={index}
              className="product"
              style={{
                maxWidth: 743,
                width: "100%",
                textAlign: "center",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  maxWidth: 743,
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    margin: "0 auto",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={itemImage}
                    width="100%"
                    style={{ maxWidth: "500px", margin: "0 auto" }}
                    alt="thumbnail"
                  />
                </div>
                <div
                  style={{
                    marginTop: "3px",
                    fontFamily: "나눔고딕, NanumGothic",
                    fontSize: "11pt",
                  }}
                >
                  {isEnglish ? (
                    <span>Source : {sourceEn[index]}</span>
                  ) : (
                    <span>
                      출처 :{" "}
                      {String(
                        options?.filter(
                          (opt) => opt?.value === productOwnerCuid
                        )[0]?.label
                      )}
                    </span>
                  )}
                </div>
                {/* BUY NOW 버튼 */}
                <div style={{ textAlign: "center" }}>
                  &nbsp;
                  <a href={itemUrl} target="_blank" rel="noreferrer">
                    <img
                      src="https://i.postimg.cc/g2c5bc2J/buy-button-v8.png"
                      alt="button"
                    />
                  </a>
                </div>
                {/* 브랜드명 */}
                <div
                  style={{
                    fontSize: "29pt",
                    fontFamily: "나눔고딕, NanumGothic",
                    fontWeight: "bold",
                  }}
                >
                  {isEnglish ? (
                    <strong>{brandNameEn[index]}</strong>
                  ) : (
                    <strong>{brandName}</strong>
                  )}
                </div>
                {/* 상품명 */}
                <div
                  style={{
                    fontFamily: "나눔고딕, NanumGothic고딕",
                    fontSize: "14pt",
                    color: "#666",
                  }}
                >
                  {isEnglish ? (
                    <span>{itemNameEn[index]}</span>
                  ) : (
                    <span>{itemName}</span>
                  )}
                </div>
                <div>&nbsp;</div>
                {/* 할인율 */}
                <div
                  style={{
                    fontFamily: "나눔고딕, NanumGothic고딕",
                    fontSize: "11pt",
                    color: "#666",
                  }}
                >
                  <div>
                    {brandPriceUse === true ? (
                      brandPriceDiff && brandPriceDiff > 0 ? (
                        isEnglish ? (
                          <div>
                            It's{" "}
                            <span style={{ color: "#00f", fontWeight: "bold" }}>
                              {Math.ceil(brandPriceDiff)}%
                            </span>{" "}
                            cheaper than the brand average
                          </div>
                        ) : (
                          <div>
                            브랜드 대비&nbsp;
                            <strong
                              style={{ color: "#00f", fontWeight: "bold" }}
                            >
                              {Math.ceil(brandPriceDiff)}%&nbsp;
                            </strong>
                            저렴한 상품입니다
                          </div>
                        )
                      ) : null
                    ) : null}
                  </div>

                  <div>
                    {categoryPriceUse === true ? (
                      categoryPriceDiff && categoryPriceDiff > 0 ? (
                        isEnglish ? (
                          <div>
                            It's{" "}
                            <span style={{ color: "#00f", fontWeight: "bold" }}>
                              {Math.ceil(categoryPriceDiff)}%
                            </span>{" "}
                            cheaper than the category average
                          </div>
                        ) : (
                          <div>
                            카테고리 대비&nbsp;
                            <strong
                              style={{ color: "#00f", fontWeight: "bold" }}
                            >
                              {Math.ceil(categoryPriceDiff)}%&nbsp;
                            </strong>
                            저렴한 상품입니다
                          </div>
                        )
                      ) : null
                    ) : null}
                  </div>
                </div>
                {/* 모바일에서 카테고리대비와 라벨사이의 간격을 위한 빈 div */}
                <div>&nbsp;</div>

                {/* 라벨 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {selectedLabel?.map((label, index) => {
                    const labelHTML = isEnglish
                      ? replaceLabelByTokens(
                          labelTemplateReducer?.list?.filter(
                            (template) => template.id === label?.labelId
                          )[0]?.enTemplate as string,
                          label?.labelProperties
                        )
                      : replaceLabelByTokens(
                          labelTemplateReducer?.list?.filter(
                            (template) => template.id === label?.labelId
                          )[0]?.template as string,
                          label?.labelProperties
                        );

                    return (
                      <div
                        style={{
                          margin: "10px",
                        }}
                        key={index}
                      >
                        <Markup
                          content={
                            labelHTML?.includes("|") ? labelHTML : labelHTML
                          }
                        />
                        <div>&nbsp;</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ height: "50px" }}>&nbsp;</div>
              {/* 해시태그 */}
              <div
                style={{
                  fontFamily: "나눔고딕, NanumGothic고딕",
                  fontSize: "11pt ",
                  color: "#666",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                {isEnglish
                  ? hashEn[index]
                      ?.split("|")
                      ?.map((hash: string, index: number) => {
                        return <span key={index}>#{hash}&nbsp;</span>;
                      })
                  : hashTag?.map((hash: string, index: number) => {
                      return <span key={index}>#{hash}&nbsp;</span>;
                    })}

                {}
              </div>

              <p>
                <img
                  src="https://i.postimg.cc/7Z7CtpWb/line.png"
                  width="740"
                  alt="하단구분선"
                />
              </p>
              <p>&nbsp;</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogTemplate;
