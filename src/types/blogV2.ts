// request
export type ProductRequest = {
  cuid: string;
  date: string | undefined;
  objectId: string | undefined;
};
export type SegBestItemsRequest = {
  cuid: string;
  date: string | undefined;
  segId: string;
};
export type SimilarSegItemsRequest = {
  cuid: string;
  date: string | undefined;
  objectId: string | undefined;
};

// response
export type CriteriaResponse = {
  list: Criteria;
};
//
export type Criteria = {
  date: string;
  targetType: string;
  targetName: string;
  objectId: string;
}[];
export type SegBestResponse = {
  list: SegBest;
};

export type SegBest = {
  objectId: string;
  itemName: string;
  itemId: string;
  itemUrl: string;
  imageUrl: string;
  brandName: string;
  rank: number;
  hashTags: string[];
  salePrice: number;
  active: boolean;
}[];

export type SimilarSegResponse = {
  list: SimilarSeg;
};
export type SimilarSeg = {
  objectId: string;
  itemName: string;
  itemId: string;
  itemUrl: string;
  imageUrl: string;
  brandName: string;
  rank: number;
  hashTags: string[];
  salePrice: number;
  active: boolean;
}[];

export type AssociatedSegResponse = {
  list: AssociatedSeg;
};
export type AssociatedSeg = {
  objectId: string;
  itemName: string;
  itemId: string;
  itemUrl: string;
  imageUrl: string;
  brandName: string;
  rank: number;
  hashTags: string[];
  salePrice: number;
  active: boolean;
}[];

export type ImageUploadKeyResponse = {};

export type ItemSegInfoResponse = {
  data: ItemSegInfo;
};
export type ItemSegInfo = {
  objectId: string;
  itemName: string;
  itemId: string;
  itemUrl: string;
  imageUrl: string;
  brandName: string;
  hashTags: string[];
  salePrice: number;
  segData: {
    segId: string;
    qna: {
      answer: string;
      question: string;
    }[];
    description: string;
    segName: string;
    segRank: number;

    barGraph: {
      indicatorName: string;
      indicatorValue: number;
      segAvg: number;
      compareRatio: number;
      multipleSegAvg: number;
      itemGraph: number;
      avgGraph: number;
      graphY: string;
      indicatorRank: number;
    }[];
    hexaGraph: {
      indicatorName: string;
      indicatorValue: number;
      totalAvg: number;
      compareRatio: number;
      itemGraph: number;
      avgGraph: number;
      graphY: string;
      indicatorRank: number;
    }[];
  }[];
};

export type uploadChartImage = {
  signedUrl: string;
  headers: any;
};

// 프론트 데이터
export type SelectedInputOptions = {
  date: string | undefined;
  targetType: string | undefined;
  targetName: string | undefined;
  objectId: string | undefined;
};

export type CurrentState = {
  userText: {
    segBest: string;
    similar: string;
  };
  language: string;
  imageUploadResponse: {
    hexaUrl: string;
    barUrl: string;
    segBestUrl: string;
    similarSegUrl: string;
    associatedSegUrl: string;
  };
  segTabIndex: number;
  criteria: Criteria;
  itemSegInfo: ItemSegInfo | null;
  request: SelectedInputOptions;
  similarSeg: SimilarSeg | null;
  useSimilarSection: boolean;
  segBest: SegBest | null;
  useBestSection: boolean;
  htmlSource: string;
};

export type BlogV2State = {
  userText: {
    segBest: string;
    similar: string;
  };
  keepPage: number;
  language: string;
  imageUploadResponse: {
    hexaUrl: string;
    barUrl: string;
    segBestUrl: string;
    similarSegUrl: string;
    associatedSegUrl: string;
  };
  segTabIndex: number;
  openModal: "pc" | "mo" | "none";
  criteria: Criteria;
  request: SelectedInputOptions;
  itemSegInfo: ItemSegInfo | null;
  similarSeg: SimilarSeg | null;
  associatedSeg: AssociatedSeg | null;
  useAssociatedSection: boolean;
  useSimilarSection: boolean;
  segBest: SegBest | null;
  useBestSection: boolean;
  htmlSource: string;
  currentState: CurrentState | null;
};
