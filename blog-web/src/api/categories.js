import { API_ENDPOINT } from "../config/env";
import API from "./api";

export const getCategoryTree = async () => {
  const response = await API.get(`${API_ENDPOINT}categories\\tree`);
  const result = response.data;
  return result.data;
}

export const getCategoryByUrl = async (url) => {
  const response = await API.get(`${API_ENDPOINT}categories\\${url}`);
  const result = response.data;
  return result.data;
}

export const getCategoryPath = async (url) => {
  const response = await API.get(`${API_ENDPOINT}categories\\path\\${url}`);
  const result = response.data;
  return result.data;
}