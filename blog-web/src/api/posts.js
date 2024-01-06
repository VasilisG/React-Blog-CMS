import API from "./api";

export const getPostByUrl = async (url) => {
  const response = await API.get(`posts/${url}`);
  const result = response.data;
  return result.data;
}

export const getRecentPosts = async () => {
  const response = await API.get(`posts/recent`);
  const result = response.data;
  return result.data;
}

export const getPopularPosts = async () => {
  const response = await API.get(`posts/popular`);
  const result = response.data;
  return result.data;
}

export const getPosts = async (type, url, page) => {
  const typeParam = type !== '' ? `?${type}Url=${url}` : '';
  const pageParam = page > 1 ? `${type !== '' ? '&' : '?'}p=${page}` : '';
  const response = await API.get(`posts${typeParam}${pageParam}`);
  const result = response.data;
  return result;
}

export const searchPosts = async (title) => {
  const response = await API.get(`posts?q=${title}`);
  const result = response.data;
  return result;
}