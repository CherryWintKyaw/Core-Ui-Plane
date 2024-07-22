const API_BASE_URL = 'http://localhost:8000/api';

export const ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login/`,
    USER_LIST: `${API_BASE_URL}/users/`,  // Add this line for the user list endpoint
    REFRESH: `${API_BASE_URL}/token/refresh/` // Add this line for the token refresh endpoint
};

export { API_BASE_URL };
