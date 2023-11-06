import axios from "axios";

/**
 * Utility function for making Axios requests.
 * @param {string} url - The URL to make the request to.
 * @param {string} method - The HTTP method, e.g. 'GET', 'POST', etc.
 * @param {object} data - Optional data to send with the request.
 * @returns {Promise} - A Promise that resolves to the response data.
 */
export const axiosRequest = async (url, method, data = null) => {
  try {
    const response = await axios({
      url,
      method,
      data,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
