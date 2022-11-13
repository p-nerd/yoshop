import axios from "axios";
import { BACKEND_API_URL } from "./env.js";

axios.defaults.baseURL = BACKEND_API_URL;

const getConfig = token => {
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const get = async (uri, token) => {
    return await axios.get(uri, getConfig(token));
};

export const post = async (uri, data, token) => {
    return await axios.post(uri, data, getConfig(token));
};

export const put = async (uri, data, token) => {
    return await axios.put(uri, data, getConfig(token));
};

export const deleteR = async (uri, token) => {
    return await axios.delete(uri, getConfig(token));
};

export const postFile = async (uri, formData, token) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    };
    const { data } = await axios.post(uri, formData, config);
    return data;
};
