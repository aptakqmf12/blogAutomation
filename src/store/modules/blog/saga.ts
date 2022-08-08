import { KeywordRequest } from "./../../../types/blog";
import { createAsyncAction } from "typesafe-actions";
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import _ from "lodash";
import { callWrapperSaga } from "utils/callWrapperSaga";
import blogService from "apis/services/blogService";
import { APIError } from "types/api";
import {
  ProductRequest,
  ProductsResponse,
  LabelTemplateResponse,
  LabelDataRequest,
  LabelDataResponse,
  KeywordResponse,
  CriteriaRequest,
  CriteriaResponse,
  VideRequest,
} from "types/blog";
import { useBlog } from "hooks";

// CRITERIA
export const FETCH_CRITERIA = "blog/FETCH_CRITERIA";
export const FFETCH_CRITERIA_SUCESS = "blog/FETCH_CRITERIA_SUCESS";
export const FETCH_CRITERIA_FAIL = "blog/FETCH_CRITERIA_FAIL";

export const fetchCriteria = createAsyncAction(
  FETCH_CRITERIA,
  FFETCH_CRITERIA_SUCESS,
  FETCH_CRITERIA_FAIL
)<CriteriaRequest, { criteria: CriteriaResponse }, APIError>();

function* fetchCriteriaSaga(action: ReturnType<typeof fetchCriteria.request>) {
  try {
    const { data }: AxiosResponse<CriteriaResponse> = yield callWrapperSaga(
      blogService.getCriteria,
      action.payload
    );
    if (!data) {
      yield;
    }
    yield put(fetchCriteria.success({ criteria: data }));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchCriteria.failure({ data, status }));
  }
}

// PRODUCTS
export const FETCH_PRODUCTS = "blog/FETCH_PRODUCTS";
export const FETCH_PRODUCTS_SUCESS = "blog/FETCH_PRODUCTS_SUCESS";
export const FETCH_PRODUCTS_FAIL = "blog/FETCH_PRODUCTS_FAIL";

export const fetchProducts = createAsyncAction(
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCESS,
  FETCH_PRODUCTS_FAIL
)<ProductRequest, { products: ProductsResponse }, APIError>(); //순서대로 "입력받는타입", "반환되는타입", "에러타입"

function* fetchBlogSaga(action: ReturnType<typeof fetchProducts.request>) {
  try {
    const { data }: AxiosResponse<ProductsResponse> = yield callWrapperSaga(
      blogService.getProducts,
      action.payload
    );
    yield put(fetchProducts.success({ products: data }));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchProducts.failure({ data, status }));
  }
}

// LABEL TEMPLATE
export const FETCH_LABEL_TEMPLATE = "blog/FETCH_LABEL_TEMPLATE";
export const FETCH_LABEL_TEMPLATE_SUCESS = "blog/FETCH_LABEL_TEMPLATE_SUCESS";
export const FETCH_LABEL_TEMPLATE_FAIL = "blog/FETCH_LABEL_TEMPLATE_FAIL";

export const fetchLabelTemplate = createAsyncAction(
  FETCH_LABEL_TEMPLATE,
  FETCH_LABEL_TEMPLATE_SUCESS,
  FETCH_LABEL_TEMPLATE_FAIL
)<undefined, { labelTemplate: LabelTemplateResponse }, APIError>();

function* fetchLabelTemplateSaga(
  action: ReturnType<typeof fetchLabelTemplate.request>
) {
  try {
    const { data }: AxiosResponse<LabelTemplateResponse> =
      yield callWrapperSaga(blogService.getLabelTemplate);

    yield put(fetchLabelTemplate.success({ labelTemplate: data }));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchLabelTemplate.failure({ data, status }));
  }
}

// LABEL DATA
export const FETCH_LABEL_DATA = "blog/FETCH_LABEL_DATA";
export const FETCH_LABEL_DATA_SUCESS = "blog/FETCH_LABEL_DATA_SUCESS";
export const FETCH_LABEL_DATA_FAIL = "blog/FETCH_LABEL_DATA_FAIL";

export const fetchLabelData = createAsyncAction(
  FETCH_LABEL_DATA,
  FETCH_LABEL_DATA_SUCESS,
  FETCH_LABEL_DATA_FAIL
)<LabelDataRequest, { labelData: LabelDataResponse }, APIError>();

function* fetchLabelDataSaga(
  action: ReturnType<typeof fetchLabelData.request>
) {
  try {
    const { data }: AxiosResponse<LabelDataResponse> = yield callWrapperSaga(
      blogService.getLabelData,
      action.payload
    );

    yield put(fetchLabelData.success({ labelData: data }));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchLabelData.failure({ data, status }));
  }
}

// KEYWORDS
export const FETCH_KEYWORDS = "blog/FETCH_KEYWORDS";
export const FETCH_KEYWORDS_SUCESS = "blog/FETCH_KEYWORDS_SUCESS";
export const FETCH_KEYWORDS_FAIL = "blog/FETCH_KEYWORDS_FAIL";

export const fetchKeyword = createAsyncAction(
  FETCH_KEYWORDS,
  FETCH_KEYWORDS_SUCESS,
  FETCH_KEYWORDS_FAIL
)<KeywordRequest, { keywordData: KeywordResponse }, APIError>();

function* fetchKeywordSaga(action: ReturnType<typeof fetchKeyword.request>) {
  try {
    const { data }: AxiosResponse<KeywordResponse> = yield callWrapperSaga(
      blogService.getKeywords,
      action.payload
    );

    yield put(fetchKeyword.success({ keywordData: data }));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchLabelData.failure({ data, status }));
  }
}

// Translate
export const FETCH_TRANSLATE = "blog/FETCH_TRANSLATE";
export const FETCH_TRANSLATE_SUCESS = "blog/FETCH_TRANSLATE_SUCESS";
export const FETCH_TRANSLATE_FAIL = "blog/FETCH_TRANSLATE_FAIL";

interface TranslatedText {
  data: {
    translatedText: string;
  };
}

export const fetchTranslate = createAsyncAction(
  FETCH_TRANSLATE,
  FETCH_TRANSLATE_SUCESS,
  FETCH_TRANSLATE_FAIL
)<string[], TranslatedText, APIError>();

function* fetchTranslateSaga(
  action: ReturnType<typeof fetchTranslate.request>
) {
  try {
    const { data }: AxiosResponse<any> = yield callWrapperSaga(
      blogService.getTranslatedText,
      action.payload
    );

    yield put(fetchTranslate.success(data));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchLabelData.failure({ data, status }));
  }
}

// 이미지 S3에 저장
export const FETCH_IMG_URL = "blog/FETCH_IMG_URL";
export const FETCH_IMG_URL_SUCESS = "blog/FETCH_IMG_URL_SUCESS";
export const FETCH_IMG_URL_FAIL = "blog/FETCH_IMG_URL_FAIL";

export const fetchImgUrl = createAsyncAction(
  FETCH_IMG_URL,
  FETCH_IMG_URL_SUCESS,
  FETCH_IMG_URL_FAIL
)<{ data: FormData; prdId: number }, { data: any; prdId: number }, APIError>();

function* fetchImgUrlSaga(action: ReturnType<typeof fetchImgUrl.request>) {
  try {
    const { data }: AxiosResponse<any> = yield callWrapperSaga(
      blogService.getUploadedImageUrl,
      action.payload.data
    );
    const { prdId } = action.payload;
    yield put(fetchImgUrl.success({ data, prdId }));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchImgUrl.failure({ data, status }));
  }
}

// 이미지, 더빙텍스트 서버에 올려서 비디오 내려받기
export const FETCH_VIDEO = "blog/FETCH_VIDEO";
export const FETCH_VIDEO_SUCESS = "blog/FETCH_VIDEO_SUCESS";
export const FETCH_VIDEO_FAIL = "blog/FETCH_VIDEO_FAIL";

export const fetchVideo = createAsyncAction(
  FETCH_VIDEO,
  FETCH_VIDEO_SUCESS,
  FETCH_VIDEO_FAIL
)<VideRequest, any, APIError>();

function* fetchVideoSaga(action: ReturnType<typeof fetchVideo.request>) {
  try {
    const { data }: AxiosResponse<any> = yield callWrapperSaga(
      blogService.getVideoByImage,
      action.payload
    );

    yield put(fetchVideo.success(data));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchLabelData.failure({ data, status }));
  }
}

export default function* blogSaga() {
  yield takeLatest(FETCH_CRITERIA, fetchCriteriaSaga);
  yield takeLatest(FETCH_PRODUCTS, fetchBlogSaga);
  yield takeLatest(FETCH_LABEL_TEMPLATE, fetchLabelTemplateSaga);
  yield takeLatest(FETCH_LABEL_DATA, fetchLabelDataSaga);
  yield takeLatest(FETCH_KEYWORDS, fetchKeywordSaga);
  yield takeLatest(FETCH_TRANSLATE, fetchTranslateSaga);
  yield takeEvery(FETCH_IMG_URL, fetchImgUrlSaga);
  yield takeLatest(FETCH_VIDEO, fetchVideoSaga);
}
