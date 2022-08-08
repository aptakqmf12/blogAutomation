import { createAsyncAction } from "typesafe-actions";
import { put, call, takeLatest } from "redux-saga/effects";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import _ from "lodash";
import { callWrapperSaga } from "utils/callWrapperSaga";
import { APIError } from "types/api";
import {
  CriteriaResponse,
  ProductRequest,
  SegBestItemsRequest,
  SimilarSegResponse,
  SimilarSegItemsRequest,
  ItemSegInfoResponse,
  SegBestResponse,
} from "types/blogV2";
import blogService02 from "apis/services/blogServiceV2";

// CRITERIA
export const FETCH_CRITERIA = "blogV2/FETCH_CRITERIA";
export const FFETCH_CRITERIA_SUCESS = "blogV2/FETCH_CRITERIA_SUCESS";
export const FETCH_CRITERIA_FAIL = "blogV2/FETCH_CRITERIA_FAIL";

export const fetchCriteria = createAsyncAction(
  FETCH_CRITERIA,
  FFETCH_CRITERIA_SUCESS,
  FETCH_CRITERIA_FAIL
)<{ cuid: string }, CriteriaResponse, APIError>();

function* fetchCriteriaSaga(action: ReturnType<typeof fetchCriteria.request>) {
  try {
    const { data }: AxiosResponse<CriteriaResponse> = yield callWrapperSaga(
      blogService02.getCriteria,
      action.payload
    );
    if (!data) {
      yield;
    }
    yield put(fetchCriteria.success(data));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchCriteria.failure({ data, status }));
  }
}

// itemSegInfo
export const FETCH_ITEMSEG = "blogV2/FFETCH_ITEMSEG";
export const FETCH_ITEMSEG_SUCESS = "blogV2/FETCH_ITEMSEG_SUCESS";
export const FETCH_ITEMSEG_FAIL = "blogV2/FETCH_ITEMSEG_FAIL";

export const fetchItemSegInfo = createAsyncAction(
  FETCH_ITEMSEG,
  FETCH_ITEMSEG_SUCESS,
  FETCH_ITEMSEG_FAIL
)<ProductRequest, ItemSegInfoResponse, APIError>();

// segBest
export const FETCH_SEGBEST = "blogV2/FFETCH_SEGBEST";
export const FETCH_SEGBEST_SUCESS = "blogV2/FETCH_SEGBEST_SUCESS";
export const FETCH_SEGBEST_FAIL = "blogV2/FETCH_SEGBEST_FAIL";

export const fetchSegBest = createAsyncAction(
  FETCH_SEGBEST,
  FETCH_SEGBEST_SUCESS,
  FETCH_SEGBEST_FAIL
)<SegBestItemsRequest, SegBestResponse, APIError>();

// similarSeg
export const FETCH_SIMILAR = "blogV2/FFETCH_SIMILAR";
export const FETCH_SIMILAR_SUCESS = "blogV2/FETCH_SIMILAR_SUCESS";
export const FETCH_SIMILAR_FAIL = "blogV2/FETCH_SIMILAR_FAIL";

export const fetchSimilarSeg = createAsyncAction(
  FETCH_SIMILAR,
  FETCH_SIMILAR_SUCESS,
  FETCH_SIMILAR_FAIL
)<SimilarSegItemsRequest, SimilarSegResponse, APIError>();

// associated
export const FETCH_ASSOCIATE = "blogV2/FFETCH_ASSOCIATE";
export const FETCH_ASSOCIATE_SUCESS = "blogV2/FETCH_ASSOCIATE_SUCESS";
export const FETCH_ASSOCIATE_FAIL = "blogV2/FETCH_ASSOCIATE_FAIL";

export const fetchAssociatedSeg = createAsyncAction(
  FETCH_ASSOCIATE,
  FETCH_ASSOCIATE_SUCESS,
  FETCH_ASSOCIATE_FAIL
)<SimilarSegItemsRequest, any, APIError>();

// seg item info의 요청값을 받은다음 seg Best 요청
export const FETCH_SEGS = "blogV2/FFETCH_SEGS";
export const FETCH_SEGS_SUCESS = "blogV2/FETCH_SEGS_SUCESS";
export const FETCH_SEGS_FAIL = "blogV2/FETCH_SEGS_FAIL";

export const fetchSegs = createAsyncAction(
  FETCH_SEGS,
  FETCH_SEGS_SUCESS,
  FETCH_SEGS_FAIL
)<any, any, APIError>();

function* fetchSegsSaga(action: ReturnType<typeof fetchItemSegInfo.request>) {
  try {
    // itemSegInfo를 받고
    const itemSegInfoRes: AxiosResponse<ItemSegInfoResponse> =
      yield callWrapperSaga(blogService02.getItemSegInfo, action.payload);

    yield itemSegInfoRes && put(fetchItemSegInfo.success(itemSegInfoRes?.data));

    const firstSeg = itemSegInfoRes.data.data.segData.filter(
      (el) => el.segRank === 1
    )[0];

    // 유사세그를 받고
    const similarSegRes: AxiosResponse<SimilarSegResponse> =
      yield callWrapperSaga(blogService02.getSimilarSegItems, action.payload);

    yield put(fetchSimilarSeg.success(similarSegRes.data));

    // 연관세그도 받고
    const associatedSegRes: AxiosResponse<any> = yield callWrapperSaga(
      blogService02.getAssociatedItems,
      action.payload
    );
    yield put(fetchAssociatedSeg.success(associatedSegRes.data));

    // 대표세그를 받는다
    const segBestRes: AxiosResponse<SegBestResponse> = yield callWrapperSaga(
      blogService02.getSegBestItems,
      {
        cuid: action.payload.cuid,
        date: action.payload.date,
        segId: firstSeg.segId,
      }
    );
    yield put(fetchSegBest.success(segBestRes.data));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchItemSegInfo.failure({ data, status }));
    yield put(fetchSegBest.failure({ data, status }));
  }
}

// Translate
export const FETCH_TRANSLATE = "blogV2/FETCH_TRANSLATE";
export const FETCH_TRANSLATE_SUCESS = "blogV2/FETCH_TRANSLATE_SUCESS";
export const FETCH_TRANSLATE_FAIL = "blogV2/FETCH_TRANSLATE_FAIL";

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
      blogService02.getTranslatedText,
      action.payload
    );

    yield put(fetchTranslate.success(data));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchTranslate.failure({ data, status }));
  }
}

// hexa chart image url
export const FETCH_HEXAURL = "blogV2/FETCH_HEXAURL";
export const FETCH_HEXAURL_SUCESS = "blogV2/FETCH_HEXAURL_SUCESS";
export const FETCH_HEXAURL_FAIL = "blogV2/FETCH_HEXAURL_FAIL";

export const fetchHexaImageUrl = createAsyncAction(
  FETCH_HEXAURL,
  FETCH_HEXAURL_SUCESS,
  FETCH_HEXAURL_FAIL
)<any, any, APIError>();

function* fetchHexaImageUrlSaga(
  action: ReturnType<typeof fetchHexaImageUrl.request>
) {
  try {
    const { data }: AxiosResponse<any> = yield callWrapperSaga(
      blogService02.getUploadImageUrl,
      action.payload
    );
    if (!data) {
      yield;
    }
    yield put(fetchHexaImageUrl.success(data));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchHexaImageUrl.failure({ data, status }));
  }
}

// bar chart image url
export const FETCH_BARURL = "blogV2/FETCH_BARURL";
export const FETCH_BARURL_SUCESS = "blogV2/FETCH_BARURL_SUCESS";
export const FETCH_BARURL_FAIL = "blogV2/FETCH_BARURL_FAIL";

export const fetchBarImageUrl = createAsyncAction(
  FETCH_BARURL,
  FETCH_BARURL_SUCESS,
  FETCH_BARURL_FAIL
)<any, any, APIError>();

function* fetchBarImageUrlSaga(
  action: ReturnType<typeof fetchBarImageUrl.request>
) {
  try {
    const { data }: AxiosResponse<any> = yield callWrapperSaga(
      blogService02.getUploadImageUrl,
      action.payload
    );
    if (!data) {
      yield;
    }
    yield put(fetchBarImageUrl.success(data));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchBarImageUrl.failure({ data, status }));
  }
}

// segBest image url
export const FETCH_SEGBESTURL = "blogV2/FETCH_SEGBESTURL";
export const FETCH_SEGBESTURL_SUCESS = "blogV2/FETCH_SEGBESTURL_SUCESS";
export const FETCH_SEGBESTURL_FAIL = "blogV2/FETCH_SEGBESTURL_FAIL";

export const fetchSegBestImageUrl = createAsyncAction(
  FETCH_SEGBESTURL,
  FETCH_SEGBESTURL_SUCESS,
  FETCH_SEGBESTURL_FAIL
)<any, any, APIError>();

function* fetchSegBestImageUrlSaga(
  action: ReturnType<typeof fetchSegBestImageUrl.request>
) {
  try {
    const { data }: AxiosResponse<any> = yield callWrapperSaga(
      blogService02.getUploadImageUrl,
      action.payload
    );
    if (!data) {
      yield;
    }
    yield put(fetchSegBestImageUrl.success(data));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchSegBestImageUrl.failure({ data, status }));
  }
}

// similar image url
export const FETCH_SIMILARURL = "blogV2/FETCH_SIMILARURL";
export const FETCH_SIMILARURL_SUCESS = "blogV2/FETCH_SIMILARURL_SUCESS";
export const FETCH_SIMILARURL_FAIL = "blogV2/FETCH_SIMILARURL_FAIL";

export const fetchSimilarImageUrl = createAsyncAction(
  FETCH_SIMILARURL,
  FETCH_SIMILARURL_SUCESS,
  FETCH_SIMILARURL_FAIL
)<any, any, APIError>();

function* fetchSimilarImageUrlSaga(
  action: ReturnType<typeof fetchSimilarImageUrl.request>
) {
  try {
    const { data }: AxiosResponse<any> = yield callWrapperSaga(
      blogService02.getUploadImageUrl,
      action.payload
    );
    if (!data) {
      yield;
    }
    yield put(fetchSimilarImageUrl.success(data));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchSimilarImageUrl.failure({ data, status }));
  }
}

// accossiate image url
export const FETCH_ACCOCIATEURL = "blogV2/FETCH_ACCOCIATEURL";
export const FETCH_ACCOCIATEURL_SUCESS = "blogV2/FETCH_ACCOCIATEURL_SUCESS";
export const FETCH_ACCOCIATEURL_FAIL = "blogV2/FETCH_ACCOCIATEURL_FAIL";

export const fetchAccosiateImageUrl = createAsyncAction(
  FETCH_ACCOCIATEURL,
  FETCH_ACCOCIATEURL_SUCESS,
  FETCH_ACCOCIATEURL_FAIL
)<any, any, APIError>();

function* fetchAccosiateImageUrlSaga(
  action: ReturnType<typeof fetchAccosiateImageUrl.request>
) {
  try {
    const { data }: AxiosResponse<any> = yield callWrapperSaga(
      blogService02.getUploadImageUrl,
      action.payload
    );
    if (!data) {
      yield;
    }
    yield put(fetchAccosiateImageUrl.success(data));
  } catch ({ response }) {
    const { data, status } = response as AxiosResponse;
    yield put(fetchAccosiateImageUrl.failure({ data, status }));
  }
}

export default function* blogSagaV2() {
  yield takeLatest(FETCH_CRITERIA, fetchCriteriaSaga);
  yield takeLatest(FETCH_SEGS, fetchSegsSaga);
  yield takeLatest(FETCH_HEXAURL, fetchHexaImageUrlSaga);
  yield takeLatest(FETCH_BARURL, fetchBarImageUrlSaga);
  yield takeLatest(FETCH_SEGBESTURL, fetchSegBestImageUrlSaga);
  yield takeLatest(FETCH_SIMILARURL, fetchSimilarImageUrlSaga);
  yield takeLatest(FETCH_ACCOCIATEURL, fetchAccosiateImageUrlSaga);
  yield takeLatest(FETCH_TRANSLATE, fetchTranslateSaga);
}
