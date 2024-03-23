import axios, { AxiosInstance } from 'axios';

export const axiosBaseUrl: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  withCredentials: true,
});

// Function to refresh token
const refreshToken = async () => {
  // This endpoint should refresh your auth token using a refresh token stored in an HttpOnly cookie
  try {
    await axios.get('/auth/refresh', { withCredentials: true });
    return true;
  } catch (error) {
    console.error('Error refreshing token', error);
    return false;
  }
};

// Add a response interceptor
axiosBaseUrl.interceptors.response.use(
  (response) => response, // simply return the response for successful requests
  async (error) => {
    const originalRequest = error.config;
    // Check if the status code is 401, the token has not been refreshed yet,
    // and the error does not result from trying to refresh the token
    if (
      error.response.status === 401 &&
      !originalRequest.retry &&
      !originalRequest.url.includes(' /auth/refresh')
    ) {
      originalRequest.retry = true; // mark this request as retried
      const tokenRefreshed = await refreshToken(); // attempt to refresh the token
      if (tokenRefreshed) {
        return axiosBaseUrl(originalRequest); // retry the original request
      }
    }
    return Promise.reject(error); // reject the promise if not a 401 or if token refresh failed
  }
);
