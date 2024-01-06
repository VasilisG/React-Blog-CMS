import { API_ENDPOINT } from "../config/env";
import API from "./api";

export const getTagByUrl = async (url) => {
  const response = await API.get(`${API_ENDPOINT}tags\\${url}`);
  const result = response.data;
  return result.data;
}