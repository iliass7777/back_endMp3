import axios from "axios";
export const mp3 = async (url) => {
    if (!url) return ["data incompleat", null];
  
    const result = [null, null];
    await axios
      .get(`localhost:3008/ytverter?url=${url}`)
      .then((data) => {
        result[1] = data.data;
      })
      .catch((err) => {
        result[0] = err;
      });
    return result;
  };