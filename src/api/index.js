import axios from "axios";

export const mp3 = async (url) => {
  if (!url) {
    return { error: "Data incomplete", data: null };
  }
  try {
    const response = await axios.get(`http://localhost:3008/ytverter`, {
      params: { url },
    });
    return { error: null, data: response.data };
  } catch (err) {
    return { error: err.message || "An error occurred", data: null };
  }
};
