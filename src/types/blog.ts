// rest api
export interface CriteriaRequest {
  cuid: string;
}
export interface CriteriaResponse {
  list: {
    date: string;
    targetValue: string;
    targetType: string;
    crossType: string;
  }[];
}
export interface ProductRequest {
  cuid: string;
  targetType: string | undefined;
  targetValue: string | undefined;
  crossType: string | undefined;
  date: string | undefined;
}
export interface Product {
  id: string;
  cuid: string;
  productOwnerCuid: string;
  itemName: string | null;
  itemImage: string;
  itemUrl: string;
  brandName: string;
  targetValue: string;
  rank: 0;
  rating: 0;
  originalPrice: 0;
  salePrice: 0;
  categoryPriceDiff: number;
  categoryPriceUse?: boolean;
  brandPriceDiff: number;
  brandPriceUse?: boolean;
  priceCompareToLastWeek: number;
  priceCompareToLastMonth: number;
  labels: LabelData[];
  hashTag: string[];
  // 프론트에서 추가
  selectedLabel: [LabelData | null, LabelData | null];
  selectMode?: 0 | 1 | null;
  media: {
    imageUrl: string;
    isChangeImage: boolean;
    isChangeDubbing: boolean;
    dubbingScript: string[];
  };
}
export interface ProductsResponse {
  list: Product[];
}
// export interface LabelTemplateRequest {}
export interface LabelTemplateResponse {
  list: {
    id: number;
    template: string;
    enTemplate: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
export interface KeywordRequest {
  cuid: string;
  date: string;
}
export interface KeywordResponse {
  list: {
    keyword: string;
    keywordEn?: string;
    rank: number;
    todaysPick?: boolean;
  }[];
}
export interface LabelDataRequest {
  productId: string;
  date: string;
}
export interface LabelData {
  labelId: number;
  labelProperties?: any;
  selected?: boolean; // 프론트에서 추가
}
export interface LabelDataResponse {
  list: LabelData[];
}
export interface UserText {
  text_1: string;
  text_2: string;
  text_3: string;
}
// persist
export interface CurrentState {
  language: string;
  UserText: UserText;
  products: ProductsResponse | null;
  currentProductId: string | null;
  criteria: CriteriaResponse | null;
  keywords: KeywordResponse | null;
  labelData: LabelDataResponse | null;
  labelTemplate: LabelTemplateResponse | null;
  request: ProductRequest;
  htmlSource: string;
}

export interface BlogState {
  videoCreating: VideoStatus | null;
  translatedTxt: string[];
  language: string;
  UserText: UserText;
  products: ProductsResponse | null;
  currentProductId: string | null;
  criteria: CriteriaResponse | null;
  keywords: KeywordResponse | null;
  labelData: LabelDataResponse | null;
  labelTemplate: LabelTemplateResponse | null;
  request: ProductRequest;
  currentState?: CurrentState | null;
  htmlSource: string;
}

// video
export type VideRequest = {
  thumbnailImageUrl: string;
  videoSourceList: DubbingRequest[];
};
export type DubbingRequest = {
  id?: number;
  image: string;
  isChangeDubbing: boolean;
  dubbingScript: string[];
};
export type VideoStatus = {
  id: number;
  userId: number;
  status: string;
  videoFileName: string;
  videoFileUrl: string;
  createStartTime: string;
  createEndTime: string;
  thumbnailImageUrl: string;
};
