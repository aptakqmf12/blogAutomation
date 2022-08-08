import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "store";
import {
  CriteriaResponse,
  ItemSegInfoResponse,
  SelectedInputOptions,
  SegBestResponse,
  SimilarSegItemsRequest,
  SimilarSegResponse,
  AssociatedSegResponse,
  BlogV2State,
} from "types/blogV2";
import { APIError } from "types/api";
import {
  fetchCriteria,
  fetchItemSegInfo,
  fetchSegBest,
  fetchAssociatedSeg,
  fetchSimilarSeg,
  fetchHexaImageUrl,
  fetchBarImageUrl,
  fetchSegBestImageUrl,
  fetchSimilarImageUrl,
  fetchAccosiateImageUrl,
} from "./saga";
import { notification } from "antd";

export const BLOGV2 = "blogV2";

const initialState: BlogV2State = {
  imageUploadResponse: {
    hexaUrl: "",
    barUrl: "",
    segBestUrl: "",
    similarSegUrl: "",
    associatedSegUrl: "",
  },
  userText: {
    segBest: "",
    similar: "",
  },
  keepPage: 1,
  language: "ko",
  segTabIndex: 1,
  openModal: "none",
  criteria: [],
  request: {
    date: undefined,
    targetType: undefined,
    targetName: undefined,
    objectId: undefined,
  },
  itemSegInfo: null,
  associatedSeg: null,
  useAssociatedSection: true,
  segBest: null,
  similarSeg: null,
  useSimilarSection: true,
  useBestSection: true,
  htmlSource: "",
  currentState: null,
};

const blogSlice02 = createSlice({
  name: BLOGV2,
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setSegBestText(state, action: PayloadAction<string>) {
      state.userText.segBest = action.payload;
    },
    setSimilarText(state, action: PayloadAction<string>) {
      state.userText.similar = action.payload;
    },
    setClearCurrentState(state, action: PayloadAction<undefined>) {
      state.segTabIndex = 1;
      state.request = {
        date: undefined,
        targetType: undefined,
        targetName: undefined,
        objectId: undefined,
      };
      state.itemSegInfo = null;
      state.segBest = null;
      state.similarSeg = null;
      state.useSimilarSection = true;
      state.useBestSection = true;
      state.htmlSource = "";
      state.currentState = null;
      state.userText = {
        segBest: "",
        similar: "",
      };
      state.language = "ko";
    },
    setCurrentState(state, action: PayloadAction<undefined>) {
      const {
        imageUploadResponse,
        segTabIndex,
        criteria,
        itemSegInfo,
        request,
        similarSeg,
        useSimilarSection,
        segBest,
        useBestSection,
        htmlSource,
        userText,
        language,
      } = state;
      state.currentState = {
        imageUploadResponse,
        segTabIndex,
        criteria,
        itemSegInfo,
        request,
        similarSeg,
        useSimilarSection,
        segBest,
        useBestSection,
        htmlSource,
        userText,
        language,
      };
    },
    setPersistStateDraw(state, action: PayloadAction<undefined>) {
      if (!state.currentState) {
        return;
      }
      const { currentState } = state;
      state.criteria = currentState.criteria;
      state.itemSegInfo = currentState.itemSegInfo;
      state.segBest = currentState.segBest;
      state.similarSeg = currentState.similarSeg;
      state.imageUploadResponse = currentState.imageUploadResponse;
      state.useBestSection = currentState.useBestSection;
      state.useSimilarSection = currentState.useSimilarSection;
      state.htmlSource = currentState.htmlSource;
      state.request = currentState.request;
      state.segTabIndex = currentState.segTabIndex;
      state.userText = currentState?.userText;
      state.language = currentState.language;
    },
    setKeepPage(state, action: PayloadAction<number>) {
      state.keepPage = action.payload;
    },
    setSegTabIndex(state, action: PayloadAction<number>) {
      state.segTabIndex = action.payload;
    },
    setRequest(state, action: PayloadAction<SelectedInputOptions>) {
      state.request = action.payload;
    },
    setActiveSegBest(state, action: PayloadAction<number>) {
      if (!state.segBest) {
        return;
      }

      state.segBest?.map((el, index) => {
        if (index === action.payload) {
          if (
            state.segBest &&
            state.segBest?.filter((el) => el.active).length > 3
          ) {
            if (el.active === false) {
              notification.error({
                message: "최대 4개까지 선택가능",
                placement: "bottomRight",
              });
            } else {
              el.active = !el.active;
            }
          } else {
            el.active = !el.active;
          }
        }
      });
    },
    setActiveSimilarSeg(state, action: PayloadAction<number>) {
      if (!state.similarSeg) {
        return;
      }

      state.similarSeg?.map((el, index) => {
        if (index === action.payload) {
          if (
            state.similarSeg &&
            state.similarSeg?.filter((el) => el.active).length > 3
          ) {
            if (el.active === false) {
              notification.error({
                message: "최대 4개까지 선택가능",
                placement: "bottomRight",
              });
            } else {
              el.active = !el.active;
            }
          } else {
            el.active = !el.active;
          }
        }
      });
    },
    setActiveAssociatedSeg(state, action: PayloadAction<number>) {
      if (!state.associatedSeg) {
        return;
      }

      state.associatedSeg?.map((el, index) => {
        if (index === action.payload) {
          if (
            state.associatedSeg &&
            state.associatedSeg?.filter((el) => el.active).length > 3
          ) {
            if (el.active === false) {
              notification.error({
                message: "최대 4개까지 선택가능",
                placement: "bottomRight",
              });
            } else {
              el.active = !el.active;
            }
          } else {
            el.active = !el.active;
          }
        }
      });
    },
    setSimilarSegSection(state, action: PayloadAction<boolean>) {
      state.useSimilarSection = action.payload;
    },
    setBestSegSection(state, action: PayloadAction<boolean>) {
      state.useBestSection = action.payload;
    },
    setAssociatedSegSection(state, action: PayloadAction<boolean>) {
      state.useAssociatedSection = action.payload;
    },
    setHtmlSource(state, action: PayloadAction<string>) {
      state.htmlSource = action.payload;
    },
    setOpenModal(state, action: PayloadAction<"pc" | "mo" | "none">) {
      state.openModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        `${fetchCriteria.request}`,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        `${fetchCriteria.success}`,
        (state, action: PayloadAction<CriteriaResponse>) => {
          state.criteria = action.payload.list;
        }
      )
      .addCase(
        `${fetchCriteria.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // segItemInfo
      .addCase(
        `${fetchItemSegInfo.request}`,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        `${fetchItemSegInfo.success}`,
        (state, action: PayloadAction<ItemSegInfoResponse>) => {
          // itemUrl에 프로토콜빠진경우 예외처리(더블유컨셉에서 주로 빠짐)
          if (!action.payload.data.itemUrl.includes("http")) {
            action.payload.data.itemUrl = "https://".concat(
              action.payload.data.itemUrl
            );
          }

          action.payload.data.segData.forEach((seg) => {
            // multipleSegAvg가 50초과시 50으로 할당
            seg.barGraph.forEach((bar) => {
              if (bar.multipleSegAvg > 50) {
                bar.multipleSegAvg = 50;
              }
            });
          });
          state.itemSegInfo = action.payload.data;
        }
      )
      .addCase(
        `${fetchItemSegInfo.failure}`,
        (state, action: PayloadAction<any>) => {}
      )
      // 유사 Seg
      .addCase(
        `${fetchSimilarSeg.request}`,
        (state, action: PayloadAction<SimilarSegItemsRequest>) => {}
      )
      .addCase(
        `${fetchSimilarSeg.success}`,
        (state, action: PayloadAction<SimilarSegResponse>) => {
          action.payload.list.map((el, index) => {
            index < 4 ? (el.active = true) : (el.active = false);
          });
          state.similarSeg = action.payload.list;
        }
      )
      .addCase(
        `${fetchSimilarSeg.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // 연관 Seg
      .addCase(
        `${fetchAssociatedSeg.request}`,
        (state, action: PayloadAction<SimilarSegItemsRequest>) => {}
      )
      .addCase(
        `${fetchAssociatedSeg.success}`,
        (state, action: PayloadAction<AssociatedSegResponse>) => {
          action.payload.list.map((el, index) => {
            index < 4 ? (el.active = true) : (el.active = false);
          });
          state.associatedSeg = action.payload.list;
        }
      )
      .addCase(
        `${fetchAssociatedSeg.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // 베스트 Seg
      .addCase(
        `${fetchSegBest.request}`,
        (state, action: PayloadAction<SimilarSegItemsRequest>) => {}
      )
      .addCase(
        `${fetchSegBest.success}`,
        (state, action: PayloadAction<SegBestResponse>) => {
          action.payload.list.map((el, index) => {
            index < 4 ? (el.active = true) : (el.active = false);
          });
          state.segBest = action.payload.list;
        }
      )
      .addCase(
        `${fetchSegBest.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // hexa 차트 url
      .addCase(
        `${fetchHexaImageUrl.request}`,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        `${fetchHexaImageUrl.success}`,
        (state, action: PayloadAction<any>) => {
          state.imageUploadResponse.hexaUrl = action.payload.data.url;
        }
      )
      .addCase(
        `${fetchHexaImageUrl.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // bar 차트 url
      .addCase(
        `${fetchBarImageUrl.request}`,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        `${fetchBarImageUrl.success}`,
        (state, action: PayloadAction<any>) => {
          state.imageUploadResponse.barUrl = action.payload.data.url;
        }
      )
      .addCase(
        `${fetchBarImageUrl.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // segBest url
      .addCase(
        `${fetchSegBestImageUrl.request}`,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        `${fetchSegBestImageUrl.success}`,
        (state, action: PayloadAction<any>) => {
          state.imageUploadResponse.segBestUrl = action.payload.data.url;
        }
      )
      .addCase(
        `${fetchSegBestImageUrl.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // Similar url
      .addCase(
        `${fetchSimilarImageUrl.request}`,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        `${fetchSimilarImageUrl.success}`,
        (state, action: PayloadAction<any>) => {
          state.imageUploadResponse.similarSegUrl = action.payload.data.url;
        }
      )
      .addCase(
        `${fetchSimilarImageUrl.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // accossiate url
      .addCase(
        `${fetchAccosiateImageUrl.request}`,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        `${fetchAccosiateImageUrl.success}`,
        (state, action: PayloadAction<any>) => {
          state.imageUploadResponse.associatedSegUrl = action.payload.data.url;
        }
      )
      .addCase(
        `${fetchAccosiateImageUrl.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      );
  },
});

const selfSelector = (state: RootState) => state[BLOGV2];

export const keepPageSelector = createSelector(
  selfSelector,
  (state) => state.keepPage
);
export const requestSelector = createSelector(
  selfSelector,
  (state) => state.request
);
export const criteriaSelector = createSelector(
  selfSelector,
  (state) => state.criteria
);
export const itemSegInfoSelector = createSelector(
  selfSelector,
  (state) => state.itemSegInfo
);
export const similarSegSelector = createSelector(
  selfSelector,
  (state) => state.similarSeg
);
export const useSimilarSectionSelector = createSelector(
  selfSelector,
  (state) => state.useSimilarSection
);
export const segBestSelector = createSelector(
  selfSelector,
  (state) => state.segBest
);
export const associatedSegSelector = createSelector(
  selfSelector,
  (state) => state.associatedSeg
);
export const useBestSectionSelector = createSelector(
  selfSelector,
  (state) => state.useBestSection
);
export const useAssociatedSectionSelector = createSelector(
  selfSelector,
  (state) => state.useAssociatedSection
);
export const imageUploadResponseSelector = createSelector(
  selfSelector,
  (state) => state.imageUploadResponse
);

export const segTabIndexSelector = createSelector(
  selfSelector,
  (state) => state.segTabIndex
);
export const htmlSourceSelector = createSelector(
  selfSelector,
  (state) => state.htmlSource
);
export const currentStateSelector = createSelector(
  selfSelector,
  (state) => state.currentState
);
export const segBestTextSelector = createSelector(
  selfSelector,
  (state) => state.userText?.segBest
);
export const similarTextSelector = createSelector(
  selfSelector,
  (state) => state.userText?.similar
);
export const languageSelector = createSelector(
  selfSelector,
  (state) => state.language
);
export const openModalSelector = createSelector(
  selfSelector,
  (state) => state.openModal
);
export const blogActionV2 = blogSlice02.actions;
export const blogReducer02 = blogSlice02.reducer;
