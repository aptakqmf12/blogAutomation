import { CriteriaRequest, VideoStatus } from "./../../../types/blog";
import {
  createSlice,
  createSelector,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "store";
import {
  BlogState,
  ProductRequest,
  CriteriaResponse,
  KeywordResponse,
  ProductsResponse,
  LabelDataResponse,
  LabelDataRequest,
  LabelTemplateResponse,
} from "types/blog";
import { APIError } from "types/api";
import {
  fetchCriteria,
  fetchProducts,
  fetchKeyword,
  fetchLabelData,
  fetchLabelTemplate,
  fetchTranslate,
  fetchImgUrl,
  fetchVideo,
} from "./saga";

export const BLOG = "blog";

const initialState: BlogState = {
  videoCreating: null,
  translatedTxt: [],
  language: "ko",
  UserText: {
    text_1: "",
    text_2: "",
    text_3: "",
  },

  products: null,
  currentProductId: null,
  criteria: {
    list: [
      {
        date: "",
        targetValue: "",
        targetType: "",
        crossType: "",
      },
    ],
  },
  keywords: null,
  labelData: null,
  labelTemplate: null,
  request: {
    cuid: "",
    date: undefined,
    targetType: undefined,
    targetValue: undefined,
    crossType: undefined,
  },
  currentState: {
    language: "",
    UserText: {
      text_1: "",
      text_2: "",
      text_3: "",
    },

    products: null,
    currentProductId: null,
    criteria: {
      list: [
        {
          date: "",
          targetValue: "",
          targetType: "",
          crossType: "",
        },
      ],
    },
    keywords: null,
    labelData: null,
    labelTemplate: null,

    request: {
      cuid: "",
      date: undefined,
      targetType: undefined,
      targetValue: undefined,
      crossType: undefined,
    },
    htmlSource: "",
  },
  htmlSource: "",
};

const blogSlice = createSlice({
  name: BLOG,
  initialState,
  reducers: {
    // 실제데이터
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setHtmlSource(state, action: PayloadAction<string>) {
      state.htmlSource = action.payload;
    },
    setRequestAction(state, action: PayloadAction<ProductRequest>) {
      state.request = action.payload;
    },
    setKeywordPick(state, action: PayloadAction<{ targetKeyword: string }>) {
      state.keywords &&
        state.keywords?.list.forEach((el) => {
          el.keyword === action.payload.targetKeyword
            ? (el.todaysPick = true)
            : (el.todaysPick = false);
        });
    },
    setDeleteItem(state, action: PayloadAction<{ prdId: string }>) {
      if (state.products === null) {
        return;
      }

      state.products.list = state.products?.list.filter(
        (prd) => prd.id !== action.payload.prdId
      );
    },
    setUserInputTitle(state, action: PayloadAction<string>) {
      state.UserText.text_1 = action.payload;
    },
    setUserInputTrandInfo(state, action: PayloadAction<string>) {
      state.UserText.text_2 = action.payload;
    },
    setUserInputHeadCopy(state, action: PayloadAction<string>) {
      state.UserText.text_3 = action.payload;
    },
    setLabelMode(
      state,
      action: PayloadAction<{ prdId: string; mode: 0 | 1 | null }>
    ) {
      const { prdId, mode } = action.payload;
      state.products &&
        state.products?.list?.map((el) => {
          if (el.id === prdId) {
            el.selectMode = mode;
          }
        });
    },
    setLeftLabelClear(state, action: PayloadAction<{ prdId: string }>) {
      const { prdId } = action.payload;
      state.products &&
        state.products?.list?.map((el) => {
          if (el.selectedLabel && el.id === prdId) {
            el.selectedLabel[0] = null;
          }
        });
    },
    setRightLabelClear(state, action: PayloadAction<{ prdId: string }>) {
      const { prdId } = action.payload;
      state.products &&
        state.products?.list?.map((el) => {
          if (el.selectedLabel && el.id === prdId) {
            el.selectedLabel[1] = null;
          }
        });
    },
    setLeftLabel(state, action: PayloadAction<{ prdId: string; label: any }>) {
      const { prdId, label } = action.payload;
      state.products &&
        state.products.list.map((prd) => {
          if (prd.selectedLabel && prd.id === prdId) {
            prd.selectedLabel[0] = label;
          }
        });
    },
    setRightLabel(state, action: PayloadAction<{ prdId: string; label: any }>) {
      const { prdId, label } = action.payload;
      state.products &&
        state.products.list.map((prd) => {
          if (prd.selectedLabel && prd.id === prdId) {
            prd.selectedLabel[1] = label;
          }
        });
    },
    setBrandPriceUse(state, action: PayloadAction<{ prdId: string }>) {
      const { prdId } = action.payload;
      state.products &&
        state.products.list.map((prd) => {
          if (prd.selectedLabel && prd.id === prdId) {
            prd.brandPriceUse = !prd.brandPriceUse;
          }
        });
    },
    setCategoryPriceUse(state, action: PayloadAction<{ prdId: string }>) {
      const { prdId } = action.payload;
      state.products &&
        state.products.list.map((prd) => {
          if (prd.selectedLabel && prd.id === prdId) {
            prd.categoryPriceUse = !prd.categoryPriceUse;
          }
        });
    },
    setClearProducts(state, action: PayloadAction<undefined>) {
      state.products = null;
    },
    setcurrentProductId(state, action: PayloadAction<string | null>) {
      state.currentProductId = action.payload;
    },
    setTest01(state, action: PayloadAction<undefined>) {},
    setTest02(state, action: PayloadAction<undefined>) {},
    setTest03(state, action: PayloadAction<undefined>) {},

    setCurrentState(state, action: PayloadAction<undefined>) {
      const {
        language,
        UserText,
        products,
        criteria,
        keywords,
        labelData,
        labelTemplate,
        request,
        currentProductId,
        htmlSource,
      } = state;
      state.currentState = {
        language,
        UserText,
        products,
        criteria,
        keywords,
        labelData,
        labelTemplate,
        request,
        currentProductId,
        htmlSource,
      };
    },
    setClearCurrentState(state, action: PayloadAction<undefined>) {
      state.language = "ko";
      state.UserText.text_1 = "";
      state.UserText.text_2 = "";
      state.UserText.text_3 = "";
      state.request.date = undefined;
      state.request.targetType = undefined;
      state.request.targetValue = undefined;
      state.request.crossType = undefined;
      state.products = null;
      state.keywords = null;
      state.labelData = null;
      state.currentProductId = null;
      state.htmlSource = "";
      state.currentState = null;
    },
    setPersistStateDraw(state, action: PayloadAction<undefined>) {
      if (!state.currentState) {
        return;
      }
      const { currentState } = state;
      state.criteria = currentState?.criteria;
      state.UserText = currentState.UserText;
      state.keywords = currentState.keywords;
      state.labelData = currentState.labelData;
      state.labelTemplate = currentState.labelTemplate;
      state.htmlSource = currentState.htmlSource;
      state.request = currentState.request;
      state.products = currentState.products;
      state.currentProductId = currentState.currentProductId;
    },
    setImageURL(state, action: PayloadAction<{ prdId: number; imgUrl: any }>) {
      const { prdId, imgUrl } = action.payload;
      state.products &&
        state.products.list.map((prd, index) => {
          if (prdId === index) {
            prd.media.imageUrl = imgUrl;
          }
        });
    },
    setImageUseOption(
      state,
      action: PayloadAction<{ prdId: number; isChangeImage: boolean }>
    ) {
      const { prdId, isChangeImage } = action.payload;
      state.products &&
        state.products.list.map((prd, index) => {
          if (prdId === index) {
            prd.media.isChangeImage = isChangeImage;
          }
        });
    },
    setVideoUseOption(
      state,
      action: PayloadAction<{ prdId: number; isChangeDubbing: boolean }>
    ) {
      const { prdId, isChangeDubbing } = action.payload;
      state.products &&
        state.products.list.map((prd, index) => {
          if (prdId === index) {
            prd.media.isChangeDubbing = isChangeDubbing;
          }
        });
    },
    setVideoDubbingScript(
      state,
      action: PayloadAction<{ dubbingText: string[]; prdId: number }>
    ) {
      // index번째 prd의 prd.media.imageUrl에 imgUrl를 할당
      const { dubbingText, prdId } = action.payload;
      state.products &&
        state.products.list.map((prd, index) => {
          if (prdId === index) {
            prd.media.dubbingScript = dubbingText;
          }
        });
    },
    editVideoDubbingScript(
      state,
      action: PayloadAction<{
        text: string;
        prdId: number;
        dubbingIndex: number;
      }>
    ) {
      const { text, prdId, dubbingIndex } = action.payload;
      state.products &&
        state.products.list.map((prd, index) => {
          if (prdId === index) {
            if (text.length < 1) {
              prd.media.dubbingScript.splice(dubbingIndex, 1);
            } else {
              prd.media.dubbingScript[dubbingIndex] = text;
            }
          }
        });
    },
    setVideoCreating(state, action: PayloadAction<VideoStatus>) {
      state.videoCreating = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // criteria
      .addCase(
        `${fetchCriteria.request}`,
        (state, action: PayloadAction<CriteriaRequest>) => {}
      )
      .addCase(
        `${fetchCriteria.success}`,
        (state, action: PayloadAction<{ criteria: CriteriaResponse }>) => {
          if (!state.criteria) {
            return;
          }
          const list = action.payload.criteria.list;
          state.criteria.list = list;
        }
      )
      .addCase(
        `${fetchCriteria.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // products
      .addCase(
        `${fetchProducts.request}`,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        `${fetchProducts.success}`,
        (state, action: PayloadAction<{ products: ProductsResponse }>) => {
          // 모든 상품 selectMode null로 초기화 && 첫번째, 두번쨰상품으로 초기화
          action.payload.products.list.map((el) => {
            el.hashTag = _.uniq(el.hashTag).filter((hash, index) => index < 30);
            el.selectMode = null;
            el.selectedLabel = [el.labels[0], el.labels[1]];
            el.brandPriceUse = true;
            el.categoryPriceUse = true;
            el.media = {
              isChangeImage: false,
              isChangeDubbing: false,
              imageUrl: "",
              dubbingScript: [""],
            };
          });
          state.products = action.payload.products;
        }
      )
      .addCase(
        `${fetchProducts.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // keyword
      .addCase(
        `${fetchKeyword.request}`,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        `${fetchKeyword.success}`,
        (state, action: PayloadAction<{ keywordData: KeywordResponse }>) => {
          action.payload.keywordData.list.map((el) => (el.todaysPick = false));
          state.keywords = action.payload.keywordData;
        }
      )
      .addCase(
        `${fetchKeyword.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // label data
      .addCase(
        `${fetchLabelData.request}`,
        (state, action: PayloadAction<LabelDataRequest>) => {}
      )
      .addCase(
        `${fetchLabelData.success}`,
        (state, action: PayloadAction<{ labelData: LabelDataResponse }>) => {
          action.payload.labelData.list.map((el) => (el.selected = false));
          state.labelData = action.payload.labelData;
        }
      )
      .addCase(
        `${fetchLabelData.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // label template
      .addCase(
        `${fetchLabelTemplate.request}`,
        (state, action: PayloadAction<undefined>) => {}
      )
      .addCase(
        `${fetchLabelTemplate.success}`,
        (
          state,
          action: PayloadAction<{ labelTemplate: LabelTemplateResponse }>
        ) => {
          state.labelTemplate = action.payload.labelTemplate;
        }
      )
      .addCase(
        `${fetchLabelTemplate.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // Translate
      .addCase(
        `${fetchTranslate.request}`,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        `${fetchTranslate.success}`,
        (state, action: PayloadAction<any>) => {
          state.translatedTxt = [
            ...state.translatedTxt,
            action.payload.data.translatedText,
          ];
        }
      )
      .addCase(
        `${fetchTranslate.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // 이미지 내려받기
      .addCase(
        `${fetchImgUrl.request}`,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        `${fetchImgUrl.success}`,
        (state, action: PayloadAction<{ data: any; prdId: number }>) => {
          const { data, prdId } = action.payload;

          state.products &&
            state.products?.list.map((prd, index) => {
              if (prdId === index) {
                prd.media.imageUrl = data.data.url;
              }
            });
        }
      )
      .addCase(
        `${fetchImgUrl.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      )
      // 비디오 내려받기
      .addCase(
        `${fetchVideo.request}`,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        `${fetchVideo.success}`,
        (state, action: PayloadAction<{ data: VideoStatus }>) => {
          state.videoCreating = action.payload.data;
        }
      )
      .addCase(
        `${fetchVideo.failure}`,
        (state, action: PayloadAction<APIError>) => {}
      );
  },
});

const selfSelector = (state: RootState) => state[BLOG];

export const criteriaSelector = createSelector(
  selfSelector,
  (state) => state.criteria && state.criteria.list
);
export const productsSelector = createSelector(
  selfSelector,
  (state) => state.products
);
export const keywordsSelector = createSelector(
  selfSelector,
  (state) => state.keywords
);
export const labelDataSelector = createSelector(
  selfSelector,
  (state) => state.labelData
);
export const labelTemplateSelector = createSelector(
  selfSelector,
  (state) => state.labelTemplate
);
export const userTextSelector = createSelector(
  selfSelector,
  (state) => state.UserText
);
// 기타
export const requestSelector = createSelector(
  selfSelector,
  (state) => state.request
);
export const htmlSelector = createSelector(
  selfSelector,
  (state) => state.htmlSource
);
export const currentStateSelector = createSelector(
  selfSelector,
  (state) => state.currentState
);
export const currentPrdIdSelector = createSelector(
  selfSelector,
  (state) => state.currentProductId
);
export const languageSelector = createSelector(
  selfSelector,
  (state) => state.language
);
export const translatedTxtSelector = createSelector(
  selfSelector,
  (state) => state.translatedTxt
);
export const videoCreatingSelector = createSelector(
  selfSelector,
  (state) => state.videoCreating
);

export const blogAction = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
