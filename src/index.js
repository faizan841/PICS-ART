import axios from "axios";

const BASE_URL = "https://api.unsplash.com";

export const fetchApi = async (url, page) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, {
      params: {
        client_id: "6l8lgN3LOGgnS_vj-RoAgizckQAiTzi2fQZ9OfC7WJU",
        per_page: 20,
        page: page,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
