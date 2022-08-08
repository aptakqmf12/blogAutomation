import { useEffect } from "react";
import { useBlogV2, useUserData } from "hooks";
import { useAppDispatch } from "store";
import { blogActionV2 } from "store/modules/blogV2";

const BlogTemplateV2 = () => {
  const dispatch = useAppDispatch();
  const {
    itemSegInfo,
    firstSeg,
    secondSeg,
    thirdSeg,
    fourthSeg,
    segBest,
    useBestSection,
    similarSeg,
    useSimilarSection,
    associatedSeg,
    useAssociatedSection,
    segTabIndex,
    hexaIndexText,
    barIndexText,
    segBestText,
    similarText,
    language,
    imageUploadResponse,
    barGraphData,
    openModal,
    replaceIndex,
    replaceMultipleText,
    uploadImageByClassName,
  } = useBlogV2();

  const { customerName } = useUserData();

  useEffect(() => {
    const htmlSource = document.querySelector(".blogContainerV2")?.innerHTML;
    dispatch(blogActionV2.setHtmlSource(String(htmlSource)));
  }, [
    itemSegInfo,
    segTabIndex,
    useSimilarSection,
    imageUploadResponse,
    segBestText,
    similarText,
  ]);

  const tabCondition = () => {
    if (segTabIndex === 1) {
      return (
        <>
          <div
            style={{
              textAlign: "left",
              fontSize: "16px",
            }}
          >
            <div>
              <strong>{secondSeg && secondSeg.qna[0].question}</strong>{" "}
              {secondSeg && secondSeg.qna[0].answer}
            </div>
            <div>&nbsp;</div> {/* 줄바꿈 */}
            <div>
              <strong>{secondSeg && secondSeg.qna[1].question}</strong>{" "}
              {secondSeg && secondSeg.qna[1].answer}
            </div>
          </div>
        </>
      );
    } else if (segTabIndex === 2) {
      return (
        <>
          <div
            style={{
              textAlign: "left",
              fontSize: "16px",
            }}
          >
            <div>
              <div>
                <strong>✅ {secondSeg?.segName}</strong>
              </div>
              <div>{secondSeg?.description}</div>
            </div>
            <div>&nbsp;</div> {/* 줄바꿈 */}
            <div>
              <div>
                <strong>✅ {thirdSeg?.segName}</strong>
              </div>
              <div>{thirdSeg?.description}</div>
            </div>
            <div>&nbsp;</div> {/* 줄바꿈 */}
            <div>
              <div>
                <strong>✅ {fourthSeg?.segName}</strong>
              </div>
              <div>{fourthSeg?.description}</div>
            </div>
          </div>
        </>
      );
    } else if (segTabIndex === 3) {
      return (
        <>
          <div
            style={{
              textAlign: "left",
              fontSize: "16px",
            }}
          >
            <div>
              <div>
                <strong>🤔 {secondSeg?.qna[1].question}</strong>
              </div>
              <div>A. {secondSeg?.qna[1].answer}</div>
            </div>
            <div>&nbsp;</div> {/* 줄바꿈 */}
            <div>
              <div>
                <strong>🤔 {thirdSeg?.qna[1].question}</strong>
              </div>
              <div>A. {thirdSeg?.qna[1].answer}</div>
            </div>
            <div>&nbsp;</div> {/* 줄바꿈 */}
            <div>
              <div>
                <strong>🤔 {fourthSeg?.qna[1].question}</strong>
              </div>
              <div>A. {fourthSeg?.qna[1].answer}</div>
            </div>
          </div>
        </>
      );
    } else {
      return;
    }
  };

  return (
    <div
      className="blogContainerV2"
      style={{
        display: "block",
        width: "100%",
        maxWidth: "743px",
        margin: "0 auto",
        backgroundColor: "white",
        textAlign: "center",
        fontFamily: "Nanum Gothic",
      }}
    >
      {itemSegInfo ? (
        <div
          style={{
            display: "block",
            backgroundColor: "white",
            textAlign: "center",
            fontFamily: "Nanum Gothic",
            color: "black",
          }}
        >
          {/* 상품명 */}
          <div
            style={{
              fontSize: "22pt",
            }}
          >
            <div>
              <strong>{itemSegInfo?.brandName}</strong>
            </div>
            <div>{itemSegInfo?.itemName}</div>
          </div>
          {/* 텍스트 */}
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div
            style={{
              fontSize: "20pt",
              textAlign: "center",
            }}
          >
            <strong>ITEM PICK🤏 아이템 집중탐구생활 시리즈!</strong>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div
            style={{
              fontSize: "11pt",
              textAlign: "center",
            }}
          >
            <div>
              <div>
                <strong>오늘 구매할 아이템에 대해 어디까지 알고 있나요?</strong>
              </div>{" "}
              <div>
                <strong>
                  {" "}
                  아이템 기본 정보는 물론, 함께 구매하면 좋은 연관 상품 추천과
                </strong>
              </div>
              <div>
                <strong>
                  {" "}
                  아이템의 강점을 정리한 캐릭터 분석까지 한 페이지로 정리 끝!
                </strong>
              </div>
              <div>&nbsp;</div> {/* 줄바꿈 */}
              <div>
                <strong>
                  {" "}
                  아이템에 숨겨진 이야기를 들려주는 집중 탐구 보고서, ITEM PICK
                  쇼핑 전 꼭 확인해보세요!
                </strong>
              </div>
            </div>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div
            style={{
              fontSize: "20pt",
              textAlign: "center",
            }}
          >
            <strong>🛍️ 오늘의 아이템 🛍️</strong>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          {/* 이미지 */}
          <div style={{ width: "50%", margin: "0 auto" }}>
            <img
              width="100%"
              src={itemSegInfo?.imageUrl}
              alt={itemSegInfo?.itemName}
            />
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div
            style={{
              fontSize: "16pt",
              textAlign: "center",
            }}
          >
            <strong>{itemSegInfo?.brandName}</strong>
            <span>
              {itemSegInfo?.itemName} {itemSegInfo?.salePrice.toLocaleString()}
              원
            </span>
          </div>
          <div>
            <a href={itemSegInfo.itemUrl} target="_blank" rel="noreferrer">
              <img
                src="https://blogfiles.pstatic.net/MjAyMjA2MjdfMTg0/MDAxNjU2MzExMDE3NzIw.c_PbgkuHb-iZPuKBkKFc6TgEfpa3wMJs8mo-EktrExAg.UsVyciE_qes3ozYUfY_xzA5VuWfp5pXJ-lv9jBR18fwg.PNG.koreapick11/%EA%B7%B8%EB%A6%BC10.png?type=w2"
                alt=""
              />
            </a>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div>&nbsp;</div> {/* 줄바꿈 */}
          {/* 본캐 탐구 시작 */}
          <div
            style={{
              fontSize: "20pt",
              textAlign: "left",
            }}
          >
            <strong>
              🔎 <span>{itemSegInfo?.itemName}</span>{" "}
              <span style={{ color: "#ff7e79" }}>본캐 탐구</span>
            </strong>
          </div>
          <div
            style={{
              fontSize: "11pt",
              textAlign: "left",
              color: "#7d7d7d",
            }}
          >
            <span style={{ color: "#ff7e79" }}>▶</span>{" "}
            <strong>
              {" "}
              본캐란? 본캐릭터의 준말로, 상품의 가장 강한 속성을 의미합니다.
            </strong>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div
            style={{
              display: "inline",
              fontSize: "20pt",
              backgroundColor: "#ff7e79",
              color: "white",
            }}
          >
            <strong>#{firstSeg?.segName}</strong>
          </div>
          <div
            style={{
              fontSize: "12pt",
            }}
          >
            <div>
              {itemSegInfo?.itemName}의 본캐는{" "}
              <strong>{firstSeg?.segName}</strong>{" "}
            </div>
            <div>
              을(를) <strong>대표하는 인기 상품</strong>
              이에요!
            </div>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div
            style={{
              fontSize: "16pt",
            }}
          >
            <div>
              <strong> {itemSegInfo?.itemName}</strong>
              처럼 <strong style={{ color: "#ff7e79" }}>본캐</strong>가
            </div>
            <div>
              <strong>#{firstSeg?.segName}</strong>인 상품
            </div>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              padding: "20px",
              marginBottom: "50px",
              gap: "20px",
              backgroundColor: "#f2f2f2",
            }}
          >
            {segBest
              ?.filter((el, index) => el.active)
              ?.map((el, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      backgroundColor: "white",
                      width: "calc(50% - 10px)",
                      border: " 1px #d8d8d8 solid",
                    }}
                  >
                    <img width="100%" src={el.imageUrl} alt="segImg" />
                  </div>
                );
              })}
          </div> */}
          <div>
            <img
              width="100%"
              src={imageUploadResponse.segBestUrl}
              alt="segBestImg"
            />
            <div>segBest상품</div>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          {segBest
            ?.filter((el, index) => index < 4)
            .map((el, index) => {
              return (
                <div key={el.itemId}>
                  <a href={el.itemUrl} target="_blank" rel="noreferrer">
                    <strong>
                      <span style={{ color: "#666666" }}>{index + 1}.</span>{" "}
                      <span style={{ color: "#0019FF" }}>{el.itemName}</span>
                    </strong>
                  </a>
                </div>
              );
            })}
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div
            style={{
              fontSize: "16pt",
            }}
          >
            <strong>✋여기서 잠깐✋</strong>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div>
            <div
              style={{
                fontSize: "14pt",
              }}
            >
              {itemSegInfo?.brandName}는 다른{" "}
              <strong>#{firstSeg?.segName}</strong> 보다
            </div>
            <div
              style={{
                fontSize: "16pt",
                color: "#ff7e79",
              }}
            >
              <strong>
                {barGraphData && barGraphData[0].indicatorName}가{" "}
                {replaceMultipleText(firstSeg?.barGraph[0].multipleSegAvg)} 더
                높고, {barGraphData && barGraphData[1].indicatorName}가{" "}
                {replaceMultipleText(firstSeg?.barGraph[1].multipleSegAvg)} 더
                높아요!
              </strong>
            </div>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div>
            <img width="100%" src={imageUploadResponse.barUrl} alt="barGraph" />
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div>&nbsp;</div> {/* 줄바꿈 */}
          {/* 부캐 탐구 시작 */}
          <div
            style={{
              fontSize: "20pt",
              textAlign: "left",
            }}
          >
            <strong>
              🔎 <span>{itemSegInfo?.itemName}</span>{" "}
              <span style={{ color: "#feb942" }}>부캐 탐구</span>
            </strong>
          </div>
          <div
            style={{
              fontSize: "11pt",
              textAlign: "left",
              color: "#7d7d7d",
            }}
          >
            <span style={{ color: "#feb942" }}>▶</span>{" "}
            <strong>
              {" "}
              부캐란? 부캐릭터의 준말로, 상품의 다른 속성을 의미합니다.
            </strong>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          {tabCondition()}
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div
            style={{
              fontSize: "16pt",
            }}
          >
            <strong>
              부캐 1️⃣2️⃣3️⃣의 <span style={{ color: "#feb942" }}>BEST 상품</span>
            </strong>
          </div>
          <div>
            <img
              width="100%"
              src={imageUploadResponse.similarSegUrl}
              alt="similarSegImg"
            />
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          {similarSeg
            ?.filter((el, index) => index < 4)
            .map((el, index) => {
              return (
                <div key={el.itemId}>
                  <a href={el.itemUrl} target="_blank" rel="noreferrer">
                    <strong>
                      <span style={{ color: "#666666" }}>{index + 1}.</span>{" "}
                      <span style={{ color: "#0019FF" }}>{el.itemName}</span>
                    </strong>
                  </a>
                </div>
              );
            })}
          <div>&nbsp;</div> {/* 줄바꿈 */}
          {/* 찰떡템 시작 */}
          {associatedSeg && associatedSeg.length > 0 ? (
            <>
              <div
                style={{
                  fontSize: "20pt",
                  textAlign: "left",
                }}
              >
                <strong>
                  🛒 <span>{itemSegInfo?.itemName}와 찰떡인</span>{" "}
                  <span style={{ color: "#a5c33f" }}>짝꿍템 </span>
                </strong>
              </div>
              <div
                style={{
                  fontSize: "11pt",
                  textAlign: "left",
                  color: "#7d7d7d",
                }}
              >
                <span style={{ color: "#a5c33f" }}>▶</span>{" "}
                <strong>
                  {" "}
                  짝꿍템은? 소개한 상품과 함께 구매된 상품으로, 함께 구매하기
                  좋은 찰떡궁합템입니다.
                </strong>
              </div>
              <div>&nbsp;</div> {/* 줄바꿈 */}
              <div style={{ fontSize: "16pt" }}>
                <div>
                  <strong>{itemSegInfo?.itemName}</strong>와
                </div>
                <div>
                  함께 구매하기 좋은{" "}
                  <strong style={{ color: "#a5c33f" }}>짝꿍템</strong>
                </div>
              </div>
              <div>&nbsp;</div> {/* 줄바꿈 */}
              <div>
                <img
                  width="100%"
                  src={imageUploadResponse.associatedSegUrl}
                  alt="associatedSegImg"
                />
              </div>
              <div>&nbsp;</div> {/* 줄바꿈 */}
              {associatedSeg
                ?.filter((el, index) => index < 4)
                .map((el, index) => {
                  return (
                    <div key={el.itemId}>
                      <a href={el.itemUrl} target="_blank" rel="noreferrer">
                        <strong>
                          <span style={{ color: "#666666" }}>{index + 1}.</span>{" "}
                          <span style={{ color: "#0019FF" }}>
                            {el.itemName}
                          </span>
                        </strong>
                      </a>
                    </div>
                  );
                })}
            </>
          ) : null}
          {/* 찰떡템 종료 */}
          <div>&nbsp;</div> {/* 줄바꿈 */}
          {/* 캐릭터 분석 시작 */}
          <div
            style={{
              fontSize: "20pt",
              textAlign: "left",
            }}
          >
            <strong>
              📊 <span>{itemSegInfo?.itemName}</span>{" "}
              <span style={{ color: "#118dff" }}>캐릭터 분석 </span>
            </strong>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div
            style={{
              fontSize: "14pt",
            }}
          >
            <div>
              <strong>
                {" "}
                #{firstSeg?.segName}{" "}
                <span style={{ color: "#ff7e79" }}>본캐</span>
              </strong>
              와
            </div>
            <div>
              <strong> #저세상_할인템, #꾸준한_효자템, #합리적인</strong>{" "}
              <strong style={{ color: "#feb942" }}>부캐</strong>를 가진
            </div>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div
            style={{
              fontSize: "16pt",
            }}
          >
            <div>
              <strong> {itemSegInfo?.itemName}</strong>는
            </div>
            <div>
              <strong>{customerName}</strong> 전체 평균 대비{" "}
              <strong style={{ color: "#118dff" }}>
                {" "}
                {hexaIndexText && replaceIndex(hexaIndexText[0].indicatorName)}
              </strong>
              과(와) &nbsp;
              <strong style={{ color: "#118dff" }}>
                {hexaIndexText && replaceIndex(hexaIndexText[1].indicatorName)}
              </strong>
              가(이) 높은 상품!
            </div>
          </div>
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div>&nbsp;</div> {/* 줄바꿈 */}
          <div>
            <img
              width="100%"
              src={imageUploadResponse.hexaUrl}
              alt="hexGraph"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BlogTemplateV2;
