import axios from "axios";
export const mp3 = async (url, format) => {
  if (!url || !format) {
    return { error: "Data incomplete", data: null };
  }
  try {
    const response = await axios.get(`http://localhost:3008/ytverter`, {
      params: { url, format }
    });
    return { error: null, data: response.data };
  } catch (err) {
    return { error: err.message || "An error occurred", data: null };
  }
};
