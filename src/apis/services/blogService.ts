import Client from "apis";
import type {
  CriteriaRequest,
  ProductRequest,
  KeywordRequest,
  LabelDataRequest,
  VideRequest,
} from "types/blog";

class blogService {
  static getCriteria = async (criteriaRequest: CriteriaRequest) => {
    return await Client.credentialsInstance.get(
      `${Client.path.api}/v1/automation/criteria`,
      {
        params: { cuid: criteriaRequest },
      }
    );
  };
  static getProducts = async (productsRequest: ProductRequest) => {
    return await Client.credentialsInstance.get(
      `${Client.path.api}/v1/automation/products`,
      {
        params: productsRequest,
      }
    );
  };
  static getLabelTemplate = async () => {
    return await Client.credentialsInstance.get(
      `${Client.path.api}/v1/automation/labels/template`
    );
  };
  static getKeywords = async (keywordRequest: KeywordRequest) => {
    return await Client.credentialsInstance.get(
      `${Client.path.api}/v1/automation/keywords`,
      {
        params: keywordRequest,
      }
    );
  };
  static getLabelData = async (labelData: LabelDataRequest) => {
    return await Client.credentialsInstance.get(
      `${Client.path.api}/v1/automation/labels/data`,
      {
        params: labelData,
      }
    );
  };
  static getTranslatedText = async (text: string[]) => {
    return await Client.credentialsInstance.post(
      `${Client.path.api}/v1/automation/translate`,
      {
        text,
      }
    );
  };
  static getUploadedImageUrl = async (file: FormData) => {
    return await Client.credentialsInstance({
      method: "post",
      url: `${Client.path.api}/v1/automation/template2/uploadImage`,
      headers: {},
      data: file,
    });
  };

  static getVideoByImage = async (request: VideRequest) => {
    return await Client.credentialsInstance.post(
      `${Client.path.api}/video/image-to-video`,
      request
    );
  };

  static getAllVideoStatus = async () => {
    return await Client.credentialsInstance.get(`${Client.path.api}/video`);
  };

  static getVideoStatus = async (videoId: number) => {
    return await Client.credentialsInstance.get(
      `${Client.path.api}/video/${videoId}`,
      {
        params: videoId,
      }
    );
  };
}

export default blogService;
