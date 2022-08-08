import Client from "apis";
import type { ProductRequest } from "types/blogV2";
class blogService02 {
  static getCriteria = async (cuid: string) => {
    return await Client.credentialsInstance.get(
      `${Client.path.api}/v1/automation/template2/criteria`,
      {
        params: cuid,
      }
    );
  };
  static getItemSegInfo = async (request: ProductRequest) => {
    return await Client.credentialsInstance.get(
      `${Client.path.api}/v1/automation/template2/itemSegInfo`,
      {
        params: request,
      }
    );
  };
  static getSegBestItems = async (request: any) => {
    return await Client.credentialsInstance.get(
      `${Client.path.api}/v1/automation/template2/segBestItems`,
      {
        params: request,
      }
    );
  };
  static getSimilarSegItems = async (request: any) => {
    return await Client.credentialsInstance.get(
      `${Client.path.api}/v1/automation/template2/similarSegItems`,
      {
        params: request,
      }
    );
  };
  static getAssociatedItems = async (request: any) => {
    return await Client.credentialsInstance.get(
      `${Client.path.api}/v1/automation/template2/associateItems`,
      {
        params: request,
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
  static getUploadImageUrl = async ({ file, keyPrefix }: any) => {
    return await Client.credentialsInstance({
      method: "post",
      url: `${Client.path.api}/v1/automation/template2/uploadImage`,
      headers: {},
      data: file,
    });

    // return await Client.credentialsInstance.post(
    //   `${Client.path.api}/v1/automation/template2/uploadImage`,
    //   file
    // );
  };
}

export default blogService02;
