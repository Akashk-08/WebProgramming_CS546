//import axios, md5
import axios from "axios";
import md5 from "md5";

const publickey = "c2c3b39e80f1c965087e4cb549dea409";
const privatekey = "5a73addced65729d993a24ef8392ae138f47db5c";
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";

const getAuthParams = () => {
  const ts = new Date().getTime();
  const hash = md5(ts + privatekey + publickey);
  return { ts, apikey: publickey, hash };
};

export const searchCharactersByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param
  if (!name || typeof name !== "string" || !name.trim()) {
    throw new Error("search name must be a non-empty string");
  }

  try {
    const response = await axios.get(baseUrl, {
      params: {
        nameStartsWith: name.trim(),
        limit: 15,
        ...getAuthParams(),
      },
    });

    return response.data.data?.results || [];
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    console.error("Marvel API search error:", errorMsg);
    throw new Error(`Character search failed: ${errorMsg}`);
  }
};

export const getCharacterById = async (id) => {
  if (!id || isNaN(Number(id))) {
    throw new Error("Invalid character ID");
  }

  const { ts, apikey, hash } = getAuthParams();
  const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${apikey}&hash=${hash}`;

  try {
    const response = await axios.get(url);
    if (response.data.data.count === 0) {
      throw new Error("Character not found");
    }
    return response.data;
  } catch (e) {
    if (e.response?.status === 404) {
      throw new Error("Character not found");
    }
    throw new Error("Failed to fetch character: " + e.message);
  }
};
