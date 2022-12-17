import envs from "../../config/envs";
import apiCall from "../../utils/fetch";

export function getBrowseNeoApi() {
  return apiCall.get(`${envs.API_URL}/browse?api_key=${envs.API_KEY}`);
}
