import API from "./api"

export const postNotification = async (message) => {
  const response = await API.post('notifications', {content: message});
  const result = response.data;
  return result.data;
}