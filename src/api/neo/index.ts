import envs from "../../config/envs";
import apiCall from "../../utils/fetch";
import { IGetBrowseNeoApiResponse } from "./types";

export function getBrowseNeoApi() {
  return apiCall.get<IGetBrowseNeoApiResponse>(
    `${envs.API_URL}/browse?api_key=${envs.API_KEY}`
  );
}
