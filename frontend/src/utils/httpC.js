import axios from "axios";
import { BACKEND_API_URL } from "../utils/envUtil.js";

axios.defaults.baseURL = BACKEND_API_URL;

const getConfig = token => {
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

/**
 * Get request with token
 * @param {string} uri
 * @param {string} token
 * @returns {Promise<AxiosResponse<any, any>>}
 */
export const get = async (uri, token) => {
    return await axios.get(uri, getConfig(token));
};

/**
 * Post request with token
 * @param {string} uri
 * @param {object} data
 * @param {string} token
 * @returns {Promise<AxiosResponse<any, any>>}
 */
export const post = async (uri, data, token) => {
    return await axios.post(uri, data, getConfig(token));
};

/**
 * Put request with token
 * @param {string} uri
 * @param {object} data
 * @param {string} token
 * @returns {Promise<AxiosResponse<any, any>>}
 */
export const put = async (uri, data, token) => {
    return await axios.put(uri, data, getConfig(token));
};
