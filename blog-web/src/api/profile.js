import API from "./api";

export const getProfile = async () => {
  const response = await API.get(`profile`);
  const result = response.data;
  return result.data;
}