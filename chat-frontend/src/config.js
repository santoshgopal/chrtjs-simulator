// src/config.js

const CONFIG = {
    BACKEND_BASE_URL: "http://localhost:3000", // Replace with your backend API base URL
    API_TIMEOUT: 5000, // Timeout for API requests in milliseconds
    ENVIRONMENT: process.env.NODE_ENV || "development", // Current environment
    AUTH_TOKEN_KEY: "authToken", // Key to store authentication token in localStorage
    DEFAULT_LANGUAGE: "en", // Default language for the application
};


export default CONFIG;