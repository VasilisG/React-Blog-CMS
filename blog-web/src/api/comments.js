import API from "./api";

export const getComments = async (postId) => {
  const response = await API.get(`posts/${postId}/comments/tree`);
  return response.data;
}

export const postComment = async (payload) => {
  const response = await API.post('comments', payload);
  return response.data;
}