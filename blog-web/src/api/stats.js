import API from "./api";

export const updatePostViews = async (postId) => {
  const response = await API.put(`stats/updateviews/${postId}`);
  return response.data;
}