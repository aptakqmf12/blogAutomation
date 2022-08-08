import { useState, useEffect, useCallback, useMemo } from "react";
import _ from "lodash";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "store";
import html2canvas from "html2canvas";
import {
  keepPageSelector,
  requestSelector,
  criteriaSelector,
  itemSegInfoSelector,
  similarSegSelector,
  segBestSelector,
  associatedSegSelector,
  imageUploadResponseSelector,
  useAssociatedSectionSelector,
  useSimilarSectionSelector,
  useBestSectionSelector,
  segTabIndexSelector,
  htmlSourceSelector,
  currentStateSelector,
  segBestTextSelector,
  similarTextSelector,
  languageSelector,
  openModalSelector,
  blogActionV2,
} from "store/modules/blogV2";
import blogService02 from "apis/services/blogServiceV2";
import {
  fetchHexaImageUrl,
  fetchBarImageUrl,
  fetchSegBestImageUrl,
  fetchAccosiateImageUrl,
  fetchSimilarImageUrl,
} from "store/modules/blogV2/saga";
import {} from "types/blogV2";

const useBlogV2 = () => {
  const dispatch = useAppDispatch();

  const keepPage = useAppSelector(keepPageSelector);
  const request = useAppSelector(requestSelector);
  const criteria = useAppSelector(criteriaSelector);
  const itemSegInfo = useAppSelector(itemSegInfoSelector);
  const similarSeg = useAppSelector(similarSegSelector);
  const segBest = useAppSelector(segBestSelector);
  const associatedSeg = useAppSelector(associatedSegSelector);
  const imageUploadResponse = useAppSelector(imageUploadResponseSelector);
  const useSimilarSection = useAppSelector(useSimilarSectionSelector);
  const useBestSection = useAppSelector(useBestSectionSelector);
  const useAssociatedSection = useAppSelector(useAssociatedSectionSelector);
  const segTabIndex = useAppSelector(segTabIndexSelector);
  const htmlSource = useAppSelector(htmlSourceSelector);
  const currentState = useAppSelector(currentStateSelector);
  const segBestText = useAppSelector(segBestTextSelector);
  const similarText = useAppSelector(similarTextSelector);
  const language = useAppSelector(languageSelector);
  const openModal = useAppSelector(openModalSelector);

  const uploadImageByClassName = (className: string, keyPrefix: string) => {
    const canvas = document.querySelector(className) as HTMLElement;
    const canvasElementPromise = html2canvas(canvas, {
      allowTaint: true,
      useCORS: true,

      onclone: (doc) => {
        alert("onClone에서 끝남");
        // const htmlSource =
        //   document.querySelector(".blogContainerV2")?.innerHTML;
        // htmlSource && navigator.clipboard.writeText(htmlSource);
      },
    });

    return canvasElementPromise
      .then((canvas) => new Promise<any>((resolve) => canvas.toBlob(resolve)))
      .then(async (blob) => {
        if (!blob) return;
        const formData = new FormData();
        formData.append("file", blob, `${className}.png`);
        formData.append("keyPrefix", keyPrefix);

        if (className === ".hexaChart") {
          dispatch(
            fetchHexaImageUrl.request({
              file: formData,
              keyPrefix: "blog/graph/img/",
            })
          );
        } else if (className === ".barChart") {
          dispatch(
            fetchBarImageUrl.request({
              file: formData,
              keyPrefix: "blog/graph/img/",
            })
          );
        } else if (className === ".segBestImage") {
          dispatch(
            fetchSegBestImageUrl.request({
              file: formData,
              keyPrefix: "blog/segs/img/",
            })
          );
        } else if (className === ".similarSegImage") {
          dispatch(
            fetchSimilarImageUrl.request({
              file: formData,
              keyPrefix: "blog/segs/img/",
            })
          );
        } else if (className === ".associatedSegImage") {
          dispatch(
            fetchAccosiateImageUrl.request({
              file: formData,
              keyPrefix: "blog/segs/img/",
            })
          );
        }
      });
  };

  const firstSeg = useMemo(() => {
    return itemSegInfo?.segData[0];
  }, [itemSegInfo]);

  const secondSeg = useMemo(() => {
    return itemSegInfo?.segData[1];
  }, [itemSegInfo]);

  const thirdSeg = useMemo(() => {
    return itemSegInfo?.segData[2];
  }, [itemSegInfo]);

  const fourthSeg = useMemo(() => {
    return itemSegInfo?.segData[3];
  }, [itemSegInfo]);

  const setActiveSimilarSeg = (index: number) => {
    dispatch(blogActionV2.setActiveSimilarSeg(index));
  };
  const setSimilarSegSection = (bool: boolean) => {
    dispatch(blogActionV2.setSimilarSegSection(bool));
  };
  const setActiveSegBest = (index: number) => {
    dispatch(blogActionV2.setActiveSegBest(index));
  };
  const setBestSegSection = (bool: boolean) => {
    dispatch(blogActionV2.setBestSegSection(bool));
  };
  const setActiveAssociatedSeg = (index: number) => {
    dispatch(blogActionV2.setActiveAssociatedSeg(index));
  };

  const setAssociatedSegSection = (bool: boolean) => {
    dispatch(blogActionV2.setAssociatedSegSection(bool));
  };
  const replaceIndex = (str: string) => {
    if (str === "daily_click") {
      return "일간 클릭 수";
    } else if (str === "daily_order") {
      return "일간 구매 수";
    } else if (str === "weekly_click") {
      return "주간 클릭 수";
    } else if (str === "weekly_order") {
      return "주간 구매 수";
    } else if (str === "monthly_click") {
      return "월간 클릭 수";
    } else if (str === "monthly_order") {
      return "월간 주문 수";
    } else if (str === "rise_click") {
      return "급상승 클릭 수";
    } else if (str === "rise_order") {
      return "급상승 구매 수";
    } else if (str === "sale") {
      return "할인";
    } else if (str === "rebuy") {
      return "재구매 수";
    } else {
      return str;
    }
  };

  const replaceMultipleText = (value: number | undefined) => {
    if (value === undefined) {
      return;
    }
    if (value > 49) {
      return `${value}배 이상`;
    } else {
      return `${value}배`;
    }
  };

  const hexaGraphData = useMemo(() => {
    // indicatorName이 중복되면 프론트에서 중복제거
    return _.uniqBy(
      itemSegInfo?.segData[0].hexaGraph
        .map((hexa) => _.pick(hexa, ["indicatorName", "itemGraph", "avgGraph"]))
        .map(
          (hexa) =>
            (hexa = {
              ...hexa,
              indicatorName: replaceIndex(hexa.indicatorName),
            })
        ),
      "indicatorName"
    );
  }, [itemSegInfo]);

  const hexaIndexText = useMemo(() => {
    return itemSegInfo?.segData[0].hexaGraph
      .filter((hexa) => hexa.graphY === "Y")
      .sort((a, b) => a.indicatorRank - b.indicatorRank)
      .filter((hexa, index) => index < 2);
  }, [itemSegInfo]);

  const barGraphData = useMemo(() => {
    return itemSegInfo?.segData[0].barGraph
      .map((bar) => _.pick(bar, ["indicatorName", "itemGraph", "avgGraph"]))
      .map(
        (bar) =>
          (bar = {
            ...bar,
            indicatorName: replaceIndex(bar.indicatorName),
          })
      );
  }, [itemSegInfo]);

  const barIndexText = useMemo(() => {
    return itemSegInfo?.segData[0].barGraph
      .filter((bar) => bar.graphY === "Y")
      .sort((a, b) => a.indicatorRank - b.indicatorRank)
      .filter((bar, index) => index < 2);
  }, [itemSegInfo]);

  return {
    keepPage,
    criteria,
    currentState,
    request,
    itemSegInfo,
    firstSeg,
    secondSeg,
    thirdSeg,
    fourthSeg,
    similarSeg,
    segBest,
    associatedSeg,
    imageUploadResponse,
    useSimilarSection,
    useBestSection,
    useAssociatedSection,
    segTabIndex,
    htmlSource,
    hexaGraphData,
    hexaIndexText,
    barGraphData,
    barIndexText,
    segBestText,
    similarText,
    language,
    openModal,
    setActiveSegBest,
    setActiveSimilarSeg,
    setActiveAssociatedSeg,
    setAssociatedSegSection,
    setSimilarSegSection,
    setBestSegSection,
    replaceIndex,
    uploadImageByClassName,
    replaceMultipleText,
  };
};

export default useBlogV2;
