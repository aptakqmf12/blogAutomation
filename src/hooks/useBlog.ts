import { useState, useCallback, useEffect, useMemo } from "react";
import blogService from "apis/services/blogService";
import { useAppDispatch, useAppSelector } from "store";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import {
  keywordsSelector,
  criteriaSelector,
  productsSelector,
  htmlSelector,
  currentStateSelector,
  currentPrdIdSelector,
  requestSelector,
  labelTemplateSelector,
  userTextSelector,
  labelDataSelector,
  languageSelector,
  translatedTxtSelector,
  videoCreatingSelector,
  blogAction,
} from "store/modules/blog";
import {
  fetchCriteria,
  fetchProducts,
  fetchLabelTemplate,
  fetchKeyword,
  fetchTranslate,
  fetchImgUrl,
  fetchVideo,
} from "store/modules/blog/saga";
import {
  CriteriaResponse,
  KeywordResponse,
  ProductsResponse,
  LabelTemplateResponse,
  LabelDataResponse,
  CurrentState,
  ProductRequest,
} from "types/blog";
import JSZip from "jszip";
import FileSaver from "file-saver";
import html2canvas from "html2canvas";
import { useQueries } from "react-query";

const useBlog = () => {
  const dispatch = useAppDispatch();

  const currentStateReducer = useAppSelector(currentStateSelector);
  const criteriaReducer = useAppSelector(criteriaSelector);
  const productsReducer = useAppSelector(productsSelector);
  const keywordsReducer = useAppSelector(keywordsSelector);
  const requestReducer = useAppSelector(requestSelector);
  const currentPrdIdReducer = useAppSelector(currentPrdIdSelector);
  const htmlReducer = useAppSelector(htmlSelector);
  const currentState = useAppSelector(currentStateSelector);
  const userTextReducer = useAppSelector(userTextSelector);
  const labelTemplateReducer = useAppSelector(labelTemplateSelector);
  const labelData = useAppSelector(labelDataSelector);
  const language = useAppSelector(languageSelector);
  const translatedTxt = useAppSelector(translatedTxtSelector);
  const videoCreating = useAppSelector(videoCreatingSelector);

  const setPersistDraw = useCallback(() => {
    dispatch(blogAction.setPersistStateDraw());
  }, [dispatch]);

  const setRequestAction = useCallback(
    (request: ProductRequest) => {
      dispatch(blogAction.setRequestAction(request));
    },
    [dispatch]
  );
  const setCurrentStateAction = useCallback(() => {
    dispatch(blogAction.setCurrentState());
  }, [dispatch]);
  const setClearCurrentStateAction = useCallback(() => {
    dispatch(blogAction.setClearCurrentState());
  }, [dispatch]);

  const setClearProductsAction = useCallback(() => {
    dispatch(blogAction.setClearProducts());
  }, [dispatch]);
  const setcurrentProductId = useCallback(
    (id: string | null) => {
      dispatch(blogAction.setcurrentProductId(id));
    },
    [dispatch]
  );

  const setUserInputTitle = useCallback(
    (value: string) => {
      dispatch(blogAction.setUserInputTitle(value));
    },
    [dispatch]
  );
  const setUserInputHeadCopy = useCallback(
    (value: string) => {
      dispatch(blogAction.setUserInputHeadCopy(value));
    },
    [dispatch]
  );
  const setUserInputTrandInfo = useCallback(
    (value: string) => {
      dispatch(blogAction.setUserInputTrandInfo(value));
    },
    [dispatch]
  );
  const setHtmlSource = useCallback(
    (html: string) => {
      dispatch(blogAction.setHtmlSource(html));
    },
    [dispatch]
  );

  const setTranslatedText = useCallback(
    (texts: string[]) => {
      dispatch(fetchTranslate.request(texts));
    },
    [translatedTxt]
  );

  const getHtmlSource = () => {
    const htmlSource = document.querySelector(".blogContainer")?.innerHTML;
    if (!htmlSource) {
      return;
    }
    return htmlSource;
  };

  const saveImgFile = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
  };

  const [mediaLoading, setMediaLoading] = useState<
    "NONE" | "IMG_LOADING" | "VIDEO_LOADING"
  >("NONE");

  const DownloadImages = () => {
    //Zip파일 생성
    const zip = new JSZip();
    const images = zip.folder("images");

    // 커버이미지 다운
    const P1 = new Promise((resolve, reject) => {
      const cover = document.querySelector(".Instagram-Cover") as HTMLElement;
      resolve(
        html2canvas(cover, {
          allowTaint: true,
          useCORS: true,
          width: 1080,
          height: 1080,
        }).then(function (img) {
          img.toBlob(function (blob) {
            if (!blob) return;
            saveImgFile(blob, `Instagram-Cover.png`);
            // images?.file("Instagram-Cover.png", blob); // 폴더에 이미지 저장
          });
        })
      );
    });

    // 키워드 다운
    const P2 = new Promise((resolve, reject) => {
      const keywords = document.querySelector(
        ".Instagram-Keywords"
      ) as HTMLElement;
      resolve(
        html2canvas(keywords, {
          allowTaint: true,
          useCORS: true,
          width: 1080,
          height: 1080,
        }).then(function (img) {
          img.toBlob(function (blob) {
            if (!blob) return;
            saveImgFile(blob, `Instagram-Keywords.png`);
            // images?.file("Instagram-Keywords.png", blob); // 폴더에 이미지 저장
          });
        })
      );
    });

    // 상품들 다운
    const P3 = new Promise((resolve, reject) => {
      productsReducer?.list.map((product, prdId) => {
        const canvas = document.querySelector(
          `.Instagram-Image-${prdId}`
        ) as HTMLElement;

        resolve(
          html2canvas(canvas, {
            allowTaint: true,
            useCORS: true,
            width: 1080,
            height: 1080,
          }).then(function (img) {
            img.toBlob(function (blob) {
              if (!blob) return;
              saveImgFile(blob, `Instagram-Image-${prdId + 1}.png`);
              // images?.file(`Instagram-Image-${prdId + 1}.png`, blob); // 폴더에 이미지 저장
            });
          })
        );
      });
    });

    // 마지막페이지 다운
    const P4 = new Promise((resolve, reject) => {
      const keywords = document.querySelector(
        ".Instagram-Finish"
      ) as HTMLElement;
      resolve(
        html2canvas(keywords, {
          allowTaint: true,
          useCORS: true,
          width: 1080,
          height: 1080,
        }).then(function (img) {
          img.toBlob(function (blob) {
            if (!blob) return;
            saveImgFile(blob, `Instagram-Finish.png`);
            // images?.file("Instagram-Finish.png", blob); // 폴더에 이미지 저장
          });
        })
      );
    });

    Promise.all([P1, P2, P3, P4]).then(() => {
      setMediaLoading("NONE");
      images?.generateAsync({ type: "blob" }).then(function (content) {
        FileSaver.saveAs(content);
      });
    });
  };

  // 화면의 canvas를 캡쳐해서 S3에 이미지를 저장하는 로직
  const uploadImageByClassName = (className: string, prdId: number) => {
    const canvas = document.querySelector(className) as HTMLElement;
    const canvasElementPromise = html2canvas(canvas, {
      allowTaint: true,
      useCORS: true,
      proxy: "*",
    });

    return canvasElementPromise
      .then((canvas) => new Promise<any>((resolve) => canvas.toBlob(resolve)))
      .then(async (blob) => {
        if (!blob) throw new Error("blob error");

        //S3에 업로드
        const formData = new FormData();
        formData.append("file", blob, `${className}.png`);
        formData.append("keyPrefix", "blog/video/img/");

        const res = await blogService.getUploadedImageUrl(formData);
        return res.data.data.url;
      });
  };

  const onSubmitContentsMaker = async () => {
    const requestArray: any[] = [];

    const promises = productsReducer?.list.map((prd, index) =>
      uploadImageByClassName(`.Instagram-Image-${index}`, index)
    );

    await Promise.all(promises ?? []).then((res) => {
      // 상품들의 이미지 업로드가 끝났을때.
      setMediaLoading("NONE");
      res.forEach((el, index) =>
        requestArray.push({
          imageUrl: el,
          dubbingScript: productsReducer?.list[index].media.dubbingScript,
        })
      );

      return res;
    });

    requestArray.length > 0 &&
      dispatch(
        fetchVideo.request({
          thumbnailImageUrl:
            "https://avatars.githubusercontent.com/u/72783237?v=4",
          videoSourceList: requestArray,
        })
      );
  };

  const replaceLabelByTokens = (template: string, tokenObj: any) => {
    if (!template) {
      return;
    }
    for (let v in tokenObj) {
      // template = template.replaceAll(`|${v}|`, tokenObj[v]); // |brand_name| => nike
      if (typeof tokenObj[v] === "number") {
        template = template.replaceAll(
          `|${v}|`,
          Math.round(tokenObj[v]).toLocaleString("ko-KR")
        );
      } else if (typeof tokenObj[v] === "string") {
        if (v === "brand_name" && tokenObj[v].length > 10) {
          language === "en"
            ? (template = template.replaceAll(`|${v}|`, "same brand"))
            : (template = template.replaceAll(`|${v}|`, "동일 브랜드"));
        } else {
          if (language === "en") {
            template = template.replaceAll(`|${v}|`, tokenObj[v]);
          } else {
            template = template.replaceAll(`|${v}|`, tokenObj[v]);
          }
        }
      }
    }
    // /([|])(?:(?=(\\?))\2.)*?\1/g
    template = template.includes("|")
      ? template.replaceAll("#f3f2f2", "#cd8686") // label property가 없어서 |가 추출되는 레이블은 red처리
      : template;
    template = template.replaceAll("\\n", "");
    return template;
  };

  const transformDateFormat = (date: string) => {
    return moment(date).format("YY-MM-DD-hh:mm:ss");
  };

  return {
    getHtmlSource,
    replaceLabelByTokens,
    currentStateReducer,
    currentState,
    userTextReducer,
    labelTemplateReducer,
    criteriaReducer,
    productsReducer,
    keywordsReducer,
    requestReducer,
    currentPrdIdReducer,
    labelData,
    htmlReducer,
    language,
    translatedTxt,
    mediaLoading,
    videoCreating,
    setPersistDraw,
    setRequestAction,
    setHtmlSource,
    setCurrentStateAction,
    setClearCurrentStateAction,
    setClearProductsAction,
    setcurrentProductId,
    setUserInputTitle,
    setUserInputHeadCopy,
    setUserInputTrandInfo,
    setTranslatedText,
    uploadImageByClassName,
    onSubmitContentsMaker,
    saveImgFile,
    DownloadImages,
    setMediaLoading,
    transformDateFormat,
  };
};

export default useBlog;
